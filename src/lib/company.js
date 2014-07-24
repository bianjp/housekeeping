console.log("加载运行company模块") ;

var db = require('./db').getConnection() ;

//数据库操作
var operation = 
  [
    function(collection , company , callback) {collection.insert(company, {safe : true} , callback) ;} ,
    function(collection , company , callback) {collection.findOne({name : company.name} , callback) ;} ,
    function(collection , company , callback) {collection.remove({name : company.name} , callback) ;}
  ] ;

//构造函数
function Company(company)
  {
  if (! company) return(null) ;
  this._id = company._id;
  this.userId = company.userId;                   //users中对应
  this.name = company.name;
  this.logo = company.logo;                       //图片网址
  this.registeredAt = company.registeredAt;
  this.businessScope = company.businessScope;     //业务范围
  //this.serviceRegions = company.serviceRegions;
  //this.guarantees = company.guarantees;         //提供的保障
  this.about = company.about;
  //this.contacts = company.contacts;
  this.employeeCount = company.employeeCount;     //雇员数量
  } ;

Company.action = function(company , action , callback)
  {
  db.collection('companies', function(err, collection)
    {
    if (err) return callback(err) ;
    //无索引
    operation[action](collection , company , callback) ;
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

module.exports = Company ;
