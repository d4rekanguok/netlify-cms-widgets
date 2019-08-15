import React, { useState, useEffect } from 'react'
import { generateIdentifierFromField, sortByOrder } from './utils'

export const Preview = (props) => {
  const [data, setData] = useState<Array<object>>([])
  const { value } = props

  // Fetch initial data from localstorage
  useEffect(() => {
    const key = generateIdentifierFromField(props.field)
    const metadata = localStorage.getItem(key)
    if (metadata) setData(JSON.parse(metadata))
  }, [])

  // Reorder data when value changes
  useEffect(() => {
    if (data.length === 0) return
    
    const currentOrder = value.toJS()
    const key: string = props.field.get('id_field')
    const { newOrder, modified } = sortByOrder({
      currentOrder,
      data,
      // @ts-ignore (how can we avoid this?)
      key
    })

    if (modified) setData(newOrder)

  }, [value])

  if (!data) return <div>Loading...</div>
  return(
  <ul>
    {data.map((item, i) => (
      <li key={`listItem-${i}`}>
        <p>
          {Object.entries(item).map(([key, value]) => `${key}: ${value}`).join(', ')}
        </p>
    </li>
    ))}
  </ul>)
}
