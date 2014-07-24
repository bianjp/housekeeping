(function()
  {
  var router = require('express').Router();
  var checkId = require('./checkIdentity') ;

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
    res.send("系统管理员删除公司");
  });

  //系统管理员添加公司页面
  router.get('/company/add', function(req, res) {
    res.send("系统管理员准备添加公司");
  });

  router.post('/company/add', function(req, res) {
    res.send("系统管理员添加公司");
  });

  //系统管理员修改公司信息页面
  router.get('/company/update', function(req, res) {
    res.send("系统管理员准备修改公司信息");
  });

  router.post('/company/update', function(req, res) {
    res.send("系统管理员修改公司信息");
  });
  }
).call(this) ;
