'use strict'

const assert = require('assert')
const compare3 = require('.')

describe('threeWayCompare()', function () {
  it('should return -1 if first number is less than second', function () {
    assert.strictEqual(compare3(1, 2), -1)
  })

  it('should return 1 if first number is greater than second', function () {
    assert.strictEqual(compare3(2, 1), 1)
  })

  it('should return 0 if numbers are equal', function () {
    assert.strictEqual(compare3(-5, -5), 0)
  })

  it('should work with Infinity', function () {
    assert.strictEqual(compare3(1, Infinity), -1)
    assert.strictEqual(compare3(Infinity, 1), 1)
    assert.strictEqual(compare3(-Infinity, -Infinity), 0)
  })

  it('should return -1 if first string is alphabetically prior to second', function () {
    assert.strictEqual(compare3('a', 'b'), -1)
  })

  it('should return 1 if first string is alphabetically subsequent to second', function () {
    assert.strictEqual(compare3('b', 'a'), 1)
  })

  it('should return 0 if strings are equal', function () {
    assert.strictEqual(compare3('test', 'test'), 0)
  })

  it('should work with sort() to sort numbers', function () {
    const arr = [2, 3, 1].sort(compare3)
    assert.strictEqual(arr[0], 1)
    assert.strictEqual(arr[1], 2)
    assert.strictEqual(arr[2], 3)
  })

  it('should work with sort() to sort strings', function () {
    const arr = ['z', 'y', 'x'].sort(compare3)
    assert.strictEqual(arr[0], 'x')
    assert.strictEqual(arr[1], 'y')
    assert.strictEqual(arr[2], 'z')

    const person1 = {name: 'John'}
    const person2 = {name: 'Stephen'}
    const person3 = {name: 'Mark'}
    const people = [person1, person2, person3]
    people.sort((a, b) => compare3(a.name, b.name))
    assert.strictEqual(people[0], person1)
    assert.strictEqual(people[1], person3)
    assert.strictEqual(people[2], person2)
  })

  it('should support multi-level comparisions', function () {
    const person1 = {name: 'John', age: 27}
    const person2 = {name: 'Stephen', age: 26}
    const person3 = {name: 'John', age: 25}
    const people = [person1, person2, person3]
    people.sort((a, b) => compare3(a.name, b.name, a.age, b.age))
    assert.strictEqual(people[0], person3)
    assert.strictEqual(people[1], person1)
    assert.strictEqual(people[2], person2)
  })
})
