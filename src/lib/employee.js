var db = require('./db').getConnection();

function Employee(employee) {
  this.company          =   employee.company,
  this.name             =   employee.name,
  this.birthday         =   employee.birthday,
  this.nativePlace      =   employee.nativePlace,
  this.isMarried        =   employee.isMarried,
  this.education        =   employee.education,
  this.photo            =   employee.photo,
  this.height           =   employee.height,
  this.weight           =   employee.weight,
  this.certificates     =   employee.certificates,
  this.languages        =   employee.languages,
  this.workExperience   =   employee.workExperience,
  this.cookingStyle     =   employee.cookingStyle,
  this.specialities     =   employee.specialities,
  this.description      =   employee.description,
  this.workDetail       =   employee.workDetail,
};

module.exports = Employee;

Employee.prototype.save = function save(callback) {
  var employee = {
    name: this.name,
    company: this.company,
    birthday: this.birthday,
    nativePlace: this.nativePlace,
    isMarried: this.isMarried,
    education: this.education,
    photo: this.photo,
    height: this.height,
    weight: this.weight,
    certificates: this.certificates,
    languages: this.languages,
    workExperience: this.workExperience,
    cookingStyle: this.cookingStyle,
    specialities: this.specialities,
    description: this.description,
    workDetail: this.workDetail
  };
  //进行数据合法性检测
  //
  //
  //如果检测成功继续执行
  db.collection('employees', function(err, collection){
    if(err) {
      //A
      console.log('数据库接入错误，错误代码A');
      callback(err);
    }
    collection.insert(employee, {safe: true}, function(err, user) {
      callback(err, employee);
    });
  });
};

Employee.get = function get(ename, callback) {
  db.collection('employees', function(err, collection) {
    if(err){
      //B
      console.log('数据库接入错误，错误代码B');
      callback(err);
    }
    collection.findOne({name: ename}, function(err, doc){
      if(doc){
        var employee = new Employee(doc);
        callback(err, employee);
      }else {
        callback(err, null);
      }
    });
  });
};

Employee.delete = function delete(id, callback) {
  db.collection('employees', function(err, collection) {
    if(err){
      //C
      console.log('数据库接入错误，错误代码C');
      callback(err);
    }
    collection.remove({_id : id}, {w : 1}, function(err, result){
      callback(err);
    });
};
