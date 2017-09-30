import { createApp } from './app'
const isDev = __DEV__

export default context => {
  return new Promise((resolve, reject) => {
    const s = isDev && Date.now()
    let {app, router} = createApp()


    const {url} = context
    const fullPath = router.resolve(url).route.fullPath

    if (fullPath !== url) {
      reject({ url: fullPath })
    }

    if(__DEV__){
      console.log('view =====>',url);
    }

    router.push(url)

    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents()

      if (!matchedComponents.length) {
        reject({ code: 404 })
      }

      Promise.all(matchedComponents.map(({ asyncData }) => asyncData && asyncData({
        store,
        route: router.currentRoute
      }))).then(() => {
        if(__DEV__){
          console.log(`          data pre-fetch: ${Date.now() - s}ms`)
        }
        resolve(app)
      }).catch(reject)
    }, reject)
  })
}
