const router = require('express').Router()

const { verifyUser } = require('../auth/verifyUser')
const accountRoute = require('./authRoute')
const storeRouter = require('./store')
const userRouter = require('./user')

router.use('/api/v1/account', accountRoute)
router.use('/api/v1', verifyUser({ shop: true}), storeRouter)
router.use('/api/v1', verifyUser({ shop: false}), userRouter)

module.exports = router