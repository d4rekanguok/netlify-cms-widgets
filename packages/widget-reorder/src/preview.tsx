import React, { useState, useEffect, useRef } from 'react'
import { createWidgetId } from './utils'

export const Preview = ({ value, field }) => {
  const [data, setData] = useState<object[]>([])
  const widgetId = useRef<string>(createWidgetId(field))

  const fieldId: string = field.get('id_field')

  // Fetch initial data from sessionStorage
  useEffect(() => {
    const normalizedData = sessionStorage.getItem(widgetId.current)
    if (normalizedData) setData(JSON.parse(normalizedData))
  }, [])

  if (!data) return <div>Loading...</div>
  return(
    <ul>
      {value.map((item, i) => {
        const sourceItem = data[item.get(fieldId)]
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
