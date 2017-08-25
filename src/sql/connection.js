const config = require('../config').sqlConfig;
const  mysql = require('promise-mysql')

let  pool = mysql.createPool(config);

module.exports = function() {
  return pool.getConnection().disposer(function(connection) {
    pool.releaseConnection(connection);
  });
}
