var router = require('express').Router();
var ObjectID = require('mongodb').ObjectID ;

var checkId = require('./checkIdentity') ;
var rF = require('./respondForm') ;
var Company = require('../lib/company') ;
var User = require('../lib/user') ;

module.exports = router;

//判定是否管理员登录
router.use('/', checkId.checkAdmin) ;

//系统管理员首页
router.get('/', function(req, res){
  Company.get(null , function(err , docs)
  {
    if (err) {rF.respondGet(res , 'adminMainPage' , {} , err + '->读取公司数据失败') ; return ;}
    /*
    var companies = [];
    for(var i = 0 ; i < docs.length ; i ++) companies[i] = docs[i] ;
    for (var i = docs.length; i < 100 ; i++) {
      companies[i] = {
        _id: i,
        name: 'Company ' + i
      }
    }
    */
    rF.respondGet(res , 'admin/index' , {title : 'admin homepage' , companies : docs}) ;
    /*
    res.render('admin/index', {
      title:'admin homepage',
      companies: companies
    });
    */
  }) ;
  /*
  var companies = [];
  var i;
  for (i = 0; i < 100; i++) {
    companies[i] = {
      _id: i,
      name: 'Company ' + i
    }
  }
  res.render('admin/index', {
    title:'admin homepage',
    companies: companies
  });
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
  /*
  var fs = require('fs') ;
  var template = null ;
  fs.readFile('../lib/companyExample.js' , function(err , data)
    {
    if (err) {rF.respondGet(res , 'adminAddCompanyPage' , {} , err + '->获取表单模版失败') ; return ;}
    rF.respondGet(res , 'adminAddCompanyPage' , JSON.parse(data)) ;
    }) ;
  */
  rF.respondGet(res , 'admin/add' , {title : 'admin add company'}) ;
  //res.render('admin/add', {title: 'admin add company'}) ;
});

router.post('/company/add', function(req, res) {
  //console.log(req.body) ;
  //if (! req.body.user) {rF.respondPost(res , {} , '没有上传帐号数据') ; return ;}
  //if (! req.body.company) {rF.respondPost(res , {} , '没有上传公司数据') ; return ;}
  if (! req.body.username) {rF.respondPost(res , {} , '没有上传帐号数据') ; return ;}
  if (! req.body.password) {rF.respondPost(res , {} , '没有上传密码数据') ; return ;}
  if (! req.body.companyName) {rF.respondPost(res , {} , '没有上传公司名数据') ; return ;}

  var userData = new User({username : req.body.username , password : req.body.password}) ;
  userData.password = User.hashPassword(userData.password) ;
  //console.dir(userData) ;

  User.save(userData , function(err , doc)
  {
    if (err) {rF.respondPost(res , {} , err + '->添加公司帐号失败') ; return ;}
    //console.dir(doc) ;
    var companyData = new Company({name : req.body.companyName , userId : doc._id}) ;
    //console.dir(companyData) ;

    Company.saveOne(companyData , function(err , doc)
    {
      if (err) {rF.respondPost(res , {} , err + '->添加公司信息失败') ; return ;}
      //console.dir(doc) ;
      rF.respondPost(res , doc) ;
    }) ;
  }) ;
  /*
  res.send({
    flag: false,
    message: 'backend not set up yet'
  });
  */
});

//系统管理员修改公司信息页面
router.get('/company/update', function(req, res) {
  //console.log(req.query.id) ;
  var idData = new ObjectID(req.query.id) ;
  //console.log(tmp) ;
  //获取公司信息和帐号信息
  Company.getOne({_id : idData} , function(err , companyDoc)
  {
    if (err) {rF.respondGet(res , 'admin/update' , {title : 'admin update company'} , err + '->获取公司信息失败') ; return ;}
    //console.log(companyDoc) ;
    if ((! companyDoc) || (! companyDoc.userId))
    {
      rF.respondGet(res , 'admin/update' , {title : 'admin update company'} , err + '->获取帐号信息失败') ; return ;
    }
    User.get({_id : companyDoc.userId} , function(err , userDoc)
    {
      if (err) {rF.respondGet(res , 'admin/update' , {title : 'admin update company'} , err + '->获取帐号信息失败') ; return ;}
      //console.log(userDoc) ;
      rF.respondGet(res , 'admin/update' ,
      {
        title : 'admin update company' ,
        company : {
          username : userDoc.username ,
          companyName : companyDoc.name
        }
      }) ;
    }) ;
  }) ;
  /*
  rF.respondGet(res , 'admin/update' ,
  {
    title : 'admin update company' ,
    company : {
      username : '我是名称' ,
      companyName : '我是公司名称'
    }
  }) ;
  */
  /*
  res.render('admin/update',{
    title: 'admin update company',
    flag: true,
    company: {
      username: '我是名称' ,
      companyName: '我是公司名称'
    }
  }) ;
  */
});

router.post('/company/update', function(req, res) {
  res.send("系统管理员修改公司信息");
});

router.get('/company/delete/:id', function(req, res) {
  //console.dir(req.params) ;
  //console.dir(req.params.id.length) ;
  //if (! req.body.company) {rF.respondPost(res , {} , '没有上传公司数据') ; return ;}
  if (! req.params.id.length) {rF.respondPost(res , {} , '没有上传公司数据') ; return ;}

  var tmp = '' ;
  for(var i = 4 ; i < req.params.id.length ; i ++) tmp += req.params.id[i] ;
  //console.log(tmp) ;
  var idData = new ObjectID(tmp) ;
  //console.log(idData) ;

  Company.getOne({_id : idData} , function(err , doc)
  {
    if (err) {rF.respondPost(res , {} , err + '->找不到公司信息') ; return ;}
    //console.log(doc) ;
    var companyId = doc._id ;
    var userId = doc.userId ;
    Company.dele({_id : companyId} , function(err , sum)
    {
      if (err) {rF.respondPost(res , {} , err + '->删除公司信息失败') ; return ;}
      //console.log(sum) ;
      if (sum < 1) {rF.respondPost(res , {} , '公司信息不存在') ; return ;}
      if (sum > 1) {rF.respondPost(res , {} , '多个公司信息被删除') ; return ;}
      User.dele({_id : userId} , function(err , sum)
      {
        if (err) {rF.respondPost(res , {} , err + '->删除公司帐号失败') ; return ;}
        //console.log(sum) ;
        if (sum < 1) {rF.respondPost(res , {} , '公司帐号不存在') ; return ;}
        if (sum > 1) {rF.respondPost(res , {} , '多个公司帐号被删除') ; return ;}
        rF.respondPost(res , {}) ;
      }) ;
    }) ;
  }) ;
  /*
  res.send({
    flag: false,
    message: 'backend not set up yet..'
  });
  */
})
