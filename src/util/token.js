const jwt = require('jsonwebtoken');
const md5 = require('./md5.js')

let key = md5('coding.kindom');



module.exports = {
    getToken(opt) {
        return jwt.sign(opt, key);
    },
    resolvingToken(token) {
        try {
          return jwt.verify(token, key);
        } catch (err) {
          return false;
        }
    }

}
