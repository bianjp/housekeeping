$ !->
  if location.pathname == '/search/company'
    getSearchOptions = ->
      options = {}
      $ '#search-options .item' .each !->
        option = $ this .attr 'data-option'
        values = []
        $ this .find 'a.blue.label' .each !->
          values.push $(this).attr('data-value') || $(this).text!
        if values.length
          if option == 'year'
            options[option] = values[0]
          else
            options[option] = values
      options

    search = !->
      options = getSearchOptions!
      keyword = $ '#search-company input' .val!
      if keyword
        options.name = keyword
      console.log options
      $ '#result-count' .text ''
      $ '#search-company-result' .empty!
      $.post '/search/company', options, (data)!->
        if data.flag
          console.log data
          html = [
            '<div class="item"><img class="ui left floated image" src="'
            '' # logo
            '"><div class="content"><div class="ui header">'
            '' # name
            '</div><div><span>服务类型</span><div>'
            '' # business scopes
            '</div></div><div><span>服务区域</span><div>'
            '' # areas
            '</div></div><div><span>雇员数量</span><div>'
            '' # employee count
            '</div></div><div><span>地址</span><div>'
            '' # address
            '</div></div><div><span>联系方式</span><div>'
            '' # phones
            '</div></div></div><a class="ui fluid blue button" href="/company/'
            '' # id
            '">查看</a></div>'
          ]
          $ '#result-count' .text data.companies.length
          container = $ '#search-company-result'
          for company in data.companies
            html[1] = company.logo
            html[3] = company.name
            html[5] = company.businessScope.join ', '
            html[7] = company.serviceRegions[0].regions.join ', '
            html[9] = company.employeeCount
            html[11] = company.contacts.address
            html[13] = company.contacts.fixedPhone
            html[15] = company._id
            container.append html.join ''
      , 'json'

    $ '#search-options' .on 'click', '.label', (event)!->
      $ this .toggleClass 'blue'
      search!

  if location.pathname == '/search'
    $ '#search-employee-options' .find ':radio, :checkbox' .prop 'checked', false

    $ '#search-employee-options .work-area' .on 'click', '.label', !->
      label = $ this
      if !label.is '.blue'
        $ '.work-area .label' .removeClass 'blue'
        label.addClass 'blue'
        label.find 'input' .prop 'checked', true

    $ '#search-employee-options .work-content' .on 'click', '.label', !->
      label = $ this
      label.toggleClass 'blue'
      label.find 'input' .prop 'checked', label.is('.blue')

  if location.pathname == '/search/employee'
    getFilterOptions = ->
      options = {}
      $ '#filter-employee-options .item' .each !->
        label = $ this .closest '.item' .find 'a.blue.label'
        value = if label.length then label.attr('data-value') || label.text!
        if value
          options[$ this .attr 'data-option'] = value

    $ '#filter-employee-options' .on 'click', 'a.label', !->
      label = $ this
      if !label.is '.blue'
        label.closest '.item' .find 'a.blue.label' .removeClass 'blue'
        label.addClass 'blue'

        $ '#result-count' .text ''
        $ '#search-result .list' .empty!

        data = getFilterOptions!
        $.post '/search/employee', data, (data)!->
          $ '#result-count' .text data.length
          console.log data
          html = [
              '<div class="item"><img class="ui left floated image" src="'
              null  # 1 photo
              '"><div class="content"><div class="ui header">',
              null  # 3 name
              '</div><div><span>年龄：</span><div>'
              null  # 5 age
              '</div></div><div><span>工作经验：</span><div>'
              null  # 7 work experience
              '</div></div><div><span>薪资：</span><div>'
              null  # 9 salary
              '</div></div><div><span>学历：</span><div>'
              null  # 11 education
              '</div></div></div><div class="right floated aligned company"><a class="ui header" href="/company/'
              null  # 13 company _id
              '">'
              null  # 15 company name
              '</a><a href="/company/'
              null  # 17 company _id
              '<img class="ui image" src="'
              null  # 19 company logo
              '"></a></div><a class="ui fluid blue button" href="/employee/'
              null  # 21 _id
              '">查看</a></div>'
          ]

          container = $ '#search-result .list'
          for employee in data
            html[1] = employee.photo
            html[3] = employee.name
            html[5] = employee.age
            html[7] = employee.workExperience
            html[9] = employee.workDetail.salary
            html[11] = employee.education
            html[13] = employee.companyId
            html[15] = employee.companyName
            html[17] = employee.companyId
            html[19] = employee.companyLogo
            html[21] = employee._id
            container.append html.join!
        , 'json'
