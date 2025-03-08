import type { OrderDTO } from '~/types/order'
import request from '../request'
import type { CommonRequest } from '~/types/request'
import type { PageParams } from '~/types/common'

/**
 * 创建订单
  */
export function createOrder(data: OrderDTO): Promise<{ orderNo: string }> {
  return request.post('/app/order/order/create', data)
}

/**
 * 用户订单列表
  */
export function buyerOrders(params: PageParams) {
  return request.post('/app/order/order/buyerOrders', params)
}

/**
 * 工匠订单列表
  */
export function sellerOrders(params: PageParams) {
  return request.post('/app/order/order/sellerOrders', params)
}

/**
  * 用户确认收货（已收货）
  */
export function receive(data: { orderId: any, }): CommonRequest {
  return request.post('/app/order/order/receive', data)
}

/**
  * 用户取消订单
  */
export function cancel(data: { orderId: any }): CommonRequest {
  return request.post('/app/order/order/cancel', data)
}

/**
  * 工匠取消订单
  */
export function cancelBySeller(data: { orderId: any, }): CommonRequest {
  return request.post('/app/order/order/cancelBySeller', data)
}

/**
  * 工匠完成订单（已发货）
  */
export function deliver(data: { orderId: any, }): CommonRequest {
  return request.post('/app/order/order/deliver', data)
}