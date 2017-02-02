var memoryFs = require('./memoryFs');
var mime = require('mime');
var path = require('path');
var queue = {};
var utils = require('./utils');

module.exports = {
  add: function (id, file, res) {
    if (!queue[id]) {
      queue[id] = {'dll.js': [], 'manifest.json': [], bundle: null}
    }

    queue[id][file].push(res);

    if (queue[id].bundle) {
      this.resolveBundle(id, queue[id].bundle)
      this.resolveDll(id, queue[id].bundle)
    }
  },
  remove: function (id) {
    delete queue[id];
  },
  resolveDll: function (id, bundle) {
    queue[id].bundle = bundle;

    var requests = queue[id]['dll.js'];
    var content = memoryFs.fs.readFileSync(path.join('/', 'bundles', bundle.name, 'dll.js')).toString();
    var contentType = mime.lookup('dll.js');
    var contentLength = content.length;

    requests.forEach(function (res) {
      res.setHeader('Content-Type', contentType);
      res.setHeader('Content-Length', contentLength);
      res.send(content);
    });

    queue[id]['dll.js'] = [];
  },
  resolveBundle: function (id, bundle) {
    queue[id].bundle = bundle;

    var requests = queue[id]['manifest.json'];
    var manifest = JSON.parse(memoryFs.fs.readFileSync(path.join('/', 'bundles', bundle.name, 'manifest.json')).toString());

    requests.forEach(function (res) {
      res.send(manifest);
    });

    queue[id]['manifest.json'] = [];
  },
  reject: function (file, id, err) {
    var requests = queue[id][file];

    requests.forEach(function (res) {
      res.status(500).send({
        message: err
      });
    })

    queue[id][file] = [];
  }
}
