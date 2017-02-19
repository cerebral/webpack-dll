var path = require('path');

module.exports = function (manifest, bundle, options) {
  var rewrittenManifest = Object.assign({}, manifest, {
    content: Object.keys(manifest.content).reduce(function (newContent, key) {
      newContent[key.replace('/queues/' + options.queueId, '')] = manifest.content[key].id;

      return newContent;
    }, {})
  });

  options.targetFs.writeFileSync(
    path.join('/', 'bundles', bundle.name, 'manifest.json'),
    JSON.stringify(rewrittenManifest)
  );
}
