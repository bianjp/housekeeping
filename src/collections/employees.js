/*
  {
    _id: ObjectID,
    company: ObjectID,    //所属公司
    name: string,
    birthday: Date,
    nativePlace: string,  //籍贯
    isMarried: bool,      //是否已婚
    education: string,    //学历
    photo: string,        //图片网址
    height: string,       //身高
    weight: string,       //体重
    certificates: [string,],  //拥有的证书
    languages: [string,],     //会说的语言/方言
    workExperience: string,   //工作经验（时间）
    cookingStyle: [string,],  //做饭口味
    specialities: [string,],  //特长
    description: string,      //简介
    
    workDetail: [{
      workType: string,       //工作类型(钟点工、保姆等)
      workArea: [string,],    //工作区域
      workContent: [string,], //工作内容
      salary: string,   ·     //工资要求
      workTime: string,       //工作时间
      vacation: string        //休假要求
    },]
  }
*/