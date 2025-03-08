import type { CommonRequest } from '~/types/request';
import request from '../request'
import type { UserCharacter, UserInfo } from "~/types/user";
/**
 * 设备登录注册接口
 * 
 * 本函数用于设备的注册流程中的一步，通过向服务器发送请求，完成设备的注册。
 * 具体的注册逻辑由服务器端的处理逻辑决定，客户端只需负责发送包含必要数据的请求。
 * 
 * @param data 注册请求的数据对象，包含设备相关信息。
 * @returns 返回服务器响应的结果，具体格式由服务器端定义。
 */
export function deviceRegister(data: { deviceId: string }) {
  return request.post('/app/user/login/deviceRegister', data)
}

/**
 * 刷新令牌
 * 
 * 本函数用于通过现有的刷新令牌（refreshToken）获取新的访问令牌。
 * 这是应对访问令牌过期的一种机制，通过刷新令牌来延长访问令牌的生命周期，
 * 而不需要重新进行用户身份验证。
 * 
 * @param token 刷新令牌。这是在用户登录时颁发的，用于获取新的访问令牌。
 * @returns 返回一个新的访问令牌。这个令牌可以用于后续的API调用，以验证用户身份。
 */
export function fetchRefreshToken(refreshToken: string) {
  return request.post('/app/user/login/refreshToken', { refreshToken: refreshToken })
}

/**
 * 获取我的用户信息
  */
export function getMyInfo() {
  return request.get('/app/user/info/person')
}

/**
 * 获取用户信息
  */
export function getUserInfo(id: any): Promise<UserInfo> {
  return request.get('/open/user/info/profile', { params: { id } })
}

/**
 * 获取用户在线状态
 * @param userIds 
 */
export function getUsersOnlines(userIds: any[]): Promise<{ userId: any; isOnline: boolean }[]> {
  return request.post('/app/user/comm/isOnline', { userIds: userIds })
}

/**
 * 更新用户信息
 * @param userIds 
 */
export function updatePerson(data: any) {
  return request.post('/app/user/info/updatePerson', { ...data })
}

/**
 * 更新用户头像
 * @param avatarUrl 
 */
export function updateAvatar(avatarUrl: string) {
  return request.post('/app/user/info/updateAvatar', { avatarUrl: avatarUrl })
}

/**
 * 绑定手机号
 * @param data 
 */
export function bindPhone(data: { phone: string, code: string }) {
  return bindPhoneBf(data)
  // return request.post('/app/user/info/bindPhone', data)
}

/**
 * 绑定手机号——大脚
 * @param data 
 */
export function bindPhoneBf(data: any) {
  return request.post('/app/user/info/bindPhoneBF', data)
}

/**
 * 获取绑定二维码
 * @returns 
 */
export function getBindQrcode() {
  return request.get('/app/user/info/wxQrcode')
}

/**
 * 获取微信绑定状态
 * @returns 
 */
export function getWxBindStatus(): Promise<string> {
  return request.get('/app/user/info/wxQrcodeStatus')
}

/**
 * 数据统计
 * @returns 
 */
export function myData(): Promise<{ requirementTotal: number, offeringTotal: number }> {
  return request.get('/app/user/data/myData')
}


/**
 * 更新自动回复信息
 * @returns 
 */
export function updateAutoReply(data: { status: 1 | 0, content: string }): CommonRequest {
  return request.post('/app/user/info/updateAutoReply', data)
}

/**
 * 注销账号
 * @returns 
 */
export function logoff(): CommonRequest {
  return request.post('/app/user/info/logoff',)
}

/**
 * 获取邀请码
 */
export function inviteCode(): CommonRequest {
  return request.get('/app/user/info/inviteCode',)
}

/**
 * 获取邀请码
 */
export function invitePage(params: any): CommonRequest {
  return request.post('/app/user/invite/page', params)
}

/**
 * 获取邀请码
 */
export function myCharacterList(): Promise<UserCharacter[]> {
  return request.post('/app/user/character/myList')
}