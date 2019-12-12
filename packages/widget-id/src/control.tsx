import * as React from "react"
import shortid from "shortid"
import { WidgetProps } from "@ncwidgets/common-typings"

export class Control extends React.Component<WidgetProps> {
  constructor(props: WidgetProps) {
    super(props)

    if (props.value) return

    this.generateId()
  }

  generateId() {
    const { field, onChange } = this.props
    const usePrefix = field.get("prefix")
    const useTimestamp = field.get("timestamp")

    const prefix = usePrefix ? usePrefix + "-" : ""
    const timestamp = useTimestamp ? Date.now() + "-" : ""

    const id = prefix + timestamp + shortid()

    onChange(id)
  }

  componentDidUpdate() {
    if (this.props.value) return

    this.generateId()
  }

  public render() {
    const {
      forID,
      classNameWrapper,
      setActiveStyle,
      setInactiveStyle,
      value
    } = this.props
    return (
      <input
        type="text"
        className={classNameWrapper}
        style={{
          color: "#cdcdcd"
        }}
        value={value || ""}
        id={forID}
        onFocus={setActiveStyle}
        onBlur={setInactiveStyle}
        disabled
      />
    )
  }
}
