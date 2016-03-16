var express     = require('express'),
    app         = express(),
    path        = require('path'),
    port        = '5555',
    MongoClient = require('mongodb').MongoClient;

app.use(express.static('www'));

app.get('/mongo', function(req,res) {
    var db          = 'myproject',
        collection  = 'documents';

    MongoClient.connect('mongodb://localhost:27017/'+db, function(err, db) {
        if (err) {
            throw err;
        }
        db.collection(collection).find().toArray(function(err, result) {
            if (err) {
                throw err;
            }
            console.log(result);
            result.forEach(function(v) {
                console.log(v.name);
            });
        });
    });

    res.sendFile(path.join(__dirname + '/www/index.html'));
});

app.listen(port);