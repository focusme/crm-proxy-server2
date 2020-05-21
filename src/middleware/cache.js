
var redisConnect = require('../connections/redis');

const redisMiddleware = () => async (ctx, next) => {
  ctx.cache = await redisConnect()
  await next()
}
module.exports = {
  redisMiddleware
}
