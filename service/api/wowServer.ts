import request from '../request'

/**
 * 魔兽服务器列表  
  */
export function list(): Promise<any[]> {
  return request.post('/app/wowserver/wowserver/list',)
}
