<template>
  <div
    class="mt-10 bg-[#171B25] border-solid border-2 rounded-lg border-[#66656A] result-block-layout"
  >
    <div class="bg-[#66656A] px-3 py-2 flex justify-between items-center">
      <div class="text-base">{{ title }}</div>
      <div>
        <slot name="head-right"></slot>
      </div>
    </div>
    <div class="layout-body">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  title?: string;
}>();
</script>

<style lang="scss">
.result-block-layout {
  &:first-child {
    // margin-top: 0 !important;
  }
}
</style>
