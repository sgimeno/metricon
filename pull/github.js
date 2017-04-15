const GitHub = require('github-api')

let github = {}

module.exports = (config) => {
  github.config = config
  if (!github.config.GH_TOKEN) {
    throw Error('Missing GH_TOKEN in config')
  }
  github.gh = new GitHub({
    // also acceptable:
    //  username: 'FOO',
    //  password: 'NotFoo'
    token: github.config.GH_TOKEN
  })

  return github
}

github.getMilestone = (organization, repository, milestone) => {
  let remoteIssues = github.gh.getIssues(organization, repository)
  let getMilestoneNumber = (organization, repository, milestone) => {
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

  return getMilestoneNumber(organization, repository, milestone)
    .then(getMilestoneIssues)
}
