var config = require(`../configs/${process.env.WEBPACK_DLL_ENV}.json`);
var express = require('express');
var compression = require('compression');
var app = express();
var extractAndBundle = require('./extractAndBundle');
var path = require('path');
var dashboard = require('./dashboard');
var cors = require('cors');
var queryPackage = require('./queryPackage');
var fs = require('fs');

app.use(compression());
app.use(cors())

function extractPackages (req, res, next) {
  req.params.packages = req.params['0']
  next()
}

if (process.env.DEBUG) {
  if (!fs.existsSync(path.resolve('src', 'dashboard', 'public', 'bundles'))) {
    fs.mkdir(path.resolve('src', 'dashboard', 'public', 'bundles'))
  }

  app.use(express.static(path.resolve('src', 'dashboard', 'public')));
  app.get('/dashboard/packages', dashboard.getPackages);
  app.get('/dashboard/packages/:packageName', dashboard.getPackage);
  app.delete('/dashboard/packages/:packageName', dashboard.deletePackage);
}

app.get('/query/:packageName', cors({
  origin: config.clientQueryOrigin
}), queryPackage);
app.get('/*/dll.js', extractPackages, cors({
  origin: config.clientDllOrigin
}), extractAndBundle('dll.js'));
app.get('/*/manifest.json', extractPackages, extractAndBundle('manifest.json'));

console.log('Running webpack-dll-service version: ', require('../package.json').version);

var server = app.listen(process.env.NODE_ENV === 'production' ? process.env.PORT : 5000);

server.timeout = config.connectTimeout;

process.on('SIGTERM', function () {
  server.close(function () {
    console.log('Graceful shutdown successful');
    process.exit(0);
  });
})
