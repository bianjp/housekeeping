router = require 'express' .Router!

#初始化回话内容
router.all '/', (req, res, next)->
  req.session.err = null
  next!

router.use '/', require './index'
router.use '/search', require './search'
router.use '/' , require './user'
router.use '/admin', require './admin'
router.use '/company', require './company'

module.exports = router
