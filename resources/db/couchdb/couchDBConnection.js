var request = require('request'),
    db = 'test';

module.exports = function(app) {

    // app.get('/dbCheck', function(req,res) {

    // });

    app.get('/dbGetAllNames', function(req,res) {
        request.get('http://127.0.0.1:5984/'+db+'/_all_docs',  function (error, response, body) {
          if(error) {
            console.log(error);
          }
          if(response) {
            //console.log(response.body);
            //console.log(JSON.parse(body));
            var jsonData = JSON.parse(body);
            jsonData.rows.forEach(function(v) {
                console.log(v);
            });
          }
        });
    });

    // app.get('/dbCount', function(req,res) {

    // });

    // app.post('/dbFindName', function(req,res) {

    // });

    // app.post('/dbInsert', function(req,res) {

    // });

    // app.post('/dbUpdate', function(req,res) {

    // });

    // app.post('/dbDelete', function(req,res) {

    // });

};