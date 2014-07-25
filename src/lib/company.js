//console.log("开始加载运行company模块") ;
var db = require('./db') ;

//数据库操作
var operation = 
  [
    function(collection , company , callback) {collection.insert(company, {safe : true} , callback) ;} ,
    function(collection , company , callback) {collection.findOne({name : company.name} , callback) ;} ,
    function(collection , company , callback) {collection.remove({name : company.name} , callback) ;} ,
    function(collection , company , callback) {collection.find(company).toArray(callback) ;}
  ] ;

//构造函数
function Company(company)
  {
  if (! company) return(null) ;
  this._id = (company._id ? company._id : db.createObjectID()) ;
  this.userId = company.userId;                   //users中对应
  this.name = company.name;
  this.logo = company.logo;                       //图片网址
  this.registeredAt = (company.registeredAt ? company.registeredAt : new Date()) ;
  this.businessScope = company.businessScope;     //业务范围
  this.serviceRegions = [] ;
  this.guarantees = [] ;                          //提供的保障
  this.about = company.about;
  this.contacts = {} ;                            //联系方式
  this.employeeCount = company.employeeCount;     //雇员数量

  for(var i in company.serviceRegions)
    {
    this.serviceRegions[i].city = company.serviceRegions[i].city ;
    for(var j in company[i].regions)
      this.serviceRegions[i].regions[j] = company.serviceRegions[i].regions[j] ;
    }
  for(var i in company.guarantees) this.guarantees[i] = company.guarantees[i] ;
  for(var attr in company.contacts) this.contacts[attr] = company.contacts[attr] ;
  } ;

//数据库操作模版
Company.action = function(company , action , callback)
  {
  db.getConnection().collection('companies', function(err, collection)
    {
    if (err) return callback(err) ;
    operation[action](collection , company , callback) ;    //暂无索引
    }) ;
  }

//保存到数据库
Company.save = function(company , callback)
  {Company.action(company , 0 , callback) ;} ;

//到数据库查询by name
Company.get = function(company , callback)
  {Company.action(company , 1 , callback) ;} ;

//到数据库删除by name
Company.dele = function(company , callback)
  {Company.action(company , 2 , callback) ;} ;

//到数据库查询所有
Company.list = function(callback)
  {Company.action(null , 3 , callback) ;} ;

module.exports = Company ;

//console.log("完成加载运行company模块") ;
/*------单元测试------
db.connect(function()
  {
  var fs = require('fs') ;
  fs.readFile('./companyExample.js' , function(err , data)
    {
    if (err) throw err ;
    var c1 = JSON.parse(data) ;
    //console.dir(c1) ;
    //var c2 = eval('(' + data + ')') ;
    //console.dir(c2) ;

    ///*存储测试
    c1.name = '公司A' ;
    c1._id = db.createObjectID() ;
    c1.userId = db.createObjectID() ;
    c1.registeredAt = new Date() ;
    Company.save(c1 , function(err , doc)
      {
      if (err) throw err ;
      console.dir(doc) ;

      c1.name = '公司B' ;
      c1._id = db.createObjectID() ;
      c1.userId = db.createObjectID() ;
      c1.registeredAt = new Date() ;
      Company.save(c1 , function(err , doc)
        {
        if (err) throw err ;
        console.dir(doc) ;
        })
      }) ;
    //
    ///*list查询
    Company.list(function(err , doc)
      {
        if (err) throw err ;
        console.log(doc.length) ;
        console.dir(doc) ;
      }) ;
    //
    ///*dele删除
    Company.dele({name : '公司A'} , function(err , doc)
      {
        if (err) throw err ;
        console.dir(doc) ;
      }) ;
    //
    ///*get查询
    Company.get({name : '公司B'} , function(err , doc)
      {
        if (err) throw err ;
        console.dir(doc) ;
      }) ;
    //

    }) ;
  }) ;
//*/