import React from 'react'
import { Map } from 'immutable'
import { Editor } from '@tinymce/tinymce-react'

export class Control extends React.Component {
  state = {
    ready: false
  }

  config = {
    apiKey: null,
    height: 500,
    menubar: false,
    plugins: [
      'advlist autolink lists link image charmap print preview anchor',
      'searchreplace visualblocks code fullscreen',
      'insertdatetime media table paste code help wordcount'
    ],
    toolbar: 'undo redo | formatselect | bold italic backcolor | \
    alignleft aligncenter alignright alignjustify | \
    bullist numlist outdent indent | removeformat | help',
  }

  componentDidMount() {
    const { field } = this.props

    // field is an Immutable object.
    // It contains key-value passed to this widget, i.e tiny_config
    const maybeConfig = field.get('tiny_config')
    if (!maybeConfig || !Map.isMap(maybeConfig)) {
      throw new Error('[cnw-tiny-mce]: No config')
    }

    // convert this Immutable map to JS for convenient use
    // since we won't ever use it again
    const config = maybeConfig.toJS()
    this.config = {
      ...this.config,
      ...config,
    }

    // got the config, time to re-render
    this.setState({ ready: true })
  }

  // since the editor returns a string,
  // storing the data is very simple
  handleChange = (content) => {
    const { onChange } = this.props
    onChange(content)
  }

  render() {
    const { value } = this.props
    const { ready } = this.state
    const { apiKey, ...init } = this.config
    if (!ready) return (<div>loading...</div>)
    if (!apiKey) return (<div>No api key</div>)

    return <Editor
      apiKey={apiKey}
      initialValue={value || '<p>This is the initial content of the editor</p>'}
      init={init}
      onEditorChange={this.handleChange}
    />
  }
}

export const Widget = {
  // name that will be used in config.yml
  name: 'ncw-tiny-mce',
  controlComponent: Control,
}