var express = require('express');
var app = express();
var mysql = require('mysql');
var http = require('http');
var cors = require('cors');
var bodyParser = require('body-parser');
var mysqlConfig = require('./mysqlConfig.js');

var port = process.env.port || 3000;
app.use(cors());
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: false
}));
app.get('/', function (req, res) {
    res.send('Issue Tracking System Api\'s!');
});
//app.options('*', cors());

var pool = mysql.createPool(mysqlConfig);

app.get('/checkuser', function (req, res) {
    var username = req.query.username;
    var password = req.query.password;
    if (username === 'siva' && password === 'siva') {
        var results = [{ "username": "Siva", "role": "admin" }];
        res.json(results);
    } else {
        pool.getConnection(function (err, connection) {
            if (err)
                res.send('Error occured while connecting to MySql');
            else {
                connection.query('select username,role,status from users WHERE username = ? and password = ?', [username, password],
                    function (err, results) {
                        if (!err)
                            res.json(results);
                        connection.release();
                    });
            }
        });
    }
});

app.get('/getTicketsList', function (req, res) {
    pool.getConnection(function (err, connection) {
        if (err) {
            var results = [{ "id": 1, "title": "Issue1", "description": "jsbdfhjsdfhjd", "timestamp": "2016-11-29T18:30:00.000Z", "comments": "ok" },
            { "id": 2, "title": "Issue2", "description": "ppoajjd", "timestamp": "2016-12-10T18:30:00.000Z", "comments": "ok" }];
            res.json(results);
        }
        else {
            connection.query('select * from ticketslist', function (err, results) {
                if (!err)
                    res.json(results);
                connection.release();
            });
        }
    });
});

app.get('/getusersroles', function (req, res) {
    pool.getConnection(function (err, connection) {
        if (err) {
            var results = [{ "username": "siva", "role": "admin", "status": "active" },
            { "username": "admin", "role": "admin", "status": "active" }];
            res.json(results);
        }
        else {
            connection.query('select username,role,status from users',
                function (err, results) {
                    if (!err)
                        res.json(results);
                    connection.release();
                });
        }
    });
});

app.post('/addupdateticket', function (req, res) {
    var title = req.body.title;
    var description = req.body.description;
    var timestamp = req.body.timestamp;
    var comments = req.body.comments;
    pool.getConnection(function (err, connection) {
        if (err)
            res.send('Error occured while connecting to MySql');
        else {
            var values = { title: title, description: description, timestamp: timestamp, comments: comments };
            connection.query('INSERT INTO ticketslist SET ?', values,
                function (err, results) {
                    if (!err)
                        res.json(results);
                    connection.release();
                });
        }
    });
});

http.createServer(app).listen(port, function (req, res) {
    console.log('Server running at port no ' + port);
});