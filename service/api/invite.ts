import type { CommonRequest } from '~/types/request';
import request from '../request'

export interface CheckInviteCodeRequestParams {
  /**
   * 客户端临时id 用来锁定code2分钟
   */
  clientId: string;
  inviteCode: string;
  [property: string]: any;
}

// 校验邀请码
export function checkInviteCode(params: CheckInviteCodeRequestParams): CommonRequest {
  return request.post('/app/invite/inviteCode/check', params)
}

