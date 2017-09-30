function getMeta (vm) {
  const { meta } = vm.$options
  if (meta) {
    return typeof meta === 'function'
      ? meta.call(vm)
      : meta
  }
}

const serverMetaMixin = {
  created () {
    const meta = getMeta(this)
    if (meta) {
      this.$ssrContext.meta = `<meta name="description" content="${meta},Coding.Art,崔康杰,专注前端开发,前端最新资讯">`
    }
  }
}

const clientMetaMixin = {
  mounted () {
    const meta = getMeta(this)
    if (meta) {
      document.getElementsByTagName('meta').description.content = ` ${meta},Coding.Art,崔康杰, 专注前端开发,前端最新资讯`
    }
  }
}

export default !__isClient__
  ? serverMetaMixin
  : clientMetaMixin
