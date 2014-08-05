$ !->
  $ '.delete-employee' .on 'click', (event) !->
    event.preventDefault!
    console.log('ok')
    $.get $(this).attr('href'), {}, (data)!->
      if data.flag
        location.reload(true)
      else
        $ '#page-content' .replaceWith '<h2>' + data.message + '</h2>'
    , 'json'
