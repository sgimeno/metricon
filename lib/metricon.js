const github = require('./github')
const metrics = require('./metrics')
const flatten = require('lodash.flatten')

let report = (options) => {
  let getMilestoneData = (organization, repositories, milestone) => {
    const ghClient = github({
      credentials: {
        token: process.env.GH_TOKEN
      }
    })

    if (milestone) {
      console.log('HAS MILESTONE')
    }

    let repos = repositories.map(repository => {
      return ghClient.getIssues({ organization, repository })
        // .getMilestone(organization, r, milestone)
        .then(res => {
          console.log(`${organization}/${repository}`)
          metrics.completness(res.data).taxonomizer(res.data)
          return res
        })
    })

    return Promise.all(repos)
      .then(repoIsues => flatten(repoIsues))
  }

  return getMilestoneData(options.organization, options.repositories, options.milestone)
    // .then(res => {
    //   console.log('SUMMARY OF %s - %s', options.repositories, options.milestone)
    //   metrics.completness(res)
    //   metrics.taxonomizer(res)
    //   let report {
    //     name: `${options.milestone} report`,
    //     source: {
    //       milestone: {
    //         name: options.milestone,
    //         started_on: res[0].milestone.created_at,
    //         due_on: res[0].milestone.due_on
    //         metrics: {
    //           open_issues:
    //         }
    //       }
    //     },
    //     data: {
    //       milestone:
    //     }
    //   }
    //   return res
    // })
}

module.exports = { report }
