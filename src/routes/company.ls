router    = require 'express' .Router!
Employee  = require '../lib/employee'
Company   = require '../lib/company'
db        = require '../lib/db' .getConnection!
async     = require 'async'
ObjectID  = require 'mongodb' .ObjectID

module.exports = router

check_login = (req, res, next)!->
  if /[^\/]{24}/.test req.path #homepage of company
    next!
  else if !req.session.user || req.session.user.role != 'company'
    if req.xhr  # AJAX
      res.send do
        flag : false
        message: '您尚未登录'
    else
      res.redirect '/login'
  else
    next!

router.use '/', check_login

router.get '/', (req, res)!->
  Company.getOne {_id: req.session.user.companyId}, (err, item)!->
    res.render 'company/index',
      title: item && item.name,
      company: item

router.get '/employees', (req, res)!->
  Employee.find {company: req.session.user.companyId}, (err, items)!->
    res.render 'company/employees',
      title: '雇员管理'
      employees: items

router.get '/employee/add', (req, res)!->
  res.render 'company/add_employee',
    title: '增加雇员'

router.post '/employee/add', (req, res)!->
  Employee.parse req, (err, employee)!->
    if err
      res.send do
        flag: false
        message: '解析提交信息失败'
    else
      Employee.insertOne employee, (err, item)!->
        if err
          res.send do
            flag: false
            message: '操作失败'
        else
          res.send do
            flag: true
            message: '添加成功！'

router.get '/employee/update/:_id', (req, res)!->
  _id = ObjectID req.params._id
  Employee.findOne _id: _id, (err, item)!->
    res.render 'company/update_employee',
      employee: item


router.post '/employee/update/:_id', (req, res)!->
  _id = ObjectID req.params._id
  Employee.parse req, (err, employee)!->
    if err
      res.send do
        flag: false
        message: '解析提交信息失败'
    else
      Employee.update {_id: _id}, {$set: employee}, (err, item)!->
        if err
          res.send do
            flag: false
            message: '操作失败'
        else
          res.send do
            flag: true
            message: '更新成功！'

router.get '/employee/delete/:_id', (req, res)!->
  _id = ObjectID req.params._id
  Employee.remove _id: _id, (err, result)!->
    if err
      res.send do
        flag: false
        message: '删除失败'
    else
       res.send do
        flag: true
        message: '删除成功'

# 批量导入功能
router.get '/employee/batch', (req, res)!->
  res.render 'company/batch',
    title: '批量添加'

router.post '/employee/batch', (req, res)!->
  csvOperator = require '../lib/csvOperator'
  csvOperator.readFromFile req.files.file.path, (err, docs)!->
    res.send do
      flag: !err
      employees: docs || []

router.post '/employee/batch/add', (req, res)!->
  employees = JSON.parse req.body.employees
  async.waterfall [
    (callback)!->
      Company.getOne {_id: req.session.user.companyId}, callback

    (item, callback)!->
      items = employees
      for i from 0 to items.length - 1
        items[i].company = item._id
        items[i].workDetail = []
        items[i].guarantees = item.guarantees
      Employee.insert items, callback
  ],

  (err, items)!->
    res.send do
      flag: !err
      message: if err then '操作失败' else '操作成功'
