const swaggerJsdoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Checkpoint Interview API Documentation',
      version: '1.0.0',
      description: 'Simple API to fetch streams information from Twitch',
      contact: {
        name: 'Emil Lozev',
        email: 'em.lozev@gmail.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000/'
      }
    ]
  },
  apis: ['./routes/streamer.js']
}
module.exports = (router) => {
  const specification = swaggerJsdoc(options)
  router.use('/docs', swaggerUi.serve)
  router.get(
    '/docs',
    swaggerUi.setup(specification, {
      explorer: true
    })
  )
}
