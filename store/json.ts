import { defineStore } from 'pinia'
import axios from 'axios'

let fetchingKeys: Set<string> = new Set()

const service = axios.create({
  baseURL: import.meta.dev ? '/' : (import.meta as any).env.VITE_OSS_HOST,
  withCredentials: false,
  timeout: 1000 * 60,
})

export const useJsonStore = defineStore('json', () => {
  let json = reactive<{ [key: string]: any }>({})

  async function getJson(keys: string[]) {
    let existKeys = Object.keys(json)
    keys = keys.filter(key => !existKeys.includes(key) && !fetchingKeys.has(key))

    keys.forEach(key => fetchingKeys.add(key))

    await Promise.all(keys.map(async key => {
      try {
        let res = await service.get(`/wow/data/${key}.json?v=11.1`)
        json[key] = res.data
      } finally {
        fetchingKeys.delete(key)
      }
    }))

    return json
  }

  return {
    getJson,
    json,
  }
})
