const GitHub = require('github-api')

let github = {}

module.exports = (config) => {
  github.config = config
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
        // const taxonomy = {}
        // resp.data.forEach((iss) => {
        //   if (iss.labels.map(l => l.name).includes('feature')) {
        //     // console.log(iss.labels)
        //     taxonomy[iss.labels[0].name] = taxonomy[iss.labels[0].name] || []
        //     taxonomy[iss.labels[0].name].push(iss)
        //   }
        // })
        return resp.data
      })
  }

  return getMilestoneNumber(organization, repository, milestone)
    .then(getMilestoneIssues)
}
