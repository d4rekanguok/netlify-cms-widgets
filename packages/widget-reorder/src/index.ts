import * as React from 'react'
import { renderDefaultControl, createControl, RenderControl } from './control'
import { renderDefaultPreview, createPreview, RenderPreview } from './preview'

export interface CreateWidgetOptions {
  renderControl?: RenderControl;
  renderPreview?: RenderPreview;
  name?: string;
}

const createWidget = ({ 
  renderControl = renderDefaultControl,
  renderPreview = renderDefaultPreview,
  name = 'ncw-reorder'
}: CreateWidgetOptions) => {
  const previewRef = React.createRef<HTMLDivElement>()
  return {
    name,
    controlComponent: createControl({ renderControl, renderPreview, previewRef }),
    previewComponent: createPreview(previewRef),
  }
}

const Widget = createWidget({})

export { createWidget, Widget }