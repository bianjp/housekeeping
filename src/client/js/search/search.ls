$ !->
  if location.pathname == '/search/company'
    getSearchOptions = !->
      options = {}
      $ '#search-options .item' .each !->
        option = $ this .attr 'data-option'
        values = []
        $ this .find '.blue.label' .each !->
          values.push $(this).attr('data-value') || $(this).text!
        if values.length
          options[option] = values
      options

    search = !->
      searchOptions = getSearchOptions!
      if $ '#search-company' .length
        keyword = $ '#search-company input' .val!
        if keyword
          options.keyword = keyword
      $ '.post' '/search/company', options, (data)!->
        if data.flag
          console.log data
      , 'json'

    $ '#search-options' .on 'click', '.label', (event)!->
      $ this .toggleClass 'blue'

  if location.pathname == '/search'
    $ '#search-employee-options' .on 'click', '.label', !->
      label = $ this
      label.toggleClass 'blue'
      label.find 'input' .prop 'checked', label.is('.blue')
