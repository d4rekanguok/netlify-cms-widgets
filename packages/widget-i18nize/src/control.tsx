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
  label {
    display: ${({ collapsed }) => collapsed ? 'none' : 'inline-block'};
    background: #c7c7d0;
  }

  input {
    border: 2px solid ${({ collapsed }) => collapsed ? '#dfdfe3' : '#c7c7d0'};
    border-top-left-radius: ${({ collapsed }) => collapsed ? '2px' : '0'};
  }

  label:after, label:before {
    display: none;
  }
`

interface RenderFieldProp {
  lang: string;
  widgetType: string;
}

interface ControlState {
  selectedLang: string;
  collapsed: boolean;
}

export class Control extends React.Component<WidgetProps, ControlState> {
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
        onClick={() => this.switchLang(lang)}
        disabled={disabled}
      >
        {lang}
      </button>
    )
  }

  public renderField({ lang, widgetType }: RenderFieldProp) {
    const {
      field: rootField,
      value: rootValue,
      editorControl: EditorControl, 
      onChangeObject: onChange, 
    } = this.props

    const field = rootField
      .delete('langs')
      .delete('wrap')
      .set('name', lang)
      .set('label', lang)
      .set('widget', widgetType)

    const value = rootValue && Map.isMap(rootValue) 
      ? rootValue.get(lang) 
      : rootValue

    return (
      <EditorControl key={lang} {...{
        onChange,
        value,
        field,
      }} />
    )
  }

  public renderAllFields({ langs, widgetType }) {
    return langs.map(lang => this.renderField({ lang, widgetType }))
  }

  public componentDidMount() {
    const { field } = this.props
    const selectedLang: string = field.get('langs').first()
    this.setState({ selectedLang })
  }

  public render() {
    const { field, forID } = this.props
    const langs: List<string> = field.get('langs')
    const widgetType: string = field.get('wrap')
    const { selectedLang, collapsed } = this.state
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
            ? this.renderField({ lang: selectedLang, widgetType })
            : this.renderAllFields({ langs, widgetType })
          }
        </FieldWrapper>
      </Wrapper>
    )
  }
}