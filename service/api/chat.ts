import type { CommonPage, CommonRequest } from '~/types/request'
import request from '../request'
import type { UserConversationData, UserConversationDataPage } from '~/types/userConversation'

/**
 * 发送消息 
 * messageType 0-文本 1-图片 2-语音 3-视频 4-文件
 */
export function sendMessage(data: { userId: any, message: string, messageType: number }): Promise<{ conversationId: any }> {
  return request.post('/app/conversation/chat/send', data)
}

/**
 * 获取会话消息列表
 * @param data 
 * @returns 
 */
export function getMessageList(data: { conversationId: number }) {
  return request.post('/app/conversation/message/userMessages', data)
}

/**
 * 获取好友列表
  */
export function getFriendList(): Promise<UserConversationDataPage> {
  return request.post('/app/conversation/userConversation/page')
}

/**
 * 获取好友会话详情
  */
export function getFriendInfo(conversationId: any): Promise<UserConversationData> {
  return request.post('/app/conversation/userConversation/info', { conversationId: conversationId })
}

/**
 * 清除未读数
 * @param conversationId 会话id
  */
export function clearUnreadCount(conversationId: any): CommonRequest {
  return request.post('/app/conversation/userConversation/clearUnreadCount', { conversationId })
}



/**
 * 所有的未读数量
 */
export function unreadCount(): Promise<{ count: number }> {
  return request.post('/app/conversation/userConversation/unreadCount')
}


/**
 * 根据targetUserId获取对话详情
 */
export function getConversationInfoByUserId(targetUserId: any): Promise<{ conversationId: number }> {
  return request.post('/app/conversation/userConversation/infoByUserId', { targetUserId })
}