const test = require('tape')
const metricon = require('../../lib/metricon')
// const reportSpec = require('../support/report-spec.json')

test('Metricon exports a report function', assert => {
  assert.equal(typeof metricon.report, 'function', 'Should have a report method')
  assert.end()
})

test('Metricon report expected output', assert => {
  const options = {
    organization: 'sgimeno',
    repositories: ['metricon'],
    milestone: 'Test milestone'
  }
  assert.ok(metricon.report(options) instanceof Promise, 'Should return a Promise')
  assert.end()
})

test('Metricon report expected output', assert => {
  const options = {
    organization: 'sgimeno',
    repositories: ['metricon'],
    milestone: 'Test milestone',
    waffleBoard: 'sgimeno/metricon'
  }

  metricon.report(options)
    .then(report => {
      // console.log('REPORT', report)
      assert.ok(report, 'Should return a data')
      // assert.deepEqual(report, reportSpec, 'Should match the spec')
      assert.end()
    })
    .catch(error => {
      console.log('ERR', error)
      assert.fail(error, 'Should not get here')
      assert.end()
    })
})

test('Metricon report without options fails', assert => {
  try {
    metricon.report()
  } catch (e) {
    assert.ok(e, 'Should throw an exception')
  } finally {
    assert.end()
  }
})
