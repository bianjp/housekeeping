var db = require('./db').getConnection();

function Employee(employee) {
  this.company          =   employee.company;         //公司的id
  this.name             =   employee.name;
  this.birthday         =   employee.birthday;
  this.nativePlace      =   employee.nativePlace;
  this.isMarried        =   employee.isMarried;
  this.education        =   employee.education;
  this.photo            =   employee.photo;
  this.height           =   employee.height;
  this.weight           =   employee.weight;
  this.certificates     =   employee.certificates;
  this.languages        =   employee.languages;
  this.workExperience   =   employee.workExperience;
  this.cookingStyle     =   employee.cookingStyle;
  this.specialities     =   employee.specialities;
  this.description      =   employee.description;
  this.workDetail       =   employee.workDetail;
};

module.exports = Employee;

/*
 * 功能：新增公司雇员
 * 参数：null
 * 返回：数据对象
 */
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

/*
 * 功能：得到本公司所有雇员
 * 参数：company的id
 * 返回：数据对象
 */
Employee.get = function get(com, callback) {
  db.collection('employees', function(err, collection) {
    if(err){
      //B
      console.log('数据库接入错误，错误代码B');
      callback(err);
    }
    collection.find({company: com}).toArray(function(err, docs){
      if(docs){
        callback(err, docs);
      }else{
        cons.log("未找到相关中介公司员工");
        callback(err, null);
      }
    });
  });
};

/*
 * 功能：删除本公司的雇员
 * 参数：雇员id
 * 返回：null
 */
Employee.remove = function remove(id, callback) {
  db.collection('employees', function(err, collection) {
    if(err){
      //C
      console.log('数据库接入错误，错误代码C');
      callback(err);
    }
    collection.remove({_id : id}, {w : 1}, function(err, result){
      if(err){
        console.log("删除失败");
        callback(err);
      }else{
        callback(err, result);
      }
    });
  });
};

/*
 * 功能：更新雇员信息
 * 参数：雇员id，被更改信息
 * 返回：result
 */

Employee.change = function change(userid, data, callback) {
  db.collection('employees', function(err, collection){
    if(err){
      //D
      console.log('数据库接入错误，错误代码D');
    }
    collection.update({_id: userid}, {$set: data}, {w: 1}, function(err, result){ 
      if(err){
        console.log('修改数据失败');
        callback(err);
      }
    });
  });
}; 

