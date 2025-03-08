<template>
  <div class="enchant-select-box">
    <a-grid :colGap="12" :rowGap="16" :cols="{ xs: 1, sm: 2, md: 3, lg: 3 }">
      <a-grid-item v-for="(item, index) in catList" :key="index">
        <a-card :bordered="true" size="small" class="h-full">
          <template #title>
            <div class="text-sm">
              {{ getNameByValue("itemPart", item.part) }}
            </div>
          </template>
          <a-row :gutter="[10, 10]">
            <a-col
              v-for="(enchant, index) in enchantList.filter(
                (v) => v.part == item.part
              )"
              :key="index"
              :span="12"
            >
              <div
                :class="[
                  'flex items-center justify-between py-1 px-1 mb-3 border-solid border-[1px] last:mb-0 cursor-pointer enchant-item text-[12px] border-gray-600 select-none',
                  {
                    '!border-yellow-600 text-yellow-600': selectValues[
                      enchant.part
                    ].some((id) => id === enchant.itemId),
                  },
                ]"
                @click="toggleSelect(enchant.itemId, item.part)"
              >
                <div class="flex items-center">
                  <div class="w-5 h-5 mr-2 img-wrap">
                    <ItemImg
                      :src="enchant.iconUrl"
                      :item-id="enchant.itemId"
                      :crafting-quality="enchant.craftingQuality"
                      :quality="enchant.quality"
                    />
                  </div>
                </div>
                <span
                  class="flex-1 overflow-hidden text-nowrap text-ellipsis"
                  >{{ enchant.name }}</span
                >
                <!-- <div class="text-green-600">
                  {{ enchant.description }}
                </div> -->
              </div>
            </a-col>
          </a-row>
        </a-card>
      </a-grid-item>
    </a-grid>
  </div>
</template>

<script setup lang="ts">
import { useDict } from "~/cool";
import ItemImg from "./ItemImg.vue";
import { useWowDataStore } from "~/store/wowData";

// 获取字典数据
const { getNameByValue } = useDict(["itemPart"]);

// 定义道具附魔列表

const { enchantItemList } = storeToRefs(useWowDataStore());

// 定义选中列表
const selectValues = reactive<{ [key: string]: number[] }>({
  head: [],
  neck: [],
  shoulder: [],
  back: [],
  chest: [],
  wrist: [],
  main_hand: [],
  off_hand: [],
  hands: [],
  waist: [],
  legs: [],
  feet: [],
  finger: [],
  ring: [],
});

const enchantList = computed(() => {
  return enchantItemList.value.filter((v) => v.craftingQuality == 3);
});

// 定义自定义事件
const emits = defineEmits(["update:modelValue", "change"]);

// 定义组件属性
const props = defineProps<{
  modelValue?: { [key: string]: number[] };
}>();

const catList = ref<{ part: string }[]>([]);

// 组件挂载时获取道具附魔列表
onMounted(() => {
  service.wowdata.getItemEnchantCategory().then((res) => {
    catList.value = res;
  });
});

// 切换选中状态的函数
function toggleSelect(itemId: number, partKey: string) {
  if (selectValues[partKey].includes(itemId)) {
    selectValues[partKey] = selectValues[partKey].filter((id) => id !== itemId);
  } else {
    selectValues[partKey].push(itemId);
  }
  emits("update:modelValue", selectValues);
  emits("change", selectValues);
}
</script>

<style></style>
