import React from 'react'
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd'

export const renderDefaultControl= (item): React.ReactElement => <p>{Object.values(item).join(' ')}</p>

export const ControlDraggableItem = ({ identifier, index, children }) =>
  <Draggable
  key={identifier}
  draggableId={identifier}
  index={index}>
  {(provided, snapshot) => (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      style={{
        padding: '1rem',
        opacity: snapshot.isDragging ? 0.6 : 1,
        boxShadow: snapshot.isDragging ?  '0 4px 16px 0 rgba(0,0,0,0.2)' : '0 2px 6px 0 rgba(0,0,0,0.2)',
        background: '#fff',
        borderRadius: '3px',
        marginBottom: '0.5rem',
        ...provided.draggableProps.style,
      }}
    >
      {children}
    </div>
  )}
</Draggable>

export const ControlList = ({ onDragEnd, children }) => 
  <DragDropContext onDragEnd={(result: DropResult) => onDragEnd(result)}>
    <Droppable droppableId="droppable">
      {(provided, snapshot) => (
        <div
          style={{
            padding: '1rem',
            background: snapshot.isDraggingOver ? 'lightblue' : '#dfdfe3',
            borderRadius: '3px',
          }}
          {...provided.droppableProps}
          ref={provided.innerRef}>
          { children }
          { provided.placeholder }
        </div>
      )}
    </Droppable>
  </DragDropContext>
