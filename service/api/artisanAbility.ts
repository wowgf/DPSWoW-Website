import request from '../request'
import type { CommonRequest, Pagination } from '~/types/request'
import type { ArtisanAbilityDTO, List, Query, ArtisanAbilityData } from '~/types/artisanAbility';

/**
 * 能力列表 - 登录
 * @param data 
 * @returns 
 */
export function page(data: Query): Promise<{
  list: ArtisanAbilityData[];
  pagination: Pagination;
  [property: string]: any;
}> {
  return request.post('/app/artisanAbility/artisanAbility/list_v3', data)
}

/**
 * 能力列表 - 登录
 * @param data 
 * @returns 
 */
export function userPage(data: Query): Promise<{
  list: ArtisanAbilityData[];
  pagination: Pagination;
  [property: string]: any;
}> {
  return request.post('/app/artisanAbility/artisanAbility/userPage', data)
}

/**
 * 能力列表 - 未登录
 * @param data 
 * @returns 
 */
export function openPage(data: Query): Promise<{
  list: ArtisanAbilityData[];
  pagination: Pagination;
  [property: string]: any;
}> {
  return request.post('/open/artisanAbility/artisanAbility/list_v2', data)
}


/**
 * (推荐位)主页能力信息列表
 * @param data 
 * @returns 
 */
export function recommend(data: Query): Promise<ArtisanAbilityData[]> {
  return request.post('/app/artisanAbility/artisanAbility/list_recommend_v2', data)
}

/**
 * 发布能力
 * @param data 
 * @returns 
 */
export function publish(data: ArtisanAbilityDTO): CommonRequest {
  return request.post('/app/user/artisanAbility/publish', data)
}

/**
 * 发布能力
 * @param data 
 * @returns 
 */
export function importData(list: ArtisanAbilityDTO[]): CommonRequest {
  return request.post('/app/user/artisanAbility/import', { list: list })
}


/**
 * 我的能力列表
 * @param data 
 * @returns 
 */
export function mylist(data: ArtisanAbilityDTO): CommonRequest {
  return request.post('/app/user/artisanAbility/mylist', data)
}



/**
 * 更新我的能力信息
 * @param data 
 * @returns 
 */
export function save(data: ArtisanAbilityDTO): CommonRequest {
  return request.post('/app/user/artisanAbility/save', data)
}

/**
 * 更新我的能力信息
 * @param data 
 * @returns 
 */
export function updateStatus(data: { id: number, status: number }): CommonRequest {
  return request.post('/app/user/artisanAbility/updateStatus', data)
}

/**
 * 导出生成工具数据字符串
 * @returns 
 */
export function exportText(data: { serverName: string, camp?: string }): Promise<string> {
  return request.post('/app/wowplugin/artisanAbility/export', data)
}

/**
 * 临时方法
 * 记录联系TA功能log
 */
export function recordContactLog(data: { abilityId?: number, targetUserId: number, pageType: number }): CommonRequest {
  return request.post('/app/data/contactLog/record', data)
}

/**
 * 记录访问记录log
 * 页面 1-能力详情 2-个人主页
 */
export function recordVisitLog(data: { abilityId?: number, targetUserId: number, pageType: number }): CommonRequest {
  return request.post('/app/data/visitLog/record', data)
}

/**
 * 获取能力详情
 * @param id 
  */
export function openInfo(id: any) {
  return request.get('/open/artisanAbility/artisanAbility/getInfo', { params: { id } })
}