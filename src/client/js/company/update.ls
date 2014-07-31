$ !->
  $ 'form#user-update-company' .on 'submit', (event)!->
    event.preventDefault!

    info = {}
    contacts = {}

    $ '.company-info' .each (index, element)!->
      console.log $(this).attr('value')
      info[$(this).attr('name')] = $(this).attr('value')
    $ '.company-contacts' .each (index, element)!->
      contacts[$(this).attr('name')] = $(this).attr('value')

    company =
      info : info
      contacts : contacts

    $.post '/company/update', company, (data) !->
      if data.flag
        $ '#page-content' .replaceWith '<h2>Update succeeded</h2>'
      else
        $ '#page-content' .replaceWith '<h2>' + data.message + '</h2>'
    , 'json'
