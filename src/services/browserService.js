import defaultConfig from '../config/default'
import {filterUnderLine} from '../utils/stringUtil'
const pool = require('../connections/mysql') // 导入封装好的mysql库
const { STATUS } = require('../enum') // 导入枚举类型STATUS
const { query } = pool
class BrowserService {
    async listByUserShopId(ctx, shopKey, prefix = defaultConfig.appName.toUpperCase()) {
        let body = ctx.request.body;
        let res = null;
        let cacheKey = prefix + ":" + shopKey + ":" + body.userId + ":" + body.storeUrl;
        console.log('>>>>>cacheKey', cacheKey)
        try {
          res = await ctx.cache.hgetall(cacheKey, function (err, object) {
            if (err != null) {
              console.error("listByUserShopId=>", err)
            }
          })
          if (res.userId != undefined) {
            body.id = res['id'];
            body.isIMMaster = res['isIMMaster'];
            body.shopUrl = res['shopUrl'];
            body.cookie = res['shopCookie'];
            body.baseUrl = res['baseUrl'];
            body.wssUrl = res['wssUrl'];
            body.addtional = res['addtional'];
            body.storeId = res['storeId'];
            body.coName = res['coName'];
            return {
              success: true,
              data: res,
            };
          } else {
            let sql = ` `
            res = new Object();
    
            if (body.storeUrl.indexOf(shopKey) < 0) {
              res.success = false;
              res.err = "shopUrl disaccord，shopKey:" + shopKey + ",request body.storeUrl：" + body.storeUrl;
              return res;
            }
    
            if (body.userId == undefined) {
              sql = `select * from ${this.table} where  isIMMaster = ? and shopUrl= ? and status != ` + STATUS.DELED + ` ORDER BY id DESC LIMIT 1 `
              res = await query(sql, [body.isIMMaster, body.storeUrl, STATUS.DELED])
            } else {
              sql = `select * from ${this.table} where  userid = ? and shopUrl= ? and status != ` + STATUS.DELED + ` ORDER BY id DESC LIMIT 1 `
              res = await query(sql, [body.userId, body.storeUrl, STATUS.DELED])
            }
    
            if (res.success) {
              if (res.data.length > 0) {
                res.data.map(item =>
                  //  筛选下划线属性，返回驼峰
                  filterUnderLine(item))
                body.id = res.data[0]['id'];
                body.isIMMaster = res.data[0]['isIMMaster'];
                body.shopUrl = res.data[0]['shopUrl'];
                body.cookie = res.data[0]['shopCookie'];
                body.baseUrl = res.data[0]['baseUrl'];
                body.wssUrl = res.data[0]['wssUrl'];
                body.addtional = res.data[0]['addtional'];
                body.storeId = res.data[0]['storeId'];
                body.coName = res.data[0]['coName'];
                // if (body.cookie.indexOf(cookieKey)<0) {
                //   res.success = false;
                //   res.err = "cookie disaccord";
                //   return res;
                // }
    
                return res;
              } else {
                res.success = false;
                res.err = "沒有检索到cookie";
                console.error("listByUserShopId=>", res.err)
              }
            }
          }
        } catch (error) {
          console.error("listByUserShopId=>", error);
        }
    
        return res;
    
      }
}

module.exports = new BrowserService()