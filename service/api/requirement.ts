import request from '../request'
import type { CommonRequest } from '~/types/request'
import type { RequirementDTO } from '~/types/requirement'

/**
 * 创建需求
  */
export function add(data: RequirementDTO): CommonRequest {
  return request.post('/app/requirement/requirement/create', data)
}

/**
 * 需求分页列表 - 登录
  */
export function page(data: any): CommonRequest {
  return request.post('/app/requirement/requirement/page', data)
}

/**
 * 需求分页列表 - 未登录
  */
export function openPage(data: any): CommonRequest {
  return request.post('/open/requirement/requirement/page', data)
}

/**
 * 需求分页列表 - 未登录
  */
export function myPage(data: any): CommonRequest {
  return request.post('/app/requirement/requirement/mylist', data)
}

/**
 * 更新 
  */
export function update(data: RequirementDTO): CommonRequest {
  return request.post('/app/requirement/requirement/update', data)
}

/**
 * 更新需求状态
  */
export function updateStatus(data: { id: any, status: any }): CommonRequest {
  return request.post('/app/requirement/requirement/updateStatus', data)
}

/**
 * 服务详情
 * @param id 详情id
 */
export function info(id: any) {
  return request.get('/app/requirement/requirement/info', { params: { id } })
}

/**
 * 服务详情-开放接口
 * @param id 详情id
 */
export function openInfo(id: any) {
  return request.get('/open/requirement/requirement/info', { params: { id } })
}

/**
 * 首页需求列表
 */
export function getHomeList(): CommonRequest {
  return request.get('/open/requirement/requirement/homeList')
}