const apiRouter = require('koa-router')({
  prefix: '/api'
})

const cors = require('./../middlewares/cors');
const userController = require('../controllers/user');
const todoController = require('../controllers/todo');
const okrController = require('../controllers/okr');
const todo_keyresultController = require('../controllers/todo_keyresult')

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

// OKR
apiRouter.post('/okr', cors.allowAll,okrController.insert)
apiRouter.get('/okr', cors.allowAll,okrController.all)
apiRouter.put('/okr/:id', cors.allowAll,okrController.complete)
apiRouter.get('/okrSingle', cors.allowAll,okrController.okr)
apiRouter.put('/okrSingle/:id', cors.allowAll,okrController.edit)
apiRouter.delete('/okr/:id', cors.allowAll,okrController.deleted)
apiRouter.get('/okrTodo', cors.allowAll,okrController.okrTodo)

// KR
apiRouter.put('/kr/:id', cors.allowAll,okrController.completeKr)
apiRouter.delete('/kr/:id', cors.allowAll,okrController.deletedKr)


// todoKeyresult
apiRouter.get('/todoKeyresult', cors.allowAll,todo_keyresultController.keyresult);
apiRouter.post('/todoKeyresult', cors.allowAll,todo_keyresultController.bind);
apiRouter.delete('/todoKeyresult', cors.allowAll,todo_keyresultController.deleted);

module.exports = apiRouter