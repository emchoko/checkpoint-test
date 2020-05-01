'use strict'
const waterfall = require('async/waterfall')
const fetcher = require('../utils/fetcher')
const StreamerResponse = require('../model/streamer-response.js')

module.exports = (router) => {
  const fetchIndex = (req, res) => {
    return res.send('Documentation here')
  }

  const fetchStreamer = (req, res) => {
    let userId = req.params.id

    waterfall(
      [
        // fetch the stream by user_id
        (done) => {
          fetcher
            .getStreamerById(userId)
            .then((streamer) => {
              streamer.json().then((body) => {
                if (body.status === 200) {
                  // this means that the user is streaming
                  if (body.data.length > 0) {
                    // done(null, body.data[0].game_id)
                    let resBody = StreamerResponse(true, null)
                    res.status(200).json(JSON.parse(resBody))
                    done(null)
                  } else {
                    let resBody = StreamerResponse(false, null)
                    res.status(200).json(JSON.parse(resBody))
                    done(null)
                  }
                } else {
                  return res.status(body.status).json({
                    message: 'There was a problem fetching the Twitch API'
                  })
                }
              })
            })
            .catch((err) => {
              console.error(err)
              done({
                code: 500,
                body: {
                  message: 'An error occurred during the fetch from Twitch',
                  err: err
                }
              })
            })
        }
        // (gameId, done) => {}
      ],
      (err) => {
        if (err) {
          return res.status(err.code).json(err.body)
        }
        res.end()
      }
    )
  }

  router.get('/', fetchIndex)
  router.get('/:id', fetchStreamer)
}
