import React from 'react'
import styled from '@emotion/styled'
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd'

export const renderDefaultControl = (item): React.ReactElement => {
  if (typeof item === 'undefined') return <p>Entry removed</p>
  return <p>{Object.values(item).join(' ')}</p>
}

interface StyledDraggableProps {
  isDragging: boolean;
}

const StyledDraggable = styled.div<StyledDraggableProps>`
  padding: 1rem;
  opacity: ${({ isDragging }) => isDragging ? 0.6 : 1};
  box-shadow: ${({ isDragging }) => isDragging ? '0 4px 16px 0 rgba(0,0,0,0.2)' : '0 2px 6px 0 rgba(0,0,0,0.2)'};
  background: #fff;
  border-radius: 3px;
  margin-bottom: 0.5rem;
`

export const ControlDraggableItem = ({ identifier, index, children }) =>
  <Draggable
    key={identifier}
    draggableId={identifier}
    index={index}>
    {(provided, snapshot) => (
      <StyledDraggable
        isDragging={snapshot.isDragging}
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        style={provided.draggableProps.style}
      >
        {children}
      </StyledDraggable>
    )}
  </Draggable>


interface StyledDroppableProps {
  isDraggingOver: boolean;
}

const StyledDroppable = styled.div<StyledDroppableProps>`
  padding: 1rem;
  background-color: ${({ isDraggingOver }) => isDraggingOver ? 'lightblue' : '#dfdfe3'};
  border-radius: 3px;
`

export const ControlList = ({ onDragEnd, children }) => 
  <DragDropContext onDragEnd={(result: DropResult) => onDragEnd(result)}>
    <Droppable droppableId="droppable">
      {(provided, snapshot) => (
        <StyledDroppable
          ref={provided.innerRef}
          isDraggingOver={snapshot.isDraggingOver}
          {...provided.droppableProps}
        >
          { children }
          { provided.placeholder }
        </StyledDroppable>
      )}
    </Droppable>
  </DragDropContext>


const StyledModal = styled.div`
  position: absolute;
  width: 50%;
  padding: 1rem 1rem 1.25rem;
  text-align: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  background-color: #fff;
  border-radius: 0.25rem;
  box-shadow: 0 6px 12px 0 rgba(0,0,0,0.2);

  h1 {
    font-size: 1.25rem;
    line-height: 1.3;
    margin-bottom: 1rem;
  }

  button {
    border: 1px solid #dfdfe3;
    color: rgb(23, 162, 184);
    padding: 0.75em 1.25em;
    background: #fff;
    border-radius: 6px;
  }
`

const StyledOverlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(223, 223, 227, 0.8);
`

export type Modified = 'none' | 'unset' | 'modified'

const modalContent: Record<Modified, Record<'title' | 'action', string>> = {
  none: {
    title: '',
    action: '',
  },
  unset: {
    title: 'Order hasn\'t been set yet',
    action: 'Start Ordering'
  },
  modified: {
    title: 'Source collection has been changed',
    action: 'Apply changes'
  }
}

interface ModalProps {
  modified: Modified;
  handleDisplayChange: () => void;
}

export const Modal: React.FC<ModalProps> = ({ modified, handleDisplayChange }) => {
  const { title, action } = modalContent[modified]
  return (
    <StyledOverlay>
      <StyledModal>
        <h1>{title}</h1>
        <button onClick={() => handleDisplayChange()}>{action}</button>
      </StyledModal>
    </StyledOverlay>
  )
}
