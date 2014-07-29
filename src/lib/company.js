//console.log("开始加载运行company模块") ;
var db = require('./db') ;

//数据库操作
var operation = 
  [
    function(collection , company , callback) {return(collection.insert(company , callback)) ;} ,
    function(collection , company , callback) {return(collection.findOne(company , callback)) ;} ,
    function(collection , company , callback) {return(collection.find(company).toArray(callback)) ;} ,
    function(collection , company , callback) {return(collection.remove(company , callback)) ;}
  ] ;

//构造函数
function Company(company)
  {
  if (! company) company = {} ;
  this.userId = (company.userId ? company.userId : null) ;                  //users中对应，这里只是赋值其引用
  this.name = (company.name ? company.name : '') ;
  this.logo = (company.logo ? company.logo : '') ;                          //图片网址
  this.registeredAt = (company.registeredAt ? new Date(company.registeredAt) : new Date()) ;
  this.businessScope = [] ;                                                 //业务范围
  this.serviceRegions = [] ;
  this.guarantees = [] ;                                                    //提供的保障
  this.about = (company.about ? company.about : '') ;
  this.contacts = {} ;                                                      //联系方式
  this.employeeCount = (company.employeeCount ? company.employeeCount : 0); //雇员数量

  for(var i in company.businessScope) this.businessScope[i] = company.businessScope[i] ;
  for(var i in company.serviceRegions)
    {
    this.serviceRegions[i] = {} ;
    this.serviceRegions[i].city = company.serviceRegions[i].city ;
    this.serviceRegions[i].regions = [] ;
    for(var j in company.serviceRegions[i].regions)
      this.serviceRegions[i].regions[j] = company.serviceRegions[i].regions[j] ;
    }
  for(var i in company.guarantees) this.guarantees[i] = company.guarantees[i] ;
  for(var attr in company.contacts) this.contacts[attr] = company.contacts[attr] ;

  return(null) ;
  } ;

//数据库操作模版
Company.action = function(company , action , callback)
  {
  return(db.getConnection().collection('companies', function(err, collection)
    {
    if (err) {callback(err) ; return ;}
    operation[action](collection , company , callback) ;    //暂无索引
    })) ;
  } ;

//保存一个到数据库
Company.saveOne = function(company , callback)
  {
  return(Company.action(new Company(company) , 0 , function(err , docs)
    {
    if (err) {callback(err) ; return ;}
    if (docs.length <= 0) {callback('没有返回doc') ; return ;}
    callback(err , docs[0]) ;
    })) ;
  } ;

//到数据库查询一个by company
Company.getOne = function(company , callback)
  {return(Company.action(company , 1 , callback)) ;} ;

//到数据库查询一堆by company
Company.get = function(company , callback)
  {return(Company.action(company , 2 , callback)) ;} ;

//到数据库删除by company
Company.dele = function(company , callback)
  {return(Company.action(company , 3 , callback)) ;} ;

module.exports = Company ;

//console.log("完成加载运行company模块") ;
/*------单元测试------
db.connect(function()
  {
  var fs = require('fs') ;
  fs.readFile('./companyExample.js' , function(err , data)
    {
    if (err) throw err ;
    var c1 ;
    c1 = new Company() ;
    //console.dir(c1) ;
    c1 = JSON.parse(data) ;
    //console.dir(c1) ;
    //c1 = eval('(' + data + ')') ;
    //console.dir(c1) ;

    ///*saveOne测试
    c1.name = '公司Cat' ;
    c1.userId = null ;
    c1.registeredAt = new Date() ;
    console.dir(c1) ;
    Company.saveOne(c1 , function(err , doc)
      {
      if (err) throw(err) ;
      console.dir(doc) ;
      }) ;
    //
    ///*dele删除测试
    Company.dele({name : '公司Cat'} , function(err , sum)
      {
        if (err) throw(err) ;
        console.dir(sum) ;
      }) ;
    //
    ///*get查询测试
    Company.get(null , function(err , docs)
      {
      if (err) throw(err) ;
      console.log(docs.length) ;
      console.dir(docs) ;
      }) ;
    //
    ///*getOne查询测试
    Company.getOne({name : '公司Cat'} , function(err , doc)
      {
      if (err) throw(err) ;
      console.dir(doc) ;
      }) ;
    //
    return(null) ;
    }) ;
  }) ;
//*/