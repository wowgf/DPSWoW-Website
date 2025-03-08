export interface List {
  categoryId: number;
  categoryName: null | string;
  createTime: string;
  description: string;
  id: number;
  images: string[];
  itemLevel: number;
  itemName: string;
  price: number;
  starLevel: number;
  status: number;
  title: null | string;
  updateTime: string;
  userId: number;
  [property: string]: any;
}

export interface ArtisanAbilityData {
  categoryId: number;
  categoryName: null | string;
  createTime: string;
  description: string;
  id: number;
  images: string[];
  itemLevel: number;
  itemName: string;
  itemId?: number;
  price: number;
  starLevel: number;
  status: number;
  title: null | string;
  updateTime: string;
  userId: number;
  userInfo?: UserInfo;
  supportUnionOrder: number;
  [property: string]: any;
}

export interface UserInfo {
  avatarUrl: string;
  id: number;
  nickName: string;
  [property: string]: any;
}

/**
 * ArtisanAbilityDTO
 */
export interface ArtisanAbilityDTO {
  /**
   * 分类ID
   */
  categoryId: string;
  /**
   * 补充内容，最大20 如：任选双属性，2星材料即可
   */
  description: string;
  /**
   * 能力展示
   */
  images: string[];
  /**
   * 物品等级，1-2000
   */
  itemLevel: number | string;
  /**
   * 物品名称
   */
  itemName: string;
  /**
   * 价格，金币
   */
  price: number | string;
  /**
   * 制作星级，1-5
   */
  starLevel: number | string | null;
  /**
   * 状态 0-下架 1-上架
   */
  status?: number;

  /**
   * 阵营
   */
  camp: string;

  supportUnionOrder: any;

  /**
    * 在线时间，全天在线 白天在线 晚上在线
    */
  // onlineTime: string;

  /**
     * 发货速度，秒发 10min以内 1h以内 8h以内
     */
  // deliverySpeed: string;
  [property: string]: any;
}

export interface Query {
  categoryId?: any;
  /**
   * 模糊查询
   */
  keyword?: string;
  serverName?: string;
  serverNames?: string[];
  supportUnionOrder?: any;
  isFree?: number;
  [property: string]: any;
}