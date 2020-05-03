module.exports = {
  isStreaming: (body) => {
    return body.data.length > 0
  },
  extractGameName: (body) => {
    if (body.data.length > 0) {
      return body.data[0].name
    }
    return null
  }
}
