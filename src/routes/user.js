var router  =  require('express').Router();
var crypto  =  require('crypto');
var User    =  require('../lib/user.js'); 

router.get('/login', function(req, res){
  res.render('login', {
    title:'用户登录',
  });
});

router.post('/login', function(req, res) {
  var md5 = crypto.createHash('md5');
  var password = md5.update(req.body.password).digest('hex');

  User.get(req.body.username, function(err, user){
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
      req.session.user = user;
      res.send({
        flag : true
      });
    };
  });
});

router.get('/logout', function(req, res) {
  req.session.user = null;
  res.send({
    flag : true
  });
  res.redirect('/');
});

module.exports = router;
