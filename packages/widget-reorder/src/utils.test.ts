import { removeOutdatedItem, diff, extract } from './utils'

describe('removeOutdatedItem', () => {
  it('should remove outdated items', () => {
    const data = Array.from({ length: 10 }, (v, i) => ({ id: i }))
    const expected = [...data]
    const outdated = expected.splice(8, 2)

    const newData = removeOutdatedItem(data, outdated, 'id')
    expect(newData).toEqual(expected)
    expect(newData).not.toEqual(data)
  })
})

describe('diff', () => {
  it('should remove outdated and add new items', () => {
    const currentOrder = [{ id: 1 }, { id: 2 }, { id: 3 }]
    const data = [{ id: 2 }, { id: 3 }, { id: 4 }]
    const expected = [{ id: 2 }, { id: 3 }, { id: 4 }]

    const result = diff({
      currentOrder,
      data,
      key: 'id',
    })

    expect(result.modified).toBe(true)
    expect(result.newOrder).toEqual(expected)
  })

  it('should return the same array if nothing changed', () => {
    const currentOrder = [{ id: 1 }, { id: 2 }, { id: 3 }]
    const data = [...currentOrder]

    const result = diff({
      currentOrder,
      data,
      key: 'id',
    })

    expect(result.modified).toBe(false)
    expect(result.newOrder).toEqual(currentOrder)
  })

  it('should move new data to the very last', () => {
    const currentOrder = [{ id: 1 }, { id: 2 }, { id: 3 }]
    const data = [{ id: 4 }, ...currentOrder]
    const { newOrder } = diff({
      currentOrder,
      data,
      key: 'id',
    })
    const lastItem = newOrder[newOrder.length - 1]
    expect(lastItem.id).toBe(4)
  })
})

describe('extract', () => {
  it('should create a new shallow object with specified keys', () => {
    const data = {
      a: 100,
      b: 200,
      c: 300,
    }
    const expected = {
      a: data.a,
      b: data.b,
    }
    const result = extract(data, 'a', 'b')

    expect(result).toEqual(expected)
  })
})