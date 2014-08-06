$ !->
  if location.pathname == '/company/employee/batch'
    getEmployees = ->
      employees = []
      $ '#parse-result tbody tr' .each !->
        td = $ this .find 'td' .map (index, value)-> $ value
        employees.push do
          name: td[0] .text!
          gender: if td[1] .text! then if td[1].text! == '女' then 'female' else 'male'
          birthday: if td[1].text! then new Date td[1].text!
          nativePlace: td[2].text!
          isMarried: if td[3].text! then if td[3].text! == '已婚' then true else false
          education: td[4].text!
          height: td[5].text!
          weight: td[5].weight
          certificates: td[6].text!.split /[ ,，、]+/
          languages: td[7].text!.split /[ ,，、]+/
          workExperience: parseInt(td[8].text!)
          cookingStyle: td[9].text!.split /[ ,，、]+/
          specialities: td[10].text!.split /[ ,，、]+/
          description: td[11].text!
      employees

    submitEmployees = !->
      employees = getEmployees!
      $.post '/company/employee/batch/add',
        {employees: JSON.stringify employees},
        (data)!->
          if data.flag
            Alert do
              title: '操作成功'
              content: '操作成功'
          else
            Alert do
              title: '操作失败'
              content: '操作失败'
        , 'json'

    showParsedResult = (employees)!->
      template = [
        '<tr><td>'
        ''  # 1 name
        '</td><td>'
        ''  # 3 gender
        '</td><td>'
        ''  # 5 birthday
        '</td><td>'
        ''  # 7 native place
        '</td><td>'
        ''  # 9 is married
        '</td><td>'
        ''  # 11 education
        '</td><td>'
        ''  # 13 height
        '</td><td>'
        ''  # 15 weight
        '</td><td>'
        ''  # 17 certificates
        '</td><td>'
        ''  # 19 languages
        '</td><td>'
        ''  # 21 work experience
        '</td><td>'
        ''  # 23 cooking style
        '</td><td>'
        ''  # 25 specialities
        '</td><td>'
        ''  # 27 description
        '</td></tr>'
      ]

      modal = $ '#parse-result'

      modal.find '#row-count' .text employees.length

      tbody = modal.find 'tbody'
      tbody.empty!
      for employee in employees
        template[1] = employee.name
        template[3] = if employee.gender == 'male' then '男' else '女'
        template[5] = employee.birthday
        template[7] = employee.nativePlace
        template[9] = if employee.isMarried then '已婚' else '未婚'
        template[11] = employee.education
        template[13] = employee.height
        template[15] = employee.weight
        template[17] = employee.certificates.join ' '
        template[19] = employee.languages.join ' '
        template[21] = employee.workExperience
        template[23] = employee.cookingStyle.join ' '
        template[25] = employee.specialities.join ' '
        template[27] = employee.description
        tbody.append template.join ''

      modal
        .modal 'setting',
          closable: false
          onApprove: submitEmployees
        .modal 'show'

    $ 'form' .on 'submit', (event)!->
      event.preventDefault!

      file = $ '#file'
      if !file.val!
        return

      data = new FormData!
      data.append 'file', file[0].files[0]

      $.ajax do
        url: location.href
        type: 'post'
        data: data
        contentType: false
        processData: false
        dataType: 'json'
        error: (jqXHR, textStatus, errorThrown)!->
          Alert do
            title: '提交失败'
            content: '与服务器通讯失败，请重新操作'
        success: (data, textStatus)!->
          if !data.flag
            Alert do
              title: '提交失败'
              content: data.message
          else if !data.employees.length
            Alert do
              title: '提交失败'
              content: '数据为空'
          else
            showParsedResult data.employees
