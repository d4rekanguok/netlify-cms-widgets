import React, { useState, useEffect, useRef } from 'react'
import { createWidgetId, copy } from './utils'

export const Preview = ({ value, field }) => {
  const [data, setData] = useState<object[]>([])
  const widgetId = useRef<string>(createWidgetId(field))

  const fieldId: string = field.get('id_field')

  // Fetch initial data from localstorage
  useEffect(() => {
    const sourceData = localStorage.getItem(widgetId.current)
    if (sourceData) setData(JSON.parse(sourceData))
  }, [])

  if (!data) return <div>Loading...</div>
  return(
    <ul>
      {value.map((item, i) => {
        const sourceItem = data.find(sourceItem => sourceItem[fieldId] === item.get(fieldId))
        if (typeof sourceItem === 'undefined') return <li>Oh no</li>
        return (
          <li key={`listItem-${i}`}>
            <p>
              {Object.entries(sourceItem).map(([key, value]) => `${key}: ${value}`).join(', ')}
            </p>
          </li>
        )})}
    </ul>)
}
