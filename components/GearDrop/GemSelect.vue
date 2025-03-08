<template>
  <a-select v-model="gemId" :style="{ width: '285px' }">
    <template v-if="selectedGem" #prefix>
      <div class="w-5 h-5 overflow-hidden">
        <ItemImg
          :src="selectedGem.iconUrl"
          :item-id="selectedGem.itemId"
          :crafting-quality="selectedGem.craftingQuality"
          :quality="selectedGem.quality"
        />
      </div>
    </template>
    <template v-if="selectedGem" #label>
      <span class="mr-2">{{ selectedGem.name }}</span>
      <span>{{ parseGemStats(selectedGem.stats) }}</span>
    </template>
    <a-option
      v-for="(gem, index) in [
        { name: '选择宝石', value: 'disabled', itemId: 0 },
        ...gemList,
      ]"
      :key="index"
      :value="gem.itemId"
      :label="gem.name"
    >
      <div v-if="gem.itemId" class="flex items-center">
        <div class="w-6 h-6 overflow-hidden">
          <ItemImg
            :src="gem.iconUrl"
            :item-id="gem.itemId"
            :crafting-quality="gem.craftingQuality"
            :quality="gem.quality"
          />
        </div>
        <div class="flex-1 overflow-hidden">
          <span class="mx-2">{{ gem.name }}</span>
          <span>{{ parseGemStats(gem.stats) }}</span>
        </div>
      </div>
    </a-option>
  </a-select>
</template>

<script setup lang="ts">
import { useDict } from "~/cool";
import ItemImg from "@/components/Gear/ItemImg.vue";
import { useWowDataStore } from "~/store/wowData";

const gemId = inject("gemId", 0) as unknown as Ref<number>;

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

const selectedGem = computed(() => {
  return gemList.value.find((v) => v.itemId == gemId.value);
});

// 获取字典数据
const { getNameByValue } = useDict(["itemPart"]);

// 定义道具附魔列表

const { enchantItemList } = storeToRefs(useWowDataStore());

// 定义选中列表
const selectValues = ref<number[]>([]);

const gemList = computed(() => {
  return enchantItemList.value
    .filter(
      (v) =>
        v.craftingQuality == 3 &&
        v.slot &&
        v.socketType == "PRISMATIC" &&
        v.expansion == "10"
    )
    .map((v) => {
      return {
        ...v,
        // name: parseGemStats(v.stats),
      };
    });
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
