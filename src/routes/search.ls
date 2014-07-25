router = require 'express' .Router!

router.get '/company', (req, res)->
  res.render 'search', do
    title: '搜索中介公司'

router.get '/', (req, res)->
  res.render 'search', do
    title: '搜索页面'

router.get '/employee', (req, res)->
  res.render 'search', do
    title: '搜索雇员'

module.exports = router
