import React, { useEffect, useState, Fragment } from 'react'
import { render } from 'react-dom'
import cms from 'netlify-cms-app'
import { Widget as IdWidget } from '@ncwidgets/id'
// import { Widget as ReorderWidget } from '@ncwidgets/reorder'
import { Widget as FileRelationWidget } from '@ncwidgets/file-relation'
import { createWidget as createReorderWidget } from '@ncwidgets/reorder'

const h = React.createElement.bind(React)

const loadData = async (dataPath) => {
  const data = await fetch(dataPath)
    .then(data => data.json())
    .catch(err => console.error(err))

  window.repoFiles = data
}

const createRoot = () => {
  const $root = document.createElement('div')
  document.body.appendChild($root)
  return $root
}

const CMS = () => {
  useEffect(() => {
    loadData('./data.json')

    const ReorderWidget = createReorderWidget({
      controlItem: ({ item }) => h('div', null, h('h5', null, item.title), h('p', null, item.id))
    })

    cms.registerWidget(IdWidget)
    cms.registerWidget(ReorderWidget)
    cms.registerWidget(FileRelationWidget)
    cms.registerPreviewStyle('./preview.css')
    cms.init()
  })

  return h('div', { id: 'nc-root' })
}

render(h(CMS), createRoot())
