import React from 'react'

export const Preview = ({ value }) => (
  <ul>
    {value.map(item => (
      <li key={item.get('id')}>
        {item.get('title')}
      </li>
    ))}
  </ul>
)