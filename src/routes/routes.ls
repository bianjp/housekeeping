router = require 'express' .Router!

router.use '/', require './index'
router.use '/search', require './search'
router.use '/login' , require './login'
router.use '/admin', require './admin'

module.exports = router
