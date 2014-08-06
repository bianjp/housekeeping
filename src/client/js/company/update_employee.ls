$ !->
  $ '.ui.accordion' .accordion()
  $ '.ui.checkbox' .checkbox()
  $ '.ui.selection.dropdown' .dropdown()
  $ '.ui.radio.checkbox' .checkbox()

  $ 'form#company-update-employee' .on 'submit', (event)!->
    event.preventDefault!
    $.post '/company/employee/update', $(this).serialize(), (data) !->
      if data.flag
        location.href = '/company/employees'
      else
        $ '#page-content' .replaceWith '<h2>' + data.message + '</h2>'
    , 'json'
