console.log("加载运行company模块") ;

var db = require('./db').getConnection() ;

//构造函数
function Company(company)
  {
  if (! company) return(null) ;
  this.name = company.name;
  this.password = company.password ;
  //...other
  } ;

//保存到数据库
Company.save = function(company , callback)
  {
  db.collection('companies', function(err, collection)
    {
    if (err) return callback(err) ;
    //无索引查找
    collection.insert(this, {safe : true} , function(err , doc)
      { callback(err , doc) ; }) ;
    }) ;
  } ;

//到数据库查询
Company.get = function(company , callback)
  {
  db.collection('companies', function(err , collection)
    {
    if (err) return callback(err) ;
    //无索引查找
    collection.findOne({name : company.name} , function(err , doc)
      { callback(err , doc) ; }) ;
    }) ;
  } ;

module.exports = Company ;
