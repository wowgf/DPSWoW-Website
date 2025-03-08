const { ipcRenderer } = window.electron

const drop = {
  mounted(el) {
    //按下鼠标左键
    el.addEventListener('mousedown', (e) => {
      if (e.buttons == 1) {
        winMoveStart() //开始刷新屏幕位置
        el.addEventListener('mousemove', mousemove)
      }
    })
    //按下松开鼠标鼠标
    el.addEventListener('mouseup', () => {
      winMoveEnd() //停止刷新屏幕位置
      el.removeEventListener('mousemove', mousemove)
    })

    function winMoveStart() {
      ipcRenderer.send('winMove-start')
    }

    //补丁:鼠标在窗口外松开不触发mouseup，鼠标回到窗口没按着左键停止
    function mousemove(e) {
      if (e.buttons != 1) {
        winMoveEnd()
        el.removeEventListener('mousemove', mousemove)
      }
    }

    function winMoveEnd() {
      ipcRenderer.send('winMove-end')
    }
  }
}
export default drop
