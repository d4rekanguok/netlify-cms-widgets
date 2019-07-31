import { Control, createWidgetControl } from './control'
import { Preview } from './preview'

const Widget = {
  name: 'ncw-reorder',
  controlComponent: Control,
  previewComponent: Preview,
}

export const createWidget = (options) => {
    return {
      name: 'ncw-reorder',
      controlComponent: createWidgetControl(options.controlItem),
      previewComponent: Preview
    }
}

export {
  Widget,
  Control,
  Preview,
}