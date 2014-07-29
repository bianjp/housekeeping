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
        data =
          username: $ '#username' .val!
          password: passwd
          companyName: $ '#company-name' .val!

        $.post '/admin/company/add', data, (data) !->
          if data.flag
            $ '#admin-add-company' .replaceWith '<h2>Add succeeded</h2>'
          else
            console.log('ok')
            $ '#error' .text 'back end not set up yet'
            $ '#admin-add-company' .removeClass 'warning error' .addClass 'error'
        , 'json'
