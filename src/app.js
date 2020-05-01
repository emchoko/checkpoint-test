const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const routes = require('./routes/index')
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/api/v1/', routes)

app.listen(3000, () => {
  console.log('App runs on port 9000:3000!')
})
