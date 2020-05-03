const fetch = require('node-fetch')
require('dotenv').config()

const headers = {
  'Content-Type': 'application/json',
  'Client-ID': process.env.CLIENT_ID
}

module.exports = {
  getStreamerById: (queryString) => {
    return fetch(process.env.API_URL + `streams/?${queryString}`, {
      method: 'GET',
      headers: headers
    })
  },
  getGameById: (gameId) => {
    return fetch(process.env.API_URL + `games/?id=${gameId}`, {
      method: 'GET',
      headers: headers
    })
  }
}
