import React, { useEffect } from 'react'
import { render } from 'react-dom'
import cms from 'netlify-cms-app'
import { Widget as IdWidget } from '@ncwidgets/id'
import { Widget as ReorderWidget, createWidget } from '@ncwidgets/reorder'
import { Widget as FileRelationWidget } from '@ncwidgets/file-relation'
import repoData from './static/data'

const createRoot = () => {
  const $root = document.createElement('div')
  document.body.appendChild($root)
  return $root
}

const ListComponent = ({ item }) => (
  <>
    <strong>{item.title}</strong>
    <p style={{ margin: 0, color: '#798291', fontSize: '0.8rem' }}>{item.id}</p>
  </>
)

const CustomReorderPreview = ({ items }) => (
  <section>
    <hr />
    <p>Custom Widget Preview</p>
    {items.map((item, i) => <p key={i}>{item.title}</p>)}
  </section>
)

const CustomReorderWidget = createWidget({
  renderControl: ({ value }) => <ListComponent item={value} />,
  renderPreview: ({ value }) => <CustomReorderPreview items={value}/>,
  name: 'custom-reorder'
})

const CMS = () => {
  useEffect(() => {
    window.repoFiles = repoData

    cms.registerWidget(IdWidget)
    cms.registerWidget(ReorderWidget)
    cms.registerWidget(CustomReorderWidget)
    cms.registerWidget(FileRelationWidget)
    cms.registerPreviewStyle('./preview.css')
    cms.init()
  }, [])

  return <div id="nc-root"></div>
}

render(<CMS />, createRoot())