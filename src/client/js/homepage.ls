if location.pathname == '/'
  $ '#search-company .button' .on 'click', !->
    keyword = $ '#search-company input' .val! .trim!
    if keyword.length
      location.href = '/search/company?name=' + keyword
