import type { ArtisanInfoDTO } from '~/types/ArtisanInfo'
import request from '../request'
import type { CommonRequest } from '~/types/request'

// 获取在线用户数据
export function register(data: ArtisanInfoDTO): CommonRequest {
  return request.post('/app/user/artisanInfo/register', data)
}


// 更新工匠信息
export function updateInfo(data: ArtisanInfoDTO): CommonRequest {
  return request.post('/app/user/artisanInfo/updateInfo', data)
}
