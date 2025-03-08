export interface ResultRecord {
  id: string;
  userId: number;
  originSimcStrUrl: string;
  rawSimcStrUrl: string;
  rawResultUrl: string;
  cost: number;
  bestCombo: any;
  combinationsUrl: string;
  playerInfo: PlayerInfo;
  simcConfig: SimcConfig;
  params: Params;
  bestDps: number;
  itemLevel: number;
  type: number;
  status: number;
  jobId: string;
  isRank: number;
  createTime?: string;
  updateTime?: string;
  combinations: any[];
}

export interface Params {
  isDefaultStr?: number;
  isSourceSimcStr?: boolean;
}

export interface PlayerInfo {
  race: string;
  role: string;
  spec: string;
  level: string;
  metier: string;
  region: string;
  server: string;
  talents: string;
  playerName: string;
  deathknight: string;
  professions: string;
  talentsList: Talent[];
}

export interface Talent {
  name: string;
  value: string;
  isDefault?: boolean;
}

export interface SimcConfig {
  buffs: Buff[];
  max_time: number;
  consumables: Consumables;
  fight_style: string;
  desired_targets: number;
}

export interface Buff {
  key: string;
  value: boolean;
}

export interface Consumables {
  food: number;
  flask: number;
  potion: number;
  weapon: number;
  augmentation: number;
}