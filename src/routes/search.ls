router = require 'express' .Router!

router.get '/search/company', (req, res)->
  res.render 'search', do
    title: 'Search-company'

router.get '/search', (req, res)->
  res.render 'search', do
    title: 'Search'

router.get '/search/employee', (req, res)->
  res.render 'search', do
    title: 'Search-employee'

module.exports = router

