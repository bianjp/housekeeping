var fs = require('fs') ;
var csv = require('csv');


exports.readFromFile = function(path , callback)
{
  fs.readFile(path , {encoding: 'utf-8'} , function(err , data)
  {
    if (err) {callback(err) ; return ;}
    csv.parse(data , function(err , table)
    {
      if (err) {callback(err) ; return ;}
      var docs = toArray(table) ;
      callback(null , docs) ; //注意：这里doc没有所属公司和图片地址
    }) ;
  }) ;
} ;

exports.writeToFile = function(path , docs , callback)
{
  var table = toTable(docs) ;
  var data = csv.stringify(table) ;
  fs.writeFile(path , data , function(err)
  {
    if (err) callback(err) ;
    callback ;
  });
} ;

function toArray(table)
{
  var docs = [] ;

  for(var i = 1 ; i < table.length ; i ++)
  {
    if (! table[i][0]) continue ;
    var employee = {} ;

    employee.name = judgeExist(table[i][0]) ;
    employee.gender = judgeGender(table[i][1]) ;
    employee.birth = new Date(table[i][2]) ;
    employee.nativePlace = judgeExist(table[i][3]) ;
    employee.isMarried = judgeMarried(table[i][4]) ;
    employee.education = judgeExist(table[i][5]) ;
    employee.height = judgeExist(table[i][6]) ;
    employee.weight = judgeExist(table[i][7]) ;
    employee.certificates = parseSet(table[i][8]) ;
    employee.languages = parseSet(table[i][9]) ;
    employee.workExperience = judgeExist(table[i][10]) ;
    employee.cookingStyle = parseSet(table[i][11]) ;
    employee.specialities = parseSet(table[i][12]) ;
    employee.description = judgeExist(table[i][13]) ;
    //workDetail
    //workType
    employee.workDetail = [] ;
    var tmp = parseSet(table[i][14]) ;
    for(var j = 0 ; j < tmp.length ; j ++)
    {
      employee.workDetail[j] = {} ;
      employee.workDetail[j].workType = tmp[j] ;
    }
    if (employee.workDetail.length <= 0) {docs[i - 1] = employee ; continue ;}
    //workArea
    employee.workDetail[0].workArea = parseSet(table[i][15]) ;
    for(var j = 1 ; j < employee.workDetail.length ; j ++)
    {
      employee.workDetail[j].workArea = [] ;
      for(var k = 0 ; k < employee.workDetail[0].workArea.length ; k ++)
        employee.workDetail[j].workArea[k] = employee.workDetail[0].workArea[k] ;
    }
    //workContent
    employee.workDetail[0].workContent = parseSet(table[i][16]) ;
    for(var j = 1 ; j < employee.workDetail.length ; j ++)
    {
      employee.workDetail[j].workContent = [] ;
      for(var k = 0 ; k < employee.workDetail[0].workContent.length ; k ++)
        employee.workDetail[j].workContent[k] = employee.workDetail[0].workContent[k] ;
    }
    //salary
    tmp = parseSet(table[i][17]) ;
    var low = 1000000 ;
    var up = 0 ;
    for(var j = 0 ; j < tmp.length ; j ++)
    {
      var num = parseInt(tmp[j]) ;
      if (isNaN(num)) continue ;
      low = (low < num ? low : num) ;
      up = (up > num ? up : num) ;
    }
    if (low > up) low = 0 ;
    employee.workDetail[0].lowsalary = low ;
    employee.workDetail[0].upsalary = up ;
    for(var j = 1 ; j < employee.workDetail.length ; j ++)
    {
      employee.workDetail[j].lowsalary = employee.workDetail[0].lowsalary ;
      employee.workDetail[j].upsalary = employee.workDetail[0].upsalary ;
    }
    //workTime
    employee.workDetail[0].workTime = judgeExist(table[i][18]) ;
    for(var j = 1 ; j < employee.workDetail.length ; j ++)
    {
      employee.workDetail[j].workTime = employee.workDetail[0].workTime ;
    }
    //vacation
    employee.workDetail[0].vacation = judgeExist(table[i][19]) ;
    for(var j = 1 ; j < employee.workDetail.length ; j ++)
    {
      employee.workDetail[j].vacation = employee.workDetail[0].vacation ;
    }

    docs[i - 1] = employee ;
  }

  return(docs) ;
} ;

function toTable(docs)
{
  var table = [] ;

  return(table) ;
} ;

function judgeGender(data)
{
  if (data == '男性') return('male') ;
  if (data == '女性') return('female') ;
  if (data == '男') return('male') ;
  if (data == '女') return('female') ;
  if (data == 'man') return('male') ;
  if (data == 'woman') return('female') ;
  if (data == 'Man') return('male') ;
  if (data == 'Woman') return('female') ;
  if (data == 'MAN') return('male') ;
  if (data == 'WOMAN') return('female') ;
  if (data == 'male') return('male') ;
  if (data == 'female') return('female') ;
  if (data == 'Male') return('male') ;
  if (data == 'Female') return('female') ;
  if (data == 'MALE') return('male') ;
  if (data == 'FEMALE') return('female') ;
  return('') ;
}

function judgeExist(data)
{
  if (data)
    return(data) ;
  else
    return(null) ;
}

function judgeMarried(data)
{
  if (data == '0') return(false) ;
  if (data == '1') return(true) ;
  if (data == '未婚') return(false) ;
  if (data == '已婚') return(true) ;
  if (data == '否') return(false) ;
  if (data == '是') return(true) ;
  if (data == 'False') return(false) ;
  if (data == 'True') return(true) ;
  if (data == 'FALSE') return(false) ;
  if (data == 'TRUE') return(true) ;
  if (data == 'false') return(false) ;
  if (data == 'true') return(true) ;
  return(null) ;
}

function parseSet(data)
{
  var set = [] ;
  var len = 0 ;
  var tmp = '' ;

  for(var i = 0 ; i < data.length ; i ++)
    if (data[i] == ';' || data[i] == '，' || data[i] == '；' || data[i] == '、' || data[i] == '~' || data[i] == '-')
    {
      if (tmp == '') continue ;
      set[len] = tmp ;
      len ++ ;
      tmp = '' ;
    }
    else
      tmp += data[i] ;

  if (tmp != '')
  {
    set[len] = tmp ;
    len ++ ;
    tmp = '' ;
  } ;

  return(set) ;
}

//-----------单元测试-----------------
/*
(function()
{
  fs.readFile('../collections/employeeData.csv' , {encoding: 'utf-8'} , function(err , data)
  {
    if(err) throw err ;
    //console.log(data) ;

    //csv test
    csv.generate({seed: 1, columns: 2, length: 20}, function(err, data)
    {
      //console.dir(data) ;
      csv.parse(data , function(err , data)
      {
        //console.dir(data) ;
        csv.transform(data , function(data)
        {
          //console.dir(data) ;
          return data.map(function(value){return value.toUpperCase()});
        }, function(err, data)
        {
          //console.dir(data) ;
          csv.stringify(data, function(err, data)
          {
            //console.dir(data) ;
            //process.stdout.write(data);
          });
        });
      }) ;
    }) ;

    //read test
    csv.parse(data , function(err , data)
    {
      //console.dir(data) ;
      //console.log(data.length , data[0].length) ;

      //function test
      var docs = toArray(data) ;
      console.dir(docs) ;
    }) ;

  });
})() ;
//*/
