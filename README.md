# _theDeal_

## Install
Clone repo

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
*WIP*
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

`gulp` will build your `bundled.css` and `bundled.js` in `www` -> `css` and `js` and run live reloads

`npm start` or `gulp local` will build your `bundled.css` and `bundled.js` -> `css` and `js`

`npm start` with mongo running will give you access to the mongo

edit files in `app` -> `js` and `css` they will be bundled into `www`

add resources in `resources`

images are in `resources/images/`

### CouchDB
Start couchdb

#### Auto db create and add data
This will create a db name `deal` in couchdb

Then it will add 3 records to `deal`

Navigate to this project folder in terminal and run `createDBandData.js`

- Run `cd resources/db/couchdb`

- Run `node createDBandData.js`

The following three records will be added to `deal`

To setup the views refer to `couchDBConnection.js`

#### Enter data manually
Create db in couchdb

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


