<template>
  <a-grid :cols="5" :row-gap="10" :col-gap="16">
    <a-grid-item v-for="(item, index) in data" :key="index">
      <div
        :class="{
          'border-themeGreen text-themeGreen': modelValue === item.id,
        }"
        class="flex py-3 border-2 rounded cursor-pointer bg-[#3C3D3E] border-[#3C3D3E] items-center justify-center text-gray-300 gap-2"
        @click="onSelect(item)"
      >
        <div>{{ item.itemLevelOverride }}</div>
        <img
          :src="`/images/wow/item/crafting-${item.craftingQuality}.png`"
          class="h-7"
        />
        <div v-if="item.itemId" class="w-7 h-7">
          <ItemImg
            :item-id="item.itemId"
            :src="`/images/wow/item/${getReagentById(item.itemId)?.icon}.png`"
            :quality="getReagentById(item.itemId)?.quality"
          ></ItemImg>
        </div>
      </div>
    </a-grid-item>
  </a-grid>
</template>

<script setup lang="ts">
import { useJson } from "~/cool/hook/json";
import ItemImg from "../Gear/ItemImg.vue";
import type { Difficulty } from "~/types/instance";

interface DataType extends Difficulty {
  // value: any;
  craftingQuality: number;
  id: number;
}

const props = defineProps<{
  data: any[];
  modelValue: any;
}>();

const { json } = useJson([]);

const reagents = computed(() => json.crafting?.reagents || []);

const emits = defineEmits(["select", "update:modelValue"]);

const onSelect = (item: DataType) => {
  emits("select", item);
  emits("update:modelValue", item.id);
};

function getReagentById(id: number) {
  return reagents.value?.find((item: any) => item.id === id);
}
</script>

<style></style>
