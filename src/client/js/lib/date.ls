formatDate = (date, format)->
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
