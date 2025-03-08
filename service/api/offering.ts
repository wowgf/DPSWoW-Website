import type { OfferingDTO } from '~/types/offering'
import request from '../request'
import type { CommonRequest } from '~/types/request'

/**
 * 创建需求
  */
export function add(data: OfferingDTO): CommonRequest {
  return request.post('/app/requirement/offering/create', data)
}

/**
 * 需求分页列表 - 登录
  */
export function page(data: any): CommonRequest {
  return request.post('/app/requirement/offering/page', data)
}

/**
 * 需求分页列表 - 未登录
  */
export function openPage(data: any): CommonRequest {
  return request.post('/open/requirement/offering/page', data)
}

/**
 * 需求分页列表 - 未登录
  */
export function myPage(data: any): CommonRequest {
  return request.post('/app/requirement/offering/mylist', data)
}


/**
 * 更新 
  */
export function update(data: OfferingDTO): CommonRequest {
  return request.post('/app/requirement/offering/update', data)
}

/**
 * 更新需求状态
  */
export function updateStatus(data: { id: any, status: any }): CommonRequest {
  return request.post('/app/requirement/offering/updateStatus', data)
}

/**
 * 服务详情
 * @param id 详情id
 */
export function info(id: any) {
  return request.get('/app/requirement/offering/info', { params: { id } })
}

/**
 * 服务详情
 * @param id 详情id
 */
export function openInfo(id: any) {
  return request.get('/open/requirement/offering/info', { params: { id } })
}

/**
 * 服务详情
 * @param id 详情id
 */
export function hotList(): CommonRequest {
  return request.get('/open/requirement/hotOffering/list')
}