import * as React from 'react'
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd'
import styled from '@emotion/styled'

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
  maxHeight: string;
}

const StyledDroppable = styled.div<StyledDroppableProps>`
  position: relative;
  padding: 1rem;
  background-color: ${({ isDraggingOver }) => isDraggingOver ? 'lightblue' : '#dfdfe3'};
  border-radius: 3px;
  overflow-y: scroll;
  max-height: ${({ maxHeight }) => maxHeight};
  border: 2px solid #dfdfe3;
`

export const ControlList = ({ onDragEnd, children, maxHeight }) => 
  <DragDropContext onDragEnd={(result: DropResult) => onDragEnd(result)}>
    <Droppable droppableId="droppable">
      {(provided, snapshot) => (
        <StyledDroppable
          ref={provided.innerRef}
          maxHeight={maxHeight}
          isDraggingOver={snapshot.isDraggingOver}
          {...provided.droppableProps}
        >
          { children }
          { provided.placeholder }
        </StyledDroppable>
      )}
    </Droppable>
  </DragDropContext>