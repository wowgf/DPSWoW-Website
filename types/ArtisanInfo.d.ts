/**
 * ArtisanInfoDTO
 */
export interface ArtisanInfoDTO {
  gameCharacterName: string;
  images: string[];
  introduction: string;
  serverName: string;
  skills: string[];
  ngaGyUrl: string;
  deliveryTimes: any[];
  [property: string]: any;
}