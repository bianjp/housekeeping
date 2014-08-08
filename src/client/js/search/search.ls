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
      $ '#result-count' .text ''
      $ '#search-company-result' .empty!
      $.post '/search/company', options, (data)!->
        if data.flag
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

    $ '#search-options .item' .not '.item[data-option="year"]' .on 'click', '.label', (event)!->
      $ this .toggleClass 'blue'
      search!

    $ '#search-options .item[data-option="year"]' .on 'click', '.label', (event)!->
      label = $ this
      if label.is '.blue'
        label.removeClass 'blue'
      else
        label.closest '.item' .find 'a.blue.label' .removeClass 'blue'
        label.addClass 'blue'
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
      options

    $ '#filter-employee-options' .on 'click', 'a.label', !->
      label = $ this
      if label.is '.blue'
        label.removeClass 'blue'
      else
        label.closest '.item' .find 'a.blue.label' .removeClass 'blue'
        label.addClass 'blue'

      $ '#result-count' .text ''
      $ '#search-result .list' .empty!

      data = getFilterOptions!
      $.post location.href, data, (data)!->
        if !data.flag
          return
        $ '#result-count' .text data.employees.length
        html = [
            '<div class="item"><img class="ui left floated image" src="'
            null  # 1 photo
            '"><div class="content"><a class="ui header" href="/employee/'
            null  # id
            '">',
            null  # name
            '</a><div><span>年龄：</span><div>'
            null  # age
            '</div></div><div><span>工作经验：</span><div>'
            null  # work experience
            '年</div></div><div><span>薪资：</span><div>'
            null  # salary
            '</div></div><div><span>学历：</span><div>'
            null  # education
            '</div></div></div><div class="right floated aligned company"><a class="ui header" href="/company/'
            null  # company _id
            '">'
            null  # company name
            '</a><a href="/company/'
            null  # company _id
            '"><img class="ui image" src="'
            null  # company logo
            '"></a></div></div>'
        ]

        container = $ '#search-result .list'
        thisYear = new Date! .getFullYear!
        for employee in data.employees
          html[1] = employee.photo
          html[3] = employee._id
          html[5] = employee.name
          html[7] = thisYear - (new Date employee.birthday .getFullYear!)
          html[9] = employee.workExperience
          html[11] = employee.workDetail[0].lowsalary + '-' + employee.workDetail[0].upsalary
          html[13] = employee.education
          html[15] = employee.company
          html[17] = employee.company_property.name
          html[19] = employee.company
          html[21] = employee.company_property.logo
          container.append html.join ''
      , 'json'
