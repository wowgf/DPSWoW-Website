import request from '../request'
import type { Category } from '~/types/dict'

// 物品分类列表
export function list(): Promise<Category[]> {
  return request.post('/app/category/category/list',)
}

// 查询物品列表
export function itemList(data: { parentId: any }): Promise<Category[]> {
  return request.get('/app/category/category/itemList', { params: data })
}


// 版块列表
export function sectionCategory(params: { sectionType: number }): Promise<Category[]> {
  return request.post('/app/category/sectionCategory/list', params)
}
