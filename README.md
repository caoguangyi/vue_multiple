# vue_views

> multiple pages

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

# 说明
config/views.js 配置多页面 基于Vue 2.5.2 [vue-cli]

> 配置结束后，运行会自动生成对应目录 以及入口js文件
> 模板默认使用根目录下的 index.html 或者对应目录的自定义index.html

```
LDF 47121862@qq.com


### 多页配置

pages: {
  'home': {title: 'home'},
  'news': {title: 'news'},
  'about': {title: 'about'},
  'deep/info': {title: 'deep_info'},
}