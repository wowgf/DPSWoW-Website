import { merge } from "lodash";
import { defineStore } from "pinia";
import { ref } from "vue";
import { STORAGE_KEY } from '~/consts'
import { uuid } from "~/cool/utils";

const CLIENT_ID = get(STORAGE_KEY.CLIENT_ID) || uuid()
set(STORAGE_KEY.CLIENT_ID, CLIENT_ID)
const useAppStore = defineStore("app", function () {
  // 设备
  const device = ref("mobile")
  const platform = ref("other")
  const clientId = ref(CLIENT_ID)
  const FROM_REF = ref<string>(sessionStorage.getItem(STORAGE_KEY.FROM_REF) || '') // 来源
  const theme = ref<'dark' | 'light'>("dark") // 主题
  const menuList = ref([
  ])
  const deviceWidth = ref(0)

  // 暂时不用这个
  const state = reactive({
    device: 'mobile',
    platform: 'other'
  })

  const isInitConfig = ref(false)  // 是否初始化配置

  const cacheData = reactive({
    searchServerName: ''
  })

  const isMobile = computed(() => device.value == "mobile");

  const isApple = computed(() => {
    const userAgent = navigator.userAgent;
    return /iPhone|iPad|iPod/.test(userAgent);
  });

  const config = reactive({
    theme: <'dark' | 'light'>'dark',
    showHeade: true
  })

  interface WebsiteConfig {
    common: {
      points: number;
      maxCombNum: number;
      inviteGetLink: string;
      wechatGroupQrcode: string;
    };
    enchant: {
      name: string;
      slotKey: string;
      id: number;
    }[];
    [key: string]: any; // Add index signature
  }

  const websiteConfig = reactive<WebsiteConfig>({
    common: {
      points: 0, // 消耗积分
      maxCombNum: 8,
      inviteGetLink: 'https://maizikeji.feishu.cn/docx/N8g4drlMfod2jPxTYxIc6SJHnP2?from=from_copylink', // 获取邀请链接
      wechatGroupQrcode: '/CUSTOM_OSS_PATH/4c0bfb42b1a642ef8e938df9da9a1f07_1280X1280.JPEG', // 微信群二维码
    },
    "enchant": [
      {
        "name": "头部",
        "slotKey": "head",
        "id": 0
      }
    ]
  })

  const commonConfig = computed(() => {
    return websiteConfig.common
  })

  // 设置设备
  function setDevice(data: string) {
    device.value = data;
    state.device = data;
  }

  function setPlatform(data: string) {
    platform.value = data;
    state.platform = data;
  }

  function setFromRef(data: string) {
    FROM_REF.value = data
    sessionStorage.setItem(STORAGE_KEY.FROM_REF, data)
  }

  // 设置设备
  function setDeviceWidth(width: number) {
    deviceWidth.value = width;
  }

  /**
   * 初始化网站配置
   */
  async function getWebsiteConfig() {
    let data = await service.comm.getParam('websiteConfig')
    let keys = Object.keys(data)
    keys.forEach(key => {
      // 如果有则合并
      if (websiteConfig[key]) {
        websiteConfig[key] = merge(websiteConfig[key], data[key])
      } else {
        websiteConfig[key] = data[key]
      }
    })
    isInitConfig.value = true
  }


  return {
    menuList,
    device,
    FROM_REF,
    setDevice,
    setPlatform,
    isMobile,
    platform,
    commonConfig,
    websiteConfig,
    theme,
    config,
    state,
    setFromRef,
    isApple,
    cacheData,
    deviceWidth,
    setDeviceWidth,
    clientId,
    getWebsiteConfig,
    isInitConfig
  };
});

export { useAppStore };
