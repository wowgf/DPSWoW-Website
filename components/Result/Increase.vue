<template>
  <div>
    <div
      v-if="dps2 != dps1"
      :class="{
        'text-green-400': isIncrease,
        'text-red-400': !isIncrease,
      }"
    >
      <span v-if="isIncrease">+</span>
      <span v-if="!isIncrease">-</span>
      {{ increaseValue }}
    </div>
    <span v-else>-</span>
  </div>
</template>

<script setup lang="ts">
import { formatDpsValue } from "~/cool/utils/dps";
const props = defineProps<{
  dps1: number; // 当前DPS
  dps2: number; // 新DPS
  // 是否显示百分比
  showPercent?: boolean;
}>();

// 是否提升
const isIncrease = computed(() => {
  return props.dps2 > props.dps1;
});

// 提升数值 - 绝对值
const increaseValue = computed(() => {
  let value = Math.abs(props.dps2 - props.dps1);
  if (props.showPercent) {
    return `${((value / props.dps2) * 100).toFixed(2)}%`;
  }
  return formatDpsValue(value, 2, true);
});
</script>

<style></style>
