<template>
  <div class="user-item-card-body">
    <slot></slot>
  </div>
</template>

<script setup lang='ts'>
const props = defineProps<{
  label?: string,
  content?: string,
  icon?: string
}>()
</script>

<style lang="scss" scoped>
.user-item-card-body {
  margin-top: 15px;
}
</style>
