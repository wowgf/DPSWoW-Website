<template>
  <div class="gem-select-box">
    <a-grid :cols="{ xs: 1, sm: 2, md: 3, lg: 4  }" :colGap="12" :rowGap="16" :gutter="[20, 20]">
      <a-grid-item v-for="(item, index) in options" :key="index">
        <a-card :bordered="true" size="small" class="h-full">
          <template #title>
            <div class="text-sm">
              {{ getNameByValue("itemPart", item.label) }}
            </div>
          </template>
          <div
            v-for="(gem, index) in gemList.filter(
              (v) => v.stats[0].type == item.key
            )"
            :key="index"
            :class="[
              'flex items-center justify-between p-1 mb-3 border-solid border-[1px] last:mb-0 cursor-pointer gem-item text-xs border-gray-600 select-none',
              {
                '!border-yellow-600 !text-yellow-600': selectValues.includes(
                  gem.itemId
                ),
              },
            ]"
            @click="toggleSelect(gem.itemId)"
          >
            <div class="flex items-center">
              <div class="w-6 h-6 mr-2 img-wrap">
                <ItemImg
                  :src="gem.iconUrl"
                  :item-id="gem.itemId"
                  :crafting-quality="gem.craftingQuality"
                  :quality="gem.quality"
                />
              </div>
              <span>{{ gem.name }}</span>
            </div>
            <div class="text-[11px]">
              {{ parseGemStats(gem.stats) }}
            </div>
          </div>
        </a-card>
      </a-grid-item>
    </a-grid>
  </div>
</template>

<script setup lang="ts">
import { useDict } from "~/cool";
import ItemImg from "./ItemImg.vue";
import { useWowDataStore } from "~/store/wowData";

const options = [
  {
    label: "主属性",
    key: "stragiint",
  },
  {
    label: "暴击",
    key: "crit",
  },
  {
    label: "急速",
    key: "haste",
  },
  {
    label: "精通",
    key: "mastery",
  },
  {
    label: "全能",
    key: "vers",
  },
  {
    label: "耐力",
    key: "sta",
  },
];

// 获取字典数据
const { getNameByValue } = useDict(["itemPart"]);

// 定义道具附魔列表

const { enchantItemList } = storeToRefs(useWowDataStore());

// 定义选中列表
const selectValues = ref<number[]>([]);

const gemList = computed(() => {
  return enchantItemList.value.filter(
    (v) =>
      v.craftingQuality == 3 &&
      v.slot &&
      v.socketType == "PRISMATIC" &&
      v.expansion == "10"
  );
});

// 定义自定义事件
const emits = defineEmits(["update:modelValue", "change"]);

// 切换选中状态的函数
function toggleSelect(itemId: number) {
  const index = selectValues.value.indexOf(itemId);
  if (index > -1) {
    selectValues.value.splice(index, 1);
  } else {
    selectValues.value.push(itemId);
  }
  // emits("update:modelValue", selectValues);
  emits("change", selectValues.value);
}

// 解析宝石属性
function parseGemStats(stats: any) {
  return stats
    .map((stat: any) => {
      let item = options.find((v) => v.key == stat.type);
      return `+${stat.amount} ${item?.label || stat.type}`;
    })
    .join(" ");
}
</script>

<style></style>
