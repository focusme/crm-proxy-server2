import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

export function createRouter() {
  return new VueRouter({
    mode: 'history',
    scrollBehavior: () => ({
      y: 0
    }),
    routes: [{
      path: '/',
      component: () => {
        return import ( /* webpackChunkName : "home" */ `./home/home.vue`)
      }
    },{
      path: '/two',
      component: () => {
        return import ( /* webpackChunkName : "two" */ `./two/two.vue`)
      }
    }]
  })
}
