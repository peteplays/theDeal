# _theDeal_

## Install
Clone repo

`npm i`

`gulp build`

## Development Locally
`gulp` or `npm start`

This will open a browser window with live reloads

## Check Deploy
`npm start`

Severed at `http://localhost:5555`

## Components
- express

- gulp

- browserify

- mongo

- angular-ui-bootstrap

- font-awesome

## Usage
`gulp build` will build `bundled.css` and `bundled.js`, `bundled.min.css` and `bundled.min.js`, & add the bootstrap and font awesome icons to `fonts` _*run this first*_

`gulp` will build your `bundled.css` and `bundled.js` in `www` -> `css` and `js` and run live reloads

`npm start` or `gulp local` will build your `bundled.css` and `bundled.js` -> `css` and `js`

`npm start` with mongo running will give you access to the mongo

edit files in `app` -> `js` and `css` they will be bundled into `prod` and `dev`

add images in `media/images/`

### Mongo
Start mongo

insert the following objects into mongo

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

Run `npm start`

