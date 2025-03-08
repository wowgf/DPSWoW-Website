import request from '../request'

export interface RecordParams {
  /**
   * 行为名称，AD_CLICK
   */
  actionName: string;
  /**
   * 行为类型，CLICK
   */
  actionType: string;
  /**
   * 广告ID，广告id
   */
  advertisementId: string;
  /**
   * 额外信息
   */
  extraInfo?: string;
  [property: string]: any;
}


export function fetchRecord(params: RecordParams) {
  return request.post('/app/tracking/tracking/record', params)
}