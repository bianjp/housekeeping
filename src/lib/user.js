var db = require('./db').getConnection();

function User(user) {
  this._id      = user._id;
  this.username = user.username;
  this.password = user.password;
  this.role     = user.role;
};
module.exports = User;

User.prototype.save = function save(callback) {
  var user = {
    username: this.name,
    password: this.password,
    createdAt: new Date,
    role: "company",
  };

  db.collection('users', function(err, collection){
    if(err) {
      return callback(err);
    }
    collection.insert(user, {safe: true}, function(err, user) {
      callback(err, user);
    });
  });
};

User.get = function get(name, callback) {
  db.collection('users', function(err, collection) {
    if(err){
      return callback(err);
    }
    collection.findOne({username: name}, function(err, doc){
      if(doc){
        var user = new User(doc);
        callback(err, user);
      }else {
        callback(err, null);
      }
    });
  });
};
