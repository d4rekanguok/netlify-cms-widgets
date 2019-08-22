import React, { ReactNode } from 'react'
import { List } from 'immutable'

export interface RenderPreviewProps {
  value: List<any>;
  field: Map<any, any>;
}
export type RenderPreview = (props: RenderPreviewProps) => React.ReactNode;

export const createPreview = (ref: React.RefObject<HTMLDivElement>): React.FC => () => <div ref={ref}/>
export const renderDefaultPreview = ({ value }) => <DefaultPreview items={value}/>

const DefaultPreview = ({ items }) => (
  <section>
    <hr />
    <p>Default Widget Preview</p>
    {items.map((item, i) => {
      if (typeof item === 'undefined') return null
      return <p key={i}>{item.title}</p>
    })}
  </section>
)