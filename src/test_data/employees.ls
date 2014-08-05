_ = require 'underscore'

types = ['钟点工' '保姆' '月嫂' '早出晚归' '宅速洁' '护理']
names = ['薛兰珍' '程剑霞' '陈卫芳' '王庆丽' '黄天妹' '梁滢尹' '郑敏娟' '程世婵']
provinces = [ '上海' '江苏' '浙江' '安徽' '四川' '湖南' '湖北' '河南' '江西' '山东' '河北' '山西' '福建' '广东' '广西' '吉林' '辽宁' '黑龙江' '甘肃' '青海' '内蒙古' '陕西' '海南' '宁夏' '云南' '贵州' '西藏' '新疆' '重庆' '北京' '天津' '港澳台']
educations = ['小学' '初中' '高中' '本科' '其它']
languages = ['普通话' '上海话' '粤语' '英语' '日语' '客家话' '其它']
cookingStyles = ['上海菜' '川菜' '湘菜' '粤菜' '东北菜' '面食' '台湾菜' '其他中餐' '意大利菜' '法式料理' '韩式料理' '日式料理' '西式点心' '其他西餐']
certificates = ['母婴护理证' '健康证' '营养师证']
specialities = ['开奶' '早产儿护理' '双胞胎护理' '多胞胎护理' '个性化月子餐制作']
areas = ['天河区' '海珠区' '番禺区' '白云区' '越秀区']

_.sampleArray = (list)->
  count = _.random 1, list.length
  items = []
  for i from 0 to count
    items.push list[i]
  _.uniq items

createEmployee = ->
  employee =
    company: null
    name: _.sample names
    birthday: new Date('1978-05-05')
    nativePlace: _.sample provinces
    isMarried: _.sample [true false]
    education: _.sample educations
    photo: null
    height: '160cm'
    weight: '60kg'
    certificates: _.sampleArray certificates
    languages: _.sampleArray languages
    workExperience: _.random 1, 20
    cookingStyle: _.sampleArray cookingStyles
    specialities: _.sampleArray specialities
    description: ''
    workDetail: [
      workType: _.sample types
      workArea: _.sampleArray areas
      workContent: ['']
      lowsalary: 5000
      upsalary: 6000
      workTime: ''
      vacation: ''
    ]
  employee.photo = '/images/photos/' + employee.name + '.jpg'
  employee

module.exports = ->
  employees = []
  for i from 0 to 9
    employees.push createEmployee!
  employees
