const test = require('tape')
const metricon = require('../../lib/metricon')

test('Metricon exports', assert => {
  assert.equal(typeof metricon.report, 'function', 'Should have a report method')
  assert.end()
})
