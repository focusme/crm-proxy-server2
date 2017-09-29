import Vue from 'vue'
import App from './app.vue'
import 'whatwg-fetch'
import 'es6-promise'

// import { createStore } from './store/server/index.js'
import { createRouter } from './router.js'
//
// import { sync } from 'vuex-router-sync'
// // 引入混合


export function createApp () {
  // create store and router instances
  // const store = createStore()
  const router = createRouter()

  // router.afterEach(route => {
  //   !process.env.VUE_ENV === 'server' && typeof window.pageInit === 'function' &&  window.pageInit();
  // })


  sync(store, router)


  const app = new Vue({
    router,
    store,
    render: h => h(App)
  })
  return { app, router, store }
}
