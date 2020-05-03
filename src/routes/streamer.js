'use strict'
const waterfall = require('async/waterfall')
const fetcher = require('../utils/fetcher')
const Validator = require('validatorjs')
const StreamerResponse = require('../model/streamer-response.js')
const helper = require('../utils/twitch_api_helper')

module.exports = (router) => {
  const fetchIndex = (req, res) => {
    return res.send('Documentation here')
  }

  const fetchStreamer = (req, res, next) => {
    let rules = {
      username: 'string',
      id: 'numeric'
    }

    let validation = new Validator(
      { username: req.query.username, id: req.query.id },
      rules
    )

    if (validation.fails()) {
      return res.status(412).json({
        message:
          'Query params were not right! Please refer to the documentation!'
      })
    }

    let queryString =
      req.query.id === undefined
        ? 'user_login=' + req.query.username
        : 'user_id=' + req.query.id

    waterfall(
      [
        // fetch the stream by user_id
        (done) => {
          fetcher
            .getStreamerById(queryString)
            .then((response) => {
              if (response.status === 200) {
                response.json().then((body) => {
                  // this means that the user is streaming
                  if (helper.isStreaming(body)) {
                    let resBody = new StreamerResponse(true, null)
                    return done(null, resBody, body.data[0].game_id)
                  } else {
                    // this means that the user is not streaming
                    let resBody = new StreamerResponse(false, null)
                    return res.status(200).json(resBody)
                  }
                })
              } else {
                console.log(response.status)
                return res.status(response.status).json({
                  message: 'There was a problem fetching the Twitch API'
                })
              }
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
        },
        (result, gameId, done) => {
          fetcher
            .getGameById(gameId)
            .then((response) => {
              if (response.status === 200) {
                response
                  .json()
                  .then((body) => {
                    if (body.data.length > 0) {
                      result.gameName = helper.extractGameName(body)
                      return res.status(200).json(result)
                    } else {
                      return next({
                        status: 404,
                        body: {
                          message: `There was a problem fetching the Twitch API: game with such id ${gameId} not found`
                        }
                      })
                    }
                  })
                  .catch((jsonParseError) => {
                    console.log(jsonParseError)
                    next({
                      status: 500,
                      body: {
                        message: `There was a problem parsing the response from the Twitch API`
                      }
                    })
                  })
              } else {
                next({
                  status: response.status,
                  body: {
                    message: 'There was a problem fetching the Twitch API'
                  }
                })
              }
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
      ],
      (err) => {
        if (err) {
          next({ status: err.code, body: err.body })
        }
        res.end()
      }
    )
  }

  router.get('/', fetchIndex)
  router.get('/streams', fetchStreamer)
}
