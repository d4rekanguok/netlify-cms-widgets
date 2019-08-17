import React, { useEffect } from 'react'
import { render } from 'react-dom'
import cms from 'netlify-cms-app'
import { Widget as IdWidget } from '@ncwidgets/id'
import { Widget as ReorderWidget, createControl } from '@ncwidgets/reorder'
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

const CustomReorderPreview = ({ value }) => (
  <section>
    <hr />
    <p>Custom Widget Preview</p>
    {value.map((item, i) => <p key={i}>{item.get('title')}</p>)}
  </section>
)

const CustomReorderControl = createControl({
  renderListItem: ({ item }) => <ListComponent item={item} />
})

const CMS = () => {
  useEffect(() => {
    window.repoFiles = repoData

    cms.registerWidget(IdWidget)
    cms.registerWidget(ReorderWidget)
    cms.registerWidget({
      name: 'custom-reorder',
      controlComponent: CustomReorderControl,
      previewComponent: CustomReorderPreview,
    })
    cms.registerWidget(FileRelationWidget)
    cms.registerPreviewStyle('./preview.css')
    cms.init()
  }, [])

  return <div id="nc-root"></div>
}

render(<CMS />, createRoot())
