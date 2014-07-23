router = require 'express' .Router!

router.use '/', require './index'
router.use '/search', require './search'

module.exports = router
