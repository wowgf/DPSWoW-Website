import Component from './Dialog.vue'
import { createApp } from 'vue'
export default function (options: any = {}) {
  const instance = createApp(Component, {
    ...options,
    onConfirm: () => {
    },
    onCancel: () => {
      unmount()
    }
  })


  // 创建一个挂载容器
  const parentNode = document.createElement('div')
  document.body.appendChild(parentNode)
  // 挂载组件
  instance.mount(parentNode)

  // 卸载组件
  const unmount = () => {
    instance.unmount()
    document.body.removeChild(parentNode)
  }
}