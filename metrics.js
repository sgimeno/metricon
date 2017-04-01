module.exports = {
  completness: (issues) => {
    const open = issues.filter(i => i.state === 'open')
    const close = issues.filter(i => i.state === 'closed')
    const percentage = Math.floor(close.length / issues.length * 100)

    const sps = (iss) => {
      return iss
        .map(i => i.size)
        .filter(Number.isInteger)
        .reduce((p, it) => p + it, 0)
    }

    console.log('%s issues (%s%) - %s SP', issues.length, percentage, sps(issues))
    console.log('%s Open issues - %s SP', open.length, sps(open))
    console.log('%s Close issues - %s SP', close.length, sps(close))
  }
}
