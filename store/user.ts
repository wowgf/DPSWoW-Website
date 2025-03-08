import { defineStore, } from "pinia";
import { ref } from "vue";
import * as storage from '~/utils/storage'
import service from "~/service";
import type { UserInfo, GameInfo, ArtisanInfo } from "~/types/user";
import { Message } from "@arco-design/web-vue";
import { ElLoading } from 'element-plus'
import { useAppStore } from "./app";
const useUserStore = defineStore("user", function () {
  const { commonConfig } = storeToRefs(useAppStore())
  // 标识
  const refreshToken = ref<string>("");
  const token = ref<string>("");

  const inviteCode = ref<string>() // 邀请码
  const friendInviteCode = ref<string>(storage.get('friendInviteCode') || '') // 朋友邀请码

  const registerInviteCode = ref<string>() // 注册邀请码

  const isLogin = computed(() => !!refreshToken.value);

  const info = ref<UserInfo>();

  const isArtisan = computed(() => !!info.value?.artisanInfoId)

  const gameInfo = computed(() => {
    return (info.value?.gameInfo || {}) as GameInfo
  })

  const artisanInfo = computed(() => {
    return (info.value?.artisanInfo || {}) as ArtisanInfo
  })

  function setTokenData(data: any) {
    setToken(data)
    refreshToken.value = data.refreshToken
    token.value = data.token
  }

  async function get() {
    await service.user.getMyInfo().then((res: any) => {
      info.value = res
    })
  }

  async function update(data: any) {
    await service.user.updatePerson(data).then((res) => {
      get()
      Promise.resolve(res);
    }).catch(err => {
      Promise.reject(err);
    })
  }

  /**
   * 更新工匠信息
   * @param avatarUrl
   */
  async function updateArtisanInfo(data: any) {
    await service.artisanInfo.updateInfo(data).then((res) => {
      get()
      Promise.resolve(res);
    }).catch(err => {
      Promise.reject(err);
    })
  }

  async function updateAutoReply(params: any) {
    await service.user.updateAutoReply(params).then(() => {
      get()
    })
  }

  async function logout(isReload: boolean = false) {
    removeToken()
    token.value = ''
    refreshToken.value = ''
    info.value = undefined

    if (!isReload) return

    if (location.pathname.startsWith('/user/') || location.pathname.startsWith('/dashboard/')) {
      location.href = '/'
    } else {
      location.reload()
    }

    // if (location.href != location.origin) {
    //   location.href = '/'
    // } else {
    //   location.reload()
    // }
  }

  /**
   * 检查是否已经登录
   */
  function checkLogin(): boolean {
    return !!getRefreshToken()
  }

  async function logoff() {
    const loadingInstance = ElLoading.service()
    setTimeout(async () => {
      await service.user.logoff()
      loadingInstance.close()
      Message.success("注销成功");
      setTimeout(() => {
        logout()
      }, 1000);
    }, 1000 * 3);
  }

  /**
   * 扣减积分
   */
  function subtractPoints(points: number) {
    if (info.value) info.value.points = info.value.points - points
  }

  function setRegisterInviteCode(code: string) {
    registerInviteCode.value = code
  }

  function setInviteCode(code: string) {
    inviteCode.value = code
  }

  async function getInviteCode() {
    if (inviteCode.value) return inviteCode.value
    let code = await service.user.inviteCode()
    inviteCode.value = code
    return code
  }

  function setFriendInviteCode(code: any) {
    friendInviteCode.value = code
    set("friendInviteCode", code)
  }

  function clearFriendInviteCode() {
    friendInviteCode.value = ''
    storage.remove('friendInviteCode')
  }

  return {
    refreshToken,
    token,
    isLogin,
    friendInviteCode,
    setTokenData,
    get,
    info,
    update,
    logout,
    isArtisan,
    checkLogin,
    gameInfo,
    artisanInfo,
    updateAutoReply,
    updateArtisanInfo,
    logoff,
    subtractPoints,
    inviteCode,
    setInviteCode,
    getInviteCode,
    setFriendInviteCode,
    registerInviteCode,
    setRegisterInviteCode,
    clearFriendInviteCode
  };
});

export { useUserStore };
