import { Control, createControl } from './control'
import { Preview } from './preview'

const Widget = {
  name: 'ncw-reorder',
  controlComponent: Control,
  previewComponent: Preview,
}

export const createWidget = (options) => {
    const { previewComponent = Preview } = options
    
    return {
      ...Widget,
      name: options.name ? options.name : Widget.name,
      controlComponent: createControl(options.ListComponent),
      previewComponent
    }
}

export {
  Widget,
  Control,
  Preview,
}