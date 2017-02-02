var utils = require('../utils');
var path = require('path')
module.exports = function (entries, options) {
  return Object.keys(entries).reduce(function (vendors, entryKey) {
    return vendors.concat(
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
  }, []);
}
