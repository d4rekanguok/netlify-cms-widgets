import * as React from 'react'
import { fromJS, List, Map } from 'immutable'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { WidgetProps } from '@ncwidgets/common-typings'
import { reorder, diff, extract, createWidgetId, normalize } from './utils'

interface RenderListItemArgs {
  item: Record<any, any>;
  fieldDisplay: List<string>;
}
type RenderListResult = string | React.ComponentType<RenderListItemArgs>;
type RenderListItem = (args: RenderListItemArgs) => RenderListResult

const defaultListItem: RenderListItem = ({ item, fieldDisplay }) => {
  const displayData = extract(item, ...fieldDisplay)
  return Object.values(displayData).join(' ')
}

export interface CreateControlOptions {
  renderListItem?: RenderListItem;
}
export interface ControlProps extends WidgetProps {
  value: List<Map<any, any>>;
}
type CreateControl = (options?: CreateControlOptions) => React.ComponentClass<ControlProps>

export const createControl: CreateControl = (options = {}) => {
  const renderListItem = options.renderListItem || defaultListItem
  
  return class Control extends React.Component<ControlProps> {
    public widgetId = createWidgetId(this.props.field)

    public state = {
      data: {}
    }

    public async componentDidMount() {
      const { query, forID, value, field, onChange } = this.props
      const collection: string = field.get('collection')
      const fieldId: string = field.get('id_field')
      const result = await query(forID, collection, [fieldId], '')

      // send completed data to sessionStorage
      const sourceData = result.payload.response.hits.map(payload => payload.data)
      // @ts-ignore
      const normalizedData = normalize(sourceData, fieldId)
      this.setState({ data: normalizedData })
      sessionStorage.setItem(this.widgetId, JSON.stringify(normalizedData))

      const data = sourceData.map(item => extract(item, fieldId))

      if (!value || !value.toJS) {
        onChange(fromJS(data))
        return
      }

      const currentOrder = value.toJS()
      const { newOrder, modified } = diff({
        currentOrder,
        data,
        key: fieldId,
      })

      if (modified) {
        onChange(fromJS(newOrder))
      }
    }

    public handleDragEnd = result => {
      if (!result.destination || result.source.index === result.destination.index) return
      const { value, onChange } = this.props
      const data = value.toJS()

      const sortedData = reorder({
        data,
        startIndex: result.source.index,
        endIndex: result.destination.index
      })

      onChange(fromJS(sortedData))
    }

    public render() {
      const { value, field } = this.props
      const { data } = this.state

      if (value.size === 0 || Object.keys(data).length === 0) 
        return <div>loading...</div>

      const fieldId: string = field.get('id_field')
      const fieldDisplay: List<string> = field.get('display_fields') || List()

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
                {value.map((item, i) => {
                  const itemId = item.get(fieldId)
                  const sourceItem = data[itemId]
                  return (
                    <Draggable
                      key={`draggable-${itemId}`}
                      draggableId={`draggable-${itemId}`}
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
                          {renderListItem({ item: sourceItem, fieldDisplay })}
                        </div>
                      )}
                    </Draggable>
                  )})}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )
    }
  }
}
