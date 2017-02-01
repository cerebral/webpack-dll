var utils = require('./utils');
var path = require('path');
var vendorsQueue = require('./vendorsQueue');
var requestQueue = require('./requestQueue');

module.exports = function (options) {
  return function (bundle) {
    var timeout = utils.isProduction() ? 1000 * 60 * 5 : 1000 * 60;

    setTimeout(function () {
      Object.keys(bundle.entries).forEach(function (entry) {
        options.targetFs.rmdirSync(path.join('/', 'queues', options.queueId, 'node_modules', entry));
      });
      options.targetFs.rmdirSync(path.join('/', 'bundles', bundle.name));
      options.targetFs.rmdirSync(path.join('/', 'queues', options.queueId, 'node_modules'));
      options.targetFs.rmdirSync(path.join('/', 'queues', options.queueId));

      vendorsQueue.remove(bundle.name);
      requestQueue.remove(options.queueId);

      console.log('Removed entries ' + Object.keys(bundle.entries) + ' and ' + bundle.name);
    }, timeout);

    return bundle;
  };
};
