async = require 'async'
db = require '../lib/db' .getConnection!

insertOne = (collection, doc, callback)!->
  async.waterfall [
    (callback)!->
      db.collection collection, callback
    (col, callback)!->
      col.insert doc, callback
  ],
  (err, items)!->
    callback err, items?[0]

insert = (collection, docs, callback)!->
  async.waterfall [
    (callback)!->
      db.collection collection, callback
    (col, callback)!->
      col.insert docs, callback
  ], callback

module.exports =
  insert: (callback)!->
    companies = require './companies'

    insertCompany = (n, callback)!->
      company = companies[n]
      async.waterfall [
        (callback)!->
          insertOne 'users',
            createdAt: new Date!
            username: 'test' + (n + 1)
            password: '21232f297a57a5a743894a0e4a801fc3'
            role: 'company'
          , callback

        (item, callback)!->
          company.userId = item._id
          insertOne 'companies', company, callback

        (item, callback)!->
          employees = require('./employees')()
          for employee in employees
            employee.company = item._id
            employee.guarantees = item.guarantees
          insert 'employees', employees, callback
      ],

      (err, items)!->
        callback err, items
        if err
          console.log 'Failed to insert company:'
          console.log company


    async.times companies.length, (n, next)!->
      insertCompany n, (err, items)!->
        next err, true
    , (err, results)!->
      if err
        console.log 'Failed to insert companies'
      callback err
