import React, { useEffect } from 'react'
import { fromJS } from 'immutable'
import { DropResult } from 'react-beautiful-dnd'
import { WidgetProps } from '@ncwidgets/common-typings'
import { reducer } from './reducer'
import { queryData, setOrder, handleDragEnd } from './action'
import { renderDefaultPreview, PreviewContainer, getPreview } from './preview'
import { ControlList, ControlDraggableItem, renderDefaultControl } from './control'

const initialState = { 
  data: {},
  order: [],
  orderModified: false,
}

export interface CreateControlOptions {
  renderControl?: (item: Record<string, any>) => React.ReactElement;
  renderPreview?: (items: object[]) => React.ReactElement;
  name?: string;
}

type CreateWidget = (options: CreateControlOptions) => React.StatelessComponent<WidgetProps>

export const createWidget = ({ 
  renderControl = renderDefaultControl,
  renderPreview = renderDefaultPreview,
  name = 'ncw-reorder'
}) => {

  const previewRef = React.createRef<HTMLDivElement>()

  const Control: React.FC<WidgetProps> = (props) => {
    const [state, dispatch] = React.useReducer(reducer, initialState)
    const { order, data, orderModified } = state
    const { onChange, value } = props
    
    useEffect(() => {
      // Request data on init
      queryData(props, dispatch)
    }, [])

    // When order is modified, call onChange
    useEffect(() => {
      if (orderModified) onChange(fromJS(order))
    }, [order])

    // When data changes, set order
    useEffect(() => {
      Object.keys(data).length > 0 && setOrder(data, value, dispatch)
    }, [data])

    if (!order || order.length === 0) return <div>loading...</div>
    return (
      <>
        <ControlList onDragEnd={((result: DropResult) => handleDragEnd(result, order, dispatch))}>
          {
            order.map((id, i) => 
              <ControlDraggableItem key={id} identifier={id} index={i}>
                {renderControl(data[id])}
              </ControlDraggableItem>)
          }
        </ControlList>
        
        { /* Renders preview in splitpane via this component... */ }
        <PreviewContainer myRef={previewRef}>
          { renderPreview(order.map(identifier => data[identifier])) }
        </PreviewContainer>
        </>)
  }

  return {
    name,
    controlComponent: Control,
    previewComponent: getPreview(previewRef),
  }
}
