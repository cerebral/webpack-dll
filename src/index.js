var server = require('http').createServer();
var express = require('express');
var compression = require('compression');
var app = express();
var extractAndBundle = require('./extractAndBundle');
var path = require('path');
var dashboard = require('./dashboard');

app.use(compression());

if (process.env.DEBUG) {
  app.use(express.static(path.resolve('src', 'dashboard', 'public')));
  app.get('/dashboard/packages', dashboard.getPackages);
  app.get('/dashboard/packages/:packageName', dashboard.getPackage);
  app.delete('/dashboard/packages/:packageName', dashboard.deletePackage);

  app.get('/:packages/dll.js', dashboard.getDll);
  app.get('/:packages/manifest.json', dashboard.getManifest);
} else {
  app.get('/:packages/dll.js', extractAndBundle('dll.js'));
  app.get('/:packages/manifest.json', extractAndBundle('manifest.json'));
}

console.log('Running webpack-dll-service version: ', require('../package.json').version);

server.on('request', app);
server.listen(process.env.NODE_ENV === 'production' ? process.env.PORT : 5000);
