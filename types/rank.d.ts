export interface myRank {
  id: string;
  userId: number;
  characterName: string;
  serverName: string;
  className: string;
  spec: string;
  dps: number;
  itemLevel: number | null;
  simcRecordId: string;
  rankType: number;
  createTime: string;
  updateTime: string;
  totalRank: number;
  classRank: number;
  specRank: number;
  serverRank: number;
}

export interface RankData {
  id: string;
  userId: number;
  characterName: string;
  serverName: string;
  className: string;
  spec: string;
  dps: number;
  itemLevel: number | null;
  simcRecordId: string;
  rankType: number;
  createTime: string;
  updateTime: string;
  rank: number;
}