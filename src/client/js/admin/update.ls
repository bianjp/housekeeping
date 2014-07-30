$ !->
  if $ 'form#admin-update-company' .length
    $ '#admin-update-company' .on 'submit', (event)!->
      event.preventDefault!
      dataUp =
        username: $ '#username' .val!
        companyName: $ '#company-name' .val!

      $.post '/admin/company/add', dataUp, (dataDown) !->
        if dataDown.flag
          $ '#admin-update-company' .replaceWith '<h2>Add succeeded</h2>'
        else
          $ '#error' .text dataDown.message
          $ '#admin-update-company' .removeClass 'warning error' .addClass 'error'
      , 'json'
