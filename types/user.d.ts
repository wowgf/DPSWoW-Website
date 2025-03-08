export interface GameInfo {
  gameCharacterName: string;
  serverName: string;
  [property: string]: any;
}

export interface AutoReplyInfo {
  content: string;
  status: 1 | 0;
}
export interface UserInfo {
  artisanInfo?: ArtisanInfo;
  artisanInfoId?: number;
  avatarUrl: string;
  createTime: string;
  gender: number;
  id: number;
  nickName: string;
  phone: string;
  updateTime: string;
  gameInfo: GameInfo;
  lastActiveTime: string;
  autoReplyInfo?: AutoReplyInfo;
  points: number;
  [property: string]: any;
}

export interface ArtisanInfo {
  contactCount: number;
  createTime: string;
  gameCharacterName: string;
  id: number;
  images: string[];
  introduction: string;
  platformLevel: null;
  positiveReviews: number;
  responseTime: number;
  reviewScore: number;
  score: number;
  serverName: string;
  skills: string[];
  status: number;
  updateTime: string;
  userId: number;
  ngaGyUrl: string;
  deliveryTimes: any[];
  [property: string]: any;
}

export interface UserCharacter {
  characterName: string;
  className: string;
  createTime: string;
  id: number;
  serverName: string;
  simcStr: string;
  specName: string;
  updateTime: string;
  userId: number;
  [property: string]: any;
}
