import { reactive } from "vue";

export function useNewUse() {
  // 0-还没体验 1-已使用过
  let useMap = reactive({
    mall: localStorage.getItem('new_use_mall') || 0,
    requirement: localStorage.getItem('new_use_requirement') || 0,
    service: localStorage.getItem('new_use_service') || 0,
  })

  function useNew(key: string) {
    useMap[key] = 1
    localStorage.setItem(`new_use_${key}`, '1')
  }

  return {
    useMap,
    useNew
  }
}