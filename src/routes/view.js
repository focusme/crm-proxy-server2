const Router = require('koa-router');
const router = new Router();

const fs = require('fs')
const path = require('path')
const { createBundleRenderer } = require('vue-server-renderer')
const bundle = require("./server/server.json")
const clientManifest = require("./server/client.json")
import Error from '../template/error'
const resolve = file => path.resolve(__dirname, file)
const template = fs.readFileSync(resolve('./template/index.html'), 'utf-8')

const readFile = file => new Promise((resolve, reject) => {
  fs.readFile(path.resolve(__dirname, '.'+file), 'utf8', (err, data) => (err ? reject(err) : resolve(data)));
});

router.get('/server/*',async function(ctx,next){
  if(ctx.req.url.startsWith('/server')){
    await readFile(ctx.req.url).then((value) => {
      ctx.body = value
    }).catch((err) => {

    })
  }else{
    next()
  }

})
function createRenderer (bundle, options) {
  return  createBundleRenderer(bundle, Object.assign(options, {
    template,
    basedir: resolve('./server'),

    runInNewContext: false
  }))
}

let renderer = createRenderer(bundle, {
  clientManifest
})

const render =  (context)=>{

  return new Promise(async (resolve,reject) => {
    await renderer.renderToString(context, (err, html) => {
      if (err) {
        reject(err)
      }
      resolve(html)
    })
  })
}

router.get('*', async (ctx,next)=>{
  let  {req,res,response} = ctx

  const context = {
    url: req.url,
    title: 'fgbjdfghj', // default title
    meta:''
   }
  await render(context).then((html) => {
    ctx.body = html
  }).catch((err) => {
    console.log(err);
    response.status = err.code || 500;
    response.body = err.code || Error(err)
  })

});


export default router
