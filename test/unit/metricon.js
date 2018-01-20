const test = require('tape')
const metricon = require('../../lib/metricon')
// const reportSpec = require('../support/report-spec.json')

test('Metricon exports report, auth function', assert => {
  assert.equal(typeof metricon.report, 'function', 'Should have a report method')
  assert.equal(typeof metricon.auth, 'function', 'Should have a auth method')
  assert.end()
})

test('Metricon exports auth creates a connector', assert => {
  metricon.auth({ token: process.env.GH_TOKEN_TEST })
  assert.ok(metricon.connectors.github, 'Should have a github connector')
  assert.end()
})

test('Metricon report expected output', assert => {
  const options = {
    organization: 'sgimeno',
    repositories: ['metricon'],
    milestone: 'Test milestone'
  }
  metricon.auth({ token: process.env.GH_TOKEN_TEST })
  assert.ok(metricon.report(options) instanceof Promise, 'Should return a Promise')
  assert.end()
})

test('Metricon report expected output', assert => {
  const options = {
    organization: 'sgimeno',
    repositories: ['metricon'],
    milestone: 'Test milestone'
  }

  metricon.auth({ token: process.env.GH_TOKEN_TEST })
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
