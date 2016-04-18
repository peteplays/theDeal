var express     = require('express'),
    bodyParser  = require("body-parser"),
    favicon     = require('serve-favicon'),
    app         = express(),
    path        = require('path'),
    port        = '5555';

console.log('Server running at...\nhttp://localhost:'+port);

app .use(express.static('resources'))
    .use(express.static('www'))
    .use(favicon(__dirname + '/resources/images/favicon.ico'))
    .use(bodyParser.urlencoded({ extended: false }))
    .use(bodyParser.json());

app.get('/',function(req,res){
    res.setHeader('Content-Type', 'application/json');
    res.sendFile('index');
    //res.sendFile(path.join(__dirname + '/www/indexp.html'));
});

var mongoDBConnection = require('./resources/db/mongodb/mongoDBConnection.js');
mongoDBConnection(app);

app.listen(port);