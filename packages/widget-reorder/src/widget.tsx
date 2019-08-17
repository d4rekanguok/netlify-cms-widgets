import React, { useEffect } from 'react'
import { fromJS } from 'immutable'
import isEmpty from 'lodash/isEmpty'
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd'
// @ts-ignore
import { WidgetProps } from '@ncwidgets/common-typings'
import { reducer } from './Store';
import { queryData, setOrder, handleDragEnd } from './action'
import { CustomReorderPreview, PreviewContainer, getPreview } from './preview'


const defaultPreviewItems = items => <CustomReorderPreview items={items}/>
const defaultControlItem = (item): React.ReactElement => <p>{Object.values(item).join(' ')}</p>

export interface CreateControlOptions {
  controlListItem?: (item: Record<string, any>) => React.ReactElement
  previewListItem?: (items: object[]) => React.ReactElement
  name?: string
}

type CreateWidget = (options: CreateControlOptions) => React.StatelessComponent<WidgetProps>

export const createWidget = ({ 
  controlListItem = defaultControlItem,
  previewListItem = defaultPreviewItems,
  name = 'ncw-reorder'
}) => {

  const previewRef = React.createRef<HTMLDivElement>()

  const Control  = (props: WidgetProps) => {
    const [state, dispatch] = React.useReducer(reducer, { data: {}, order: [], orderModified: false})
    const { order, data, orderModified } = state
    const { onChange, value } = props
    
    useEffect(() => {
      // Request data on init
      queryData(props, dispatch)
    }, [])

    // When order is modified, call @onChange
    useEffect(() => {
      if (orderModified) onChange(fromJS(order))
    }, [order])

    // When data changes, set order
    useEffect(() => {
      !isEmpty(data) && setOrder(data, value, dispatch)
    }, [data])

    if (!order || order.length === 0) return <div>loading...</div>
    return (
      <>
        <DragDropContext onDragEnd={(result: DropResult) => handleDragEnd(result, order, dispatch)}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div
                style={{
                  padding: '1rem',
                  background: snapshot.isDraggingOver ? 'lightblue' : '#dfdfe3',
                  borderRadius: '3px',
                }}
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {order.map((identifier, i) => (
                  <Draggable
                      key={identifier}
                    draggableId={identifier}
                    index={i}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                          padding: '1rem',
                          opacity: snapshot.isDragging ? 0.6 : 1,
                          boxShadow: snapshot.isDragging ?  '0 4px 16px 0 rgba(0,0,0,0.2)' : '0 2px 6px 0 rgba(0,0,0,0.2)',
                          background: '#fff',
                          borderRadius: '3px',
                          marginBottom: '0.5rem',
                          ...provided.draggableProps.style,
                        }}
                      >
                        {controlListItem(data[identifier])}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <PreviewContainer myRef={previewRef}>
          { previewListItem(order.map(identifier => data[identifier])) }
        </PreviewContainer>
        </>)
    }

    return {
      name,
      controlComponent: Control,
      previewComponent: getPreview(previewRef),
    }
  }