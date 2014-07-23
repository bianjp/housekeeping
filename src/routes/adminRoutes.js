var express = require('express') ;
var router = express.Router() ;

//GET pages

//系统管理员首页
///admin
router.get('/admin' , function(req , res)
  {
  res.send("系统管理员主页显示") ;
  }
) ;

//系统管理员查看删除公司页面
///admin/company
router.get('/admin/company' , function(req , res)
  {
  res.send("系统管理员查看公司") ;
  }
) ;
router.post('/admin/company' , function(req , res)
  {
  res.send("系统管理员删除公司") ;
  }
) ;

//系统管理员添加公司页面
///admin/company/add
router.get('/admin/company/add' , function(req , res)
  {
  res.send("系统管理员准备添加公司") ;
  }
) ;
router.post('/admin/company/add' , function(req , res)
  {
  res.send("系统管理员添加公司") ;
  }
) ;

//系统管理员修改公司信息页面
///admin/company/update
router.get('/admin/company/update' , function(req , res)
  {
  res.send("系统管理员准备修改公司信息") ;
  }
) ;
router.post('/admin/company/update' , function(req , res)
  {
  res.send("系统管理员修改公司信息") ;
  }
) ;

module.exports = router ;
