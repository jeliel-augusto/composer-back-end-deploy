var mysql = require('mysql');

var Connection = function(){
    return mysql.createPool({
        host : 'fdb20.awardspace.net',
        user : '2779346_dbfortests2',
        port: '3306',
        password : 'MzWD@MSih#QerQp^N7*8',
        database : '2779346_dbfortests2'
    });
}

module.exports = Connection();