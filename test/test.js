var describe = require('mocha').describe
var it = require('mocha').it
var assert = require('assert')

describe('Array', () => {
  describe('#indexOf', () => {
    it('should return -1 when the value is not present', () => {
      assert.equal([1, 2, 3].indexOf(4), -1)
    })
  })
})
