const jwt = require('jsonwebtoken');
const md5 = require('./md5.js')
const config = require('../config.js')
const key = md5(config.key);

module.exports = {
  // 创建
  createToken(opt) {
      return jwt.sign(opt, key);
  },
  // 解析
  resolvingToken(token) {
      try {
        return jwt.verify(token, key);
      } catch (err) {
        return false;
      }
  }
}
