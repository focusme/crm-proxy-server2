// 在新页面打开连接

module.exports = function linkTargetPlugin (md) {
  function linkTarget (state) {
    let tokens = state.tokens
    tokens.forEach((item) => {
      if (item.type === 'inline' && item.children.length > 0) {
        item.children.forEach((child) => {
          if (child.tag === 'a' && child.type === 'link_open') {
            // child.attrs.push(['target', '_blank'])
            child.attrs = [['data-herf', child.attrs[0][1]], ['onClick', 'jumpLink(event)']]
          }
        })
      }
    })
  }

  md.core.ruler.after('linkify', 'linkTarget', linkTarget)
}
