const query = require('../sql/query.js')
const {
    saveRequest
} = require('../sql/sql.js')
const mail = require('./mail.js')
var md5 = require('md5');


// saveLogger(ctx.request.header.host+ctx.request.url,ctx.request.header['user-agent'],ctx.response.status,ctx.response.message,ms)

module.exports = {
    saveLogger(url, agent, status, message, ms, uid = 0) {
        query(saveRequest(url, agent, status, message, ms, uid))
    },
    md5Change(str) {
        return md5(str)
    }

}
