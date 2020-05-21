

var config = require('../config/default.js');
const logger = require('log4js').getLogger('redis.js');
var redisStore = require('koa-redis');
let instance = null

const redisConnect = async (prefix = config.appName.toUpperCase()) => {
  if (instance) return instance

  try {
    const store = await new redisStore({
      //user: config.redis.USERNAME,
      password: config.redis.password,
      isRedisCluster: config.redis.isRedisCluster,
      nodes: config.redis.nodes,
      keyPrefix: config.appName,
      clusterOptions: {
        redisOptions: {
          password: config.redis.password
        }
      }
    })
    // await store.client.set(prefix + ":test12", "this.query.adminId");
    //  var aa = await store.client.get(prefix + ":test12", function (err, res) {
    //   if (err != null) {
    //     logger.error("redisConnect==>", err);
    //   }
    //   else {
    //     logger.debug("redisConnect==>", res);
    //   }

    // }); 
    instance = store.client
    
  } catch (error) {
    logger.error("redisConnect==>", error);
  }
  return instance
}

module.exports = redisConnect



