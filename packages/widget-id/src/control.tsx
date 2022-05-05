import * as React from 'react'
import { nanoid } from 'nanoid'
import { WidgetProps } from '@ncwidgets/common-typings'

export class Control extends React.Component<WidgetProps> {
  public inputRef: React.RefObject<HTMLInputElement>
  public constructor(props: WidgetProps) {
    super(props)
    this.inputRef = React.createRef()

    if (props.value) return

    this.generateId()
  }

  public componentDidMount() {
    const { field } = this.props
    if (!field.get('hidden')) return
    const $input = this.inputRef.current
    if (!$input) return
    const $container = $input.parentElement
    if (!$container) return
    $container.style.display = 'none'
  }

  public generateId() {
    const { field, onChange } = this.props
    const usePrefix = field.get('prefix')
    const usePostfix = field.get('postfix')
    const useTimestamp = field.get('timestamp')

    const prefix = usePrefix ? usePrefix + '-' : ''
    const timestamp = useTimestamp ? Date.now() + '-' : ''
    const postfix = usePostfix ? '-' + usePostfix : ''
    
    const id = prefix + timestamp + nanoid() + postfix

    onChange(id)
  }

  public componentDidUpdate() {
    if (this.props.value) return

    this.generateId()
  }

  public render() {
    const {
      forID,
      classNameWrapper,
      setActiveStyle,
      setInactiveStyle,
      value,
    } = this.props
    return (
      <input
        type='text'
        className={classNameWrapper}
        style={{
          color: '#cdcdcd',
        }}
        value={value || ''}
        id={forID}
        onFocus={setActiveStyle}
        onBlur={setInactiveStyle}
        disabled
      />
    )
  }
}
