router = require 'express' .Router!

router.use '/', require './index'
router.use '/search', require './search'
router.use '/' , require './user'
router.use '/admin', require './admin'
router.use '/company', require './company'

module.exports = router
