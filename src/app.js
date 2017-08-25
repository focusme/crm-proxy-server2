const Koa = require('koa');
const Router = require('koa-router');
const app = new Koa();
const cors = require('koa-cors');
const ApiRouter = new Router();
const config = require('./config.js')

// 中间件
const parse = require('./middleware/parse.js')
const logger = require('./middleware/logger.js')
const changeBody = require('./middleware/return.js')
const apiVerify = require('./middleware/apiVerify')
const loginVerify = require('./middleware/loginVerify')
const proxy = require('./middleware/proxy.js')

// 跨域处理
app.use(cors());

app.use(logger);
app.use(parse);

// 对所有请求验证权限
app.use(apiVerify)
app.use(changeBody)


// app.use(ApiRouter.routes());


app.on('error', function(err) {
    console.log(err, 'app');
});

app.listen(config.port, function() {
    console.log('server start', config.port, process.env.NODE_ENV);
})
