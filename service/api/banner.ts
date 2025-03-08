import type { Banner } from '~/types/banner'
import request from '../request'

// banner列表
export function list(query?: { position?: number, isAllPosition?: number }): Promise<Banner[]> {
  return request.get('/open/banner/banner/list', { params: query })
}

