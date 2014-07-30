$ !->
  if $ 'form#admin-add-company' .length
    $ '#admin-add-company' .on 'submit', (event)!->
      event.preventDefault!
      passwd = $ '#password' .val!
      passwd2 = $ '#password-confirm' .val!
      if passwd != passwd2
        $ '#warning' .text 'Password does not match'
        $ '#admin-add-company' .removeClass 'warning error' .addClass 'warning'
      else
        dataUp =
          username: $ '#username' .val!
          password: passwd
          companyName: $ '#company-name' .val!

        $.post '/admin/company/add', dataUp, (dataDown) !->
          if dataDown.flag
            $ '#admin-add-company' .replaceWith '<h2>Add succeeded</h2>'
          else
            $ '#error' .text dataDown.message
            $ '#admin-add-company' .removeClass 'warning error' .addClass 'error'
        , 'json'
