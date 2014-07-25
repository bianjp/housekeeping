var router = require('express').Router();
var crypto = require('crypto');
var Employee = require('../lib/employee.js');

module.exports = router;

function check_login(req, res, next) {
  if(!req.session.user){
    console.log("未登录");
    res.send({
      flag : false,
      message: '未登录，无权限.'
    });
    return res.redirect('/');
  }
  next();
};

router.get('/', check_login);
router.get('/', function(req, res){
  res.render('company',{
    title:'中介公司管理页面',
  });
});

router.get('/employees', check_login);
router.get('/employees', function(req, res){
  res.render('employee',{
    title:'中介公司管理雇员',
  });
});

router.get('/update', check_login);
router.get('/update', function(req, res){
  res.render('cominfo',{
    title:'中介公司修改信息',
  });
});

/*
 * 功能：中介公司修改信息
 * 参数：
 * 返回：
 */
router.post('/update', function(req, res){
});

/*
 * 功能：增加雇员信息
 * 参数：
 * 返回：
 */
router.post('/employees/add', function(req, res){
});

/*
 * 功能：更新雇员信息
 * 参数：
 * 返回：
 */
router.post('/employees/update', function(req, res){
});

/*
 * 功能：删除雇员信息
 * 参数：
 * 返回：
 */
router.post('/employees/delete', function(req, res){
});

//批量功能

router.post('/company/employee/batch', function(req, res){
});

router.post('/company/employee', function(req, res){
});



