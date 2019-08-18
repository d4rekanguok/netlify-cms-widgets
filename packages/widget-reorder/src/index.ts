import { createControl } from './control'
import { Preview, usePreviewData } from './preview'

const Control = createControl()

const Widget = {
  name: 'ncw-reorder',
  controlComponent: Control,
  previewComponent: Preview,
}

export {
  Widget,
  Control,
  Preview,
  createControl,
  usePreviewData,
}