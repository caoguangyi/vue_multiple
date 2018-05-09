const path = require('path')

module.exports = {
  // dir: path.resolve(__dirname, '../src/views') + '/',
  dir: './src/views/',
  entryName: 'index.js',
  templateName: 'index.html',
  suffix: '.html',
  pages: {
    'home': {title: 'home'},
    'news': {title: 'news'},
    'about': {title: 'about'},
    'deep/info': {title: 'deep_info'},
  }
}