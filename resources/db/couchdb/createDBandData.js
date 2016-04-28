/*
  This will create a db name `deal` in couchdb
  Then it will add 3 records to `deal`
  Start local couchdb
  Navigate to this project folder in terminal and...
  Run `cd resources/db/couchdb`
  Run `node createDBandData.js`
  The three records will be added to `deal`

  To setup the views refer to `couchDBConnection.js`

  ***Update the username and password to your couchdb before running***
*/
var user        = 'foo', //<-- Username
    pass        = 'bar', //<-- Password
    couchdb_url = 'http://'+user+':'+pass+'@localhost:5984',
    nano        = require('nano')(couchdb_url),
    db_name     = 'deal', //<-- the DB
    db          = nano.use(db_name);

//-- records
var data =  [
              { "name" : "pete", "color" : "blue", "fun" : "yes" },
              { "name" : "paul", "color" : "red", "fun" : "no" },
              { "name" : "mary", "color" : "purple", "fun" : "yes" }              
            ];

//-- create a new db
nano.db.create(db_name, function() {
  //-- add data
  data.forEach(function(record) {
    db.insert(record, function(err, body, header) {
      if (err) {
        console.log('ERROR: ', err.message);
        return;
      }
      console.log('you have added data records to `'+db_name+'`');
      console.log(body);
    });
  });
});
