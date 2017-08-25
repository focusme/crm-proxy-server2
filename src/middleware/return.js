// 返回数据格式处理
module.exports = async function(ctx, next) {
    await next();

    if (ctx.response.status >= 200 && ctx.response.status < 300 && !ctx.body.header) {
        ctx.body = {
            header: {
                code: 0,
                message: '请求成功'
            },
            body: ctx.body
        }
    }
}
