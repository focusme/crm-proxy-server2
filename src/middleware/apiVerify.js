//api 验证

module.exports = async function(ctx,next){

  // 获取cookie key
  ctx.getCookie = function(key, encode){
    let str = this.url.indexOf('file') > 0 ? this.request.header.token : this.request.header.cookie
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
  if(ctx.path === '/favicon.ico'){ctx.throw(404); return;}

  await next();

}
