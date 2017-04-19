const test = require('tape')
const GitHub = require('github-api')
const github = require('../../lib/github')

test('github pull exports', assert => {
  const client = github()
  assert.ok(client.config, 'Should have a config')
  assert.equal(typeof client.getMilestone, 'function', 'Should have a getMilestone method')
  assert.equal(typeof client.login, 'function', 'Should have a login method')
  assert.end()
})

test('github login should create a github-api client', assert => {
  const client = github().login({ token: '123' })
  assert.ok(client.api instanceof GitHub, 'Should have a GitHub client')
  assert.end()
})

test('github login without credentials fails', assert => {
  try {
    const client = github()
    client.login({ username: 'foo' })
  } catch (e) {
    assert.equal(
      e.message,
      'Missing credentials in options, provide token or username + password',
      'Should throw an exception'
    )
  } finally {
    assert.end()
  }
})

test('github.getMilestone expected output', assert => {
  const client = github().login({ token: '123' })
  assert.ok(client.getMilestone() instanceof Promise, 'Should return a Promise')
  assert.end()
})
