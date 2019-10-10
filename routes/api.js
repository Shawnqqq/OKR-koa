const apiRouter = require('koa-router')({
  prefix: '/api'
})

const testController = require('../controllers/test');
const cors = require('./../middlewares/cors');

apiRouter.get('/', cors.allowAll,testController.info)

module.exports = apiRouter