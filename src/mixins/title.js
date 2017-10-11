function getTitle (vm) {
  const { title } = vm.$options
  if (title) {
    return typeof title === 'function'
      ? title.call(vm)
      : title
  }
}

const serverTitleMixin = {
  created () {
    const title = getTitle(this)
    if (title) {
      this.$ssrContext.title = ` ${title} | koa2-vue-ssr `
    }
  }
}

const clientTitleMixin = {
  mounted () {
    const title = getTitle(this)
    if (title) {
      document.title = ` ${title} | | koa2-vue-ssr `
    }
  }
}

export default !__isClient__
  ? serverTitleMixin
  : clientTitleMixin
