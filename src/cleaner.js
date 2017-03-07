var config = require(`../configs/${process.env.WEBPACK_DLL_ENV}.json`);
var utils = require('./utils');
var path = require('path');
var vendorsQueue = require('./vendorsQueue');
var requestQueue = require('./requestQueue');

var timeouts = {}

module.exports = {
  add: function (options) {
    return function (bundle) {
      var timeout = config.cleanQueueTimeout;

      timeouts[options.queueId] = setTimeout(function () {
        Object.keys(bundle.entries).forEach(function (entry) {
          options.targetFs.rmdirSync(path.join('/', 'queues', options.queueId, 'node_modules', entry));
        });
        options.targetFs.rmdirSync(path.join('/', 'bundles', bundle.name));
        options.targetFs.rmdirSync(path.join('/', 'queues', options.queueId, 'node_modules'));
        options.targetFs.rmdirSync(path.join('/', 'queues', options.queueId));

        vendorsQueue.remove(bundle.name);
        requestQueue.remove(options.queueId);

        console.log('Removed entries with TIMEOUT - ' + Object.keys(bundle.entries) + ' and ' + bundle.name);
      }, timeout);

      return bundle;
    };
  },
  remove: function (queueId, bundle) {
    clearTimeout(timeouts[queueId]);
    console.log('Removed entries MANUALLY - ' + Object.keys(bundle.entries) + ' and ' + bundle.name);
  }
}
