exports.respondGet = function(res , template , jsonObj , err)
{
  if (! jsonObj) jsonObj = {} ;
  jsonObj.flag = (err ? false : true) ;
  jsonObj.message = (err ? err : 'success') ;
  res.render(template , jsonObj) ;
  return ;
} ;

exports.respondPost = function(res , jsonObj , err)
{
  if (! jsonObj) jsonObj = {} ;
  jsonObj.flag = (err ? false : true) ;
  jsonObj.message = (err ? err : 'success') ;
  res.send(jsonObj) ;
  return ;
} ;
