export interface Encounter {
  id: number;
  name: string;
  icon_button?: string;
  icon?: string;
  order?: number;
  flags: number;
  difficulty_mask?: number;
  faction?: string;
}

export interface Difficulty {
  context?: any;
  gambling?: any;
  itemLevelOffset?: any;
  itemLevel?: any;
  id: string;
  type: string;
  name: string;
  nameCn: string;
  quality: number;
  itemLevelOverride: number;
  levelSelectorSequence: string;
  itemFilter: any;
  bonusIds: number[];
  description?: string;
}

export interface Instance {
  id: number;
  name: string;
  description: string;
  image_button: string;
  image_button_small?: string;
  image_background: string;
  order: number;
  flags: number;
  type_id: number;
  type: string;
  encounters: Encounter[];
  // difficulty?: Difficulty[];
  [key: string]: any;
}

export interface ItemStat {
  id: number;
  alloc: number;
}

export interface ItemSource {
  instanceId: number;
  encounterId: number;
  veryRare: boolean; // 是否为稀有掉落
}

export interface EncounterItem {
  id: number;
  name: string;
  icon: string;
  quality: number;
  itemClass: number;
  itemSubClass: number;
  inventoryType: number;
  itemLevel: number;
  itemSetId: number;
  allowableClasses: number[]; // 允许使用的职业合集
  bonusLists?: number[];
  stats: ItemStat[];
  sources: ItemSource[];
  expansion: number;
  specs: number[]; // 适用的专精
  contains: number[]; // 可能掉落的其它装备id
  contextLevels: number[];
  tags?: string[];
}


export interface Override {
  instanceId: number;
  season: string;
  levelSelectorSetUpgradeTrack?: boolean;
  disableWarforgeLevel?: boolean;
  enableSockets?: boolean;
  showChances?: boolean;
  disableDifficulties?: boolean;
  warning?: {
    text: string;
  };
  showEncounters?: boolean;
  encounterType?: string;
  encounterTypePlural?: string;
  encounterAllId?: number;
  repeatable?: boolean;
  archive?: boolean;
  itemLevelOverride?: number;
}

export type InstanceType = 'raid' | 'mplus-chest' | 'catalyst' | 'profession593' | 'dungeon'