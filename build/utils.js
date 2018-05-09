'use strict'
const path = require('path')
const config = require('../config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const packageConfig = require('../package.json')

exports.assetsPath = function (_path) {
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory

  return path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = function (options) {
  options = options || {}

  const cssLoader = {
    loader: 'css-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  // generate loader string to be used with extract text plugin
  function generateLoaders (loader, loaderOptions) {
    const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader]

    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader'
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  const output = []
  const loaders = exports.cssLoaders(options)

  for (const extension in loaders) {
    const loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }

  return output
}

exports.createNotifierCallback = () => {
  const notifier = require('node-notifier')

  return (severity, errors) => {
    if (severity !== 'error') return

    const error = errors[0]
    const filename = error.file && error.file.split('!').pop()

    notifier.notify({
      title: packageConfig.name,
      message: severity + ': ' + error.name,
      subtitle: filename || '',
      icon: path.join(__dirname, 'logo.png')
    })
  }
}

// 多页配置 ---------------------------------- LDF QQ 47121862
const fs = require('fs')
const HtmlWebpackPlugin = require('html-webpack-plugin')

//递归创建目录 同步方法
function mkdirsSync(dirname) {
  if (fs.existsSync(dirname)) {
    return true
  } else {
    if (mkdirsSync(path.dirname(dirname))) {
      fs.mkdirSync(dirname)
      return true
    }
  }
}

function createDefaultFile(dir) { // 创建目录文件
  let {entryName} = config.views
  let file = path.resolve(dir, entryName)
  mkdirsSync(dir)
  fs.writeFileSync(file, `// ${file}`)
  console.log(`\n文件：  ${file} 创建成功\n`)
}

exports.getEntries = () => { // 获得入口文件 index.js [自动创建目录以及 config.views.entryName: index.js]
  let data = {}
  let {pages, dir} = config.views
  for(let page in pages) {
    let dirname = path.resolve(dir, page)
    if(!fs.existsSync(dirname)) createDefaultFile(dirname)
    data[page] = dir + page
    // data[page] = [dirname]
  }
  // console.log(data)
  return data
}

exports.getHtmlPlugin = () => {
  let data = []
  let {pages} = config.views
  for(let page in pages) {
      let {dir, templateName, suffix} = config.views
      let p = pages[page]
      let file = `${dir}/${page}/${templateName}`
      let template = fs.existsSync(file) ? file : templateName
      let conf = {
        title: p.title || page, template,
        filename: page + suffix,
        chunks: [page],
        inject: true
      }
      if(process.env.NODE_ENV === 'production') {
        conf = Object.assign(conf, {
          // filename: path.resove(__dirname, page + suffix),
          chunks: ['manifest', 'vendor', page],
          minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeAttributeQuotes: true,
            minifyCSS: true
          },
          chunksSortMode: 'dependency'
        })
      }

      data.push(new HtmlWebpackPlugin(conf))
  }
  // console.log(data)
  return data
}