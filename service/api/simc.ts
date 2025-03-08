import type { CommonRequest } from '~/types/request'
import request from '../request'

export function run(params: { combinations: any[], playerInfo: any, simcConfig: any }): CommonRequest {
  return request.post('/app/simc/simc/run', params)
  // return request.post('http://192.168.31.69:7002/app/simc/simc/run', params)
}