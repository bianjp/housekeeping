router = require 'express' .Router!

router.use '/', require './index'
router.use '/search', require './search'
router.use '/login' , require './logio'
router.use '/admin', require './admin'
router.use '/company', require './company'

module.exports = router
