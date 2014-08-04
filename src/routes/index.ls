router = require 'express' .Router!

router.get '/', (req, res)!->
  res.render 'index', do
    title: '首页'

router.get '/employee/:id', (req, res) !->
  contacts =
    fixedPhone: '020-12345678'
    mobilePhone: '020-12345678'
  company =
    name: '景辉家政'
    contacts: contacts

  somedate = new Date
  somedate.setFullYear 1970
  employee =
    _id: 0
    companyName: '景辉家政'
    name: '郭文芳'
    birthday: somedate
    gender: 'female'
    isMarried: true
    nativePlace: '广东'
    education: '高中'
    photo: '/images/photos/01.jpg'
    height: '160cm'
    weight: '50kg'
    certificates:
      '公司认证'
      '个人认证'
    languages:
      '普通话'
      '粤语'
    workExperience: '6年'
    cookingStyle:
      '粤菜'
      '川菜'
    specialities:
      '做饭'
      '带小孩'
    description: '这是保姆的描述'
    workDetail:
      * workType: '住家保姆'
        workArea:
          '天河'
          '番禺'
        workContent:
          '煮饭'
          '买菜'
        salary: '4500/月'
        workTime: '周一到周五'
        vacation: '周日'
      * workType: '钟点工'
        workArea:
          '天河'
          '番禺'
        workContent:
          '清洁'
          ...
        salary: '35/小时'
        workTime: '周一到周五'
        vacation: ''
  res.render 'employee', do
    employee: employee
    company: company
    title: employee.name

router.get '/company/:id', (req, res) !->
  somedate = new Date
  somedate.setFullYear 1970

  contacts =
    website: 'http://local:3000'
    email: 'housekeeping@house.com'
    fixedPhone: '020-12345678'
    mobilePhone: '020-12345678'
    QQ: '1234567890'
    address: 'address of the company'
    contact: '赢家政'
  company =
    name: '景辉家政'
    logo: '/images/photos/01.jpg'
    registeredAt: somedate
    businessScope:
      '钟点工'
      '护理'
    serviceRegions:
      * city: '广州'
        regions:
          '天河'
          '番禺'
      * city: '北京'
        regions:
          '东城'
          '西城'
    guarantees:
      '准时达'
      '不满意退货'
    about: '这是公司的简介'
    contacts: contacts
    employeeCount: 4

  employee =
    _id: 0
    companyName: '景辉家政'
    name: '郭文芳'
    birthday: somedate
    gender: 'female'
    isMarried: true
    nativePlace: '广东'
    education: '高中'
    photo: '/images/photos/01.jpg'
    height: '160cm'
    weight: '50kg'
    certificates:
      '公司认证'
      '个人认证'
    languages:
      '普通话'
      '粤语'
    workExperience: '6年'
    cookingStyle:
      '粤菜'
      '川菜'
    specialities:
      '做饭'
      '带小孩'
    description: '这是保姆的描述'
    workDetail:
      * workType: '住家de保姆'
        workArea:
          '天河'
          '番禺'
        workContent:
          '煮饭'
          '买菜'
        salary: '4500/月'
        workTime: '周一到周五'
        vacation: '周日'
      * workType: '钟点工'
        workArea:
          '天河'
          '番禺'
        workContent:
          '清洁'
          ...
        salary: '35/小时'
        workTime: '周一到周五'
        vacation: ''

  employees =
    employee
    employee
    employee
    employee

  res.render 'company', do
    employee: employee
    employees: employees
    company: company
    title: company.name

module.exports = router
