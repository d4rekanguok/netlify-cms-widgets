import * as React from 'react'
import Select from 'react-select'
import { fromJS, Set, List } from 'immutable'
import { reactSelectStyles } from 'netlify-cms-ui-default/dist/esm/styles'
import { WidgetProps } from '@ncwidgets/common-typings'
import { stringTemplate } from 'netlify-cms-lib-widgets'

const createLabel = ({ fieldDisplay, item }: { fieldDisplay: List<string>; item: Record<string, any> }): string => {
  return fieldDisplay.map(field => item[field]).filter(v => v).join(' ')
}

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
    
    const collection: string = field.get('collection')
    const file: string = field.get('file')
    const fieldName: string = field.get('target_field')
    const fieldId: string = field.get('id_field')
    const labelTemplate: string | undefined = field.get('display_summary')
    
    let fieldDisplay: List<string> = List([fieldId])
    if (!labelTemplate) {
      const rawFieldDisplay: string | string[] = field.get('display_fields')
      if (typeof rawFieldDisplay === 'string') {
        fieldDisplay = List([rawFieldDisplay])
      } else if (List.isList(rawFieldDisplay)) {
        fieldDisplay = rawFieldDisplay
      }
    }
        
    const results = await loadEntry(collection, file)
    const data = results.data[fieldName]

    const options = data.map(option => {
      let value: string, label: string

      if (typeof option === 'string') {
        value = label = option
      } else {
        value = option[fieldId]
        label = labelTemplate
          ? stringTemplate.compileStringTemplate(labelTemplate, null, null, fromJS(option))
          : createLabel({ item: option, fieldDisplay })
      }

      return { value, label }
    })
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
          isClearable={true}
          value={selected}
          options={options}
          placeholder={placeholder}
        />
      </div>
    )
  }
}
