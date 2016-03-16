var express = require('express');
var app = express();

var port = '5555';

console.log('Server running at http://localhost:'+port);

app.use(express.static('prod'));
app.use(express.static('media'));

app.get('/',function(req,res){
    res.sendFile('/index.html');
});

app.listen(port);