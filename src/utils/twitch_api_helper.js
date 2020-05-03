module.exports = {
  isStreaming: (body) => {
    return body.data.length > 0
  },
  extractGameName: (body) => {
    if (body.data.length > 0) {
      return body.data.game_name
    }
    return null
  }
}
