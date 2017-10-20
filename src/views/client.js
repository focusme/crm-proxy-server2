import Vue from 'vue'
import 'es6-promise/auto'
import { createApp } from './app'

Vue.mixin({
  beforeRouteUpdate (to, from, next) {
    const { asyncData } = this.$options
    if (asyncData) {
      asyncData({
        route: to
      }).then(next).catch(next)
    } else {
      next()
    }
  }
})

const { app, router } = createApp()



router.onReady(() => {
  router.beforeResolve((to, from, next) => {
    const matched = router.getMatchedComponents(to)
    const prevMatched = router.getMatchedComponents(from)
    let diffed = false
    const activated = matched.filter((c, i) => {
      return diffed || (diffed = (prevMatched[i] !== c))
    })
    const asyncDataHooks = activated.map(c => c.asyncData).filter(_ => _)
    // 无同步函数
    if (!asyncDataHooks.length) {
      return next()
    }

    // 执行同步函数
    Promise.all(asyncDataHooks.map(hook => hook({ route: to })))
      .then(() => {
        next()
      })
      .catch(next)
  })

  app.$mount('#app')
})
