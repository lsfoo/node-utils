var csv = require('csv');
var fs = require('fs');
var path = require('path');

var filepath = "/MobileLocation.csv";
var mysql = require('mysql');
var pool  = mysql.createPool({
    connectionLimit : 10,
    user:'root',
    password:'xxxxxx',
    database:'xxxxxx',
    port:'xxxx',
});
console.log('开始')

fs.readFile(filepath, function(err, data) {
    if (err) throw err;
    csv.parse(data, function(err, data) {
        data.forEach(function(e, i, a) {
            if (i != 0) {
                pool.query('insert into mobile_local set mobile = ?,province = ?,city = ?,corp = ?,area_code=?,post_code=?',[e[1],e[2],e[3],e[4],e[5],e[6]],function(err,results,fields){
                    if(err) throw err;
                    console.log(e[2])
                })
            }
        });

    });
})
