import { useAppStore } from "~/store/app";
import { useJsonStore } from "~/store/json";
import { useUserStore } from "~/store/user";
import { useWowDataStore } from "~/store/wowData";
const whitePathList = [
  '/ad'
]
export default defineNuxtPlugin(async (_nuxtApp) => {
  const route = useRoute()
  if (whitePathList.includes(route.path)) {
    return
  }
  const { token, refreshToken } = storeToRefs(useUserStore())
  token.value = getToken()
  refreshToken.value = getRefreshToken()

  let bgToken: string = ''

  const FROM_REF = route.query.ref as string // 来源
  const CHANNEL = route.query.channel

  if (FROM_REF) {
    useAppStore().setFromRef(FROM_REF)
  }

  useAppStore().getWebsiteConfig()

  // 获取所有附魔信息
  useWowDataStore().refreshEnchantItemList()

  await useJsonStore().getJson(['encounter-items'])

  if (refreshToken.value) {
    try {
      await useUserStore().get()
    } catch (error) {

    }
  }

});
