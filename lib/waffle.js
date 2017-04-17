const rp = require('request-promise-native')

let waffle = {}
let api = {}

module.exports = (config) => {
  api.config = config

  if (!api.config.WAFFLE_API_URL) {
    throw Error('Missing WAFFLE_API_URL in config')
  }

  if (!api.config.WAFFLE_TOKEN) {
    throw Error('Missing WAFFLE_TOKEN in config')
  }

  api.get = (path) => {
    let options = {
      uri: api.config.WAFFLE_API_URL + path,
      headers: { 'Authorization': 'Bearer ' + api.config.WAFFLE_TOKEN },
      json: true
    }

    return rp(options)
    .catch((err) => console.error(err))
  }

  return waffle
}

waffle.getCards = (projectId) => {
  return api.get(`/projects/${projectId}/cards`)
}

waffle.listProjects = () => {
  return api.get(`/user/projects`)
    .then(ps => {
      let projects = ps.map(p => `${p.name} (${p._id})`)
      console.log('PROJECTS:\n', projects.join('\n'))
      return ps
    })
}

waffle.addMetaData = (projectName, milestone, issues) => {
  return waffle.getProjectId(projectName)
    .then(waffle.getCards)
    .then(cards => {
      let milestoneIssues = cards.filter(c =>
        c.githubMetadata.milestone && c.githubMetadata.milestone.title === milestone
      )

      return issues.map(iss => {
        let waffleIssue = milestoneIssues.find(i => i.githubMetadata.url === iss.url)

        return Object.assign({}, iss, { waffleIssue })
      })
    })
}

waffle.getProjectId = (projectName) => {
  let findProject = (projectName) => {
    return api.get('/user/projects')
      .then(ps => ps.find(p => p.name === projectName))
  }
  return findProject(projectName).then(pr => pr._id)
}
