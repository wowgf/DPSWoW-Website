export interface PotionOption {
  name_cn: string;
  craftingQuality: number;
  expansion?: number;
  icon: string;
  itemId: number;
  name?: string;
  shortName?: string;
  value: string;

  [property: string]: any;
}