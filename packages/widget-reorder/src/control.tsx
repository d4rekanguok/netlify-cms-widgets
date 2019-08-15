import * as React from 'react'
import { fromJS, List } from 'immutable'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { WidgetProps } from '@ncwidgets/common-typings'
import { reorder, diff, extract, generateIdentifierFromField } from './utils'

const defaultListItem = item => Object.values(item).join(' ')

export interface CreateControlOptions {
  renderListItem?: (item: object) => React.ComponentType<{ item: Record<string, any> }>;
}

type CreateControl = (options?: CreateControlOptions) => React.ComponentClass<WidgetProps>

export const createControl: CreateControl = (options = {}) => {
  const renderListItem = options.renderListItem || defaultListItem
  
  return class Control extends React.Component<WidgetProps> {

    public state = {
      data: [],
    }

    public async componentDidMount() {
      const { query, forID, value, field } = this.props
      const collection: string = field.get('collection')
      const fieldId: string = field.get('id_field')
      const fieldDisplay: List<string> = field.get('display_fields')
      const fieldsToBeExtracted = Array.from(new Set([fieldId, ...fieldDisplay.toJS()]))

      const result = await query(forID, collection, [fieldId], '')
      const data = result.payload.response.hits.map(payload => {
        return extract(payload.data, ...fieldsToBeExtracted)
      })

      if (!value || !value.toJS) {
        this.updateChange(data, false)
        return
      }

      const currentOrder = value.toJS()
      const { newOrder, modified } = diff({
        data: currentOrder,
        currentOrder: data,
        key: fieldId,
      })

      this.updateChange(newOrder, modified)
    }

    private updateChange = (data: object, triggerOnChange = true) => {
      const { onChange, field } = this.props
      if (triggerOnChange) {
        onChange(fromJS(data))
      }
      this.setState({ data })
      const key = generateIdentifierFromField(field)
      localStorage.setItem(key, JSON.stringify(data))
    }

    public handleDragEnd = result => {
      if (!result.destination || result.source.index === result.destination.index) return
      const { data } = this.state
      const sortedData = reorder(
        data,
        result.source.index,
        result.destination.index
      )

      this.updateChange(sortedData)
    }

    public render() {
      const { field } = this.props
      const { data } = this.state
  
      const fieldId: string = field.get('id_field')
      const fieldDisplay: List<string> = field.get('display_fields')
      const renderIdValue = fieldDisplay.contains(fieldId)

      // Avoid render id if not in display fields
      const renderData = renderIdValue ? data : data.map(item => extract(item, ...fieldDisplay.toJS()))

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
                {renderData.map((item, i) => (
                  <Draggable
                    key={`draggable${i}`}
                    draggableId={`draggable${i}`}
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
                        {renderListItem(item)}
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
