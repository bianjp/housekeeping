var router    = require('express').Router();
var crypto    = require('crypto');
var Employee  = require('../lib/employee.js');

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

router.get('/update', check_login);
router.get('/update', function(req, res){
  res.render('cominfo',{
    title:'中介公司修改信息',
  });
});

/*
 * 功能：查看雇员信息
 * 参数：
 * 返回：
 */
router.get('/employees', check_login);
router.get('/employees', function(req, res){
  Employee.get(req.body.company, function(err, docs){
    if(!docs){
      res.send({
        flag: false,
        message: '没有雇员信息',
      });
    }else{
      res.render('employee',{
        title:'中介公司管理雇员',
        employees: docs,
      });
    }
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
router.get('/employees/add', function(req, res){
  res.render('addemploy',{
    title: '增加雇员',
  });
});
router.post('/employees/add', function(req, res){
  var newEmployee = new User({
    company          :   req.body.company,         //公司的id
    name             :   req.body.name,
    birthday         :   req.body.birthday,
    nativePlace      :   req.body.nativePlace,
    isMarried        :   req.body.isMarried,
    education        :   req.body.education,
    photo            :   req.body.photo,
    height           :   req.body.height,
    weight           :   req.body.weight,
    certificates     :   req.body.certificates,
    languages        :   req.body.languages,
    workExperience   :   req.body.workExperience,
    cookingStyle     :   req.body.cookingStyle,
    specialities     :   req.body.specialities,
    description      :   req.body.description,
    workDetail       :   req.body.workDetail,
  });

  newEmployee.save(function(err){
    if(err){
      res.send({
        flag: false,
        message: '创建失败',
      });
    }else{
       res.send({
        flag: true,
        message: '创建成功',
      });
    }
  });
  
});

/*
 * 功能：更新雇员信息
 * 参数：
 * 返回：
 */
router.post('/employees/update', function(req, res){
  Employee.change(req.body._id, req.body, function(err){
    if(err){
      res.send({
        flag: false,
        message: '更新失败',
      });
    }else{
       res.send({
        flag: true,
        message: '更新成功',
      });
    }
  }); 
});

/*
 * 功能：删除雇员信息
 * 参数：
 * 返回：
 */
router.post('/employees/delete', function(req, res){
  Employee.remove(req.body._id, function(err){
    if(err){
      res.send({
        flag: false,
        message: '删除失败',
      });
    }else{
       res.send({
        flag: true,
        message: '删除成功',
      });
    }
  }); 
});

//批量功能

router.post('/company/employee/batch', function(req, res){
});

router.post('/company/employee', function(req, res){
});



