'use strict'

module.exports = (router) => {
  const fetchIndex = (req, res) => {}

  const fetchStreamer = (req, res) => {}

  router.get('/', fetchIndex)
  router.get('/:id', fetchStreamer)
}
