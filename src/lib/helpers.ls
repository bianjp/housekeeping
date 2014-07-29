#Helpers to be userd in template
module.exports = (app)!->
  app.locals.formatDate = (date, format)->
    if !(date instanceof Date)
      date
    else
      year = date.getFullYear!
      month = date.getMonth!
      day = date.getDate!

      switch format
        case 'YYYY-MM-DD'
          year + '-' + (month+1) + '-' + day
        default
          year + '-' + (month+1) + '-' + day

  app.locals.getServiceRegions = (serviceRegions)->
    regions = []
    for item in serviceRegions
      regions.push item.city + ': ' + item.regions.join(', ')
    regions.join '; '
