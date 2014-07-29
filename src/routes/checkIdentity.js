exports.checkAdmin = function checkAdmin(req , res , next)
  {  
  if (req.session.user)
    if (req.session.user.role === 'admin')
      {next() ; return ;}
  req.session.err = 'error:无权限访问' ;
  console.log(req.session.err) ;
  res.redirect('/') ;
  }

exports.checkCompany = function checkCompany(req , res , next)
  {
  if (req.session.user)
    if (req.session.user.role === 'company')
      {next() ; return ;}
  req.session.err = 'error:无权限访问' ;
  console.log(req.session.err) ;
  res.redirect('/') ;
  }

exports.checkLogin = function checkLogin(req , res , next)
  {
  if (req.session.user)
    { next() ; return ;}
  req.session.err = 'error:未登录' ;
  console.log(req.session.err) ;
  res.redirect('/login') ;
  }

exports.checkNotLogin = function checkNotLogin(req , res , next)
  {
  if (! req.session.user)
    { next() ; return ;}
  req.session.err = 'error:已登录' ;
  console.log(req.session.err) ;
  res.redirect('/') ;
  }
