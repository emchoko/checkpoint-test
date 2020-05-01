const swaggerJsdoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Documentation of the test for the Checkpoint interview',
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
  apis: []
}

module.exports = (router) => {
  const specification = swaggerJsdoc(options)
  router.get('/docs', swaggerUi.setup(specification, { explorer: true }))
}
