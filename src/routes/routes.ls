router = require 'express' .Router!

router.use '/', require './index'
router.use '/search', require './search'
router.use '/login' , require './login'

module.exports = router
