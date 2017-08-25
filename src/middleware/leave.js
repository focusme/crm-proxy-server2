// 权限等级验证

module.exports = (leave) => {
  return async function (ctx, next) {

    if (ctx.user.leave >= leave) {
      await next();
    } else {
      ctx.body = {
        header: {
          code: 1,
          message: '无权限访问 ！'
        }
      }
    }
  }
}
