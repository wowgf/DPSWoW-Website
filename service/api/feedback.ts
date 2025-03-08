import type { FeedbackDTO } from '~/types/feedback'
import request from '../request'
import type { CommonRequest } from '~/types/request'

/**
 * 根据指定的类型数组获取字典信息 
 * @param types 字典类型数组，指定需要获取字典数据的类型
 * 'activityType' | 'teamType'
  */
export function add(data: FeedbackDTO): CommonRequest {
  return request.post('/app/feedback/feedback/add', data)
}
