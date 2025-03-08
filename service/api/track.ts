import request from '../request'
import * as trackEvent from '~/consts/trackEvent'

export interface RecordParams {
  /**
   * 行为名称，AD_CLICK
   */
  event: string;
  /**
   * 参数
   */
  params?: any;
}

export function fetchRecord(params: RecordParams) {
  return request.post('/app/track/track/record', params)
}