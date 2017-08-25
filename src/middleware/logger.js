const {saveLogger} = require('../util/index.js')

module.exports = async function(ctx,next){

  const start = new Date();
  await next();
  const ms = new Date() -start;

  let log = `${ctx.request.method}  -> ${ctx.request.url}
     -> ${ctx.response.status} ${ctx.response.message} ${ms}ms`;

  // 管理接口不记录日志
  if(ctx.request.url.indexOf('control')<0){
    saveLogger(ctx.request.header.host,ctx.request.url,ctx.request.header['user-agent'],ctx.response.status,ctx.response.message,ms)
  }

  ctx.logger(log);

}
