import { ReorderAction as _ } from './action.types'

type Action =
  | { type: _.QUERY_DATA; payload: { data: Record<string, any> }  }
  | { type: _.ORDER_DATA; payload: { order: string[]; orderModified: boolean} }

interface State {
  data: Record<string, any>;
  order: string[];
  orderModified: boolean;
}

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case _.QUERY_DATA:
      return { ...state, data: action.payload.data }
    case _.ORDER_DATA:
      return { ...state, order: action.payload.order, orderModified: action.payload.orderModified }
    default:
      return state
  }
}
