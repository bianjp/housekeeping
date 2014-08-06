@Confirm = (options)!->
  template = '
    <div class="ui small modal">
      <i class="close icon"></i>
      <div class="header"></div>
      <div class="content"></div>
      <div class="actions">
          <div class="ui positive button"></div>
          <div class="ui negative button"></div>
      </div>
    </div>
    '
  modal = $ template

  modal.find '.header' .text options.title || '温馨提醒'
  modal.find '.positive' .text options.positiveText || '确定'
  modal.find '.negative' .text options.negativeText || '取消'

  if options.content
    modal.find '.content' .text options.content
  if options.html
    modal.find '.content' .html options.html
  if options.positiveClass
    modal.find '.positive' .addClass options.positiveClass
  if options.negativeClass
    modal.find '.negative' .addClass options.negativeClass

  modal
    # .modal 'hide others'
    .modal 'setting',
      allowMultiple: true
      closable: if options.closable === false then false else true
      onApprove: options.positiveCallback || -> true
      onDeny: options.negativeCallback || -> true
      onHidden: !-> modal.remove!
    .modal 'show'

@Alert = (options)!->
  options.negativeClass = 'hidden'
  Confirm options
