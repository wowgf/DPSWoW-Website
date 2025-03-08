<template>
  <span class="font-semibold text-green-400 text-nowrap text-lg"> +{{ valueText }} </span>
</template>

<script setup lang="ts">
import { formatDpsValue } from "~/cool/utils/dps";

const props = defineProps<{
  value: number;
  // 对比的数值
  compareValue: number;
  // 是否显示百分比
  showPercent?: boolean;
}>();

const valueText = computed(() => {
  if (props.showPercent) {
    return `${((props.value / props.compareValue) * 100).toFixed(2)}%`;
  }
  return formatDpsValue(props.value, 2, true);
});
</script>

<style></style>
