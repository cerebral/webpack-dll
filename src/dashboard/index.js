var path = require('path');
var fs = require('fs');

module.exports = {
  getPackages: function (req, res) {
    var bundlePublicPath = path.resolve('src', 'dashboard', 'public', 'bundles');
    res.send(fs.readdirSync(bundlePublicPath));
  },
  getPackage: function (req, res) {
    var bundlePublicPath = path.resolve('src', 'dashboard', 'public', 'bundles', req.params.packageName);
    res.send(JSON.parse(fs.readFileSync(path.join(bundlePublicPath, 'manifest.json'))));
  },
  deletePackage: function (req, res) {
    var bundlePublicPath = path.resolve('src', 'dashboard', 'public', 'bundles', req.params.packageName);
    fs.unlinkSync(path.join(bundlePublicPath, 'dll.js'));
    fs.unlinkSync(path.join(bundlePublicPath, 'manifest.json'));
    fs.rmdirSync(bundlePublicPath);
    res.send();
  }
}
