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

test('metrics.taxonomizer() expected output', assert => {
  let issues = [
    { state: 'closed', labels: [{ name: 'foo' }] },
    { state: 'closed', labels: [{ name: 'foo' }, { name: 'bar' }] },
    { state: 'closed', labels: [] },
    { state: 'open', labels: [{ name: 'foo' }, { name: 'bar' }, { name: 'baz' }] }
  ]
  let actual = metrics.taxonomizer(issues)
  let expected = [
    { name: 'foo', count: 3, percentage: 0.75 },
    { name: 'bar', count: 2, percentage: 0.50 },
    { name: 'baz', count: 1, percentage: 0.25 }
  ]
  assert.deepEqual(actual, expected, 'Should return the same counters')
  assert.end()
})
