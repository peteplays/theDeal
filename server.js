var express = require('express');
var app = express();

var port = '7777';

console.log('open at http://localhost:'+port)

app.use(express.static('www'));

app.get('/',function(req,res){       
    res.sendFile('/index.html');
});

app.listen(port);