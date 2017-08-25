const {resolvingToken} = require('../util/token.js')

module.exports = async function(ctx, next) {
    await next();
}
