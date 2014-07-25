//console.log("加载运行admin路由模块") ;

var router = require('express').Router();

var checkId = require('./checkIdentity') ;
var company = require('../lib/company') ;
var user = require('../lib/user') ;

module.exports = router;

//判定是否管理员登录
router.all('/', checkId.checkAdmin) ;

//系统管理员首页
router.get('/', function(req, res){
  res.render('admin', {title: 'admin'}) ;
  /*
  company.list(function(err , doc)
    {
    if (err) {seq.session.err = err + ':读取公司数据失败' ; return(res.redirect('/')) ;}
    return(res.render('adminMainPage', doc)) ;
    }) ;
  */
});

//系统管理员查看删除公司页面
router.get('/company', function(req, res) {
  res.send("系统管理员查看公司");
  /*
  company.list(function(err , doc)
    {
    if (err) {seq.session.err = err + ':读取公司数据失败' ; return(res.redirect('/admin')) ;}
    return(res.render('adminSetCompanyPage', doc)) ;
    }) ;
  */
});

router.post('/company', function(req, res) {
  res.send("系统管理员删除公司");
  /*
  if (! req.body.company) {seq.session.err = '没有上传公司数据' ; return(res.redirect('/admin/company')) ;}
  company.dele(req.body.company , function(err , doc)
    {
    if (err) {seq.session.err = err + ':删除公司信息失败' ; return(res.redirect('/admin/company')) ;}
    if (doc < 1) {seq.session.err = '公司信息不存在' ; return(res.redirect('/admin/company')) ;}
    if (doc > 1) {seq.session.err = '多个公司信息被删除' ; return(res.redirect('/admin/company')) ;}
    user.dele({_id : company.userId} , function(err , doc)
      {
      if (err) {seq.session.err = err + ':删除公司帐号失败' ; return(res.redirect('/admin/company')) ;}
      if (doc < 1) {seq.session.err = '公司帐号不存在' ; return(res.redirect('/admin/company')) ;}
      if (doc > 1) {seq.session.err = '多个公司帐号被删除' ; return(res.redirect('/admin/company')) ;}
      return(res.redirect('/admin/company')) ;}
      }) ;
    }) ;
  */
});

//系统管理员添加公司页面
router.get('/company/add', function(req, res) {
  res.send("系统管理员准备添加公司");
  /*
  var fs = require('fs') ;
  fs.readFile('../lib/companyExample.js' , function(err , data)
    {
    if (err) {seq.session.err = err + ':获取表单模版失败' ; return(res.redirect('/admin/company')) ;}
    var template = JSON.parse(data) ;
    return(res.render('adminAddCompanyPage', template)) ;
    }) ;
  */
});

router.post('/company/add', function(req, res) {
  res.send("系统管理员添加公司");
  /*
  if (! req.body.company) {seq.session.err = '没有上传公司数据' ; return(res.redirect('/admin/company/add')) ;}
  if (! req.body.user) {seq.session.err = '没有上传帐号数据' ; return(res.redirect('/admin/company/add')) ;}

  var userData = new user(req.body.user) ;
  req.body.company.userId = new ObjectID.createFromHexString(userData._id.toHexString()) ;
  var companyData = new company(req.body.company) ;

  company.save(companyData , function(err , doc)
    {
    if (err) {seq.session.err = err + ':添加公司信息失败' ; return(res.redirect('/admin/company/add')) ;}
    //if (doc) {seq.session.err = '公司信息已存在' ; return(res.redirect('/admin/company/add')) ;}
    user.save(userData , function(err , doc)
      {
      if (err) {seq.session.err = err + ':添加公司帐号失败' ; return(res.redirect('/admin/company/add')) ;}
      //if (doc) {seq.session.err = '公司帐号已存在' ; return(res.redirect('/admin/company/add')) ;}
      return(res.redirect('/admin/company')) ;}
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
