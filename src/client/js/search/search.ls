$ !->
  if $ '#search-options' .length
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
