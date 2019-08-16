import * as React from 'react'
import { List, Map } from 'immutable'
import styled from '@emotion/styled'
import { WidgetProps } from '@ncwidgets/common-typings'

const Wrapper = styled.div`
  padding: 1rem;
  background: #dfdfe3;
  border-radius: 3px;
  border-top-left-radius: 0px;
`

const MenuWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`

/* Overwrite netlify-cms default widget styles */
const FieldWrapper = styled.div<{ collapsed: boolean }>`
  & > div:first-of-type {
    margin-top: 0;
  }
  & > div > label {
    display: ${({ collapsed }) => collapsed ? 'none' : 'inline-block'};
    background: #c7c7d0;
  }

  & > div > input {
    border: 2px solid ${({ collapsed }) => collapsed ? '#dfdfe3' : '#c7c7d0'};
    border-top-left-radius: ${({ collapsed }) => collapsed ? '2px' : '0'};
  }

  & > div > label:after, 
  & > div > label:before {
    display: none;
  }
`

interface RenderFieldProp {
  lang: string;
}

interface ControlState {
  selectedLang: string;
  collapsed: boolean;
}

export class Control extends React.Component<WidgetProps, ControlState> {
  public componentValidate = {}

  public validate = () => {
    console.log('----called----')
    const { field } = this.props
    const langs: List<string> = field.get('langs')
    langs.forEach(lang => {
      this.componentValidate[lang]()
    })
  }

  public state = {
    selectedLang: '',
    collapsed: true,
  }

  public switchLang = (lang: string) => {
    this.setState({ selectedLang: lang })
  }

  public toggleCollapse = () => {
    this.setState(state => ({
      collapsed: !state.collapsed
    }))
  }

  public renderTab({ lang }: { lang: string }) {
    const { selectedLang, collapsed } = this.state
    const disabled = collapsed
      ? lang === selectedLang
      : true
    return (
      <button
        key={lang}
        onClick={() => this.switchLang(lang)}
        disabled={disabled}
      >
        {lang}
      </button>
    )
  }

  public renderField({ lang }: RenderFieldProp) {
    const {
      field: rootField,
      value: rootValue,
      editorControl: EditorControl, 
      onChangeObject: onChange, 
      onValidateObject: onValidate,
      metadata,
      fieldsErrors,
      clearFieldErrors,
      controlRef,
    } = this.props

    const widgetType = rootField.get('wrap_widget')

    const subFields = rootField.get('wrap_fields')
    const field = rootField
      .delete('langs')
      .delete('wrap_widget')
      .delete('wrap_fields')
      .set('name', lang)
      .set('label', lang)
      .set('widget', widgetType)
      .set('fields', subFields)

    const value = rootValue && Map.isMap(rootValue) 
      ? rootValue.get(lang) 
      : rootValue

    return (
      <EditorControl
        key={lang}
        fieldsMetaData={metadata} 
        processControlRef={controlRef && controlRef.bind(this)}
        {...{
          onChange,
          onValidate,
          value,
          field,
          fieldsErrors,
          clearFieldErrors,
          controlRef
        }} />
    )
  }

  public renderAllFields({ langs }) {
    return langs.map(lang => this.renderField({ lang }))
  }

  public componentDidMount() {
    const { field } = this.props
    const selectedLang: string = field.get('langs').first()
    this.setState({ selectedLang })
  }

  public shouldComponentUpdate() {
    return true
  }

  public render() {
    const { field, forID } = this.props
    const langs: List<string> = field.get('langs')
    const { selectedLang, collapsed } = this.state

    if (!selectedLang) return null

    return (
      <Wrapper id={forID}>
        <MenuWrapper>
          <div>
            {langs.map(lang => this.renderTab({ lang }))}
          </div>
          <button onClick={() => this.toggleCollapse()}>
            {collapsed ? 'Expand' : 'Collapse'}
          </button>
        </MenuWrapper>
        <FieldWrapper collapsed={collapsed}>
          {collapsed 
            ? this.renderField({ lang: selectedLang })
            : this.renderAllFields({ langs })
          }
        </FieldWrapper>
      </Wrapper>
    )
  }
}