var MongoClient = require('mongodb').MongoClient,
    mongoUrl    = 'mongodb://localhost:27017/',
    db          = 'myproject',
    collection  = 'documents';

module.exports = function(app) {

    app.get('/dbCheck', function(req,res) {
        MongoClient.connect(mongoUrl+db, function(err, db) {
            if (err) {
                console.log(err);
                res.json({'db':'fail', 'msg':err});
                return;
            }
            res.json({'db':'ok'});
        });
    });

    app.get('/dbGetAllNames', function(req,res) {
        MongoClient.connect(mongoUrl+db, function(err, db) {
            if (err) { console.log(err); return; }
            db.collection(collection).find().toArray(function(err, result) {
                if (err) {
                    console.log(err);
                    throw err;
                }
                res.json(result);
                db.close();
            });
        });
    });

    app.get('/dbCount', function(req,res) {
        MongoClient.connect(mongoUrl+db, function(err, db) {
            if (err) { console.log(err); return; }
            db.collection(collection).count(function(err, result) {
                if(err) console.log(err);
                res.json(result);
                db.close();
            });
        });
    });

    app.post('/dbFindName', function(req,res) {
        var search = JSON.parse('{"name":"'+req.body.name+'"}');

        MongoClient.connect(mongoUrl+db, function(err, db) {
            if (err) { console.log(err); return; }
            db.collection(collection).find(search).toArray(function(err, result) {
                if (err) { console.log(err); return; }
                res.send(result);
                db.close();
            });
        });
    });

    app.post('/dbInsert', function(req,res) {
        var insertData = JSON.parse('{"name": "'+req.body.name+'", "color": "orange", "fun": "yes"}');

        MongoClient.connect(mongoUrl+db, function(err, db) {
            if (err) { console.log(err); return; }
            db.collection(collection).insert(insertData, function(err, result) {
                if(err) console.log(err);
                res.send(result);
                db.close();
            });
        });
    });

    app.post('/dbUpdate', function(req,res) {
        var findName    = JSON.parse('{"name": "'+req.body.name+'"}');
            updateData  = JSON.parse('{"$set":{"color":"'+req.body.color+'"}}');

        MongoClient.connect(mongoUrl+db, function(err, db) {
            if (err) { console.log(err); return; }
            db.collection(collection).updateOne(findName, updateData, function(err, result) {
                if(err) console.log(err);
                res.send(result);
                db.close();
            });
        });
    });

    app.post('/dbDelete', function(req,res) {
        var deleteData  = JSON.parse('{"name": "'+req.body.name+'"}');

        MongoClient.connect(mongoUrl+db, function(err, db) {
            if (err) { console.log(err); return; }
            db.collection(collection).deleteOne(deleteData, function(err, result) {
                if(err) { console.log(err); return; }
                res.send(result);
                db.close();
            });
        });
    });

};