import * as React from 'react'
import { fromJS, List, Map } from 'immutable'
import { DropResult } from 'react-beautiful-dnd'
import { WidgetProps } from '@ncwidgets/common-typings'
import { normalize, diff, reorder } from './utils'
import { renderDefaultPreview, PreviewPortal, createPreview } from './preview'
import { 
  ControlList, 
  ControlDraggableItem, 
  renderDefaultControl, 
  Modal, 
  Modified, 
  EmptyMessage,
} from './control'

export interface RenderControlProps {
  value: any;
  field: Map<any, any>;
}

export interface RenderPreviewProps {
  value: List<any>;
  field: Map<any, any>;
}

export interface ControlProps extends WidgetProps {
  value: List<string>;
}

export interface ControlState {
  data: Record<string, any>;
  fetched: boolean;
  newOrder: string[];
  modified: Modified;
}

export interface CreateControlOptions {
  renderControl?: (props: RenderControlProps) => React.ReactElement;
  renderPreview?: (props: RenderPreviewProps) => React.ReactElement;
  name?: string;
}

const createControl = ({ 
  renderControl = renderDefaultControl,
  renderPreview = renderDefaultPreview,
  previewRef
}) => {
  return class Control extends React.Component<ControlProps, ControlState> {
    public state: ControlState = {
      data: {},
      fetched: false,
      newOrder: [],
      modified: 'none'
    }

    public async componentDidMount() {
      const { forID, field, value, query } = this.props
      const collection: string = field.get('collection')
      const fieldId: string = field.get('id_field')

      // no value or empty value, assuming value is always a List<string>
      const noValue = (typeof value === 'undefined' || value.size === 0) 

      const result = await query(forID, collection, [fieldId], '')
      const sourceData = result.payload.response.hits.map(payload => payload.data)
      // @ts-ignore
      const normalizedData = normalize(sourceData, fieldId)
      this.setState({ data: normalizedData, fetched: true })

      const idData: string[] = sourceData.map(item => item[fieldId])

      if (noValue) {
        this.setState({ newOrder: idData, modified: 'unset' })
        return
      }

      const currentOrder = value.toJS()
      const { newOrder, modified } = diff({
        currentOrder,
        data: idData,
      })
    
      if (modified) {
        this.setState({ newOrder, modified: 'modified' })
      }
    }

    public handleDisplayChange = () => {
      const { newOrder } = this.state
      const { onChange } = this.props
      this.setState({ modified: 'none' }, () => {
        onChange(fromJS(newOrder))
      })
    }

    public handleDragEnd = (result: DropResult) => {
      if (
        !result.destination || 
      result.source.index === result.destination.index
      ) return

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
      const { field, value, classNameWrapper } = this.props
      const { modified, data, fetched } = this.state

      const collection: string = field.get('collection')
      const maxHeight: string = field.get('max_height', 'none')

      const noValue = (typeof value === 'undefined' || value.size === 0) 

      if (!fetched) return <div>loading...</div>
      if (fetched && Object.keys(data).length === 0) {
        return (
          <EmptyMessage className={classNameWrapper} collection={collection} />
        )
      }
      return (
        <div style={{ position: 'relative', minHeight: '12rem' }}>
          {modified !== 'none' && <Modal handleDisplayChange={this.handleDisplayChange} {...{ collection, modified }} />}
          {!noValue && <ControlList onDragEnd={this.handleDragEnd} maxHeight={maxHeight}>
            {
              value.map((id, i) => {
                const item = data[id]
                const value = (typeof item === 'undefined')
                  ? { error: 'Entry does not exist' }
                // @ts-ignore
                  : item
                return (
                  <ControlDraggableItem key={id} identifier={id} index={i}>
                    {renderControl({ value, field })}
                  </ControlDraggableItem>)
              })
            }
          </ControlList>}
        
          { /* Renders preview in splitpane via this component... */ }
          <PreviewPortal portalRef={previewRef}>
            {!noValue && renderPreview({
              value: value.map(identifier => data[identifier])
            }) }
          </PreviewPortal>
        </div>
      )
    }
  }
}

export const createWidget = ({ 
  renderControl = renderDefaultControl,
  renderPreview = renderDefaultPreview,
  name = 'ncw-reorder'
}) => {
  const previewRef = React.createRef<HTMLDivElement>()

  return {
    name,
    controlComponent: createControl({
      renderControl, renderPreview, previewRef,
    }),
    previewComponent: createPreview(previewRef),
  }
}
