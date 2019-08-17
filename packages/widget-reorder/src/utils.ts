import { Map } from 'immutable'
import differenceBy = require('lodash/differenceBy')

export const extract = <T, K extends keyof T>(object: T, ...keys: K[]): Pick<T, K> =>
  keys.reduce((result, key) => {
    result[key] = object[key]
    return result
  }, {} as Pick<T, K>)

export const removeOutdatedItem = <T>(
  data: T[],
  outdated: T[],
  key: keyof T
): T[] =>
  data.filter(item => {
    return !outdated.some(outdatedItem => outdatedItem[key] === item[key])
  })

interface DiffArgs<T> {
  currentOrder: T[];
  data: T[];
  key: keyof T;
}

interface DiffResult<T> {
  modified: boolean;
  newOrder: T[];
}

export const diff = <T>({
  currentOrder,
  data,
  key,
}: DiffArgs<T>): DiffResult<T> => {
  const outdatedItem = differenceBy(currentOrder, data, key)
  const newItem = differenceBy(data, currentOrder, key)
  if (outdatedItem.length === 0 && newItem.length === 0) {
    return {
      modified: false,
      newOrder: currentOrder,
    }
  }

  const newOrder = removeOutdatedItem(currentOrder, outdatedItem, key).concat(
    newItem
  )
  return {
    modified: true,
    newOrder,
  }
}


export const normalize = <T, K extends keyof T>(data: T[], key: K): Record<string, T> => 
  data.reduce((result, item) => {
    const id = String(item[key])
    result[id] = item
    return result
  }, ({} as Record<string, T>))

export const reorder = ({ data, startIndex, endIndex }) => {
  const result = Array.from(data)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

export const createWidgetId = (field: Map<unknown, unknown>) => {
  return `${field.get('collection')}-${field.get('name')}-meta`
}