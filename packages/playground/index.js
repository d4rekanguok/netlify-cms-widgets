import React, { useEffect } from 'react'
import { render } from 'react-dom'
import cms from 'netlify-cms-app'
import { Widget as IdWidget } from '@ncwidgets/id'
import { Widget as ReorderWidget } from '@ncwidgets/reorder'
import { Widget as FileRelationWidget } from '@ncwidgets/file-relation'
import { Widget as TinyMCEWidget } from '@ncwidgets/tiny-mce'

import { customReorderWidget } from './custom-order-components'
import repoData from './static/data'

const createRoot = () => {
  const $root = document.createElement('div')
  document.body.appendChild($root)
  return $root
}

const CMS = () => {
  useEffect(() => {
    window.repoFiles = repoData

    cms.registerWidget(IdWidget)
    cms.registerWidget(ReorderWidget)
    cms.registerWidget(FileRelationWidget)
    cms.registerWidget(TinyMCEWidget)
    
    cms.registerWidget({
      name: 'custom-reorder',
      ...customReorderWidget,
    })
    cms.registerPreviewStyle('./preview.css')
    cms.init()
  }, [])

  return <div id="nc-root"></div>
}

render(<CMS />, createRoot())