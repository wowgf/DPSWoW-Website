import { useAppStore } from '~/store/app'
import { getPlatform } from '~/cool/utils'
export default defineNuxtPlugin(async nuxtApp => {
  let requestHeaders = useRequestHeaders()
  const app = useAppStore()
  const WIDTH = 760 // refer to Bootstrap's responsive design
  const isMobile = $_isMobile()

  if (isMobile) {
    app.setDevice('mobile')
  } else {
    app.setDevice('desktop')
  }

  if (process.client) {
    let platform = getPlatform()
    app.setPlatform(platform)
    window.addEventListener('resize', $_resizeHandler)
  }

  /**
   * 判断是否为手机模式
   */
  function $_isMobile() {
    if (process.client) {
      const rect = document.body.getBoundingClientRect()
      app.setDeviceWidth(rect.width)
      return rect.width - 1 < WIDTH
    } else {
      // 使用user-agent判断是否为手机模式
      return /Android|webOS|iPhone|iPod|BlackBerry/i.test(requestHeaders['user-agent'])
    }
  }

  /**
   * 屏幕大小变化
   */
  function $_resizeHandler() {
    if (!document.hidden) {
      const isMobile = $_isMobile()
      app.setDevice(isMobile ? 'mobile' : 'desktop')
    }
  }
})
