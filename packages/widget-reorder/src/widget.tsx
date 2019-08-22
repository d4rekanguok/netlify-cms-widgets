import React, { useEffect, useState } from 'react'
import { fromJS, List } from 'immutable'
import { DropResult } from 'react-beautiful-dnd'
import { WidgetProps } from '@ncwidgets/common-typings'
import { normalize, diff, reorder, extract } from './utils'
import { renderDefaultPreview, PreviewPortal, getPreview } from './preview'
import { 
  ControlList, 
  ControlDraggableItem, 
  renderDefaultControl, 
  Modal, 
  Modified, 
  EmptyMessage,
} from './control'

export interface ControlProps extends WidgetProps {
  value: List<string>;
}

export interface CreateControlOptions {
  renderControl?: (item: Record<string, any>) => React.ReactElement;
  renderPreview?: (items: object[]) => React.ReactElement;
  name?: string;
}

export const createWidget = ({ 
  renderControl = renderDefaultControl,
  renderPreview = renderDefaultPreview,
  name = 'ncw-reorder'
}) => {

  const previewRef = React.createRef<HTMLDivElement>()

  const Control: React.FC<ControlProps> = (props) => {
    const { classNameWrapper, query, forID, value, onChange, field } = props
    const [data, setData] = useState<Record<string, unknown>>({})
    const [fetched, setFetched] = useState<boolean>(false)
    const [newOrder, setNewOrder] = useState<string[]>([])
    const [modified, setModified] = useState<Modified>('none')

    const collection: string = field.get('collection')
    const fieldId: string = field.get('id_field')
    const displayFields: List<string> = field.get('display_fields')

    // no value or empty value, assuming value is always a List<string>
    const noValue = (typeof value === 'undefined' || value.size === 0) 

    useEffect(() => {
      const fetchData = async () => {
        const result = await query(forID, collection, [fieldId], '')
        const sourceData = result.payload.response.hits.map(payload => payload.data)
        // @ts-ignore
        const normalizedData = normalize(sourceData, fieldId)
        setData(normalizedData)
        setFetched(true)

        const idData: string[] = sourceData.map(item => item[fieldId])

        if (noValue) {
          setNewOrder(idData)
          setModified('unset')
          return
        }

        const currentOrder = value.toJS()
        const { newOrder, modified } = diff({
          currentOrder,
          data: idData,
        })
        
        if (modified) {
          setNewOrder(newOrder)
          setModified('modified')
        }
      }

      fetchData()
    }, [])

    const handleDisplayChange = () => {
      setModified('none')
      onChange(fromJS(newOrder))
    }

    const handleDragEnd = (result: DropResult) => {
      if (
        !result.destination || 
        result.source.index === result.destination.index
      ) return

      const data = value.toJS()

      const sortedData = reorder({
        data,
        startIndex: result.source.index,
        endIndex: result.destination.index
      })

      onChange(fromJS(sortedData))
    }

    if (!fetched) return <div>loading...</div>
    if (fetched && Object.keys(data).length === 0) {
      return (
        <EmptyMessage className={classNameWrapper} collection={collection} />
      )
    }
    return (
      <div style={{ position: 'relative', minHeight: '12rem' }}>
        {modified !== 'none' && <Modal {...{ collection, modified, handleDisplayChange }} />}
        {!noValue && <ControlList onDragEnd={handleDragEnd}>
          {
            value.map((id, i) => {
              const item = data[id]
              const displayData = (typeof item === 'undefined')
                ? { error: 'Entry does not exist' }
                // @ts-ignore
                : extract(data[id], ...displayFields)
              return (
                <ControlDraggableItem key={id} identifier={id} index={i}>
                  {renderControl(displayData)}
                </ControlDraggableItem>)
            })
          }
        </ControlList>}
        
        { /* Renders preview in splitpane via this component... */ }
        <PreviewPortal portalRef={previewRef}>
          {!noValue && renderPreview(value.map(identifier => data[identifier])) }
        </PreviewPortal>
      </div>
    )
  }

  return {
    name,
    controlComponent: Control,
    previewComponent: getPreview(previewRef),
  }
}
