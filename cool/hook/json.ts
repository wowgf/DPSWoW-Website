import { useJsonStore } from '~/store/json'
export function useJson(keys: string[], keyMap?: { [key: string]: any }) {
  const jsonStore = useJsonStore()
  let findKeys = keys.filter(key => !jsonStore.json[key])

  if (findKeys.length > 0) {
    jsonStore.getJson(findKeys).then(res => {
      findKeys.forEach(key => {
        const dataKey = keyMap?.[key] || key
        jsonStore.json[dataKey] = res[key]
      })
    })
  }

  function getNameByValue(key: string, value: string) {
    let data = jsonStore.json[key]?.find((item: any) => item.value === value)?.name || value
    return data
  }

  function getJson() {
    return jsonStore.getJson
  }

  return {
    json: jsonStore.json,
    getNameByValue,
    getJson
  }
}

