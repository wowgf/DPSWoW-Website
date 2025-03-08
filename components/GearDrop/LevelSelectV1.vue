<template>
  <div class="flex flex-wrap gap-3">
    <div
      v-for="(item, index) in data"
      :key="index"
      :class="{
        'border-themeGreen text-themeGreen': modelValue === item.value,
      }"
      class="flex flex-col w-32 py-3 border-2 rounded cursor-pointer bg-[#3C3D3E] border-[#3C3D3E] items-center text-gray-400"
      @click="onSelect(item)"
    >
      <div v-if="item.name" class="mb-2">{{ item.name }}</div>
      <div v-if="item.levelRange.length > 1">
        {{ item.levelRange[0] }}-{{ item.levelRange[1] }}
      </div>
      <div v-if="item.levelRange.length == 1">
        {{ item.levelRange[0] }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Difficulty } from "~/types/instance";
interface DataType extends Difficulty {
  value: any;
}

const props = defineProps<{
  data: DataType[];
  modelValue: any;
}>();

const emits = defineEmits(["select", "update:modelValue"]);

const onSelect = (item: DataType) => {
  emits("select", item);
  emits("update:modelValue", item.value);
};
</script>

<style></style>
