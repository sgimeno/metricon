const github = require('./github')
const metrics = require('./metrics')
const flatten = require('lodash.flatten')

module.exports = {
  connectors: {
    github: null
  },
  auth ({ connector, username, password, token }) {
    let credentials = { username, password, token }
    this.connectors.github = github({ credentials })
  },
  report (options) {
    let buildReport = (organization, repositories, milestone) => {
      let repos = repositories.map(repository => {
        let req = this.connectors.github.getIssues({ organization, repository })
        if (milestone) {
          req = this.connectors.github.getMilestoneIssues({
            organization, repository, milestone
          })
        }
        return req.then(res => {
          console.log(`${organization}/${repository}`)
          metrics.completness(res.data)
          metrics.taxonomizer(res.data)
          return res
        })
      })

      return Promise.all(repos).then(repoIsues => flatten(repoIsues))
    }
    return buildReport(options.organization, options.repositories, options.milestone)
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
}
