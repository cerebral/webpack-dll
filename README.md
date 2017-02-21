# webpack-dll-service
A service that converts a package into a DLL and manifest

## How does it work?

Webpackbin needs an external bundle of NPM packages. This keeps the webpackbin bundle very fast to rebundle and the external NPM packages bundle, called the DLL, is cached forever. When webpack-dll receives a request for bundling it looks something like: */react@15.0.2+react-dom@15.0.2/manifest.json*. Though it could also be: */react@15.0.2+react-dom@15.0.2/dll.js*. The point is that the first request that hits the service will start the bundle process, while the other request will stay in pending mode until the bundle is done.

In production mode this service sits behind [www.jsdelivr.com](http://www.jsdelivr.com/). It caches the bundles for around a year and will instantly respond with later requests to same urls.
