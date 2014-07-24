console.log("加载运行admin路由模块") ;

var router = require('express').Router();
var checkId = require('./checkIdentity') ;
var company = require('../lib/company') ;
var user = require('../lib/user') ;

module.exports = router;

//判定是否管理员登录
router.all('/', checkId.checkAdmin) ;

//系统管理员首页
router.get('/', function(req, res) {
  res.send("系统管理员主页显示");
});

//系统管理员查看删除公司页面
router.get('/company', function(req, res) {
  res.send("系统管理员查看公司");
});

router.post('/company', function(req, res) {
  if (! req.body.company) {seq.session.err = '没有上传数据' ; return ;}
  var err1 = '' , err2 = '' ;
  //user.dele({_id : company.userId} , function(err , doc)
  //  { err1 = (err ? err : '') ; }) ;
  //company.dele(req.body.company , function(err , doc)
  //  { err2 = (err ? err : '') ; }) ;
  seq.session.err = err1 + err2 ;
});

//系统管理员添加公司页面
router.get('/company/add', function(req, res) {
  res.send("系统管理员准备添加公司");
});

router.post('/company/add', function(req, res) {
  if (! req.body.company) {seq.session.err = '没有上传数据' ; return ;}
  var err1 = '' , err2 = '' ;
  //user.save({_id : company.userId} , function(err , doc)
  //  { err1 = (err ? err : '') ; }) ;
  company.save(req.body.company , function(err , doc)
    { err2 = (err ? err : '') ; }) ;
  seq.session.err = err1 + err2 ;
});

//系统管理员修改公司信息页面
router.get('/company/update', function(req, res) {
  res.send("系统管理员准备修改公司信息");
});

router.post('/company/update', function(req, res) {
  res.send("系统管理员修改公司信息");
});
