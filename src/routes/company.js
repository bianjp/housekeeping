var router    = require('express').Router();
var crypto    = require('crypto');
var Employee  = require('../lib/employee.js');
var Company   = require('../lib/company.js');
var db        = require('../lib/db').getConnection();
var async     = require('async');

module.exports = router;

function check_login(req, res, next) {
  if (/[^\/]{24}/.test(req.path)){  //homepage of company
    next();
  }
  else if(!req.session.user || req.session.user.role != 'company'){
    if (req.xhr) {
      // 是AJAX请求
      res.send({
        flag : false,
        message: '未登录，无权限.'
      });
    } else {
      // 普通请求
      res.redirect('/');
    }
  }
  else{
    next();
  }
};

router.use('/', check_login); //检查session

router.get('/', function(req, res){
  Company.getOne({_id: req.session.user.companyId}, function(err, item){
    res.render('company/index',{
      title: item && item.name,
      company: item
    });
  });
});

router.get('/update', function(req, res){
  var company = {
    name: '汇爱家政',
    logo: '/images/logos/logo.jpg',
    businessScope: ['保姆', '月嫂', '老人陪护', '钟点工'],
    serviceRegions: [
      {
        city: '广州',
        regions: ['海珠区', '天河区']
      }
    ],
    guarantees: ['准时达', '不满意退货'],
    about: '<p>广州蓓爱教育信息咨询有限公司（品牌：汇爱）是一家专业从事家庭服务的大型品牌企业，成立于2009年9月，是广州家庭服务业协会副会长单位，国家家政服务工程支持单位。随着公司不断发展，公司目前在广州开设7个分中心：广州天河中心、广州海珠中心、广州越秀中心、广州番禺中心，广州天河珠江新城中心、广州荔湾中心、佛山服务中心。<p>\
    <p>汇爱结合国内的家庭服务的实际状况及市场需要，打造出汇爱家政服务、汇爱家庭早教、汇爱月子护理等品牌项目。汇爱家庭服务，汇聚爱的力量为家庭服务，不仅要扎实为家庭服务，更要帮助更多的人成功，成为行业的先驱，汇爱家庭服务要做全国行业的表率，汇爱家庭服务要把完整的服务普及家庭。愿我们共同合作，让每个家庭、每个孩子受益！</p>',
    contacts: {
      website: 'http://aijia.com',
      email: 'huiai@gmail.com',
      fixedPhone: '020-22233344',
      mobilePhone: '1380000000',
      address: '广州市海珠区财智大厦616',
      contact: '张三'
    }
  };
  res.render('company/update',{
    title: company.name,
    company: company
  });
});

/*
 * 功能：查看雇员信息
 * 参数：公司ID
 * 返回：雇员数组
 */
/*
router.get('/employees', function(req, res){
  Employee.get(req.body.company, function(err, docs){
    if(!docs){
      res.send({
        flag: false,
        message: '没有雇员信息',
      });
    }else{
      res.render('employee',{
        title:'中介公司管理雇员',
        employees: docs,
      });
    }
  });

});
*/
router.get('/employees', function(req, res){
  async.waterfall([
    function(callback){
      db.collection('employees', callback);
    },

    function(col, callback){
      col.find({company: req.session.user.companyId}).toArray(callback);
    }
  ],

  function(err, items){
    res.render('company/employees', {
      title: '雇员管理',
      employees: items
    });
  });
});

/*
 * 功能：中介公司修改信息
 * 参数：
 * 返回：
 */
router.post('/update', function(req, res){
  Company.update(req.body.company, req.comdata, function(err){
    if(err){
      res.send({
        flag: false,
        message: '更新失败',
      });
    }else{
       res.send({
        flag: true,
        message: '更新成功',
      });
    }
  });
});

/*
 * 功能：增加雇员信息
 * 参数：无形参
 * 返回：
 */
router.get('/employee/add', function(req, res){
  res.render('company/add_employee',{
    title: '增加雇员',
  });
});

router.post('/employees/add', function(req, res){
  /*
  var newEmployee = new User({
    company          :   req.body.company,         //公司的id
    name             :   req.body.name,
    birthday         :   req.body.birthday,
    nativePlace      :   req.body.nativePlace,
    isMarried        :   req.body.isMarried,
    education        :   req.body.education,
    photo            :   req.body.photo,
    height           :   req.body.height,
    weight           :   req.body.weight,
    certificates     :   req.body.certificates,
    languages        :   req.body.languages,
    workExperience   :   req.body.workExperience,
    cookingStyle     :   req.body.cookingStyle,
    specialities     :   req.body.specialities,
    description      :   req.body.description,
    workDetail       :   req.body.workDetail,
  });

  newEmployee.save(function(err){
    if(err){
      res.send({
        flag: false,
        message: '创建失败',
      });
    }else{
       res.send({
        flag: true,
        message: '创建成功',
      });
    }
  });
  */

  res.send({
    flag: false,
    message: 'backend not set up yet'
  })
});

/*
 * 功能：更新雇员信息
 * 参数：雇员ID和被修改对象
 * 返回：
 */
router.post('/employee/update', function(req, res){
  //update的data部分必须是MongoDB的对象
  Employee.change(req.body._id, req.data, function(err){
    if(err){
      res.send({
        flag: false,
        message: '更新失败',
      });
    }else{
       res.send({
        flag: true,
        message: '更新成功',
      });
    }
  });
});

/*
 * 功能：删除雇员信息
 * 参数：雇员ID
 * 返回：
 */
router.post('/employees/delete', function(req, res){
  Employee.remove(req.body._id, function(err){
    if(err){
      res.send({
        flag: false,
        message: '删除失败',
      });
    }else{
       res.send({
        flag: true,
        message: '删除成功',
      });
    }
  });
});

//批量功能

router.post('/company/employee/batch', function(req, res){
});

router.post('/company/employee', function(req, res){
});

router.get('/employee/delete/:id', function(req, res){
  res.send({
    flag: false,
    message: 'backend not set up yet'
  })
})

router.get('/employee/update', function(req, res){
  res.render('company/update_employee', {
    title: 'company update employee',
    employee : {
      name: '我是雇员名字',
      birthday: '21000101',
      workDetail: {
        workType: 'workType'
      }
    }
  })
})
