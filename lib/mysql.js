exports.db = ()=>{
    var mysql = require('mysql');

    // var db = mysql.createConnection({
    //     host:'localhost',
    //     user:'root',
    //     password:'speed',
    //     database:'speed_34'
    // });
    
    var db = mysql.createConnection({
        host:'daesung.cafe24app.com',
        user:'daesung1080',
        password:'eotjdzjavjsl!',
        database:'daesung1080'
    });
    

    return db;
}