import type { CommonRequest } from '~/types/request'
import request from '../request'

export function lastRecord(): CommonRequest {
  return request.get('/app/simc/userSimcRecord/lastRecord')
}

export function info(id: any): CommonRequest {
  return request.get('/app/simc/userSimcRecord/info', { params: { id } })
}

/**
 * 获取用户的模拟数据
 * @param params 
 * @returns 
 */
export function userPage(params: any): CommonRequest {
  return request.post('/app/simc/userSimcRecord/userPage', params)
}