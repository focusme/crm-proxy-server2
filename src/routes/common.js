const Router = require('koa-router');
var router = new Router();

router.get('/', (ctx,next)=>{
  ctx.body = 'hello, this is a koa2 demo'
});


export default router
