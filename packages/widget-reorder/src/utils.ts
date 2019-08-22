import difference = require('lodash/difference')
import get = require('lodash/get')

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
    modified: true,
    newOrder,
  }
}

export const reorder = ({ data, startIndex, endIndex }) => {
  const result = Array.from(data)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

export const normalize = <T, K extends keyof T>(data: T[], key: K): Record<string, T> => 
  data.reduce((result, item) => {
    const id = String(item[key])
    result[id] = item
    return result
  }, ({} as Record<string, T>))


interface TemplateParserArgs {
  template: string;
  data: any;
}

export const parseTemplate = ({ template, data }: TemplateParserArgs): string => {
  const indicators = ['{{', '}}']
  const parsed: string[] = []
  let _template = template
  let count = 0
  const parse = () => {
    const indicator = indicators[count % 2]
    const openIndex = _template.indexOf(indicator)
    if (openIndex === -1) {
      parsed.push(_template)
      return
    }

    const first = _template.substring(0, openIndex)
    const value = (count % 2 === 1)
      ? get(data, first, 'not found')
      : first
    parsed.push(value)

    count++
    const nextIndex = openIndex + indicator.length
    _template = _template.substring(nextIndex)
    parse()
  }

  parse()
  return parsed.join('')
}