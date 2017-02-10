var config = require(`../configs/${process.env.WEBPACK_DLL_ENV}.json`);
var server = require('http').createServer();
var express = require('express');
var compression = require('compression');
var app = express();
var extractAndBundle = require('./extractAndBundle');
var path = require('path');
var dashboard = require('./dashboard');
var cors = require('cors');
var getPackage = require('./getPackage');

app.use(compression());
app.use(cors({
  origin: config.clientOrigin
}));

if (process.env.DEBUG) {
  app.use(express.static(path.resolve('src', 'dashboard', 'public')));
  app.get('/dashboard/packages', dashboard.getPackages);
  app.get('/dashboard/packages/:packageName', dashboard.getPackage);
  app.delete('/dashboard/packages/:packageName', dashboard.deletePackage);

  app.get('/query/:packageName', getPackage);
  app.get('/:packages/dll.js', dashboard.getDll);
  app.get('/:packages/manifest.json', dashboard.getManifest);
} else {
  app.get('/query/:packageName', getPackage);
  app.get('/:packages/dll.js', extractAndBundle('dll.js'));
  app.get('/:packages/manifest.json', extractAndBundle('manifest.json'));
}

console.log('Running webpack-dll-service version: ', require('../package.json').version);

server.on('request', app);
server.listen(process.env.NODE_ENV === 'production' ? process.env.PORT : 5000);

process.on('SIGTERM', function () {
  app.close(function () {
    console.log('Graceful shutdown successful');
    process.exit(0);
  });
})
