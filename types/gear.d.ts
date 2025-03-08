import { UpgradeSet } from './wowdata.d';
import { raceMap } from "~/consts/wowData";
export interface Gear {
  head: GearData[],
  neck: GearData[],
  shoulder: GearData[],
  back: GearData[],
  chest: GearData[],
  wrist: GearData[],
  hands: GearData[],
  waist: GearData[],
  legs: GearData[],
  feet: GearData[],
  main_hand: GearData[],
  off_hand: GearData[],
  rings: GearData[],
  trinkets: GearData[],

  [property: string]: GearData[];
}

export interface GearItem {
  head: GearData,
  neck: GearData,
  shoulder: GearData,
  back: GearData,
  chest: GearData,
  wrist: GearData,
  hands: GearData,
  waist: GearData,
  legs: GearData,
  feet: GearData,
  main_hand: GearData,
  off_hand: GearData,
  rings: GearData,
  trinkets: GearData,
  talents?: string,

  [property: string]: GearData;
}


export interface GearData {
  isCurrent?: boolean;
  slot: string; // 装备所在地方 bag 背包装备 current 当前装备 weekly 周装备
  gearName: string; // 装备名称
  gearLevel: number; // 装备等级
  id: number; // ID
  bonus_id: string; // 套装ID
  createTime?: string;
  updateTime?: string;
  itemId: number; // 物品ID
  itemClass: number; // 物品分类
  itemSubClass?: number; // 物品子分类
  inventoryType: number; // 装备部位
  name: string; // 物品名称
  iconUrl: string; // 图标
  level?: any; // 基础等级
  quality: number; // 品质
  craftingQuality?: number; // 制造配方品质
  materials?: any; // 材料
  craftings?: any; // 配方
  attr?: any; // 属性
  spells: any[]; // 法术
  tooltip?: any; // 描述
  status: number; // 0: 未装备 1: 已装备
  catId?: any; // 分类
  gem_id: string; // 宝石
  enchant_id: string; // 附魔
  crafted_stats?: any; // 配方属性
  isSelected?: boolean; // 是否选中
  isUpgraded?: boolean; // 是否升级
  gearKey?: string; // 装备部位key
  itemSource?: any; // 原物品信息
  sources?: { instanceId: number; encounterId: number }[]; // 物品来源
  upgradeSets?: {
    list: UpgradeSet[];
    levelBonusId: any;
    leveIndex: number;
  }; // 升级材料组合
  tags?: string[];
  stats?: { id: number; alloc: number }[];
  [property: string]: any;
}


export interface ItemEnchantSelectValue {
  head: number[],
  neck: number[],
  shoulder: number[],
  back: number[],
  chest: number[],
  wrist: number[],
  hands: number[],
  waist: number[],
  legs: number[],
  feet: number[],
  main_hand: number[],
  off_hand: number[],
  rings: number[],
  trinkets: number[],
  [property: string]: number[];
}

export interface ItemEnchantCombo {
  head?: number,
  neck?: number,
  shoulder?: number,
  back?: number,
  chest?: number,
  wrist?: number,
  hands?: number,
  waist?: number,
  legs?: number,
  feet?: number,
  main_hand?: number,
  off_hand?: number,
  rings?: number,
  trinkets?: number,
  [property?: string]: number;
}

export interface TalentsData {
  name: string;
  value: string;
  isDefault?: boolean;
}

export interface RoleInfo {
  playerName: string;
  metier: string;
  paladin: string;
  level: string;
  race: keyof typeof raceMap;
  region: string;
  server: string;
  role: string;
  professions: string;
  spec: string;
  talents: string;
  talentsList: TalentsData[];
}