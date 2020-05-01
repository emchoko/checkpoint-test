const streamer = require('./streamer')
const router = require('express').Router()

streamer(router)

module.exports = router
