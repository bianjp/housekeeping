var router = require('express').Router();

var checkId = require('./checkIdentity') ;
var Company = require('../lib/company') ;
var User = require('../lib/user') ;

module.exports = router;

//判定是否管理员登录
router.all('/', checkId.checkAdmin) ;

//系统管理员首页
router.get('/', function(req, res){
  res.render('admin', {title: 'admin'}) ;
  /*
  Company.get(null , function(err , docs)
    {
    if (err) {seq.session.err = err + ':读取公司数据失败' ; res.redirect('/') ; return ;}
    res.render('adminMainPage', docs) ;
    }) ;
  */
});

//系统管理员查看删除公司页面
router.get('/company', function(req, res) {
  res.send("系统管理员查看公司");
  /*
  Company.get(function(err , docs)
    {
    if (err) {seq.session.err = err + ':读取公司数据失败' ; res.redirect('/admin') ; return ;}
    res.render('adminSetCompanyPage', docs) ;
    }) ;
  */
});

router.post('/company', function(req, res) {
  res.send("系统管理员删除公司");
  /*
  if (! req.body.company) {seq.session.err = '没有上传公司数据' ; res.redirect('/admin/company') ; return ;}
  Company.dele(req.body.company , function(err , sum)
    {
    if (err) {seq.session.err = err + ':删除公司信息失败' ; res.redirect('/admin/company') ; return ;}
    if (sum < 1) {seq.session.err = '公司信息不存在' ; res.redirect('/admin/company') ; return ;}
    if (sum > 1) {seq.session.err = '多个公司信息被删除' ; res.redirect('/admin/company') ; return ;}
    User.dele({_id : req.body.company.userId} , function(err , sum)
      {
      if (err) {seq.session.err = err + ':删除公司帐号失败' ; res.redirect('/admin/company') ; return ;}
      if (sum < 1) {seq.session.err = '公司帐号不存在' ; res.redirect('/admin/company') ; return ;}
      if (sum > 1) {seq.session.err = '多个公司帐号被删除' ; res.redirect('/admin/company') ; return ;}
      res.redirect('/admin/company') ;
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
    if (err) seq.session.err = err + ':获取表单模版失败' ;
      else template = JSON.parse(data) ;
    res.render('adminAddCompanyPage', template) ;
    }) ;
  */
});

router.post('/company/add', function(req, res) {
  res.send("系统管理员添加公司");
  /*
  if (! req.body.company) {seq.session.err = '没有上传公司数据' ; res.redirect('/admin/company/add') ; return ;}
  if (! req.body.user) {seq.session.err = '没有上传帐号数据' ; res.redirect('/admin/company/add') ; return ;}

  var userData = new User(req.body.user) ;
  userData.password = User.hashPassword(userData.password) ;

  req.body.company.userId = userData._id ;
  var companyData = new Company(req.body.company) ;

  Company.saveOne(companyData , function(err , doc)
    {
    if (err) {seq.session.err = err + ':添加公司信息失败' ; res.redirect('/admin/company/add') ; return ;}
    user.save(userData , function(err , doc)
      {
      if (err) {seq.session.err = err + ':添加公司帐号失败' ; res.redirect('/admin/company/add') ; return ;}
      res.redirect('/admin/company') ;
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
