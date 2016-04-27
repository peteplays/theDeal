var request     = require('request'),
    u           = 'foo',
    p           = 'bar',
    couchdb_url = 'http://'+u+':'+p+'@localhost:5984',
    nano        = require('nano')(couchdb_url),
    db_name     = 'deal',
    db          = nano.use(db_name);

// var nano = require('nano-blue')('http://localhost:5984'),
//     db   = nano.use('alice');

module.exports = function(app) {

    app.get('/dbCheck', function(req,res) {
        request.get(couchdb_url+'/'+db_name, function(error, response, body) {
            if(error) {console.log(error); return;}
            if(response) {
                var jsonData = JSON.parse(body);
                if(jsonData.db_name == db_name) res.send('ok');
            }
        });
    });

    app.get('/dbGetAllNames', function(req,res) { 
        db.view('list', 'listalldocs', function(err, body) {
            if(err) {console.log(err); return;}
            if(!err) {
                res.send(body.rows);
            }
        });
    });

    app.get('/dbCount', function(req,res) {
        db.view('list', 'listalldocs', function(err, body) {
            if(err) {console.log(err); return;}
            if(!err) {
                res.json(body.rows.length);
            }
        });    
    });

    app.post('/dbFindName', function(req,res) {
        var search = { key: req.body.name };
        db.view('search', 'searchbyname', search,function(err, body) {
            if(err) {console.log(err); return;}
            if(!err) {
                if(body.rows[0]) {
                    res.json(body.rows[0].value);
                } else {
                    res.json();
                }              
            }
        });
        //http://localhost:5984/YOUR_DTABASE/_design/YOUR_DESIGN_DOCUMENT/_view/YOUR_VIEW?key='e-mail@addre.ss'
    });

    app.post('/dbInsert', function(req,res) {
        var addData = { name: req.body.name, color: 'orange', fun: 'yes' };
        db.insert(addData, function(err, body, header) {
            if(err) { console.log(err.message); return; }
            if(!err) {
                console.log(body);
                if(body.ok === true) {
                    res.json(addData);
                } else {
                    res.json();
                }              
            }
        });
    });

    // app.post('/dbUpdate', function(req,res) {

    // });

    // app.post('/dbDelete', function(req,res) {

    // });

};