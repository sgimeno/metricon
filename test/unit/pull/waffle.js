const test = require('tape')
const pull = require('../../../pull/waffle')

test('waffle pull fails to export without waffle API url', assert => {
  try {
    const waffle = pull({ WAFFLE_TOKEN: '123' })
    assert.fail(waffle, 'Should not create a pull')
  } catch (e) {
    assert.equal(e.message, 'Missing WAFFLE_API_URL in config', 'Should throw an exception')
  } finally {
    assert.end()
  }
})

test('waffle pull fails to export without waffle API token', assert => {
  try {
    const waffle = pull({ WAFFLE_API_URL: 'http://fake.com' })
    assert.fail(waffle, 'Should not create a pull')
  } catch (e) {
    assert.equal(e.message, 'Missing WAFFLE_TOKEN in config', 'Should throw an exception')
  } finally {
    assert.end()
  }
})

test('waffle pull exports', assert => {
  const waffle = pull({ WAFFLE_API_URL: 'http://fake.com', WAFFLE_TOKEN: '123' })
  assert.equal(typeof waffle.listProjects, 'function', 'Should have a listProjects method')
  assert.equal(typeof waffle.addMetaData, 'function', 'Should have a addMetaData method')
  assert.equal(typeof waffle.getCards, 'function', 'Should have a getCards method')
  assert.equal(typeof waffle.getProjectId, 'function', 'Should have a getProjectId method')
  assert.end()
})

test('waffle.listProjects expected output', assert => {
  const waffle = pull({
    WAFFLE_API_URL: process.env.WAFFLE_API_URL,
    WAFFLE_TOKEN: process.env.WAFFLE_TOKEN
  })

  waffle.listProjects()
    .then(projects => {
      assert.ok(projects.length > 0, 'Should return at least 1 project')
      assert.end()
    })
    .catch(err => {
      console.error(err)
      assert.fail('Should not get here')
      assert.end()
    })
})

test('waffle.getProjectId expected output', assert => {
  const waffle = pull({
    WAFFLE_API_URL: process.env.WAFFLE_API_URL,
    WAFFLE_TOKEN: process.env.WAFFLE_TOKEN
  })

  waffle.getProjectId('sgimeno/metricon')
    .then(pid => {
      assert.equal(typeof pid, 'string', 'Should return a string project Id')
      assert.end()
    })
    .catch(err => {
      console.error(err)
      assert.fail('Should not get here')
      assert.end()
    })
})

test('waffle.listProjects expected output', assert => {
  const waffle = pull({
    WAFFLE_API_URL: process.env.WAFFLE_API_URL,
    WAFFLE_TOKEN: process.env.WAFFLE_TOKEN
  })
  // Metricon project ID
  const pid = '58f24513eeb57e0026ac651e'

  waffle.getCards(pid)
    .then(cards => {
      assert.ok(cards.length > 0, 'Should return at least 1 card')
      assert.end()
    })
    .catch(err => {
      console.error(err)
      assert.fail('Should not get here')
      assert.end()
    })
})

test('waffle.addMetaData expected output', assert => {
  const waffle = pull({
    WAFFLE_API_URL: process.env.WAFFLE_API_URL,
    WAFFLE_TOKEN: process.env.WAFFLE_TOKEN
  })
  const ghIssues = [
    {
      url: 'https://api.github.com/repos/sgimeno/metricon/issues/1'
    }
  ]

  waffle.addMetaData('sgimeno/metricon', 'Test milestone', ghIssues)
    .then(results => {
      assert.equal(results.length, ghIssues.length, 'Should return same issues length')
      assert.ok(results[0].waffleIssue, 'Should aggregate waffle data')
      assert.end()
    })
    .catch(err => {
      console.error(err)
      assert.fail('Should not get here')
      assert.end()
    })
})
