import * as React from 'react'

const wrapperStyle: React.CSSProperties = {
  position: 'relative',
  width: '100%',
  padding: '1rem 1rem 0 1rem',
  boxSizing: 'border-box',
  backgroundColor: '#dfdfe3',
  borderTopRightRadius: '3px',
  marginBottom: '-5px',
}

const style: React.CSSProperties = {
  position: 'relative',
  width: '100%',
  padding: '0.25rem',
  textAlign: 'center',
  color: '#8C5708',
  borderRadius: '3px',
  lineHeight: '1.5',
  backgroundColor: '#FFC23E',
}


export const NoticeBar = ({ children, displayChange }) => (
  <div style={wrapperStyle}>
    <div style={style}>
      {children}
      {' '}
      <button onClick={() => displayChange()}>Show</button>
    </div>
  </div>
)