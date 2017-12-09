'use strict'

const {pairs} = require('chunk-array')
const enforceRange = require('enforce-range')(-1, 1)
const isNumber = x => typeof x === 'number' && !Number.isNaN(x)
const toString = require('2/string')

module.exports = function threeWayCompare (...values) {
  let c = 0
  for (const [a, b] of pairs(values)) {
    c = comparePair(a, b)
    if (c !== 0) break
  }
  return c
}

function comparePair (a, b) {
  if (isNumber(a) && isNumber(b)) {
    // Do comparison instead of subtraction so that ±Infinity is properly handled
    if (a < b) return -1
    if (a > b) return 1
    return 0
  } else {
    // Make sure localeCompare returns -1, 0, or 1
    return enforceRange(toString(a).localeCompare(toString(b)))
  }
}
