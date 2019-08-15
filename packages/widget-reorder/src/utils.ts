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

interface CopyArgs<T> {
  from: T[]
  into: T[]
  key: keyof T
}

export const copy = <T>({from, into, key}: CopyArgs<T>): T[] => {
  return into.map(a => ({
    ...a,
    ...from.find(b => b[key] === a[key])
  }))
}

export const diff = <T>({
  currentOrder,
  data,
  key,
}: DiffArgs<T>): DiffResult<T> => {
  const currentOrderMerged = copy({ from: data, into: currentOrder, key })
  const outdatedItem = differenceBy(currentOrderMerged, data, key)
  const newItem = differenceBy(data, currentOrderMerged, key)
  if (outdatedItem.length === 0 && newItem.length === 0) {
    return {
      modified: false,
      newOrder: currentOrderMerged
    }
  }

  const newOrder = removeOutdatedItem(currentOrderMerged, outdatedItem, key).concat(
    newItem
  )
  return {
    modified: true,
    newOrder
  }
}

export const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

export const generateIdentifierFromField = (field) => {
  return `${field.get('collection')}-${field.get('name')}-meta`
}