export interface TalentData {
  d: number;
  index: number;
  name: string;
  purchased: number;
  rank: number;
  maxRank?: number;
  description?: string;
  icon?: string;
  nodeInfo: any;
}

// export const parseTalentString = (talentString: string): TalentData[] => {
//   // 这里应该实现从字符串解析天赋数据的逻辑
//   // 目前返回示例数据
//   return demoData.talents;
// };

// 图标URL配置
export const ICON_URL = {
  // STANDARD: 'https://wow.zamimg.com/images/wow/icons/large',  // 标准图标
  // STANDARD: 'https://cdn2.newbeebox.com/wow_zamimg/images/wow/icons/large', // 新手盒子
  STANDARD: (import.meta as any).env.VITE_OSS_HOST + '/wow/images/icons', // 新手盒子
  HERO_ENTRY: (import.meta as any).env.VITE_OSS_HOST + '/wow/images/icons'   // 英雄天赋入口图标
} as const;