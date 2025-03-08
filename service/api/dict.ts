import request from '../request'

/**
 * 根据指定的类型数组获取字典信息 
 * @param types 字典类型数组，指定需要获取字典数据的类型
 * 'activityType' | 'teamType'
  */
export function getDict(types: string[]): Promise<{ [key: string]: any }> {
  return request.post('/app/dict/info/data', { types })
}
