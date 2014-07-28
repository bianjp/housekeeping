/*
  {
    _id: ObjectID,
    createdAt: Date,
    username: string,
    password: string,
    role: string      //'admin', 'company'
  }
*/
  {
    _id: new require('mongodb').ObjectID(),
    createdAt: new Date(),
    username: (new String()).valueOf(),
    password: (new String()).valueOf(),
    role: (new String()).valueOf()      //'admin', 'company'
  }
