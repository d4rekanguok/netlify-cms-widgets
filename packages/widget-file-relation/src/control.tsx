import * as React from 'react'
import Select from 'react-select'
import { fromJS, Set } from 'immutable'
import { reactSelectStyles } from 'netlify-cms-ui-default/dist/esm/styles'
import { WidgetProps } from '@ncwidgets/common-typings'

type Option = Record<'label' | 'value', string>

interface WidgetState {
  options: Option[];
}

export class Control extends React.Component<WidgetProps, WidgetState> {
  public state: WidgetState = {
    options: [],
  }

  public async componentDidMount() {
    const { loadEntry, field } = this.props
    
    const collection = field.get('collection')
    const file = field.get('file')
    const fieldName = field.get('target_field')
    const fieldId = field.get('id_field')
    const fieldDisplay: string = field.get('display_fields') || fieldId
  
    const results = await loadEntry(collection, file)
    const data = results.data[fieldName]
    const options = data.map(option => ({
      value: option[fieldId],
      label: option[fieldDisplay],
    }))
    this.setState({ options })
  }

  public changeHandle = selected => {
    const { onChange } = this.props
    if (!selected) onChange([])
    const value = Array.isArray(selected)
      ? selected
      : [ selected ]
    onChange(fromJS(value))
  }

  public getSelectedValue = (
    value: null | string | Set<Option>, 
    options: Option[]
  ): Option[] => {
    let selected: Option[] = []
    if (!value) return selected
    else if (typeof value === 'string') {
      const maybeOption = options.find(option => option.value === value)
      selected = maybeOption ? [maybeOption] : []
    }
    else selected = value.toJS()
    return selected
  }

  public render() {
    const {
      field,
      value,
      forID, 
      classNameWrapper, 
      setActiveStyle, 
      setInactiveStyle,
    } = this.props
    const { options } = this.state
    const selected = this.getSelectedValue(value, options)

    const isMultiple: boolean = field.get('multiple')
    const placeholder: string = field.get('placeholder') || 'select...'

    return (
      <div>
        <Select
          inputId={forID}
          isMulti={isMultiple}
          onChange={this.changeHandle}
          className={classNameWrapper}
          onFocus={setActiveStyle}
          onBlur={setInactiveStyle}
          styles={reactSelectStyles}
          name="categories"
          isClearable={false}
          value={selected}
          options={options}
          placeholder={placeholder}
        />
      </div>
    )
  }
}
