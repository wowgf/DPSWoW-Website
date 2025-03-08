import request from '../request'
import type { CommonPage, CommonRequest } from '~/types/request'

/**
 * 上传成绩至排行榜
 */
export function uploadDps(data: { recordId: string }): CommonRequest {
  return request.post('/app/rank/dpsTopRank/uploadDps', data)
}

/**
 * 查看排行榜
 */
export function getDpsTopRankPage(data: { page: number; pageSize: number;[key: string]: any }): CommonPage {
  return request.post('/app/rank/dpsTopRank/topRank', data)
}

/**
 * 查看我的排行榜
 */
export function getMyRank(): CommonRequest {
  return request.post('/app/rank/dpsTopRank/myRank',)
}