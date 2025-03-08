// export type MessageType = 'text' | 'img' // 消息类型 枚举 text.文本 img.图片
export type MessageType = number // 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 // 0-text 1-img 5-订单 6-发货通知 7-询问

export interface MessageItem {
  userId: any;
  id: any;
  content: string;
  type: MessageType;
  createTime: string;
  isSelf: boolean; // 是否是自己发送的
  [key: string]: any; // 其他信息
}

export interface User {
  conversationId?: number; // 会话id
  id?: any; // 用户id
  nickName: string; // 昵称
  avatarUrl: string; // 头像
  lastMsgTime?: string; // 最后一条消息的时间
  lastMsg?: string; // 最后一条消息
  lastMsgType?: MessageType; // 最后一条消息的类型
  unReadCount: number; // 未读消息数量
  isCache?: boolean; // 是否缓存
  [key: string]: any;
  isOnline?: boolean; // 是否在线
}

export interface SocketMessageData {
  message: any, // 消息内容
  messageType: any, // 消息类型
  // userId: any // 消息来源的用户id
  senderId: any // 消息来源的用户id
}

/**
 * 通知消息
 */
export interface SocketNoticeData {
  noticeId: any; // 消息id
  title: any; // 消息内容
  type: 1 | 2; // 消息类型 1-招募订阅 2-系统通知
}

/**
 * 会话
 */
export interface Conversation {
  id?: any; // 用户id
  nickName: string; // 昵称
  avatarUrl: string; // 头像
  lastMsgTime?: string; // 最后一条消息的时间
  lastMsg?: string; // 最后一条消息
  unReadCount: number; // 未读消息数量
  [key: string]: any;
  isOnline?: boolean; // 是否在线
}

/**
 * 接口返回消息数据
 */
export interface RequestMessageData {
  content: string;
  conversationId: number;
  createTime: string;
  id: number;
  isSend: number;
  isShow: number;
  receiverId: number;
  senderId: number;
  type: number;
  updateTime: string;
  [property: string]: any;
}