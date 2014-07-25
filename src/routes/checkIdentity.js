exports.checkAdmin = function checkAdmin(req , res , next)
  {
  if (req.session.user)
     if (req.session.user.role === 'admin')
      return(next()) ;
  req.session.err = 'error:无权限访问' ;
  console.log(req.session.err) ;
  return(res.redirect('/')) ;
  }

exports.checkCompany = function checkCompany(req , res , next)
  {
  if (req.session.user)
    if (req.session.user.role === 'company')
      return(next()) ;
  req.session.err = 'error:无权限访问' ;
  console.log(req.session.err) ;
  return(res.redirect('/')) ;
  }

exports.checkLogin = function checkLogin(req , res , next)
  {
  if (req.session.user) return(next()) ;
  req.session.err = 'error:未登录' ;
  console.log(req.session.err) ;
  return(res.redirect('/login')) ;
  }

exports.checkNotLogin = function checkNotLogin(req , res , next)
  {
  if (req.session.user) return(next()) ;
  req.session.err = 'error:已登录' ;
  console.log(req.session.err) ;
  return(res.redirect('/')) ;
  }
