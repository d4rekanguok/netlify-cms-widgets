import * as React from 'react'

export const Preview = ({ value }) => {
  const display = value 
    ? value.map(item => 
      (typeof item === 'string') 
        ? item 
        : item.get('label')).join(', ') 
    : ''
  return <p>{display}</p>
}