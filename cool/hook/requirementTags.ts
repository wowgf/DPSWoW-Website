import { ref } from 'vue'
export function useRequirementTags() {
  const maxLenth = ref(5); // 最大长度
  const maxNum = ref(3); // 最多个数

  return {
    maxLenth,
    maxNum
  }
}
