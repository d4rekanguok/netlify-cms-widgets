import React, { useState, useEffect, useRef } from 'react'
import { List } from 'immutable'
import { createWidgetId, extract } from './utils'

export const Preview = ({ value, field }) => {
  const [data, setData] = useState<null | Record<any, any>>(null)
  const widgetId = useRef<string>(createWidgetId(field))

  const fieldId: string = field.get('id_field')
  const fieldDisplay: List<string> = field.get('display_fields')

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
        const displayData = extract(sourceItem, ...fieldDisplay)
        if (typeof sourceItem === 'undefined') return <li>Oh no</li>
        return (
          <li key={`listItem-${i}`}>
            <p>
              {Object.values(displayData).join(' ')}
            </p>
          </li>
        )})}
    </ul>)
}
