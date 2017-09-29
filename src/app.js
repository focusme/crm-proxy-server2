const Koa = require('koa');
const Router = require('koa-router');
const app = new Koa();
const cors = require('koa-cors');
const convert = require('koa-convert')
const ApiRouter = new Router();
const config = require('./config.js')
// 中间件
const parse = require('./middleware/parse.js')
const logger = require('./middleware/logger.js')
const changeBody = require('./middleware/return.js')
const apiVerify = require('./middleware/apiVerify')
const loginVerify = require('./middleware/loginVerify')
const proxy = require('./middleware/proxy.js')

// 路由
import Common from './routes/common'

// 跨域处理
app.use(convert(cors({
  origin:'',
  methods:['GET', 'POST']
})));

app.use(logger);
app.use(parse);

// 对所有请求验证权限
app.use(apiVerify)
// app.use(changeBody)

ApiRouter.use('/',Common.routes(), Common.allowedMethods());

app.use(ApiRouter.routes());


app.on('error', function(err) {
    console.log('error: ');
    console.log(err);
});

app.listen(config.port, function() {
    console.log('server start', config.port, process.env.NODE_ENV);
})
