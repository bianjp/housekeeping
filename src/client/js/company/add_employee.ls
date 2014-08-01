$ !->
  $ 'form#company-add-employee' .on 'submit', (event)!->
    event.preventDefault!

    employee = {}
    workDetail = {}

    $ '.employee-info' .each (index, element)!->
      console.log $(this).attr('value')
      employee[$(this).attr('name')] = $(this).attr('value')
    $ '.employee-work-detail' .each (index, element)!->
      workDetail[$(this).attr('name')] = $(this).attr('value')

    employee[workDetail] =  workDetail

    $.post '/company/employee/update', employee, (data) !->
      if data.flag
        $ '#page-content' .replaceWith '<h2>Update succeeded</h2>'
      else
        $ '#page-content' .replaceWith '<h2>' + data.message + '</h2>'
    , 'json'
