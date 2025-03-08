import request from '../request'
const isDev = (import.meta as any).env.DEV
export async function qrcode(data: any) {
  return request.get('/app/user/login/qrcode', { params: data })
}

export async function smsCode(data: any) {
  if (isDev) return request.post('/app/user/login/smsCode', data)
  return smsCodeBf(data)
}

/**
 * 大脚手机号验证码
 * @param data 
 */
export async function smsCodeBf(data: any) {
  return request.post('/app/user/login/smsCode_bf', data)
}

export async function phone(data: any) {
  if (isDev) return request.post('/app/user/login/phone', data)
  return phoneBf(data)
}

/**
 * 大脚手机号登录
 * @param data 
 */
export async function phoneBf(data: any) {
  return request.post('/app/user/login/phone_bf', data)
}

export async function captcha(data: any) {
  return request.post('/app/user/login/smsCode', data)
}

export async function qrcodeStatus(data: any) {
  return request.post('/app/user/login/qrcodeStatus', data)
}

/**
 * 大脚客户方登录
 * @param data 
 * @returns 
 */
export async function bfAccessLogin(data: { token: string, channel: string, ref: string }) {
  return request.post('/app/user/login/bigfoot', data)
}