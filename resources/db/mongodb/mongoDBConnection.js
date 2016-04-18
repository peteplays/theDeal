var MongoClient = require('mongodb').MongoClient,
    mongoUrl    = 'mongodb://localhost:27017/';

module.exports = function(app) {

    app.get('/dbCheck', function(req,res) {
        var db          = 'myproject',
            collection  = 'documents';
        MongoClient.connect(mongoUrl+db, function(err, db) {
            if (err) {
                console.log(err);
                res.json({'db':'fail', 'msg':err});
                throw err;
            }
            res.json({'db':'ok'});
        });
    });

    app.get('/dbGetAllNames', function(req,res) {
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
                db.close();
            });
        });
    });

    app.get('/dbCount', function(req,res) {
        var db  = 'myproject',
            collection  = 'documents';

        MongoClient.connect(mongoUrl+db, function(err, db) {
            if (err) {
                console.log(err);
                throw err;
            }
            db.collection(collection).count(function(err, result) {
                if(err) console.log(err);
                res.json(result);
                db.close();
            });
        });
    });

    app.post('/dbFindName', function(req,res) {
        var db          = 'myproject',
            collection  = 'documents',
            search      = JSON.parse('{"name":"'+req.body.name+'"}');

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
                db.close();
            });
        });
    });

    app.post('/dbInsert', function(req,res) {
        var db          = 'myproject',
            collection  = 'documents',
            insertData  = JSON.parse('{"name": "'+req.body.name+'", "color": "orange", "fun": "yes"}');

        MongoClient.connect(mongoUrl+db, function(err, db) {
            if (err) {
                console.log(err);
                throw err;
            }
            db.collection(collection).insert(insertData, function(err, result) {
                if(err) console.log(err);
                res.send(result);
                db.close();
            });
        });
    });

    app.post('/dbUpdate', function(req,res) {
        var db          = 'myproject',
            collection  = 'documents',
            findName  = JSON.parse('{"name": "'+req.body.name+'"}');
            updateData  = JSON.parse('{"$set":{"color":"'+req.body.color+'"}}');

        MongoClient.connect(mongoUrl+db, function(err, db) {
            if (err) {
                console.log(err);
                throw err;
            }
            db.collection(collection).updateOne(findName, updateData, function(err, result) {
                if(err) console.log(err);
                res.send(result);
                db.close();
            });
        });
    });

    app.post('/dbDelete', function(req,res) {
        var db          = 'myproject',
            collection  = 'documents',
            deleteData  = JSON.parse('{"name": "'+req.body.name+'"}');

        MongoClient.connect(mongoUrl+db, function(err, db) {
            if (err) {
                console.log(err);
                throw err;
            }
            db.collection(collection).deleteOne(deleteData, function(err, result) {
                if(err) console.log(err);
                res.send(result);
                db.close();
            });
        });
    });

};