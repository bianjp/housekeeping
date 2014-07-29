var crypto  =  require('crypto');

var db = require('./db') ;

function User(user) {
  if (! user) user = {} ;

  this.createdAt = (user.createdAt ? new Date(user.createdAt) : new Date()) ;
  this.username = (user.username ? user.username : '');
  this.password = (user.password ? user.password : '');
  this.role = (user.role ? user.role : 'company') ;

  return(null) ;
};

//save a user to database
User.save = function (user , callback) {
  return(db.getConnection().collection('users', function(err, collection){
    if(err) {
      return callback(err);
    }
    collection.insert(new User(user), {safe: true}, function(err, docs) {
      if(err) {
        return callback(err);
      }
      if (docs.length <= 0) {callback('没有返回doc') ; return ;}
      callback(err, docs[0]);
    });
  }));
};

//get one by name
User.get = function (user, callback) {
  return(db.getConnection().collection('users', function(err, collection) {
    if(err){
      return callback(err);
    }
    collection.findOne(user, callback);
  }));
};

//delete by _id or name
User.dele = function (user, callback) {
  return(db.getConnection().collection('users', function(err, collection) {
    if(err) return callback(err);
    collection.remove(user, callback);
  }));
};

//哈希密码
User.hashPassword = function(password)
{
  var md5 = crypto.createHash('md5');
  return(md5.update(password).digest('hex'));
};

module.exports = User;

/*------单元测试------
db.connect(function()
  {
  var fs = require('fs') ;
  fs.readFile('./userExample.js' , function(err , data)
    {
    if (err) throw err ;
    var u1 ;
    u1 = JSON.parse(data) ;
    //console.dir(u1) ;
    //u1 = eval('(' + data + ')') ;
    //console.dir(u1) ;

    ///*save测试
    u1 = new User({username: 'gm2' , password: '2' , role: 'company'}) ;
    u1.password = User.hashPassword(u1.password) ;
    console.dir(u1) ;
    User.save(u1 , function(err , doc)
      {
      if (err) throw err ;
      console.dir(doc) ;
      }) ;
    //
    ///*dele删除
    User.dele({username : 'gm2'} , function(err , sum)
      {
        if (err) throw err ;
        console.dir(sum) ;
      }) ;
    //
    ///*get查询
    User.get({username : 'gm1'} , function(err , doc)
      {
        if (err) throw err ;
        console.dir(doc) ;
      }) ;
    //
    }) ;
  }) ;
//*/
