import { useLoginStore } from "~/store/login";
import openBindPhone from '~/components/BindPhone/install'
import { useUserStore } from "~/store/user";
// import directives from '~/directive'
export default defineNuxtPlugin(async (nuxtApp) => {
  nuxtApp.vueApp.directive('loadmore', {
    mounted(el: any, binding: any, vnode: any, prevVNode: any) {
      const scrollVNode = el.querySelector('.el-scrollbar__wrap')
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
    },
    getSSRProps(binding, vnode) {
      // 你可以在这里提供SSR特定的props
      return {}
    }
  })

  nuxtApp.vueApp.directive('auth', {
    mounted(el: any, binding: any, vnode: any, prevVNode: any) {
      const isLogin = getRefreshToken()
      el.addEventListener('click', () => {
        if (!isLogin) {
          useLoginStore().open()
        } else {
          binding.value()
        }
      })
    },
    getSSRProps(binding, vnode) {
      // 你可以在这里提供SSR特定的props
      return {}
    }
  })

  nuxtApp.vueApp.directive('phone', {
    mounted(el: any, binding: any, vnode: any, prevVNode: any) {
      const { info } = storeToRefs(useUserStore())
      const handleClick = (e: Event) => {
        if (!info.value?.phone) {
          // 如果没有绑定手机号，阻止默认行为和事件传播
          e.preventDefault();
          e.stopPropagation();
          openBindPhone(); // 调用绑定手机的函数
        } else {
          // 如果绑定了手机，调用传入的函数
          binding.value?.();
        }
      };

      el.addEventListener('click', handleClick);

      // 清理事件监听器，避免内存泄漏
      el._handleClick = handleClick;
    },
    unmounted(el: any) {
      if (el._handleClick) {
        el.removeEventListener('click', el._handleClick);
        delete el._handleClick; // 清理引用
      }
    },
    getSSRProps(binding, vnode) {
      // 你可以在这里提供SSR特定的props
      return {}
    }
  })
});
