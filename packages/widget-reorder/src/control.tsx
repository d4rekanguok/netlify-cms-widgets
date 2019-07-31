import * as React from 'react'
import { fromJS } from 'immutable'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { WidgetProps } from '@ncwidgets/common-typings'

import { reorder, diff, extract } from './utils'

export const createWidgetControl = (ListElement?) => {
  return class extends React.Component<WidgetProps> {
    public state = {
      data: [],
    }

    public async componentDidMount() {
      const { query, forID, value, field, onChange } = this.props

      const collection: string = field.get('collection')
      const fieldId: string = field.get('id_field')
      const fieldDisplay: string[] = field.get('display_fields')

      // @ts-ignore
      const fieldsToBeExtracted = Array.from(new Set([fieldId, ...fieldDisplay.toJS()]))

      const result = await query(forID, collection, [fieldId], '')
      const data = result.payload.response.hits.map(payload => {
        return extract(payload.data, ...fieldsToBeExtracted)
      })

      if (!value || !value.toJS) {
        onChange(fromJS(data))
        this.setState({ data })
        return
      }

      const currentOrder = value.toJS()
      const { newOrder, modified } = diff({
        currentOrder,
        data,
        key: fieldId,
      })
      this.setState({ data: newOrder })
      if (modified) onChange(fromJS(newOrder))
    }

    public handleDragEnd = result => {
      const { onChange } = this.props

      if (!result.destination) return

      const { data } = this.state
      const sortedData = reorder(
        data,
        result.source.index,
        result.destination.index
      )

      this.setState({
        data: sortedData,
      })

      onChange(fromJS(sortedData))
    }

    public render() {
      const { field } = this.props
      const { data } = this.state

      const fieldId: string = field.get('id_field')
      const fieldDisplay: string[] = field.get('display_fields')

      if (data.length === 0) return <div>loading...</div>
      return (
        <DragDropContext onDragEnd={this.handleDragEnd}>
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
                {data.map((item, i) => (
                  <Draggable
                    key={item[fieldId]}
                    draggableId={item[fieldId]}
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
                          ...provided.draggableProps.style
                        }}
                      >
                        {ListElement && <ListElement item={item}/>}
                        {!ListElement && fieldDisplay.map(fieldName => item[fieldName]).join(' ')}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )
    }
  }
}

export const Control = createWidgetControl()