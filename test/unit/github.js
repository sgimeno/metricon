const test = require('tape')
const GitHub = require('github-api')
const github = require('../../lib/github')

test('github should create a github-api client', assert => {
  const client = github({ credentials: { token: '123' } })
  assert.ok(client.api instanceof GitHub, 'Should have a GitHub client')
  assert.end()
})

test('github login without credentials fails', assert => {
  let client
  try {
    client = github({ credentials: { username: '123' } })
  } catch (e) {
    assert.equal(client, undefined)
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
  const client = github({ credentials: { token: '123' } })
  assert.ok(client.getMilestoneIssues({}) instanceof Promise, 'Should return a Promise')
  assert.end()
})
