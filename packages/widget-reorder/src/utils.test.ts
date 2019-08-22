import { removeOutdatedItem, diff, extract, normalize, parseTemplate } from './utils'

describe('removeOutdatedItem', () => {
  it('should remove outdated items', () => {
    const data = Array.from({ length: 10 }, (v, i) => ({ id: i }))
    const expected = [...data]
    const outdated = expected.splice(8, 2)

    const newData = removeOutdatedItem(data, outdated)
    expect(newData).toEqual(expected)
    expect(newData).not.toEqual(data)
  })
})

describe('diff', () => {
  it('should remove outdated and add new items', () => {
    const currentOrder = [1, 3, 2, 5, 4]
    const data = [1, 2, 3, 4]
    const expected = [1, 3, 2, 4]

    const result = diff({
      currentOrder,
      data,
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

describe('normalize', () => {
  it('should turn an array of T to an object of a key of T', () => {
    const data = [ {id: 'a', content: 100}, {id: 'b', content: 200}, {id: 'c', content: 300} ]
    const expected = {
      a: data[0],
      b: data[1],
      c: data[2],
    }
    const result = normalize(data, 'id')

    expect(result).toEqual(expected)
    expect(result.a).toBe(data[0])
  })
})

describe('parseTemplate', () => {
  it('should turn template into an array of string without indicators', () => {
    const template = 'hello {{friend}}, my name is {{cat[0]}}'
    const data = {
      friend: 'D',
      cat: ['Jan', 'Eri']
    }
    const expected = 'hello D, my name is Jan'
    const result = parseTemplate({ template, data })

    expect(result).toEqual(expected)
  })

  it('should leave string after closed bracket', () => {
    const template = 'hello {{friend}} | hi'
    const data = {
      friend: 'D',
    }
    const expected = 'hello D | hi'
    const result = parseTemplate({ template, data })

    expect(result).toEqual(expected)
  })
})