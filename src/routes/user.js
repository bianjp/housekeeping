var router  =  require('express').Router();

var checkId = require('./checkIdentity') ;
var User    =  require('../lib/user.js');

module.exports = router;

//判定是否未登录
router.all('/login', checkId.checkNotLogin) ;
//判定是否已登录
router.all('/logout', checkId.checkLogin) ;

//登录界面
router.get('/login', function(req, res){
  res.render('login', {
    title:'用户登录',
  });
});

//登录
router.post('/login', function(req, res) {
  var password = User.hashPassword(req.body.password) ;

  User.get({username: req.body.username}, function(err, user){
    if(!user){
      res.send({
        flag : false,
        message : "用户名或密码不存在",
      });
    } else if (user.password != password){
      res.send({
        flag : false,
        message : "用户名或密码不存在",
      });
    } else {
      delete user.password;
      req.session.user = user;
      res.send({
        flag : true
      });
    };
  });
});

//登出界面
router.get('/logout', function(req, res) {
  req.session.user = null;
  res.send({
    flag : true
  });
  res.redirect('/') ;
});

//用户个人界面
router.get('/profile', function(req, res) {
  res.send("用户个人界面") ;
});
