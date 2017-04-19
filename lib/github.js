const GitHub = require('github-api')

let github = {}

module.exports = (config) => {
  github.config = config || {}
  return github
}

github.login = (credentials) => {
  if (!credentials.token && !(credentials.username && credentials.password)) {
    throw Error(
      'Missing credentials in options, provide token or username + password'
    )
  }
  github.api = new GitHub(credentials)
  return github
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
