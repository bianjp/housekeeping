/*
  {
    _id: ObjectID,
    userId: ObjectID,       //users中对应的document
    name: string,           //公司名称
    logo: string,           //图片网址
    registeredAt: Date,     //注册时间
    businessScope: string,  //业务范围
    serviceRegions: [
      {
        city: string,
        regions: [string,]
      },
    ],
    guarantees: [string,],  //提供的保障
    about: string,
    contacts: {
      website: string,      //公司网站
      email: string,
      fixedPhone: string,
      mobilePhone: string,
      QQ: string,
      address: string,
      contact: string       //联系人
    },
    employeeCount: integer  //雇员数量
  }
*/