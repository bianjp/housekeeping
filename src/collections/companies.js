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
  {
  _id: new require('mongodb').ObjectID(),
  userId: new require('mongodb').ObjectID(),              //users中对应的document
  name: new String(),                                     //公司名称
  logo: new String(),                                     //图片网址
  registeredAt: new Date(),                               //注册时间
  businessScope: new Array(new String()),                 //业务范围
  serviceRegions: new Array(
    {
    city: new String(),
    regions: new Array(new String())
    }),
  guarantees: new Array(new String()),                   //提供的保障
  about: new String(),
  contacts:
    {
    website: new String(),                               //公司网站
    email: new String(),
    fixedPhone: new String(),
    mobilePhone: new String(),
    QQ: new String(),
    address: new String(),
    contact: new String()                                //联系人
  },
  employeeCount: new Number()                            //雇员数量
  }
