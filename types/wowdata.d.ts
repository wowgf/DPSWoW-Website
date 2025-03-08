export interface ItemEnchant {
  craftingQuality: number;
  createTime: string;
  description: string;
  displayName: string;
  equipRequirements: null | EquipRequirements;
  expansion: string;
  icon: string;
  iconUrl: string;
  id: number;
  wowId: number;
  itemId: number;
  name: string;
  part: string;
  quality: number;
  slot: null;
  socketType: string;
  spellEffects: number[] | null;
  spellIcon: string;
  spellIconUrl: string;
  spellId: number;
  stats: Stat[];
  status: number;
  tooltip: string; // 描述
  updateTime: string;
  [property: string]: any;
}

export interface EquipRequirements {
  invTypeMask: number;
  itemClass: number;
  itemSubClassMask: number;
  [property: string]: any;
}

export interface Stat {
  amount: number;
  type: string;
  [property: string]: any;
}

export interface UpgradeSet {
  group: number;
  level: number;
  max: number;
  name: string;
  fullName: string;
  bonusId: number;
  itemLevel: number;
  seasonId: number;
  costs: Cost[];
  highWatermarkDiscounts: HighWatermarkDiscount[];
  [property: string]: any;
}

export interface Cost {
  mask_inv_type: number;
  flags: number;
  amounts: Amount[];
  [property: string]: any;
}

export interface Amount {
  currencyId: number;
  amount: number;
  name: string;
  icon: string;
  [property: string]: any;
}

export interface HighWatermarkDiscount {
  type: string;
  id: number;
  scaling: number;
  accountWide: boolean;
  [property: string]: any;
}

export interface Spec {
  name: string;
  namenick: string;
  namecolor: string;
  playableid: number;
  thumb: string;
  icon: string;
  bgimg: string;
  bgcolor: string;
  mediaid: number;
  gendermalename: string;
  genderfemalename: string;
  powertypename: string;
  playableracesids: number[];
  specializationList: Specialization[];
  [property: string]: any;
}

export interface Metier {
  name: string;
  namenick: string;
  namecolor: string;
  playableid: number;
  thumb: string;
  icon: string;
  bgimg: string;
  bgcolor: string;
  mediaid: number;
  gendermalename: string;
  genderfemalename: string;
  powertypename: string;
  playableracesids: number[];
  specializationList: Specialization[];
  armors: number[]; // 可使用的护甲类型
  [property: string]: any;
}

export interface Specialization {
  playableid: number;
  specializationname: string;
  specializationid: number;
  hrnodeid: number;
  thumb: string;
  namecolor: string;
  namespec: string;
  gendermaledescription: string;
  genderfemaledescription: string;
  mediaid: number;
  role: string;
  rolename: string;
  powertypename: string;
  primarystattype: string;
  weaponItemSubClassList: number[]; // 可使用的武器类型
  [property: string]: any;
}