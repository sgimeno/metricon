const GitHub = require('github-api')

let github = {}

module.exports = (options) => {
  github.config = Object.assign({ credentials: {} }, options)

  if (!github.config.credentials.token &&
    !(github.config.credentials.username && github.config.credentials.password)) {
    throw Error(
      'Missing credentials in options, provide token or username + password'
    )
  }

  github.api = new GitHub(github.config.credentials)
  return github
}

github.getIssues = ({ organization, repository, filter = { state: 'all' } }) => {
  return github.api.getIssues(organization, repository)
    .listIssues(filter)
}

github.getMilestone = (organization, repository, milestone) => {
  let remoteIssues = github.api.getIssues(organization, repository)
  let getMilestoneNumber = (milestone) => {
    return remoteIssues.listMilestones()
      .then((resp) => {
        let current = resp.data.find(m => m.title === milestone)
        return current.number
      })
  }

  let getMilestoneIssues = (milestoneNumber) => {
    return remoteIssues.listIssues({ state: 'all', milestone: milestoneNumber })
      .then((resp) => {
        return resp.data
      })
  }

  return getMilestoneNumber(milestone).then(getMilestoneIssues)
}
