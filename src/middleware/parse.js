//   参数处理
var parse = require('co-body');

module.exports = async function(ctx,next){

  if(ctx.request.method==='GET'){
    ctx.param = ctx.request.query;
  }
  if(ctx.request.method === 'POST'){
    ctx.param =await parse(ctx);
  }

  await next();
}
