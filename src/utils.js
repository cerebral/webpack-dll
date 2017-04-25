var config = require(`../configs/${process.env.WEBPACK_DLL_ENV}.json`);
var hash = require('string-hash');
var path = require('path');
var mime = require('mime');

module.exports = {
  isProduction: function () {
    return process.env.NODE_ENV === 'production';
  },
  getVendorsBundleName: function (packages) {
    return String(hash(packages));
  },
  logError: function (err) {
    console.log(err.message);
    console.log(err.stack);
  },
  sendFile: function (fileName, content) {
    var contentType = mime.lookup(fileName);
    var contentLength = content.length;


    return function (res) {
      res.setHeader('Cache-Control', 'public, max-age=' + config.cacheMaxAge);
      res.setHeader('Content-Type', contentType);
      res.setHeader('Content-Length', contentLength);

      try {
        res.send(content);
      } catch (e) {}
    }
  }
};
