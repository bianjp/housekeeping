connection = null

module.exports = 
  # 连接数据库
  connect: (callback)!->
    if connection
      callback connection
    else
      MongoClient = require 'mongodb' .MongoClient
      config = require '../config/config' .database
      uri = 'mongodb://' + config.host + ':' + config.port + '/' + config.name

      MongoClient.connect uri, (err, db)!->
        if err
          throw new Error 'Failed to connect to database!'
        else
          connection := db
          callback db

  getConnection: -> connection

  # 清空数据库
  clear: (callback)!->
    connection.dropDatabase (err, result)!->
      if err
        throw new Error 'Failed to clear database!'
      else
        callback err

  # 插入程序运行必需的数据
  initialize: (callback)!->
    callback null
