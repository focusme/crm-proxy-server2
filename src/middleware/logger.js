
module.exports = async function(ctx,next){

  const start = new Date();
  await next();
  const ms = new Date() -start;

  let log = `${ctx.request.method}  -> ${ctx.request.url}
     -> ${ctx.response.status} ${ctx.response.message} ${ms}ms`;


  ctx.logger(log);

}
