var memoryFs = require('./memoryFs');
var path = require('path');
var queue = {};
var utils = require('./utils');

module.exports = {
  add: function (id, file, res) {
    if (!queue[id]) {
      queue[id] = {'dll.js': [], 'manifest.json': [], bundle: null, resolvedManifest: false, resolvedDll: false}
    }

    queue[id][file].push(res);

    if (queue[id].bundle) {
      this.resolveFiles(id, queue[id].bundle)
    }
  },
  remove: function (id) {
    delete queue[id];
  },
  resolveFiles (id, bundle) {
    this.resolveManifest(id, bundle)
    this.resolveDll(id, bundle)

    if (queue[id].resolvedDll && queue[id].resolvedManifest) {
      delete queue[id]

      require('./cleaner').remove(id, bundle)
    }
  },
  resolveDll: function (id, bundle) {
    queue[id].bundle = bundle;

    var requests = queue[id]['dll.js'];
    var content = memoryFs.fs.readFileSync(path.join('/', 'bundles', bundle.name, 'dll.js')).toString();

    requests.forEach(utils.sendFile('dll.js', content))
    queue[id].resolvedDll = Boolean(queue[id]['dll.js'].length)
    queue[id]['dll.js'] = [];
  },
  resolveManifest: function (id, bundle) {
    queue[id].bundle = bundle;

    var requests = queue[id]['manifest.json'];
    var content = memoryFs.fs.readFileSync(path.join('/', 'bundles', bundle.name, 'manifest.json')).toString();

    requests.forEach(utils.sendFile('manifest.json', content));
    queue[id].resolvedManifest = Boolean(queue[id]['manifest.json'].length)
    queue[id]['manifest.json'] = [];
  },
  reject: function (id, err) {
    var requests = queue[id]['dll.js'].concat(queue[id]['manifest.json']);
    var bundle = queue[id].bundle;

    requests.forEach(function (res) {
      try {
        res.status(500).send({
          message: err.message
        });
      } catch (e) {}
    })

    if (bundle) {
      require('./cleaner').remove(id, bundle);
    }

    delete queue[id];
  }
}
