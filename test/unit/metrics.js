const test = require('tape')
const metrics = require('../../lib/metrics')

test('Metrics exports completness, taxonomizer function', assert => {
  assert.equal(typeof metrics.completness, 'function', 'Should have a completness method')
  assert.equal(typeof metrics.taxonomizer, 'function', 'Should have a taxonomizer method')
  assert.end()
})

test('metrics.completness() expected output', assert => {
  let issues = [
    { state: 'closed' },
    { state: 'closed' },
    { state: 'closed' },
    { state: 'open' }
  ]
  let actual = metrics.completness(issues)
  let expected = {
    count: issues.length,
    open: 1,
    closed: 3,
    percentage: 0.75
  }
  assert.deepEqual(actual, expected, 'Should return the same counters')
  assert.end()
})
