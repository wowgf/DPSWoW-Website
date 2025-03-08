import type { MessageType } from "./chat";

export interface UserConversationData {
  "id": number,
  "createTime": string,
  "updateTime": string,
  "conversationId": number,
  "userId": number,
  "targetUserId": number,
  "unreadCount": number,
  "lastReadMessageId": any,
  "lastMessage": string,
  "lastMessageTime": string,
  "isTop": number,
  "hasUnread": number,
  "isShow": number,
  "targetUserInfo": {
    "id": number,
    "avatarUrl": string,
    "nickName": string
  },
  "conversation": {
    "lastMessage": string,
    "lastMessageTime": string,
    "lastMessageType": MessageType
  }
}

export interface UserConversationDataPage {
  list: UserConversationData[];
}

