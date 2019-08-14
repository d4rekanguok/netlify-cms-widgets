import * as React from 'react'

export const Preview = ({ value }) => {
  return <p>{JSON.stringify(value)}</p>
}