import Vue from 'vue'
import Router from 'vue-router'

let HelloWorld = { template: '<div>vue</div>' }
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    }
  ]
})
