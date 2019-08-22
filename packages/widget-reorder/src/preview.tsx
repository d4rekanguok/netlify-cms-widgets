import React, { ReactNode } from 'react'
import ReactDOM from 'react-dom'

type Ref = React.RefObject<HTMLDivElement>

interface PreviewContainerProps {
  myRef: Ref;
  children: ReactNode;
}

export const getPreview = (ref: Ref) => () => <div ref={ref}/>

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

export const PreviewContainer = ({myRef, children}: PreviewContainerProps) => 
  myRef && myRef.current && ReactDOM.createPortal(children, myRef.current)
