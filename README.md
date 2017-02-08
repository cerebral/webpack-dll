# webpack-dll-service
A service that converts a package into a DLL and manifest

## How to use

As an example you want to bundle `react@15.4.2` and `react-dom@15.4.2`.

1. Grab the `bundle.json` from [https://[yourdomain]/react@15.4.2+react-dom@15.4.2/manifest.json]()
2. The bundle contains the `manifest` and `externals`, used to configure your webpack setup

```js
const webpack = require('webpack')
const path = require('path')
const bundle = require('./bundle.json')

module.exports = {
  entry: path.resolve('src', 'main.js'),
  output: {
    path: path.resolve('public'),
    filename: 'main.js',
    publicPath: '/'
  },
  plugins: [
    new webpack.DllReferencePlugin({
      context: '/',
      manifest: bundle.manifest
    })
  ],
  externals: bundle.externals
};
```

3. Include the same url as a script tag in your `index.html`, pointing to `dll.js`:

```html
<body>
  <script src="https://[yourdomain]/react@15.4.2+react-dom@15.4.2/dll.js"></script>
</body>
```

## NOTE!
If you are the first to bundle the specific set of packages it will take a few seconds for the service to bundle it together. If you hit the CDN you will instantly get the files. The files are cached for ???.
