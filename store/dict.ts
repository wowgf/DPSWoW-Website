import { defineStore } from 'pinia'
import { computed, reactive, ref } from 'vue'
import service from '../service'
// import type { Dict } from '../types/dict'

export const useDictStore = defineStore('dict', () => {
  let dict = reactive<{ [key: string]: any[] }>({})
  async function getDict(keys: string[]) {
    let existKeys = Object.keys(dict)
    keys = keys.filter(key => !existKeys.includes(key))
    if (keys.length > 0) {
      await service.dict.getDict(keys).then(res => {
        keys.forEach(key => {
          dict[key] = res[key]
        })
      })
    }
    return dict
  }

  function getNameByValue(key: string, value: string) {
    return dict[key]?.find(item => item.value === value)?.name || value
  }

  return {
    getDict,
    dict,
    getNameByValue
  }
})

