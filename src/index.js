var config = require(`../configs/${process.env.WEBPACK_DLL_ENV}.json`);
var express = require('express');
var compression = require('compression');
var app = express();
var extractAndBundle = require('./extractAndBundle');
var path = require('path');
var cors = require('cors');
var queryPackage = require('./queryPackage');
var fs = require('fs');
var database = require('./database');
var utils = require('./utils');
var dbInstance = null;

database.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/webpack-dll')
  .then(function (connectedDb) {
    dbInstance = connectedDb
    console.log('Connected to database');
  })
  .catch(function (error) {
    console.log(error);
    console.log('Could not connect to database');
  });

app.use(compression());
app.use(cors())

function extractPackages (req, res, next) {
  req.params.packages = req.params['0']
  next()
}

function respondIfExists (fileName) {
  return function (req, res, next) {
    var vendorsBundleName = utils.getVendorsBundleName(req.params.packages);

    database.fileExists(vendorsBundleName, fileName)
      .then(function (exists) {
        if (exists) {
          database.getFile(vendorsBundleName, fileName, res)
            .then(function () {
              res.end();
            })
            .catch(function (err) {
              console.log('Could not get file ' + fileName + ' from database');
              res.sendStatus(500);
            });
        } else {
          next();
        }
      })
  }
}

app.get('/query/:packageName', cors({
  origin: config.clientQueryOrigin
}), queryPackage);
app.get('/*/dll.js', extractPackages, cors({
  origin: config.clientDllOrigin
}), respondIfExists('dll.js'), extractAndBundle('dll.js'));
app.get('/*/manifest.json', extractPackages, respondIfExists('manifest.json'), extractAndBundle('manifest.json'));

console.log('Running webpack-dll-service version: ', require('../package.json').version);

var server = app.listen(process.env.NODE_ENV === 'production' ? process.env.PORT : 5000);

server.timeout = config.connectTimeout;

process.on('SIGTERM', function () {
  dbInstance.close();
  server.close(function () {
    console.log('Graceful shutdown successful');
    process.exit(0);
  });
})
