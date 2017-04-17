let metrics = {}

metrics.completness = (issues) => {
  const open = issues.filter(i => i.state === 'open')
  const close = issues.filter(i => i.state === 'closed')
  const percentage = Math.floor(close.length / issues.length * 100)

  const sps = (iss) => {
    return iss
      .map(i => i.size)
      .filter(Number.isInteger)
      .reduce((p, it) => p + it, 0)
  }

  const percentageSP = Math.floor(sps(close) / sps(issues) * 100)

  console.log('%s issues (%s%) - %s SP (%s%)',
    issues.length, percentage, sps(issues), percentageSP)
  console.log('%s Open issues - %s SP', open.length, sps(open))
  console.log('%s Close issues - %s SP', close.length, sps(close))
  return metrics
}

metrics.taxonomizer = (issues) => {
  const taxonomy = {}
  issues.forEach((iss) => {
    iss.labels.forEach(l => {
      taxonomy[l.name] = taxonomy[l.name] || []
      taxonomy[l.name].push(iss)
    })
  })

  Object.keys(taxonomy).forEach(label => {
    const percentage = Math.floor(taxonomy[label].length / issues.length * 100)
    console.log('%s %s %s%', taxonomy[label].length, label, percentage)
  })

  return metrics
}

module.exports = metrics
