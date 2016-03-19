var express     = require('express'),
    bodyParser  = require("body-parser");
    app         = express(),
    path        = require('path'),
    MongoClient = require('mongodb').MongoClient,
    port        = '5555',
    mongoUrl    = 'mongodb://localhost:27017/';

console.log('Server running at http://localhost:'+port);

app.use(express.static('resources'));
app.use(express.static('www'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/',function(req,res){
    res.setHeader('Content-Type', 'application/json');
    res.sendFile('index');
    //res.sendFile(path.join(__dirname + '/www/indexp.html'));
});

app.get('/dbGet', function(req,res) {
    var db          = 'myproject',
        collection  = 'documents';
    MongoClient.connect(mongoUrl+db, function(err, db) {
        if (err) {
        	console.log(err);
            throw err;
        }
        db.collection(collection).find().toArray(function(err, result) {
            if (err) {
            	console.log(err);
                throw err;
            }
            res.json(result);
        });
    });
});

app.post('/dbPost', function(req,res) {
    var db          = 'myproject',
        collection  = 'documents',
        search      = JSON.parse('{"name":"'+req.body.name+'"}');
        console.log(req.body.name);

    MongoClient.connect(mongoUrl+db, function(err, db) {
        if (err) {
        	console.log(err);
            throw err;
        }
        db.collection(collection).find(search).toArray(function(err, result) {
            if (err) {
            	console.log(err);
                throw err;
            }
            res.send(result);
        });
    });
});

app.listen(port);