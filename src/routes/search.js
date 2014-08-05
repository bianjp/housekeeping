var db = require('../lib/db').getConnection();
var router    = require('express').Router();
module.exports = router;

/*
 * 功能：雇员搜索-页面1
 * 参数：[0, 5]
 *       0 : 钟点工
 *         > 工作地区, 工作内容
 *       1 : 宅速洁
 *         > 工作地区, 工作时长
 *       2 : 住家保姆
 *         > 工作地区, 工作内容
 *       3 : 育儿嫂
 *         > 工作地区, 工作内容
 *       4 : 护理
 *         > 工作地区, 护理对象, 工作内容
 *       5 : 早出晚归
 *         > 工作地区, 工作内容
 * 返回: 结果
 */

router.get('/',function(req, res){
  res.render("search/employee",{
    title : "雇员搜索",
    type : req.query.type,
  });
});

router.get('/employee', function(req, res){
  //obj_e is employee object
  var obj_e = {
    "workDetail.workType"   :   req.query.workType,           //工作类型
    "workDetail.workArea"   :   req.query.workArea, //工作地区
    "workDetail.workTime"   :   req.query.workTime, //工作时间
    "workDetail.workContent":   {$all : [req.query.workContent]}, //工作内容
    //护理对象
  };
  //去掉冗余属性
  if(req.query.workType != "宅速洁"){
    delete obj_e["workDetail.workTime"];
  } else {
    delete obj_e["workDetail.workContent"];
  }
  //存入session中
  req.session.obj_e = obj_e;

  db.collection('employees', function(err, collection) {
    if(err){
      //C
      console.log('数据库接入错误，错误代码C');
    } else {
      collection.find( query, options_e ).toArray(function(err, docs){
        if(docs){
          res.render("search/employee_result",{
            title : "雇员搜索",
            employees : docs, 
          });
         }else{
           console.log("未找到相关雇员");
         }
      });
    }
  });
});

 /*
 * 功能: 雇员搜索-页面2
 * 参数: 年龄, 资历, 薪酬, 擅长语言, 保障内容 (页面跳转)
 * 返回: 搜索结果
 */
 
router.post('/employee', function(req, res){
  //query is the full.
  //年龄信息
  var stryear = req.query.age.split('-');
  var lyear = parseInt(stryear[0]);
  var uyear = parseInt(stryear[1]);
  var date1 = new Date();
  var date2 = new Date(date1.setFullYear(date1.getYear() - lyear));
  var date3 = new Date(date1.setFullYear(date1.getYear() - uyear));
  var query = req.session.obj_e;
  query["birthday"] = {$gte : date3, $lte : date2};

  //资历
  var strexp = req.query.workExperience.split('-');
  var lexp = parseInt(strexp[0]);
  var uexp = parseInt(strexp[1]);
  query["workExperience"] = {$gte : lexp, $lte : uexp};

  //薪酬
  var strsal = req.query.salary.split('-');
  var lsal = parseInt(strsal[0]);
  var usal = parseInt(strsal[1]);
  query['$or'] = [
                  {upsalary :{$gte : lsal, $lte : usal}},
                  {lowsalary :{$gte : lsal, $lte : usal}}
               ];
  //语言
  query["languages"] = {$in : req.query.languages};

  //保障内容
  query["guarantees"] = {$in : req.query.guarantees};

  //附加选项
  var options_e = {
  //分页选项
  //"limit": 20,
  //"skip" : 10,
    "sort" : [['workDetail.salary', 'asc'], ['name', 'asc']]
  };

  db.collection('employees', function(err, collection) {
    if(err){
      //A
      console.log('数据库接入错误，错误代码A');
    } else {
      collection.find( query, options_e ).toArray(function(err, docs){
        if(docs){
           res.render("search/employee_result",{
            title : "雇员搜索",
            employees : docs, 
           });
         }else{
           console.log("未找到相关雇员");
         }
      });
    }
  });
});

/*
 * 功能：中介公司搜索
 * 参数：覆盖地区，涵盖服务，价格区间，经营时间，保障内容
 * 返回: 搜索结果
 */

router.get('/company',function(req, res){
  res.render("search/company",{
    title : "中介搜索",
  });
});

router.post('/company', function(req, res){
  //obj_c is company object
  var date  = req.query.year.split('-');
  var date1 = new Date ();
  var date2 = new Date (date1.getTime() - parseInt(date[0])*365*24*60*60*1000);
  var date3 = new Date (date1.getTime() - parseInt(date[1])*365*24*60*60*1000);
  var obj_c = {
    "serviceRegions.regions"  :   {$in  : req.query.serviceRegions.regions},  //覆盖地区
    "businessScope"           :   {$in  : req.query.businessScope},   //涵盖服务
    "guarantees"              :   {$all : req.query.guarantees},      //保障内容
    "registeredAt"            :   {$gte : date3, $lte : date2}      //经营时间
    //价格区间
  };
  //附加选项
  var options_c = {
  //分页选项
  //"limit": 20,
  //"skip" : 10,
    "sort" : [['registeredAt', 'desc'], ['name', 'asc']]
  };
  
  db.collection('companies', function(err, collection) {
    if(err){
      //B
      console.log('数据库接入错误，错误代码B');
    } else {
      collection.find( obj_c, options_c ).toArray(function(err, docs){
        if(docs){
          res.render("search/company",{
            title : "中介搜索",
            companies : docs, 
          }); 
        }else{
          console.log("未找到相关中介");
        }
      });
    }
  });

});
