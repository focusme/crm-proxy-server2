/**
 * 代理转发请求
 * kin
 * @type {[type]}
 */

 // proxy('/api', {
 //     target: 'http://www.baidu.com/',//转发地址
 //     changeOrigin: true,
 //     rewrite: path => {
 //         return path.replace(/^\/api/, '') //url重定向
 //     },
 //     logs: true
 // })

const HttpProxy = require('http-proxy')


const proxy = HttpProxy.createProxyServer()

module.exports = (context, options) => (ctx, next) => {
    if (!ctx.req.url.startsWith(context)) return next()

    const {
        logs,
        rewrite
    } = options

    return new Promise((resolve, reject) => {
        if (logs) logger(ctx)

        if (typeof rewrite === 'function') {
            ctx.req.url = rewrite(ctx.req.url)
            console.log(ctx.req.url);
        }

        proxy.web(ctx.req, ctx.res, options, e => {
            const status = {
                ECONNREFUSED: 503,
                ETIMEOUT: 504
            }[e.code]
            if (status) ctx.status = status
            resolve()
        })
    })
}

function logger(ctx) {
    console.log('%s - %s %s', new Date().toISOString(), ctx.req.method, ctx.req.url)
}
