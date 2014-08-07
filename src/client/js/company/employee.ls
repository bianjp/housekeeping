$ !->
  if $ 'form#company-update-employee, form#company-add-employee' .length
    $ '.ui.accordion' .accordion()
    $ '.ui.checkbox' .checkbox()
    $ '.ui.selection.dropdown' .dropdown()
    $ '.ui.radio.checkbox' .checkbox()

    $ '#photo-area .button' .on 'click', !->
      $ '#photo-area input' .trigger 'click'

    $ '#photo-area input' .on 'change', !->
      if $ this .val!
        reader = new FileReader!
        reader.readAsDataURL this.files[0]
        reader.onload = !->
          $ '#photo-area img' .attr 'src', reader.result

    $ 'input.selected' .on 'click', (event)!->
      event.stopPropagation!

    $ 'form' .on 'submit', (event)!->
      event.preventDefault!
      data = new FormData $(this)[0]

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
              title: '操作失败'
              content: data.message
          else
            Alert do
              title: '操作成功'
              content: data.message
              positiveCallback: !->
                location.href = '/company/employees'
