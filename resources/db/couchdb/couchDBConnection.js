var _           = require('underscore'),
    u           = 'foo',
    p           = 'bar',
    couchdb_url = 'http://'+u+':'+p+'@localhost:5984',
    nano        = require('nano')(couchdb_url),
    db_name     = 'deal',
    db          = nano.use(db_name);

module.exports = function(app) {

    app.get('/dbCheck', function(req,res) {        
        nano.db.get(db_name, function(err, body) {
            if(err) { console.log(err); return; }
            if (!err) { if(body.db_name == db_name) res.send('ok'); }
        });
    });

    app.get('/dbGetAllNames', function(req,res) {
        db.view('list', 'listalldocs', function(err, body) {
            if(err) { console.log(err); return; }
            if(!err) { res.send(body.rows); }
        });
        //-- user default function
        //-- http://localhost:5984/YOUR_DTABASE/_design/{list}/_view/{listalldocs}
    });

    app.get('/dbCount', function(req,res) {
        db.view('list', 'listalldocs', function(err, body) {
            if(err) { console.log(err); return; }
            if(!err) { res.json(body.rows.length); }
        });
    });

    app.post('/dbFindName', function(req,res) {
        var search = { key: req.body.name };
        db.view('search', 'searchbyname', search, function(err, body) {
            if(err) {console.log(err); return;}
            if(!err) {
                if(_.isEmpty(body.rows)) {
                    res.send('`' + req.body.name + '` not in DB');
                } else if(body.rows[0]) {
                    res.json(body.rows[0].value);
                } else { res.json(); }
            }
        });
        //-- set view design `search` view: view name: `searchbyname`
        //-- function (doc) {
        //--   if (!doc.name) return;
        //--   emit(doc.name, doc);
        //-- }
        //-- http://localhost:5984/YOUR_DTABASE/_design/{search}/_view/{searchbyname}?key='e-mail@addre.ss
    });

    app.post('/dbInsert', function(req,res) {
        var add_data = { name: req.body.name, color: 'orange', fun: 'yes' };
        db.insert(add_data, function(err, body) {
            if(err) { console.log(err.message); res.json(); }
            if(!err) {
                if(body.ok === true) {
                    res.json(add_data);
                } else { res.json(); }
            }
        });
    });

    app.post('/dbUpdate', function(req,res) {
        var search = { key: req.body.name },
            add_data = {};

        add_data[_.keys(req.body)[1]] = _.values(req.body)[1];
        db.view('search', 'searchbyname', search, function(err, body) {
            if(err) {console.log(err); return;}
            if(!err) {
                if(_.isEmpty(body.rows)) {
                    res.send('`' + req.body.name + '` not in DB');
                } else if(body.rows[0]) {
                    var updated_values = _.extendOwn(body.rows[0].value, add_data);
                    db.insert(updated_values, function(err, body) {
                        if(err) { console.log(err); res.json(); }
                        if(!err) {
                            if(body.ok === true) {
                                res.json(add_data);
                            } else {
                                res.json();
                            }
                        }
                    });
                } else { res.json(); }
            }
        });
    });

    app.post('/dbDelete', function(req,res) {
        var search = { key: req.body.name };
        db.view('search', 'searchbyname', search, function(err, body) {
            if(err) {console.log(err); return;}
            if(!err) {
                if(_.isEmpty(body.rows)) {
                    res.send('`' + req.body.name + '` not in DB');
                } else if(body.rows[0]) {
                    db.destroy(body.rows[0].value._id, body.rows[0].value._rev, function(err, body) {
                        if(err) { console.log(err); res.json(); }
                        if(!err) {
                            if(body.ok === true) {
                                res.json(body.ok);
                            } else {
                                res.json();
                            }
                        }
                    });
                } else { res.json(); }
            }
        });
    });

};