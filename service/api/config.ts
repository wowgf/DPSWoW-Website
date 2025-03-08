import request from '../request'

export function getConfigList() {
  return request.post('/open/config/config/list')
}