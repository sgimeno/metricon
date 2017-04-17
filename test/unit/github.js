const test = require('tape')
const GitHub = require('github-api')
const pull = require('../../lib/github')

test('github pull fails to export', assert => {
  try {
    const github = pull({})
    assert.fail(github, 'Should not create a pull')
  } catch (e) {
    assert.equal(e.message, 'Missing GH_TOKEN in config', 'Should throw an exception')
  } finally {
    assert.end()
  }
})

test('github pull exports', assert => {
  const github = pull({ GH_TOKEN: '123' })
  assert.ok(github.config, 'Should have a config')
  assert.ok(github.gh instanceof GitHub, 'Should have a GitHub client')
  assert.equal(typeof github.getMilestone, 'function', 'Should have a getMilestone method')
  assert.end()
})

test('github.getMilestone expected output', assert => {
  const github = pull({ GH_TOKEN: process.env.GH_TOKEN })
  assert.ok(github.getMilestone() instanceof Promise, 'Should return a Promise')
  assert.end()
})
