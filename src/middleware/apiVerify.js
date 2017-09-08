//api 验证
const fs = require('fs');
const path = require('path')
// 读取文件
function readFile(file){
  return fs.readFileSync(path.resolve(__dirname, file))
}

module.exports = async function(ctx,next){

  // 获取cookie key
  ctx.getCookie = function(key, encode){
    let str = this.request.header.cookie
    let data = null
    try {
      let cookie = str ? JSON.parse(unescape(str)) : {}
      data = encode ? JSON.parse(cookie[key]) : cookie[key]
    } catch (e) {
      let arr = str.trim().match(new RegExp("(^| )"+key+"=([^;]*)(;|$)"));
      if(arr != null) {
        data = encode ? JSON.parse(unescape(arr[2])) : unescape(arr[2]) ;
      }
    } finally {
      return data
    }
  }

  // log
  ctx.logger = function(){
    process.env.NODE_ENV !== 'production' && console.log(...arguments)
  }

  //拦截 favicon.ico
  if(ctx.path === '/favicon.ico'){ctx.body={}; return;}

  await next();

}
