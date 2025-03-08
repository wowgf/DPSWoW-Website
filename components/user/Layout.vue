<template>
  <div class="user-layout">
    <div v-if="label" class="user-layout-title">{{ label }}</div>
    <div class="user-layout-content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  label?: string;
}>();
</script>

<style lang="scss" scoped>
.user-layout {
  .user-layout-title {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 20px;
  }

  .user-layout-content {
  }
}
</style>
