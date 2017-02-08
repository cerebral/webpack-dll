var webpack = require('webpack');
var path = require('path');
var utils = require('../utils');
var merge = require('webpack-merge');
var getVendors = require('./getVendors');
var writeManifest = require('./writeManifest');
var fs = require('fs')

module.exports = function (options) {
  options = options || {};

  return function (bundle) {
    return new Promise(function (resolve, reject) {
      var vendors = getVendors(bundle.entries, options);

      fs.writeFileSync('entries.js', JSON.stringify(vendors, null, 2));
      var defaultWebpackConfig = {
        context: '/',
        entry: { vendors: vendors },
        output: {
          path: path.join('/', 'bundles', bundle.name),
          filename: 'dll.js',
          library: 'dll_bundle'
        },
        resolveLoader: { root: path.resolve('node_modules') },
        resolve: { root: path.join('/', 'queues', options.queueId, 'node_modules') },
        plugins: [
          new webpack.DefinePlugin({
            'process.env': {
              'NODE_ENV': JSON.stringify('production'),
            }
          }),
          new webpack.DllPlugin({
           path: path.join('/', 'bundles', bundle.name, 'manifest.json'),
           name: 'dll_bundle',
           context: '/'
         }),
         new webpack.optimize.UglifyJsPlugin({minimize: true, mangle: false})
       ],
       module: {
         loaders: [{
           test: /\.json$/,
           loader: 'json'
         }]
       }
      };

      var webpackConfig = merge.smart(options.webpack || {}, defaultWebpackConfig);
      var vendorsCompiler = webpack(webpackConfig);

      vendorsCompiler.outputFileSystem = options.targetFs;
      vendorsCompiler.inputFileSystem = options.targetFs;
      vendorsCompiler.resolvers.normal.fileSystem = options.targetFs;
      vendorsCompiler.resolvers.context.fileSystem = options.targetFs;
      vendorsCompiler.run(function (err) {
        if (err) {
          return reject(err);
        }

        var manifest = JSON.parse(options.targetFs.readFileSync(path.join('/', 'bundles', bundle.name, 'manifest.json')).toString());
        writeManifest(utils.cleanManifest(manifest, bundle.entries), bundle, options);

        resolve(bundle);
      });
    })
    .catch(utils.logError);
  }
}
