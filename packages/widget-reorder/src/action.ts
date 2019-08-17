import { List } from 'immutable'
import { extract, diff, reorder } from './utils'
import { ReorderAction as _ } from './action.types'
import { DropResult } from 'react-beautiful-dnd'

export const handleDragEnd = (result: DropResult, prevOrder: String[], dispatch) => {
    if (!result.destination || result.destination.index === result.source.index) return

    const newOrder = reorder(
      prevOrder,
      result.source.index,
      result.destination.index
    )
    dispatch({ type: _.ORDER_DATA, payload: { order: newOrder, orderModified: true }})
}

export const setOrder = (data, value, dispatch) => {
  if (data) {
    const keys = Object.keys(data)
    if (!value || !value.toJS) {
      dispatch({
        type: _.ORDER_DATA, 
        payload: { order: keys, orderModified: false } 
      })

    } else {
      if (keys.length === 0) return
      const currentOrder = value.toJS()
      const { newOrder, modified } = diff({
        currentOrder,
        data: keys
      })

      dispatch({
        type: _.ORDER_DATA,
        payload: { order: newOrder, orderModified: modified }
      })
    }
  }
}

export const queryData = (props, dispatch) => {
  const { query, forID, field } = props
    
  const collection: string = field.get('collection')
  const fieldId: string = field.get('id_field')
  const fieldDisplay: List<string> = field.get('display_fields')
  const fieldsToBeExtracted = Array.from(new Set([...fieldDisplay.toJS()]))

  query(forID, collection, [fieldId], '')
    .then(result => {
      const fetchedData = result.payload.response.hits.reduce((obj, payload) => {
        const key = payload.data[fieldId]
        obj[key] = { ...extract(payload.data, ...fieldsToBeExtracted) }
        return obj
      }, {})
      
      dispatch({ 
        type: _.QUERY_DATA, 
        payload: { data: fetchedData } 
      })
  })
}

