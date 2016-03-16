# _theDeal_

## Install
Clone repo

`npm i`

## Development Locally
`gulp` or `npm test`

This will open a browser window with live reloads

## Check Deploy
`npm start`

Severed at `http://localhost:5555`

## Components
- express

- gulp

- browserify

## Usage
`npm start` , `gulp` ,  or `npm test` will build your `bundled.min.css` and `bundled.min.js` in `prod` -> `css` and `js` and build your `bundled.css` and `bundled.js` in `dev` -> `css` and `js`

edit files in `app` -> `js` and `css` they will be bundled into `prod` and `dev`

`dev` contains none minified files

`prod` contains minified files

add images in `media/images/`

edit `index.html` in `prod` and `dev` the are independent from each other ___TODO create master index___

