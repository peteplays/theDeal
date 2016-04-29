# _theDeal_

## Install
Clone repo

`cd theDeal`

`npm i`

`gulp build`

## Develop Locally without DB Access
`gulp no-db`

This will open a browser window with live reloads

## Develop Locally with DB Access
### Without live loads
`npm start`

Severed at `http://localhost:5555`

### With live loads
** _WIP_ **

`gulp`

Severed at `http://localhost:7777`

This will open a browser window with live reloads

## Components
- express

- gulp

- browserify

- couchdb

- angular-ui-bootstrap

- font-awesome

## Usage
`gulp build` will build `bundled.css` and `bundled.js`, `bundled.min.css` and `bundled.min.js`, & add the bootstrap and font awesome icons to `fonts` (_run this first_)

`gulp` or `gulp no-db` will build your `bundled.css` and `bundled.js` in `www` -> `css` and `js` and run live reloads

`npm start` or `gulp local` will build your `bundled.css` and `bundled.js` -> `css` and `js`

`gulp` or `npm start` with couchdb running will give you access to the couchdb

edit files in `app` -> `js` and `css` they will be bundled into `www`

edit `index.html` in `www/`

add resources in `resources/`

images are in `resources/images/`

## CouchDB
Start couchdb

#### Auto db create and add data
This will create a db name `deal` in couchdb

Then it will add 3 records to `deal`

Navigate to this project folder `couchdb` in terminal and run `createDBandData.js`

- `cd resources/db/couchdb/`

- `node createDBandData.js`

The following three records will be added to `deal`

To setup the views refer to `couchDBConnection.js`

#### Enter data manually
Create db in couchdb `deal`

insert the following objects into couchdb

`{
    "name" : "pete",
    "color" : "blue",
    "fun" : "yes"
}`

`{
    "name" : "mary",
    "color" : "purple",
    "fun" : "yes"
}`

`{
    "name" : "paul",
    "color" : "red",
    "fun" : "no"
}`


