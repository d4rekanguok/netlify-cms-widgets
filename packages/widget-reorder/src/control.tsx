import * as React from 'react'
import { fromJS, List, Map } from 'immutable'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { WidgetProps } from '@ncwidgets/common-typings'
import { reorder, diff, extract, createWidgetId, normalize } from './utils'
import { RenderListItem, defaultListItem } from './renderListItem'
import { NoticeBar } from './notice'

const modifiedMsg = {
  empty: 'You haven\'t set order yet',
  modified: 'Source collection has been changed.'
}

export interface CreateControlOptions {
  renderListItem?: RenderListItem;
}
export interface ControlProps extends WidgetProps {
  value: List<Map<any, any>>;
}
export interface ControlState {
  data: Record<string, any>;
  modified: 'none' | 'empty' | 'modified';
  newOrder: any[];
}
type CreateControl = (options?: CreateControlOptions) => React.ComponentClass<ControlProps>

export const createControl: CreateControl = (options = {}) => {
  const renderListItem = options.renderListItem || defaultListItem
  
  return class Control extends React.Component<ControlProps> {
    public widgetId = createWidgetId(this.props.field)

    public state = {
      normalizedData: {},
      fetched: false,
      modified: 'none',
      newOrder: [],
    }

    public async componentDidMount() {
      const { query, forID, value, field } = this.props
      const collection: string = field.get('collection')
      const fieldId: string = field.get('id_field')
      const result = await query(forID, collection, [fieldId], '')

      // send completed data to sessionStorage
      const sourceData = result.payload.response.hits.map(payload => payload.data)
      // @ts-ignore
      const normalizedData = normalize(sourceData, fieldId)
      this.setState({ normalizedData, fetched: true })
      sessionStorage.setItem(this.widgetId, JSON.stringify(normalizedData))

      const data = sourceData.map(item => extract(item, fieldId))

      // Order hasn't been set yet
      if (!value || !value.toJS) {
        this.setState({
          newOrder: data,
          modified: 'empty',
        })
        return
      }

      const currentOrder = value.toJS()
      const { newOrder, modified } = diff({
        currentOrder,
        data,
        key: fieldId,
      })

      // source data has been modified
      if (modified) {
        this.setState({ newOrder, modified: 'modified' })
      }
    }

    public handleDisplayChange = () => {
      const { onChange } = this.props
      const { newOrder } = this.state
      this.setState({ modified: 'none' }, () => {
        onChange(fromJS(newOrder))
      })
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
      const { normalizedData, modified, fetched } = this.state

      if (!fetched) {
        return <div>Loading...</div>
      }

      const fieldId: string = field.get('id_field')
      const fieldDisplay: List<string> = field.get('display_fields') || List()

      return (
        <DragDropContext onDragEnd={this.handleDragEnd}>
          {modified !== 'none' && <NoticeBar displayChange={this.handleDisplayChange}>
            {modifiedMsg[modified]}
          </NoticeBar>}
          {value && <Droppable droppableId="droppable">
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
                  let renderItem =itemId
                  let isRemoved = true
                  const sourceItem = normalizedData[itemId]
                  if (sourceItem) {
                    renderItem = sourceItem
                    isRemoved = false
                  }

                  return (
                    <Draggable
                      key={`draggable-${itemId}`}
                      draggableId={`draggable-${itemId}`}
                      index={i}
                      isDragDisabled={isRemoved}
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
                            background: isRemoved ? '#e9e9f0' : '#fff',
                            borderRadius: '3px',
                            marginBottom: '0.5rem',
                            ...provided.draggableProps.style,
                          }}
                        >
                          {renderListItem({ item: renderItem, fieldDisplay, isRemoved })}
                        </div>
                      )}
                    </Draggable>
                  )})}
                {provided.placeholder}
              </div>
            )}
          </Droppable>}
        </DragDropContext>
      )
    }
  }
}
