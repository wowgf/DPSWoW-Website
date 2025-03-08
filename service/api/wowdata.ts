import type { CommonRequest } from '~/types/request'
import request from '../request'
import type { ItemEnchant } from '~/types/wowdata'

export function formatGear(params: any) {
  return request.post('/open/wowdata/item/format_gear', params)
}


export function formatSpell(params: { ids: any[] }): CommonRequest {
  return request.post('/open/wowdata/spell/format_list', params)
}

/**
 * 获取物品附魔列表
 * @returns 
 */
export function getItemEnchantList(params: any): Promise<ItemEnchant[]> {
  return request.post('/open/wowdata/itemEnchant/list', params || {})
}

/**
 * 获取物品附魔分类
 */
export function getItemEnchantCategory(): Promise<any> {
  return request.post('/open/wowdata/itemEnchantCategory/list')
}

/**
 * 获取装备来源列表
 */
export function getGearSourceList(): Promise<any> {
  return request.post('/wow/data/instances.json')
}