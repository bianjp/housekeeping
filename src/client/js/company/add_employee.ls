$ !->
  $ '.ui.accordion' .accordion()
  $ '.ui.checkbox' .checkbox()
  $ '.ui.selection.dropdown' .dropdown()
  $ '.ui.radio.checkbox' .checkbox()

  $ 'form#company-add-employee' .on 'submit', (event)!->
    event.preventDefault!
    $.post '/company/employee/add', $(this).serialize(), (data) !->
      if data.flag
        location.href = '/company/employees'
      else
        $ '#page-content' .replaceWith '<h2>' + data.message + '</h2>'
    , 'json'
