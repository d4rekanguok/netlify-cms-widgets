import { expect } from 'chai'
import 'mocha'

import { hasItem, removeOutdatedItem, diff } from './utils'

describe('hasItem', () => {
  it('should return true if data contains item of the same key', () => {
    const data = [{ id: 2 }, { id: 3 }]
    const item = { id: 2 }

    const result = hasItem(data, item, 'id')
    expect(result).to.equal(true)
  })

  it('should return false if data does not contains item of the same key', () => {
    const data = [{ id: 2 }, { id: 3 }]
    const item = { id: 5 }

    const result = hasItem(data, item, 'id')
    expect(result).to.equal(false)
  })

  it('should return false if data is empty', () => {
    const data = []
    const item = { id: 5 }

    const result = hasItem(data, item, 'id')
    expect(result).to.equal(false)
  })
})

describe('removeOutdatedItem', () => {
  it('should remove outdated items', () => {
    const data = Array.from({ length: 10 }, (v, i) => ({ id: i }))
    const expected = [...data]
    const outdated = expected.splice(8, 2)

    const newData = removeOutdatedItem(data, outdated, 'id')
    expect(newData).to.equal(expected)
    expect(newData).not.to.equal(data)
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

    expect(result.modified).to.equal(true)
    expect(result.newOrder).to.equal(expected)
  })

  it('should return the same array if nothing changed', () => {
    const currentOrder = [{ id: 1 }, { id: 2 }, { id: 3 }]
    const data = [...currentOrder]

    const result = diff({
      currentOrder,
      data,
      key: 'id',
    })

    expect(result.modified).to.equal(false)
    expect(result.newOrder).to.equal(currentOrder)
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
    expect(lastItem.id).to.equal(4)
  })
})
