'use strict'

module.exports = (router) => {
  const fetchIndex = (req, res) => {
    return res.send('Documentation here')
  }

  const fetchStreamer = (req, res) => {
    return res.send('The id is ' + req.params.id)
  }

  router.get('/', fetchIndex)
  router.get('/:id', fetchStreamer)
}
