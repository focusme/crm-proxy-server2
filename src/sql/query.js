var pro = require("bluebird");

var getSqlConnection = require('./connection');

module.exports =
    function(sql) {
        return new Promise(function(resolve, reject) {
            pro.using(getSqlConnection(), function(connection) {

                connection.query(sql).then(function(value) {
                    resolve(value)
                }).catch(function(error) {
                    reject(error)
                });
            })
        })
    }
