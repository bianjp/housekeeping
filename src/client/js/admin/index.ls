$ !->
  $ '.delete-company-button' .on 'click', (event) !->
    event.preventDefault!
    $.get $(this).attr('href'), {}, (data)!->
      if data.flag
        $ '#page-content' .replaceWith '<h2>Delete succeeded, whatever</h2>'
      else
        $ '#page-content' .repalecWith '<h2>' + data.message + '</h2>'
    , 'json'
