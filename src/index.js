var server = require('http').createServer();
var express = require('express');
var compression = require('compression');
var app = express();
var extractAndBundle = require('./extractAndBundle');

app.use(compression());

app.get('/:packages/dll.js', extractAndBundle('dll.js'));
app.get('/:packages/bundle.json', extractAndBundle('bundle.json'));

console.log('Running webpack-dll-service version: ', require('../package.json').version);

server.on('request', app);
server.listen(process.env.NODE_ENV === 'production' ? process.env.PORT : 5000);
