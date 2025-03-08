
const tableLoadmore = {
  mounted(el: any, binding: any, vnode: any, prevVNode: any) {
    const scrollVNode = el.querySelector('.arco-scrollbar-container')
    // 表格滚动
    let currentScroll = 0,
      lastScroll = 0,
      isDownScroll = true
    scrollVNode.addEventListener(
      'scroll',
      function (event: any) {
        // 判断是否向上滚动
        // debugger
        currentScroll = event.target.scrollTop
        if (lastScroll < currentScroll) {
          isDownScroll = true
        } else {
          isDownScroll = false
        }
        lastScroll = currentScroll
        // 定一个距离，距离底部当前距离时候触发加载事件
        const sign = 10
        // 判断是否到底
        const scrollDistance = event.target.scrollHeight - event.target.scrollTop - event.target.clientHeight
        if (scrollDistance <= sign && isDownScroll) {
          binding.value.eventH()
        }
      },
      false
    )
  }
}
export default tableLoadmore
