const github = require('./github')
const waffler = require('./waffle')({
  WAFFLE_API_URL: process.env.WAFFLE_API_URL,
  WAFFLE_TOKEN: process.env.WAFFLE_TOKEN
})
const metrics = require('./metrics')
const flatten = require('lodash.flatten')

let report = (options) => {
  let buildResults = (issues) => issues
    .map(i => ({ state: i.state, size: i.waffleIssue.size }))

  let getMilestoneData = (organization, repositories, milestone) => {
    const ghClient = github()

    let repos = repositories.map(r => {
      return ghClient.login({ token: process.env.GH_TOKEN })
        .getMilestone(organization, r, milestone)
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
      metrics.completness(buildResults(res))
      metrics.taxonomizer(res)
      // return {
      //   name: `${options.milestone} report`,
      //   source: {
      //     milestone: {
      //       name: options.milestone,
      //       started_on: res[0].milestone.created_at,
      //       due_on: res[0].milestone.due_on
      //       metrics: {
      //         open_issues:
      //       }
      //     }
      //   },
      //   data: {
      //     milestone:
      //   }
      // }
      return res
    })
}

module.exports = { report }
