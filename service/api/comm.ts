import type { MiniURLScheme } from '~/types/common'
import request from '../request'

// 获取在线用户数据
export function fetchOnlineUserData(): Promise<{ activeUserCount: 0, onlineUserCount: 0 }> {
  return request.get('/app/user/comm/online')
}
export function uploadMode(): Promise<{ mode: string, type: string }> {
  return request.get('/app/base/comm/uploadMode')
}

export function fetchUpload() {
  return request.post('/app/base/comm/upload')
}

export function getParam(key: string): Promise<any> {
  return request.get('/app/base/comm/param', { params: { key } })
}

/**
 * 发送验证码
 * @param phone 手机号
 * @param type 类型
 */
export function sendSmsCode(data: { phone: string, type: 'bindPhone' | 'login' }) {
  return request.post('/app/sms/sms/smsCode', data)
}

/**
 * 获取小程序URLScheme 
 */
export function getMiniURLScheme(data: {
  env_version?: string;
  path: string;
  query?: string;
  [property: string]: any;
}): Promise<MiniURLScheme> {
  return request.post('/comm/wx/getMiniURLScheme', data)
}

/**
 * 获取小程序码 
 */
export function getMiniQRCode(data: {
  env_version?: string;
  path: string;
  codeType?: number;
  [property: string]: any;
}): Promise<{ type: '', data: any[] }> {
  return request.post('/comm/wx/getMiniQRCode', data,)
}