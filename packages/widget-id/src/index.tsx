import * as React from 'react'
import shortid from 'shortid'
import { WidgetProps } from '@ncwidgets/common-typings'

export class IdWidget extends React.Component<WidgetProps> {
  public state = {
    id: ''
  }
  public componentDidMount() {
    const {
      value,
      field,
      onChange,
    } = this.props
    
    if (value) return
  
    const prefix = field.get('prefix')
    const id = `${prefix ? prefix + '-' : ''}${shortid()}`
    this.setState({ id })
    setTimeout(() => {
      onChange(id)
    }, 0)
  }

  public componentDidUpdate() {
    const { value, onChange } = this.props
    const { id } = this.state
    if (value) {
      return
    }
    onChange(id)
  }

  public render() {
    const {
      forID,
      classNameWrapper,
      setActiveStyle,
      setInactiveStyle,
      value,
    } = this.props
    const { id } = this.state
    return (
      <input
        type="text"
        className={classNameWrapper}
        style={{
          opacity: 0.4,
        }}
        value={value || id}
        // value={value}
        id={forID}
        onFocus={setActiveStyle}
        onBlur={setInactiveStyle}
        disabled
      />
    )
  }
}