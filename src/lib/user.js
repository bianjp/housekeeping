var crypto  =  require('crypto');

var db = require('./db') ;

function User(user) {
  this._id = (user._id ? user._id : db.createObjectID()) ;
  this.createdAt = (user.createdAt ? user.createdAt : new Date()) ;
  this.username = user.username;
  this.password = user.password;
  this.role = (user.role ? user.role : 'company') ;
};

//save a user to database
User.save = function (user , callback) {
  var userData = new User(user) ;

  db.getConnection().collection('users', function(err, collection){
    if(err) {
      return callback(err);
    }
    collection.insert(userData, {safe: true}, function(err, doc) {
      callback(err, doc);
    });
  });
};

//get one by name
User.get = function (user, callback) {
  db.getConnection().collection('users', function(err, collection) {
    if(err){
      return callback(err);
    }
    collection.findOne(user, function(err, doc){
      if(doc){
        var tmp = new User(doc);
        callback(err, tmp);
      }else {
        callback(err, null);
      }
    });
  });
};

//delete by _id or name
User.dele = function (user, callback) {
  db.getConnection().collection('users', function(err, collection) {
    if(err) return callback(err);
    collection.remove(user, callback);
  });
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
    var u1 = JSON.parse(data) ;
    //console.dir(u1) ;
    //var u2 = eval('(' + data + ')') ;
    //console.dir(u2) ;

    ///*存储测试
    u1 = new User(
      {
      username: 'gm2' ,
      password: '2' ,
      role: 'company'
      }) ;
    u1.password = User.hashPassword(u1.password) ;
    console.dir(u1) ;
    User.save(u1 , function(err , doc)
      {
      if (err) throw err ;
      console.dir(doc) ;
      }) ;
    //
    ///*dele删除
    User.dele({username : 'gm2'} , function(err , doc)
      {
        if (err) throw err ;
        console.dir(doc) ;
      }) ;
    //
    ///*get查询
    User.get({username : 'gm2'} , function(err , doc)
      {
        if (err) throw err ;
        console.dir(doc) ;
      }) ;
    //

    }) ;
  }) ;
//*/