// https://db.newbeebox.com/wow/tooltip2/spell/${id}?dataEnv=1&locale=4

import type { CommonRequest } from '~/types/request';
import axios from 'axios';

export interface RequestParams {
  itemId: any;
  [property: string]: any;
}

// 获取物品信息
export function getTooltipData(params: RequestParams): CommonRequest {
  return axios.get(`https://db.newbeebox.com/wow/tooltip2/item/${params.itemId}?dataEnv=1&locale=4`, {
    params: params
  })
}

// 获取法术信息
export function getSpellTooltipData(params: { id: any }): CommonRequest {
  return axios.get(`https://db.newbeebox.com/wow/tooltip2/spell/${params.id}?dataEnv=1&locale=4`, {
    params: params
  })
}

