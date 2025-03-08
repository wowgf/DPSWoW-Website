import axios from "axios";
import type { EncounterItem, Instance } from "~/types/instance";

const service = axios.create({
  // baseURL: (import.meta as any).env.VITE_HOST,
  baseURL: 'https://bigfoot-wowworkshop-1324676730.cos.ap-guangzhou.myqcloud.com',
  withCredentials: false,
  timeout: 1000 * 60,
})

/**
 * 获取副本列表
 */
export async function getInstanceList(): Promise<Instance[]> {
  let res = await service.get("/wow/data/instances.json");
  return res.data;
}

/**
 * 获取副本装备
 */
export async function getEncounterItemList(): Promise<EncounterItem[]> {
  let res = await service.get("/wow/data/encounter-items.json");
  return res.data;
}

/**
 * 获取职业列表
 */
export async function getSpec(): Promise<EncounterItem[]> {
  let res = await service.get("/wow/data/spec.json");
  return res.data;
}