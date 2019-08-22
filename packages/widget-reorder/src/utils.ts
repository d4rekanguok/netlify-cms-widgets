import difference = require('lodash/difference')

export const extract = <T, K extends keyof T>(object: T, ...keys: K[]): Pick<T, K> =>
  keys.reduce((result, key) => {
    result[key] = object[key]
    return result
  }, {} as Pick<T, K>)

export const removeOutdatedItem = <T>(
  data: T[],
  outdated: T[],
): T[] =>
  data.filter(item => {
    return !outdated.includes(item)
  })

interface DiffArgs<T> {
  currentOrder: T[];
  data: T[];
}

interface DiffResult<T> {
  modified: boolean;
  newOrder: T[];
}

export const diff = <T>({
  currentOrder,
  data,
}: DiffArgs<T>): DiffResult<T> => {
  const outdatedItem = difference(currentOrder, data)
  const newItem = difference(data, currentOrder)

  if (outdatedItem.length === 0 && newItem.length === 0) {
    return {
      modified: false,
      newOrder: currentOrder,
    }
  }

  const newOrder = removeOutdatedItem(currentOrder, outdatedItem).concat(
    newItem
  )
  return {
    modified: false,
    newOrder,
  }
}

export const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}
