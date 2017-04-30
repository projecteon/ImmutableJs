const merge = require('webpack-merge');
const path = require('path');
const parts = require('./webpack.config-parts');

const PATHS = {
  app: path.join(__dirname, 'src/scripts'),
  build: path.join(__dirname, 'dist'),
  images: [
    path.join(__dirname, 'src/images')
  ]
};

let config;
switch (process.env.npm_lifecycle_event) {
  case 'build': {
    config = merge(
      {
        entry: {
          app: PATHS.app + '/model/User.ts',
          vendor: ['react', 'react-dom', 'Immutable']
        },
        output: {
          path: PATHS.build + '/app',
          filename: '[name].[chunkhash].js',
          // This is used for require.ensure. The setup
          // will work without but this is useful to set.
          chunkFilename: '[chunkhash].js',
          publicPath: '/app/',
        },

        // Enable sourcemaps for debugging webpack's output.
        devtool: 'source-map',

        resolve: {
          // Add '.ts' and '.tsx' as resolvable extensions.
          extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js']
        }
      },
      parts.clean(PATHS.build),
      parts.loadTypescript(),
      // parts.loadImages(PATHS.images),
      parts.deployStaticFiles(PATHS.images[0], path.join(PATHS.build, '/images')),
      parts.loadSass(),
      parts.chunkHashReplace('src/html/index.html', 'dist/index.html'),
      parts.extractBundle({name: 'vendor'})
    );
    break;
  }
  default: {
    config = merge(
      common,
      {
        devtool: 'eval-source-map' //Slow init, but fast incremental
      },
      // parts.loadImages(PATHS.images),
      parts.deployStaticFiles(PATHS.images, path.join(PATHS.build, '/images')),
      parts.loadCSS(),
      parts.devServer({
        // Customize host/port here if needed
        host: process.env.HOST,
        port: process.env.PORT
      })
    );
  }
}

module.exports = config;
