const test = require('tape')
const metricon = require('../metricon')

test('Metricon exports', assert => {
  assert.ok(metricon.report, 'Should have a report method')
  assert.end()
})
