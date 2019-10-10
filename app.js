const Koa = require('koa');
const router = require('./routes/index');
const apiRouter = require('./routes/api');

const app = new Koa();
const response = require('./middlewares/response');

app
  .use(response)
  .use(router.routes())
  .use(apiRouter.routes())
  .use(router.allowedMethods())
  .listen(3000)


