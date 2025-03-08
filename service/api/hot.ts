import request from '../request'
import type { Hot } from '~/types/hot'

// 首页热门列表
export function list(): Promise<Hot[]> {
  return request.get('/open/data/hot/list')
}

