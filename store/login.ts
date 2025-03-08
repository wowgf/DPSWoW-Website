import { defineStore, storeToRefs } from "pinia";
import { computed, ref, watch } from "vue";
import { useUserStore } from "./user";
import { useAppStore } from "./app";
// import { useCool } from "~/cool";
import { getPlatform, } from '~/cool/utils/index'
import { RouteLocationNormalizedLoaded, Router } from "vue-router";
import { STORAGE_KEY } from "~/consts";
// import { useAdvertStore } from "./advert";
// import { mittEmits } from "../config/consts";
const useLoginStore = defineStore("login", function () {
  // const advert = useAdvertStore()
  const show = ref(false);
  const user = useUserStore();
  const app = useAppStore();
  const { device, platform } = storeToRefs(app);
  let nextFun: any = null
  const isDev = (import.meta as any).env.DEV
  // const { mitt } = useCool()
  // 登录方式
  let loginTypes = [
    // 正式环境才显示微信扫码登录
    {
      label: "微信登录",
      icon: "wechat2",
      type: "wechat",
      device: ["desktop", 'mobile'], // 在什么设备上显示 ['desktop', 'mobile'] 为all或者不填写则都显示
      platforms: ['other']
    },
    // ...isDev ? [{
    //   label: "手机号登录",
    //   icon: "phone2",
    //   type: "phone",
    //   device: ["desktop", "mobile"],
    //   platforms: ['other']
    // }] : []
    {
      label: "手机号登录",
      icon: "phone2",
      type: "phone",
      device: ["desktop", "mobile"],
      platforms: ['other']
    }
    // {
    //   label: "微信登录",
    //   icon: "wechat2",
    //   type: "wechat_wechat",
    //   device: ["mobile"],
    //   platforms: ['wechat']
    // },
  ];

  let filterLoginTypes = computed(() => {
    // let platform = getPlatform() || 'other'
    // let list = loginTypes.filter((item) => {
    //   let checkDevice = item.device.includes(device.value) || item.device.includes("all")
    //   let checkPlatform = item.platforms.includes(platform) || item.platforms.includes('all') || item.platforms.length == 0;
    //   return checkDevice && checkPlatform;
    // });
    return loginTypes
  });

  watch(device, () => {
    loginType.value = filterLoginTypes.value[0].type;
  });

  watch(platform, () => {
    loginType.value = filterLoginTypes.value[0].type;
  });

  // 当前登录方式
  let loginType = ref<string>(filterLoginTypes.value[0].type);

  // 除了当前登录方式的按钮列表
  const loginTypeBtnList = computed(() => {
    return filterLoginTypes.value.filter((item) => item.type !== loginType.value);
  });

  // 打开弹窗
  function open(next?: any) {
    show.value = true;
    if (next) nextFun = next
  }

  function close() {
    show.value = false;
  }

  // 点击背景
  function onClickBg() {
    // close();
  }

  // 选择登录方式
  function selectLoginType(type: string) {
    if (type == 'wechat_wechat') {
      wechatLoginRedirect()
      return
    }
    loginType.value = type;
  }

  function wechatLoginRedirect(config?: { isBind: 0 | 1 }) {
    // const route = useRoute();
    // location.href = getWxAuthUrl({ redirectUri: `${location.origin}/h5/auth?isBind=${config?.isBind || 0}&redirectTo=${route.fullPath}` })
  }

  // 大脚客户端登录                            
  function bgLogin(data: {}) {

  }

  async function onLoginSuccessV2(data: any) {
    // const { token } = await service.user.login(data);
    // await onLoginSuccess(token);
    user.setTokenData(data);
    await user.get();
  }

  // 登录成功
  async function onLoginSuccess(data: any, route?: RouteLocationNormalizedLoaded, router?: Router) {
    // advert.setData(advert.dataKeys.showVip, true)
    user.setTokenData(data);

    // mitt.emit(mittEmits.LOGIN_SUCCESS, data)

    await user.get();

    // if (getPlatform() == 'wechat' && !user.info?.unionid) {
    //   wechatLoginRedirect({ isBind: 1 })
    // }

    // 如果没有打开过引导页跳转引导页
    // if (!get(STORAGE_KEY.IS_OPEN_GUIDE)) {
    //   router?.push('/guide')
    //   close()
    //   return
    // }
    user.clearFriendInviteCode()

    if (nextFun) {
      nextFun()
    } else if (route?.query?.redirectTo) {
      if (route.query.redirectTo.includes('http')) {
        location.href = route.query.redirectTo as string
      } else {
        router?.push(route.query.redirectTo as string)
      }
    } else {
      // location.reload()
    }

    close();
  }

  // 微信公众号登录
  async function wechatMpLogin(code?: string, isBind?: any) {
    // try {
    //   await service.user.login.mp({ code, isBind: isBind || 0, inviteCode: user.friendInviteCode || '' }).then(async (res) => {
    //     user.setToken(res);
    //     await user.get();
    //     return res
    //   });
    // } catch (error) {
    //   return error
    // }
  }

  return {
    show,
    open,
    close,
    onClickBg,
    loginTypeBtnList,
    selectLoginType,
    onLoginSuccess,
    loginType,
    wechatMpLogin,
    wechatLoginRedirect,
    onLoginSuccessV2
  };
});

export { useLoginStore };
