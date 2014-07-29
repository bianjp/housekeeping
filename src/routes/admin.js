var router = require('express').Router();

var checkId = require('./checkIdentity') ;
var rF = require('./respondForm') ;
var Company = require('../lib/company') ;
var User = require('../lib/user') ;

module.exports = router;

//判定是否管理员登录
router.use('/', checkId.checkAdmin) ;

//系统管理员首页
router.get('/', function(req, res){
  res.render('admin', {title: 'admin'}) ;
  /*
  Company.get(null , function(err , docs)
    {
    if (err) {rF.respondGet(res , 'adminMainPage' , {} , err + '->读取公司数据失败') ; return ;}
    rF.respondGet(res , 'adminMainPage' , docs) ;
    }) ;
  */
});

//系统管理员查看删除公司页面
router.get('/company', function(req, res) {
  res.send("系统管理员查看公司");
  /*
  Company.get(null , function(err , docs)
    {
    if (err) {rF.respondGet(res , 'adminSetCompanyPage' , {} , err + '->读取公司数据失败') ; return ;}
    rF.respondGet(res , 'adminSetCompanyPage' , docs) ;
    }) ;
  */
});

router.post('/company', function(req, res) {
  res.send("系统管理员删除公司");
  /*
  if (! req.body.company) {rF.respondPost(res , {} , '没有上传公司数据') ; return ;}
  Company.dele(req.body.company , function(err , sum)
    {
    if (err) {rF.respondPost(res , {} , err + '->删除公司信息失败') ; return ;}
    if (sum < 1) {rF.respondPost(res , {} , '公司信息不存在') ; return ;}
    if (sum > 1) {rF.respondPost(res , {} , '多个公司信息被删除') ; return ;}
    User.dele({_id : req.body.company.userId} , function(err , sum)
      {
      if (err) {rF.respondPost(res , {} , err + '->删除公司帐号失败') ; return ;}
      if (sum < 1) {rF.respondPost(res , {} , '公司帐号不存在') ; return ;}
      if (sum > 1) {rF.respondPost(res , {} , '多个公司帐号被删除') ; return ;}
      rF.respondPost(res , {}) ;
      }) ;
    }) ;
  */
});

//系统管理员添加公司页面
router.get('/company/add', function(req, res) {
  res.send("系统管理员准备添加公司");
  /*
  var fs = require('fs') ;
  var template = null ;
  fs.readFile('../lib/companyExample.js' , function(err , data)
    {
    if (err) {rF.respondGet(res , 'adminAddCompanyPage' , {} , err + '->获取表单模版失败') ; return ;}
    rF.respondGet(res , 'adminAddCompanyPage' , JSON.parse(data)) ;
    }) ;
  */
});

router.post('/company/add', function(req, res) {
  res.send("系统管理员添加公司");
  /*
  if (! req.body.user) {rF.respondPost(res , {} , '没有上传帐号数据') ; return ;}
  if (! req.body.company) {rF.respondPost(res , {} , '没有上传公司数据') ; return ;}

  var userData = new User(req.body.user) ;
  userData.password = User.hashPassword(userData.password) ;

  User.save(userData , function(err , doc)
    {
    if (err) {rF.respondPost(res , {} , err + '->添加公司帐号失败') ; return ;}
    
    req.body.company.userId = doc._id ;
    var companyData = new Company(req.body.company) ;

    Company.saveOne(companyData , function(err , doc)
      {
      if (err) {rF.respondPost(res , {} , err + '->添加公司信息失败') ; return ;}
      rF.respondPost(res , doc) ;
      }) ;
    }) ;
  */
});

//系统管理员修改公司信息页面
router.get('/company/update', function(req, res) {
  res.send("系统管理员准备修改公司信息");
});

router.post('/company/update', function(req, res) {
  res.send("系统管理员修改公司信息");
});
