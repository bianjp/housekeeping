async = require 'async'
db = require './db' .getConnection!

module.exports =
  insertOne: (doc, callback)!->
    async.waterfall [
      (callback)!->
        db.collection 'employees', callback

      (col, callback)!->
        col.insert doc, callback
    ],

    (err, items)!->
      callback err, items && items[0]

  insert: (docs, callback)!->
    async.waterfall [
      (callback)!->
        db.collection 'employees', callback

      (col, callback)!->
        col.insert docs, callback
    ], callback

  remove: (selector, callback)!->
    async.waterfall [
      (callback)!->
        db.collection 'employees', callback

      (col, callback)!->
        col.remove selector, callback
    ], callback

  update: (selector, updater, callback)!->
    async.waterfall [
      (callback)!->
        db.collection 'employees', callback

      (col, callback)!->
        col.update selector, updater, callback
    ], callback

  findOne: (selector, options, callback)!->
    if typeof options === 'function'
      callback = options
      options = {}

    async.waterfall [
      (callback)!->
        db.collection 'employees', callback

      (col, callback)!->
        col.findOne selector, options, callback
    ], callback

  find: (selector, options, callback)!->
    if typeof options === 'function'
      callback = options
      options = {}

    async.waterfall [
      (callback)!->
        db.collection 'employees', callback

      (col, callback)!->
        col.find selector, options .toArray callback
    ], callback

  # parse data transfered from client to employee object
  parse: (req, callback)!->
    data = req.body
    employee =
      company        :  req.session.user.companyId
      name           :  data.name
      gender         :  data.gender
      birthday       :  if data.birthday then new Date data.birthday
      nativePlace    :  data.nativePlace
      isMarried      :  !!parseInt data.isMarried
      education      :  data.education
      photo          :  null
      height         :  data.height
      weight         :  data.weight
      certificates   :  data.certificates
      languages      :  if data.languages then data.languages.split /[ ,，、]+/ else []
      workExperience :  parseInt data.workExperience
      cookingStyle   :  if data.cookingStyle then data.cookingStyle.split /[ ,，、]+/ else []
      specialities   :  if data.specialities then data.specialities.split /[ ,，、]+/ else []
      description    :  data.description
      workDetail     :  data.workDetail

    if !req.files.photo
      callback null, employee
    else
      photo = req.files.photo
      employee.photo = '/images/photos/' + photo.name
      fs = require 'fs'
      fs.rename photo.path, 'public/images/photos/' + photo.name, (err)!->
        callback err, employee
