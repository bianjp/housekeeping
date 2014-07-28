var router = require('express').Router();

module.exports = router;

router.get('/', function(req, res){
  var company = {
    name: '汇爱家政',
    logo: '/images/logos/logo.jpg',
    registeredAt: new Date(),
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
  res.render('company/index',{
    title: company.name,
    company: company
  });
});

router.get('/employees', function(req, res){
  res.render('company',{
    title:'中介公司管理雇员',
  });
});

router.post('/update', function(req, res){
  res.render('company',{
    title:'中介公司修改信息',
  });
});

router.post('/employees/add', function(req, res){
});

router.post('/employees/update', function(req, res){
});

router.post('/employees/delete', function(req, res){
});

//批量功能

router.post('/company/employee/batch', function(req, res){
});

router.post('/company/employee', function(req, res){
});



