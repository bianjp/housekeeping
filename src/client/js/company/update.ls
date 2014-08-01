$ !->
  $ 'form#user-update-company' .on 'submit', (event)!->
    event.preventDefault!

    company = {}
    contacts = {}

    $ '.company-info' .each (index, element)!->
      company[$(this).attr('name')] = $(this).attr('value')
    $ '.company-contacts' .each (index, element)!->
      contacts[$(this).attr('name')] = $(this).attr('value')

    company[contacts] = contacts

    $.post '/company/update', company, (data) !->
      if data.flag
        $ '#page-content' .replaceWith '<h2>Update succeeded</h2>'
      else
        $ '#page-content' .replaceWith '<h2>' + data.message + '</h2>'
    , 'json'
