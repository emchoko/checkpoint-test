'use strict'

module.exports = (router) => {
  const fetchIndex = (req, res) => {
    return res.send('Documentation here')
  }

  const fetchStreamer = (req, res) => {
    return res.send('The id is ' + req.params.id)
  }

  router.get('/', fetchIndex)
  /**
   * @swagger
   * tags:
   *   name: Users
   *   description: User management
   */

  /**
   * @swagger
   * path:
   *  /users/:
   *    post:
   *      summary: Create a new user
   *      tags: [Users]
   *      requestBody:
   *        required: true
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/User'
   *      responses:
   *        "200":
   *          description: A user schema
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/User'
   */
  router.get('/:id', fetchStreamer)
}
