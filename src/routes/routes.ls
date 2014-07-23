router = require 'express' .Router!

#index
router.use '/', require './index'

#admin
router.use '/admin', require './adminRoutes'

module.exports = router
