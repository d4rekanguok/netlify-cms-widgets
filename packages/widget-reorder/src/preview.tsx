import React, { ReactNode } from 'react'
import ReactDOM from 'react-dom'

type Ref = React.RefObject<HTMLDivElement>
export const getPreview = (ref: Ref) => () => <div ref={ref}/>

export const CustomReorderPreview = ({ items }) => (
  <section>
    <hr />
    <p>Default Widget Preview</p>
    {items.map((item, i) => <p key={i}>{item.title}</p>)}
  </section>
)

interface PreviewContainerProps {
  myRef: Ref
  children: ReactNode
}

export const PreviewContainer = ({myRef, children}: PreviewContainerProps) => 
  myRef && myRef.current 
    ? ReactDOM.createPortal(children, myRef.current)
    : <></>
