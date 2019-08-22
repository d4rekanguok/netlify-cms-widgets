import React, { ReactNode } from 'react'
import { List } from 'immutable'

export interface RenderPreviewProps {
  value: List<any>;
  field: Map<any, any>;
}
export type RenderPreview = (props: RenderPreviewProps) => React.ReactNode;

type Ref = React.RefObject<HTMLDivElement>

interface PreviewPortalProps {
  portalRef: Ref;
  children: ReactNode;
}

export const createPreview = (ref: Ref): React.FC => () => <div ref={ref}/>
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