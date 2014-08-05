router = require 'express' .Router!

router.use '/', require './index'
router.use '/search', require './search'
router.use '/' , require './user'
router.use '/admin', require './admin'
router.use '/company', require './company'
router.use '/', require './detail'

module.exports = router
