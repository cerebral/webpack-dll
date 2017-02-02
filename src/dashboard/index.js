var path = require('path');
var extractAndBundle = require('../extractAndBundle');
var fs = require('fs');
var mime = require('mime');

function extractPackages (req) {
  var bundlePublicPath = path.resolve('src', 'dashboard', 'public', 'bundles', req.params.packages);
  var dllPromise = new Promise(function (resolve) {
    extractAndBundle('dll.js')(req, {
      setHeader: function () {},
      send: function (content) {
        fs.writeFileSync(path.join(bundlePublicPath, 'dll.js'), content, 'utf-8');
        resolve(content);
      }
    });
  });
  var bundlePromise = new Promise(function (resolve) {
    extractAndBundle('bundle.json')(req, {
      setHeader: function () {},
      send: function (content) {
        fs.writeFileSync(path.join(bundlePublicPath, 'bundle.json'), JSON.stringify(content, null, 2), 'utf-8');
        resolve(content);
      }
    });
  });

  fs.mkdirSync(bundlePublicPath);

  return Promise.all([
    dllPromise,
    bundlePromise
  ]);
}

module.exports = {
  getDll: function (req, res) {
    var bundlePublicPath = path.resolve('src', 'dashboard', 'public', 'bundles', req.params.packages);
    try {
      var content = fs.readFileSync(path.join(bundlePublicPath, 'dll.js')).toString();
      var contentType = mime.lookup('dll.js');
      var contentLength = content.length;

      res.setHeader('Content-Type', contentType);
      res.setHeader('Content-Length', contentLength);
      res.send(content);
    } catch (e) {
      extractPackages(req)
        .then(function (results) {
          var contentType = mime.lookup('dll.js');
          var contentLength = content.length;

          res.setHeader('Content-Type', contentType);
          res.setHeader('Content-Length', contentLength);
          res.send(results[0]);
        })
        .catch(function (err) {
          res.send(err);
        });
    }
  },
  getBundle: function (req, res) {
    console.log('getting bundle!');
    var bundlePublicPath = path.resolve('src', 'dashboard', 'public', 'bundles', req.params.packages);
    try {
      var content = fs.readFileSync(path.join(bundlePublicPath, 'bundle.json')).toString();
      console.log('content', content);

      res.send(JSON.parse(content));
    } catch (e) {
      extractPackages(req)
        .then(function (results) {
          res.send(results[1]);
        })
        .catch(function (err) {
          res.send(err);
        });
    }
  },
  getPackages: function (req, res) {
    var bundlePublicPath = path.resolve('src', 'dashboard', 'public', 'bundles');
    res.send(fs.readdirSync(bundlePublicPath));
  },
  getPackage: function (req, res) {
    var bundlePublicPath = path.resolve('src', 'dashboard', 'public', 'bundles', req.params.packageName);
    res.send(JSON.parse(fs.readFileSync(path.join(bundlePublicPath, 'bundle.json'))));
  },
  deletePackage: function (req, res) {
    var bundlePublicPath = path.resolve('src', 'dashboard', 'public', 'bundles', req.params.packageName);
    fs.unlinkSync(path.join(bundlePublicPath, 'dll.js'));
    fs.unlinkSync(path.join(bundlePublicPath, 'bundle.json'));
    fs.rmdirSync(bundlePublicPath);
    res.send();
  }
}
