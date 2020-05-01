const fetch = require('node-fetch')

module.exports = {
  private headers: {
    'Content-Type': 'application/json',
    'Client-ID': process.env.CLIENT_ID
  },
  getStreamerById: (userId) => {
    return fetch(process.env.API_URL + "streams/?user_id=" + userId, {
      method: "GET",
      headers: this.headers
    })
  },
  getGameById: (gameId) => {
    return fetch(process.env.API_URL + "games/?id=" + gameId, {
      method: "GET",
      headers: this.headers
    });
  }
}
