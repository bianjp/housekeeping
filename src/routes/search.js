var db = require('../lib/db').getConnection();
var router    = require('express').Router();
module.exports = router;

var async = require('async');
var workTypes = ['钟点工', '宅速洁', '保姆', '育儿嫂', '护理', '早出晚归'];

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
    type : req.query.type || 0,
  });
});

var getEmployees = function(query, options, outsideCallback){
  var employees;
  async.waterfall([
    function(callback){
      db.collection('employees', callback);
    },

    function(col, callback){
      col.find(query, options).toArray(callback);
    },

    function(docs, callback){
      if (!docs || !docs.length){
        outsideCallback(null, []);
      }
      else {
        employees = docs;
        db.collection('companies', callback);
      }
    },

    function(col, callback){
      var ids = employees.map(function(item){
        return item.company;
      });
      col.find({_id: {$in: ids}}, {fields: {logo: 1, name: 1}}).toArray(callback);
    }
  ],

  function(err, items){
    var docs = employees;
    if (!err && items){
      var temp = {};
      for(var i = 0; i < items.length; i++){
        temp[items[i]._id.toString()] = items[i];
      }
      for(var j = 0; j < docs.length; j++){
        docs[j]["company_property"] = temp[docs[j].company.toString()];
      }
    }
    outsideCallback(err, docs);
  });
};

var getSearchOptions = function(req){
  var query = {
    "workDetail.workType": workTypes[req.query.type || 0]
  };
  if (req.query.workArea){
    query["workDetail.workArea"] = req.query.workArea;
  }
  if (req.query.workTime){
    query["workDetail.workTime"] = req.query.workTime;
  }
  if (req.query.workContent){
    var workContent = req.query.workContent;
    if (workContent instanceof Array)
      query["workDetail.workContent"] = {$all: workContent};
    else
      query["workDetail.workContent"] = workContent;
  }
  return query;
};

router.get('/employee', function(req, res){
  var query = getSearchOptions(req);
  getEmployees(query, {}, function(err, docs){
    res.render("search/employee_result", {
      title : "雇员搜索",
      type: req.query.type || 0,
      employees : docs || []
    });
  });
});

 /*
 * 功能: 雇员搜索-页面2
 * 参数: 年龄, 资历, 薪酬, 擅长语言, 保障内容 (页面跳转)
 * 返回: 搜索结果
 */

router.post('/employee', function(req, res){
  var query = getSearchOptions(req);

  if(req.body.age){
    var age = req.body.age.split('-');
    var thisYear = new Date().getFullYear();
    query["birthday"] = {
      $gte: new Date(thisYear - parseInt(age[1]), 0, 1),
      $lte: new Date(thisYear - parseInt(age[0]), 0, 1)
    };
  }

  //资历
  if(req.body.workExperience){
    var experience = req.body.workExperience.split('-');
    query["workExperience"] = {
      $gte: parseInt(experience[0]),
      $lte: parseInt(experience[1])
    };
  }

  //薪酬
  if(req.body.salary){
    var strsal = req.body.salary.split('-');
    var lsal = parseInt(strsal[0]);
    var usal = parseInt(strsal[1]);
    query['$or'] = [
      {upsalary :{$gte : lsal, $lte : usal}},
      {lowsalary :{$gte : lsal, $lte : usal}}
    ];
  }
  //语言
  if(req.body.languages){
    var languages = req.body.languages instanceof Array ? req.body.languages : [req.body.languages];
    query["languages"] = {$in: languages};
  }

  //保障内容
  if(req.body.guarantees){
    var guarantees = req.body.guarantees instanceof Array ? req.body.guarantees : [req.body.guarantees];
    query["guarantees"] = {$in: guarantees};
  }

  //附加选项
  var options = {
  //分页选项
  //"limit": 20,
  //"skip" : 10,
    "sort" : [['workDetail.salary', 'asc'], ['name', 'asc']]
  };

  getEmployees(query, options, function(err, docs){
    res.send({
      flag: !err,
      employees: docs || []
    });
  });
});

/*
 * 功能：中介公司搜索
 * 参数：覆盖地区，涵盖服务，价格区间，经营时间，保障内容
 * 返回: 搜索结果
 */

router.get('/company',function(req, res){
  db.collection('companies', function(err, collection) {
    if(err){
      //D
      console.log('数据库接入错误，错误代码D');
    } else {
      var query = {};
      if (req.query.name){
        query.name = new RegExp(req.query.name);
      }
      collection.find(query).toArray(function(err, docs){
        if(!err){
          res.render("search/company",{
            title : "中介搜索",
            companies : docs,
            name: req.query.name
          });
        }else{
          console.log("未找到相关中介");
        }
      });
    }
  });
 });

router.post('/company', function(req, res){
  //obj_c is company object
  var obj_c = {};

  if (req.body.name){
    obj_c["name"] = new RegExp(req.body.name);
  }
  if (req.body.year){
    var date  = req.body.year.split('-');
    var date1 = new Date ();
    var date2 = new Date (date1.getTime() - parseInt(date[0])*365*24*60*60*1000);
    var date3 = new Date (date1.getTime() - parseInt(date[1])*365*24*60*60*1000);
    obj_c["registeredAt"] = {$gte : date3, $lte : date2}; //经营时间
  }
  if (req.body.serviceRegions){
    var serviceRegions = req.body.serviceRegions;
    serviceRegions = serviceRegions instanceof Array ? serviceRegions : [serviceRegions];
    obj_c["serviceRegions.regions"] = {$in: serviceRegions};
  }
  if (req.body.businessScope){
    var businessScope = req.body.businessScope;
    businessScope = businessScope instanceof Array ? businessScope : [businessScope];
    obj_c['businessScope'] = {$in: businessScope};
  }
  if (req.body.guarantees){
    var guarantees = req.body.guarantees;
    guarantees = guarantees instanceof Array ? guarantees : [guarantees];
    obj_c['guarantees'] = {$all: guarantees};
  }

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
        if(!err){
          res.send({
            flag : true,
            companies : docs,
          });
        }else{
          console.log(err);
          console.log("未找到相关中介");
        }
      });
    }
  });

});
