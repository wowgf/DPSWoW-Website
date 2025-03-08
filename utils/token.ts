import { getCookie, setCookie } from './cookie'
import { get, set, remove } from './storage'
import { STORAGE_KEY } from '~/consts'

/**
 * 获取存储的令牌。
 *
 * 本函数旨在从存储系统中检索用户的令牌。令牌是用户身份验证的关键元素，用于验证请求的发送者的身份。
 * 它不接受任何参数，返回存储的令牌字符串。令牌的获取是通过调用名为`getCookie`的函数实现的，
 * 该函数使用一个预定义的存储键来定位令牌。这个键是由`STORAGE_KEY.TOKEN`定义的，
 * 它是一个常量，确保了令牌在整个应用程序中的唯一性和一致性。
 *
 * @returns {string} 存储的令牌字符串。
 */
export function getToken() {
  // return getCookie(STORAGE_KEY.TOKEN)
  return get(STORAGE_KEY.TOKEN) || getCookie(STORAGE_KEY.TOKEN)
}

export function getRefreshToken() {
  // return getCookie(STORAGE_KEY.REFRESH_TOKEN)
  return get(STORAGE_KEY.REFRESH_TOKEN) || getCookie(STORAGE_KEY.REFRESH_TOKEN)
}

export function getTokenData() {
  return {
    token: getToken(),
    refreshToken: getRefreshToken(),
    token__expiration: get('TOKEN__expiration'),
    refreshToken__expiration: get('REFRESH_TOKEN__expiration'),
  }
}

/**
 * 设置用户令牌。
 *
 * 本函数用于存储用户身份验证的令牌信息到本地存储中。
 * 令牌是访问受保护的API资源的关键，它代表了用户的授权信息。
 * 使用本地存储来保存令牌可以使得用户在刷新页面后仍然保持登录状态，
 * 而不需要重新进行身份验证。
 *
 * @param token 用户身份验证令牌。这是一个字符串，由服务端颁发，用于验证请求的来源和权限。
 */
export function setToken(data: {
  token: string
  refreshToken: string
  expire: number
  refreshExpire: number
}) {

  // setCookie(STORAGE_KEY.TOKEN, data.token, (data.expire - 2) * 1000)
  // setCookie(STORAGE_KEY.REFRESH_TOKEN, data.refreshToken, (data.refreshExpire - 2) * 1000)

  set(STORAGE_KEY.TOKEN, data.token, (data.expire - 2) * 1000)
  set(STORAGE_KEY.REFRESH_TOKEN, data.refreshToken, (data.refreshExpire - 2) * 1000)

}


export function removeToken() {
  removeCookie(STORAGE_KEY.TOKEN)
  removeCookie(STORAGE_KEY.REFRESH_TOKEN)
  remove(STORAGE_KEY.TOKEN)
  remove(STORAGE_KEY.REFRESH_TOKEN)
}
