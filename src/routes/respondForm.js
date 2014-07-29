exports.respondGet = function(res , template , jsonObj , err)
{
  if (! jsonObj) jsonObj = {} ;
  jsonObj.flag = (err ? false : true) ;
  jsonObj.message = err ;
  return(res.render(template , jsonObj)) ;
} ;

exports.respondPost = function(res , jsonObj , err)
{
  if (! jsonObj) jsonObj = {} ;
  jsonObj.flag = (err ? false : true) ;
  jsonObj.message = err ;
  return(res.send(jsonObj)) ;
} ;
