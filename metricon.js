const config = require('./config')
const github = require('./pull/github')(config)
const waffler = require('./pull/waffle')(config)
const metrics = require('./metrics')
const flatten = require('lodash.flatten')

let report = (options) => {
  let buildResults = (issues) => issues
    .map(i => ({ state: i.state, size: i.waffleIssue.size }))

  let getMilestoneData = (organization, repositories, milestone) => {
    let repos = repositories.map(r => {
      return github.getMilestone(organization, r, milestone)
        .then(res => waffler.addMetaData(options.waffleBoard, milestone, res))
        .then(res => {
          console.log(`${organization}/${r} - ${milestone}`)
          metrics.completness(buildResults(res)).taxonomizer(res)
          return res
        })
    })

    return Promise.all(repos).then(repoIsues => flatten(repoIsues))
  }

  return getMilestoneData(options.organization, options.repositories, options.milestone)
    .then(res => {
      console.log('SUMMARY OF %s - %s', options.waffleBoard, options.milestone)
      metrics.completness(buildResults(res)).taxonomizer(res)
      return res
    })
}

module.exports = { report }
