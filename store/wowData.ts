import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { ItemEnchant } from '~/types/wowdata'

export const useWowDataStore = defineStore('wowData', () => {
  const spellList = ref<any[]>([])

  const enchantItemList = ref<ItemEnchant[]>([])

  // 获取法术信息
  function getSpellById(id: number) {
    let data = spellList.value.find(item => item.spellId == id)
    return data
  }

  // 刷新法术列表
  function refreshSpellList(ids: any[]) {
    service.wowdata.formatSpell({ ids }).then(res => {
      spellList.value = [...spellList.value, ...res]
    })
  }

  /**
   * 通过spellId获取附魔信息
   */
  function getEnchantItemBySpellId(spellId: number) {
    return enchantItemList.value.find(item => item.spellId == spellId)
  }

  /**
   * 通过itemId获取附魔信息
   */
  function getEnchantItemByItemId(itemId: number) {
    return enchantItemList.value.find(item => item.itemId == itemId)
  }

  /**
   * 通过itemId获取附魔信息
   */
  function getEnchantItemByWowId(id: number) {
    let a = enchantItemList.value.find(item => item.wowId == id)
    return a
  }

  // 刷新附魔物品列表
  function refreshEnchantItemList() {
    service.wowdata
      .getItemEnchantList({})
      .then((res) => {
        enchantItemList.value = res;
      });
  }

  return {
    getSpellById,
    refreshSpellList,
    refreshEnchantItemList,
    getEnchantItemBySpellId,
    getEnchantItemByItemId,
    spellList,
    enchantItemList,
    getEnchantItemByWowId
  }
})

