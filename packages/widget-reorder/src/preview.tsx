import React, { ReactNode } from 'react'
import ReactDOM from 'react-dom'

type Ref = React.RefObject<HTMLDivElement>

interface PreviewPortalProps {
  portalRef: Ref;
  children: ReactNode;
}

export const getPreview = (ref: Ref): React.FC => () => <div ref={ref}/>

export const renderDefaultPreview = (items) => <DefaultPreview items={items}/>

export const DefaultPreview = ({ items }) => (
  <section>
    <hr />
    <p>Default Widget Preview</p>
    {items.map((item, i) => {
      if (typeof item === 'undefined') return null
      return <p key={i}>{item.title}</p>
    })}
  </section>
)

export const PreviewPortal = ({portalRef, children}: PreviewPortalProps) => 
  portalRef && portalRef.current && ReactDOM.createPortal(children, portalRef.current)
