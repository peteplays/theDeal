var express = require('express');
var app = express();
var path = require('path');

var port = '5555';

console.log('Server running at http://localhost:'+port);

app.use(express.static('media'));
app.use(express.static('www'));


app.get('/',function(req,res){
    res.sendFile('index');
    //res.sendFile(path.join(__dirname + '/www/indexp.html'));
});

app.listen(port);