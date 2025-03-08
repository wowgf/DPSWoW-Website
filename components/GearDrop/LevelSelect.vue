<template>
  <div class="flex flex-wrap gap-3 select-none">
    <div
      v-for="(item, index) in data"
      :key="index"
      :class="{
        'border-themeGreen text-themeGreen': modelValue === item.id,
      }"
      class="flex flex-col w-32 py-3 border-2 rounded cursor-pointer bg-[#3C3D3E] border-[#3C3D3E] items-center text-gray-400"
      @click="onSelect(item)"
    >
      <div v-if="item.name" class="mb-2">
        {{ item.nameCn || getAllLocalValue(item.name) }}
      </div>
      <div>{{ item.itemLevel || item.itemLevelOverride }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getAllLocalValue } from "~/cool/utils/language";
import type { Difficulty } from "~/types/instance";

// getAllLocalValue();

interface DataType extends Difficulty {
  value: any;
}

const props = defineProps<{
  data: any[];
  modelValue: any;
}>();

const emits = defineEmits(["select", "update:modelValue"]);

const onSelect = (item: any) => {
  emits("select", item);
  emits("update:modelValue", item.id);
};
</script>

<style></style>
