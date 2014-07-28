router = require 'express' .Router!

router.get '/', (req, res)!->
  res.render 'index', do
    title: '首页'

module.exports = router
