/**
 * mysql连接池
 * @type {[type]}
 */
const config = require('../config.js').sqlConfig;
const mysql = require('promise-mysql')

let  pool = mysql.createPool(config);

module.exports = function() {
  return pool.getConnection().disposer(function(connection) {
    pool.releaseConnection(connection);
  });
}
