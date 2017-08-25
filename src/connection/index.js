/**
 * 执行sql
 * @type {[type]}
 */

const bluebird = require("bluebird");

const getSqlConnection = require('./pool.js');

module.exports = (sql) =>{
        return new Promise(function(resolve, reject) {
            bluebird.using(getSqlConnection(), function(connection) {
                connection.query(sql).then(function(value) {
                    resolve(value)
                }).catch(function(error) {
                    reject(error)
                });
            })
        })
    }
