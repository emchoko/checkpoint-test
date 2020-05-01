const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send('Hello World, Me Fe!')
})

app.listen(3000, () => {
  console.log('App runs on port 9000:3000!')
})
