let metrics = {}

metrics.completness = (issues) => {
  const open = issues.filter(i => i.state === 'open')
  const closed = issues.filter(i => i.state === 'closed')
  const percentage = closed.length / issues.length

  console.log('%s issues (%s%)', issues.length, percentage * 100)
  console.log('%s Open issues', open.length)
  console.log('%s Close issues', closed.length)

  return {
    open: open.length,
    closed: closed.length,
    count: issues.length,
    percentage
  }
}

metrics.taxonomizer = (issues) => {
  const taxonomy = {}
  issues.forEach((iss) => {
    iss.labels.forEach(l => {
      taxonomy[l.name] = taxonomy[l.name] || []
      taxonomy[l.name].push(iss)
    })
  })

  return Object.keys(taxonomy).map(label => {
    const percentage = taxonomy[label].length / issues.length
    console.log('%s %s %s%', taxonomy[label].length, label, percentage * 100)
    return { name: label, count: taxonomy[label].length, percentage }
  })
}

module.exports = metrics
