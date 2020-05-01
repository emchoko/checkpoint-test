const streamer = require('./streamer')
const docs = require('./docs')
const router = require('express').Router()

docs(router)
streamer(router)

module.exports = router
