import request from '../request'

export function getAdvertisementList() {
  return request.post('/open/advertisement/advertisement/list')
}
