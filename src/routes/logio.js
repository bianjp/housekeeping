var router  =  require('express').Router();
var crypto  =  require('crypto');
var User    =  require('../lib/user.js'); 

router.get('/', function(req, res){
  res.render('logio', {
    title:'用户登录',
  });
});

router.post('/', function(req, res) {
  var md5 = crypto.createHash('md5');
  var password = md5.update(req.body.password).digest('base64');

  User.get(req.body.username, function(err, user){
    if(!user){
      req.flash('error', '用户不存在');
      return res.redirect('/login');
    }
    if (user.password != password){
      req.flash('error', '用户口令错误');
      return res.redirect('/login');
    }
    req.session.user = user;
    req.flash('success', '登入成功');
    res.redirect('/');
  });
});

router.get('/logout', function(req, res) {
  req.session.user = null;
  req.flash('success', '登出成功');
  res.redirect('/');
});

module.exports = router;
