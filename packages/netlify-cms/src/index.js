import React from 'react'
import createReactClass from 'create-react-class'

import { NetlifyCmsApp as cms } from 'netlify-cms-app/dist/esm'
import { Widget as RelationWidget } from '@ncwidgets/file-relation'
import { Widget as IdWidget } from '@ncwidgets/id'
import uploadcare from 'netlify-cms-media-library-uploadcare'
import cloudinary from 'netlify-cms-media-library-cloudinary'

cms.registerWidget([
  RelationWidget,
  IdWidget,
])

cms.registerMediaLibrary(uploadcare)
cms.registerMediaLibrary(cloudinary)

// lifted straight from netlify-cms source
if (!window.CMS_MANUAL_INIT) {
  cms.init()
} else {
  console.log('`window.CMS_MANUAL_INIT` flag set, skipping automatic initialization.')
}

if (typeof window !== 'undefined') {
  window.CMS = cms
  window.initCMS = cms.init
  window.createClass = window.createClass || createReactClass
  window.h = window.h || React.createElement
}

export const NetlifyCms = cms
export default cms