import { cloneDeep } from "lodash-es"
import { deepTree } from "../utils"

export function useCategory(listNames: string[] = ['list']) {
  let list = ref<any[]>([])
  let sectionCategoryList1 = ref<any[]>([])
  let sectionCategoryList2 = ref<any[]>([])

  const treeList = computed(() => {
    return deepTree(cloneDeep(list.value))
  })

  const sectionCategoryTree1 = computed(() => {
    return deepTree(cloneDeep(sectionCategoryList1.value))
  })

  const sectionCategoryTree2 = computed(() => {
    return deepTree(cloneDeep(sectionCategoryList2.value))
  })

  if (list.value.length == 0 && listNames?.includes("list")) {
    getItemCategoryList()
  }

  if (sectionCategoryList1.value.length == 0 && listNames?.includes("sectionCategoryList1")) {
    service.category.sectionCategory({ sectionType: 1 }).then(res => {
      sectionCategoryList1.value = res
    })
  }

  if (sectionCategoryList2.value.length == 0 && listNames?.includes("sectionCategoryList2")) {
    service.category.sectionCategory({ sectionType: 2 }).then(res => {
      sectionCategoryList2.value = res
    })
  }

  async function getSectionCategoryList(params: { sectionType: number, parentId?: number }) {
    return await service.category.sectionCategory(params)
  }

  async function getItemCategoryList() {
    let catList = await service.category.list()
    list.value = catList.filter(item => item.type == 1)
    return catList
  }

  function toTree(list: any[]) {
    return deepTree(cloneDeep(list))
  }

  return {
    treeList: treeList,
    sectionCategoryList1,
    sectionCategoryList2,
    list,
    sectionCategoryTree1,
    sectionCategoryTree2,
    getSectionCategoryList,
    toTree,
    getItemCategoryList
  }
}