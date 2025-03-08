import { zh } from '~/consts/language'

const data = {
  zh
}

const zhAll: any = {}

for (let key in zh) {
  const item = zh[key]
  for (let key2 in item) {
    zhAll[key2] = item[key2]
  }
}

const dataAll = {
  zh: zhAll
}

export function getLocalValue(paramKey: string, valueKey: string, local: string = 'zh') {
  try {
    return data[local][paramKey][valueKey] || valueKey
  } catch (error) {
    return valueKey
  }
}

export function getAllLocalValue(valueKey: string, local: string = 'zh') {
  try {
    return dataAll[local][valueKey] || valueKey
  } catch (error) {
    return valueKey
  }
}


/**
 * 替换装备掉落等级的英文为中文
 */
export function replaceQualityNameToZh(str: string) {
  let keys = Object.keys(zh.Quality)
  keys.forEach(key => {
    if (str.includes(key)) {
      str = str.replace(new RegExp(key, 'g'), zh.Quality[key]);
    }
  });
  return str;
}