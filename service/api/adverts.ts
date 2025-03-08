import type { MiniURLScheme } from '~/types/common'
import request from '../request'

/**
 * 查看广告观看状态 
 */
export function getAdvertStatus(data: {
  advertId?: string;
}): Promise<{
  status: number
}> {
  return request.post('/app/adverts/advert/status', data)
}

/**
 * 查看广告观看状态 
 */
export function getTodayCount(): Promise<{
  viewCount: number;
  viewLimit: number
}> {
  return request.post('/app/adverts/advert/todayCount',)
}

