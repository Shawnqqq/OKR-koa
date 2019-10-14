const apiRouter = require('koa-router')({
  prefix: '/api'
})

const cors = require('./../middlewares/cors');
const userController = require('../controllers/user');
const todoController = require('../controllers/todo');

// 小程序登录
apiRouter.get('/login', cors.allowAll,userController.login)
apiRouter.get('/user', cors.allowAll,userController.all)

// todo 
apiRouter.get('/todo', cors.allowAll,todoController.all)
apiRouter.post('/todo', cors.allowAll,todoController.add)
apiRouter.delete('/todo/:id', cors.allowAll,todoController.deleted)
apiRouter.put('/todo/:id', cors.allowAll,todoController.complete)

// honor
apiRouter.get('/honor', cors.allowAll,todoController.honor)

module.exports = apiRouter