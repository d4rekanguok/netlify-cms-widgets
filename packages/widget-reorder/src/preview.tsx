import React, { useState, useEffect, useRef } from 'react'
import { List } from 'immutable'
import { createWidgetId, extract } from './utils'

export const usePreviewData = ({ value, field }) => {
  const [data, setData] = useState<Record<any, any>>({})
  const [fetched, setFetched] = useState<boolean>(false)
  const widgetId = useRef<string>(createWidgetId(field))
  const fieldId: string = field.get('id_field')

  useEffect(() => {
    const normalizedData = sessionStorage.getItem(widgetId.current)
    if (normalizedData) {
      setData(JSON.parse(normalizedData))
      setFetched(true)
    }
  }, [])

  if (!fetched) return null

  const orderedData = value.map(item => {
    const id = item.get(fieldId)
    return data[id]
  })

  return orderedData
}

export const Preview = ({ value, field }) => {
  const orderedData = usePreviewData({ value, field })
  const fieldDisplay: List<string> = field.get('display_fields')

  if (!orderedData) return <div>Loading...</div>
  return(
    <ul>
      {orderedData.map((item, i) => {
        const displayData = extract(item, ...fieldDisplay)
        return (
          <li key={`listItem-${i}`}>
            <p>
              {Object.values(displayData).join(' ')}
            </p>
          </li>
        )})}
    </ul>)
}
