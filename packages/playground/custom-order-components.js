import React from 'react'
import { createWidget } from '@ncwidgets/reorder'

const ListComponent = ({ item }) => (
  <>
    <strong>{item.title}</strong>
    <p style={{ margin: 0, color: '#798291', fontSize: '0.8rem' }}>{item.id}</p>
  </>
)

const CustomReorderPreview = ({ items }) => (
  <section>
    <hr />
    <p>Custom Widget Preview</p>
    {items.map((item, i) => <p key={i}>{item.title}</p>)}
  </section>
)

export const customReorderWidget = createWidget({
  renderControl: ({ value }) => <ListComponent item={value} />,
  renderPreview: ({ value }) => <CustomReorderPreview items={value}/>,
})