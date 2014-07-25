var router = require('express').Router();

module.exports = router;

router.get('/', function(req, res){
  res.render('company',{
    title:'中介公司管理页面',
  });
});

router.get('/employees', function(req, res){
  res.render('company',{
    title:'中介公司管理雇员',
  });
});

router.post('/update', function(req, res){
  res.render('company',{
    title:'中介公司修改信息',
  });
});

router.post('/employees/add', function(req, res){
});

router.post('/employees/update', function(req, res){
});

router.post('/employees/delete', function(req, res){
});

//批量功能

router.post('/company/employee/batch', function(req, res){
});

router.post('/company/employee', function(req, res){
});



