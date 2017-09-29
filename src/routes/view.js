const Router = require('koa-router');
var router = new Router();
const Vue = require('vue')

import Error from '../template/error'

const app = new Vue({
  template: `<div>Hello World</div>`
})
const renderer = require('vue-server-renderer').createRenderer()


router.get('*', (ctx,next)=>{
  let  {req,res,response} = ctx

  const app = new Vue({
    data: {
      url: req.url
    },
    template: `<div>访问的 URL 是： {{ url }}</div>`
  })
  renderer.renderToString(app, (err, html) => {
    if (err) {
      response.status = 500;
      response.body = Error(err)
      return;
    }
    ctx.body = `
      <!DOCTYPE html>
      <html lang="en">
        <head><title>Hello</title></head>
        <body>${html}</body>
      </html>
    `
  })
});


export default router
