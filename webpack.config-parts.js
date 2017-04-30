const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ChunkHashReplacePlugin = require('chunkhash-replace-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

exports.devServer = function (options) {
  return {
    devServer: {
      watchOptions: {
        // Delay the rebuild after the first change”
        aggregateTimeout: 300,
        poll: 1000
      },
      // Enable history API fallback so HTML5 History API based
      // routing works. This is a good default that will come
      // in handy in more complicated setups.
      historyApiFallback: true,

      // Unlike the cli flag, this doesn't set
      // HotModuleReplacementPlugin!
      hot: true,
      inline: true,

      // Display only errors to reduce the amount of output.
      stats: 'errors-only',
      // Parse host and port from env to allow customization.
      //
      // If you use Vagrant or Cloud9, set
      // host: options.host || '0.0.0.0';
      //
      // 0.0.0.0 is available to all network devices
      // unlike default `localhost`.
      host: options.host, // Defaults to `localhost`
      port: options.port // Defaults to 8080
    },
    plugins: [
      // Enable multi-pass compilation for enhanced performance
      // in larger projects. Good default.
      new webpack.HotModuleReplacementPlugin({
        multiStep: true
      })
    ]
  };
}

exports.loadImages = function (paths) {
  return {
    module: {
      rules: [
        {
          test: /\.(jpe?g|png|gif|svg)/i,
          use: ['file-loader'],
          include: paths
        }
      ]
    }
  }
};

exports.loadFonts = function() {
  return {
    module: {
      rules: [
        {
          test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          use: 'url-loader',
          query: {
            limit: 100000,
            mimetype: 'application/font-woff'
          }
        },
        {
          test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          use: 'file-loader'
        }
      ]
    }
  }
}

exports.loadCSS = function (paths) {
  return {
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader'
          ]
        }
      ]
    }
  };
}

exports.loadSass = function () {
  return {
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: [
            {
              loader: 'style-loader',
              options: {sourceMap: true}
            },
            {
              loader: 'css-loader',
              options: {sourceMap: true}
            },
            {
              loader: 'sass-loader',
              options: {sourceMap: true}
            }
          ]
        }
      ]
    }
  };
}

exports.extractBundle = function(options) {
  const entry = {};
  entry[options.name] = options.entries;

  return {
    // Define an entry point needed for splitting.
    entry: entry,
    plugins: [
      // Extract bundle and manifest files. Manifest is
      // needed for reliable caching.
      new webpack.optimize.CommonsChunkPlugin({
        names: [options.name, 'manifest']
      })
    ]
  };
}

exports.clean = function(path) {
  return {
    plugins: [
      new CleanWebpackPlugin([path], {
        // Without `root` CleanWebpackPlugin won't point to our
        // project and will fail to work.
        root: process.cwd(),
        exclude: ['firebaseui.css', 'style.css', 'w3.css']
      })
    ]
  };
}

exports.chunkHashReplace = function(src, dest) {
  return {
    plugins: [
      new ChunkHashReplacePlugin({
        src: src,
        dest: dest,
      })
    ]
  }
};

exports.deployStaticFiles = function(src, dest) {
  return {
    plugins: [
      new CopyWebpackPlugin([
        {from: src, to: dest}
      ])
    ]
  };
}

exports.loadTypescript = function() {
  return {
    module: {
      rules: [
        {
          test: /\.ts(x?)$/,
          exclude: 'node_modules',
          use: ['ts-loader']
        },
        {
          // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
          test: /\.js$/,
          enforce: 'pre',
          loader: 'source-map-loader'
        }
      ]
    }
  };
};
