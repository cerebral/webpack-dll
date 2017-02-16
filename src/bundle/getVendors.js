var utils = require('../utils');
var path = require('path')

module.exports = function (entries, options) {
  return Object.keys(entries).reduce(function (vendors, entryKey) {
    const newVendors = vendors.concat(
      entries[entryKey].isBrowserEntry ?
        [entryKey]
      :
        utils.findEntryPoints(
          options.targetFs,
          entryKey,
          path.join('/', 'queues', options.queueId),
          entries[entryKey].path
        )
    );

    if (newVendors.indexOf(entries[entryKey].path) === -1) {
      newVendors.push(path.join('/', 'queues', options.queueId, entries[entryKey].path));
    }

    return newVendors;
  }, []);
}
