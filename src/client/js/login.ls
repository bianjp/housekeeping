$ !->
  if $ 'form#login' .length
    $ '#login' .on 'submit', (event)!->
      event.preventDefault!
      data = 
        username: $ '#username' .val!
        password: $ '#password' .val!

      $.post '/login', data, (data)!->
        if data.flag
          location.href = '/'
        else
          $ '#error' .text data.message
          $ '#login' .addClass 'error'
      , 'json'
