var express = require('express') ;
var router = express.Router() ;

module.exports = router ;

//GET pages
//pre-condition-route:/admin

//系统管理员首页
router.get('/' , function(req , res)
  {//获取某些重要信息放在首页
  res.send("系统管理员主页显示") ;
  }
) ;

//系统管理员查看删除公司页面
router.get('/company' , function(req , res)
  {//获取公司列表
  res.send("系统管理员查看公司") ;
  }
) ;
router.post('/company' , function(req , res)
  {//提交删除表单
  res.send("系统管理员删除公司") ;
  }
) ;

//系统管理员添加公司页面
router.get('/company/add' , function(req , res)
  {//获取公司信息表单
  res.send("系统管理员准备添加公司") ;
  }
) ;
router.post('/company/add' , function(req , res)
  {//提交添加表单
  res.send("系统管理员添加公司") ;
  }
) ;

//系统管理员修改公司信息页面
router.get('/company/update' , function(req , res)
  {//获取修改后的公司信息表单
  res.send("系统管理员准备修改公司信息") ;
  }
) ;
router.post('/company/update' , function(req , res)
  {//提交修改表单
  res.send("系统管理员修改公司信息") ;
  }
) ;

