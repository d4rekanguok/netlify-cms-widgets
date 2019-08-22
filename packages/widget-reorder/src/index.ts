import * as React from 'react'
import { renderDefaultControl, createControl, RenderControl } from './control'
import { renderDefaultPreview, createPreview, RenderPreview } from './preview'

export interface CreateWidgetOptions {
  renderControl?: RenderControl;
  renderPreview?: RenderPreview;
}

const createWidget = ({ 
  renderControl = renderDefaultControl,
  renderPreview = renderDefaultPreview,
}: CreateWidgetOptions) => {
  const previewRef = React.createRef<HTMLDivElement>()
  return {
    controlComponent: createControl({ renderControl, renderPreview, previewRef }),
    previewComponent: createPreview(previewRef),
  }
}

const Widget = {
  name: 'ncw-reorder',
  ...createWidget({})
}

export { createWidget, Widget }