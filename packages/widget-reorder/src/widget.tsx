import React, { useEffect } from 'react'
import { fromJS } from 'immutable'
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd'
// @ts-ignore
import { WidgetProps } from '@ncwidgets/common-typings'
import { reducer } from './reducer';
import { queryData, setOrder, handleDragEnd } from './action'
import { renderDefaultPreview, PreviewContainer, getPreview } from './preview'

const initialState = { 
  data: {},
  order: [],
  orderModified: false,
}

const renderDefaultControl= (item): React.ReactElement => <p>{Object.values(item).join(' ')}</p>

export interface CreateControlOptions {
  renderControl?: (item: Record<string, any>) => React.ReactElement
  renderPreview?: (items: object[]) => React.ReactElement
  name?: string
}

type CreateWidget = (options: CreateControlOptions) => React.StatelessComponent<WidgetProps>

export const createWidget = ({ 
  renderControl = renderDefaultControl,
  renderPreview = renderDefaultPreview,
  name = 'ncw-reorder'
}) => {

  const previewRef = React.createRef<HTMLDivElement>()

  const Control  = React.forwardRef((props: WidgetProps, ref) => {
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
                        {renderControl(data[identifier])}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        { /* Renders preview in splitpane via this component... */ }
        <PreviewContainer myRef={previewRef}>
          { renderPreview(order.map(identifier => data[identifier])) }
        </PreviewContainer>
        </>)
    })

    return {
      name,
      controlComponent: Control,
      previewComponent: getPreview(previewRef),
    }
  }