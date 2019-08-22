import React, { useEffect, useState } from 'react'
import { fromJS, List } from 'immutable'
import { DropResult } from 'react-beautiful-dnd'
import { WidgetProps } from '@ncwidgets/common-typings'
import { normalize, diff, reorder } from './utils'
import { renderDefaultPreview, PreviewPortal, getPreview } from './preview'
import { ControlList, ControlDraggableItem, renderDefaultControl, Modal, Modified } from './control'

export interface ControlProps extends WidgetProps {
  value: List<string>;
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

  const Control: React.FC<ControlProps> = ({ query, forID, value, onChange, field }) => {
    const [data, setData] = useState<Record<string, unknown>>({})
    const [fetched, setFetched] = useState<boolean>(false)
    const [newOrder, setNewOrder] = useState<string[]>([])
    const [modified, setModified] = useState<Modified>('none')

    const collection: string = field.get('collection')
    const fieldId: string = field.get('id_field')

    useEffect(() => {
      const fetchData = async () => {
        const result = await query(forID, collection, [fieldId], '')
        const sourceData = result.payload.response.hits.map(payload => payload.data)
        // @ts-ignore
        const normalizedData = normalize(sourceData, fieldId)
        setData(normalizedData)
        setFetched(true)

        const idData: string[] = sourceData.map(item => item[fieldId])

        if (!value || !value.toJS) {
          setNewOrder(idData)
          setModified('empty')
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
      if (!result.destination || result.source.index === result.destination.index) return
      const data = value.toJS()

      const sortedData = reorder({
        data,
        startIndex: result.source.index,
        endIndex: result.destination.index
      })

      onChange(fromJS(sortedData))
    }

    if (!fetched) return <div>loading...</div>
    return (
      <div style={{ position: 'relative' }}>
        {modified !== 'none' && <Modal {...{ modified, handleDisplayChange }} />}
        {value && <ControlList onDragEnd={handleDragEnd}>
          {
            value.map((id, i) => 
              <ControlDraggableItem key={id} identifier={id} index={i}>
                {renderControl(data[id])}
              </ControlDraggableItem>)
          }
        </ControlList>}
        
        { /* Renders preview in splitpane via this component... */ }
        <PreviewPortal portalRef={previewRef}>
          { renderPreview(value.map(identifier => data[identifier])) }
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
