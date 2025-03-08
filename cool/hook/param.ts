import { defineStore } from 'pinia'

let fetchingKeys: Set<string> = new Set()

export const useParamStore = defineStore('param', () => {
  let param = reactive<{ [key: string]: any }>({})

  async function getParam(keys: string[]) {
    let existKeys = Object.keys(param)
    keys = keys.filter(key => !existKeys.includes(key) && !fetchingKeys.has(key))

    keys.forEach(key => fetchingKeys.add(key))

    await Promise.all(keys.map(async key => {
      try {
        let res = await service.comm.getParam(key)

        param[key] = res
      } finally {
        fetchingKeys.delete(key)
      }
    }))

    return param
  }

  return {
    getParam,
    param,
  }
})


export function useParam(keys: string[], options?: { keyMap?: { [key: string]: any }, cb?: Function }) {
  const store = useParamStore()
  let findKeys = keys.filter(key => !store.param[key])

  if (findKeys.length > 0) {
    Promise.all(findKeys.map(async key => {
      try {
        await store.getParam(findKeys).then(res => {
          findKeys.forEach(key => {
            const dataKey = options?.keyMap?.[key] || key
            store.param[dataKey] = res[key]
          })
        })
      } finally {
      }
    })).finally(() => {
      options?.cb?.({ param: store.param })
    })
  } else {
    options?.cb?.({ param: store.param })
  }

  return {
    param: store.param,
    getParam: store.getParam
  }
}

