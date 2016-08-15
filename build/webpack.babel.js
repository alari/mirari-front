import path from  'path'
import webpack from 'webpack'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import environmental from 'environmental'

import autoprefixer from 'autoprefixer'
import postcssBEM from 'postcss-bem'
import postcssCustomProperties from 'postcss-custom-properties'
import postcssImport from 'postcss-import'
import postcssMixins from 'postcss-mixins'
import postcssNested from 'postcss-nested'
import postcssCustomMedia from 'postcss-custom-media'

const config = environmental.config()

console.log("webpack env:", config.env)

const root = path.join(process.cwd(), 'src')

const loaders = [
  {
    test: /\.jsx?$/,
    exclude: /(node_modules|bower_components)/,
    loader: "babel",
    query: {
      presets: ['es2015', 'stage-0', 'react']
    }
  },
  {
    test: /\.jpg$|\.png$/,
    loaders: ['url']
  },
  {
    test: /\.svg$/,
    loaders: ['file', 'svgo-loader']
  },
  {
    test: /\.css$/,
    loader: ExtractTextPlugin.extract(
      "style",
      "css!postcss"
    )
  },
  {
    test: /\.scss$/,
    loader: ExtractTextPlugin.extract(
      "style",
      "css!sass?includePaths[]=" + path.resolve(__dirname, "./node_modules")
    )
  },
  {
    test: /\.json$/,
    loaders: ['json-loader']
  }
]

export default [{
    entry: {
      bundle: [
        "babel-polyfill",
        "./initializers/client.js",
      ],
      vendor: [
        'react',
        'react-dom',
        'react-router',
        'material-ui',
        'redux',
        'ramda'
      ],
    },

    postcss: (webpack) => {
      return [
        postcssImport({ addDependencyTo: webpack, path: root }),
        postcssCustomProperties,
        postcssMixins,
        postcssBEM,
        postcssNested,
        postcssCustomMedia,
        autoprefixer
      ]
    },

    resolve: {
      root: root,
      extensions: ['', '.js', '.jsx', '.scss']
    },

    output: {
      path: "./public",
      filename: '[name].js',
      publicPath: "/"
    },

    module: {
      loaders: loaders
    },
    plugins: [
      new webpack.DefinePlugin({
        __CLIENT__: true,
        __SERVER__: false,
        __DEVTOOLS__: false,//config.env === 'development',
        __ENV__: config.env,
        'process.env.NODE_ENV': '"'+config.env+'"',
        __REQUEST_API_ENDPOINT__: config.api.request ? config.api.request.endpoint : '"/api"',
        __AUTH_LOGIN_HREF__: '"/auth/in"',
        __AUTH_FORBIDDEN_HREF__: '"/"',
      }),
      new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"vendor", /* filename= */"vendor.bundle.js"),
      new ExtractTextPlugin("[name].css"),
      new CopyWebpackPlugin([
        {
          from: 'src/assets/googlee3dbde9fef1e2828.html',
          to: 'googlee3dbde9fef1e2828.html'
        },
        {
          from: 'src/assets',
          to: 'assets'
        }
      ])
    ]
  }
]
