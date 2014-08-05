router = require 'express' .Router!
ObjectID = require 'mongodb' .ObjectID
db = require '../lib/db' .getConnection!
async = require 'async'

router.get '/company/:_id', (req, res)!->
  _id = ObjectID req.params._id

  async.parallel {
    company: (callback)!->
      async.waterfall [
        (callback)!->
          db.collection 'companies', callback

        (col, callback)!->
          col.findOne _id: _id, callback
      ], callback

    employees: (callback)!->
      async.waterfall [
        (callback)!->
          db.collection 'employees', callback

        (col, callback)!->
          col.find company: _id .toArray callback
      ], callback
  },

  (err, result)!->
    res.render 'company',
      title: result.company?.name
      company: result.company
      employees: result.employees


router.get '/employee/:_id', (req, res)!->
  _id = ObjectID req.params._id
  employee = null

  async.waterfall [
    (callback)!->
      db.collection 'employees', callback

    (col, callback)!->
      col.findOne _id: _id, callback

    (item, callback)!->
      employee := item
      db.collection 'companies', callback

    (col, callback)!->
      col.findOne _id: employee.company, callback
  ],

  (err, item)!->
    res.render 'employee',
      title: employee?.name
      employee: employee
      company: item

module.exports = router
