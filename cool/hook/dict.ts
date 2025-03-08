import { useDictStore } from '~/store/dict'
export function useDict(keys: string[]) {
  const dictStore = useDictStore()
  let findKeys = keys.filter(key => !dictStore.dict[key])

  if (findKeys.length > 0) {
    dictStore.getDict(findKeys).then(res => {
      findKeys.forEach(key => {
        dictStore.dict[key] = res[key]
      })
    })
  }

  function getNameByValue(key: string, value: string) {
    let data = dictStore.dict[key]?.find(item => item.value === value)?.name || value
    return data
  }

  function getDict() {
    return dictStore.getDict
  }

  return {
    dict: dictStore.dict,
    getNameByValue,
    getDict
  }
}

