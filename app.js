const express = require('express');
const mysql = require('mysql');
const app = express();

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'sampleDB',
    port: 3306
});

connection.connect(function(err) {
    if(err) {
        console.log("error connecting to database");
    } else {
        console.log("Connected to database");
    }
});

function getDriver(callback) {
    connection.query("SELECT * from my_table"),
    function(err, rows) {
        callback(err, rows);
    }
}
app.get('/', function(req, res){
   getDriver(function(err, driverResult) {
       res.render('SQLtest',  {title: 'Sqltest', result: driverResult});
   })
});

app.get('/user', function(req, res) {
    res.json({firstname: "John", lastname: "doh", age: 33})
});

app.listen(3000, function() {
    console.log("App is listening on port 3000")
});