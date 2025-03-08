<template>
  <div class="row-layout">
    <div class="row-layout__header">
      <div class="row-layout__header-title">{{ title }}</div>
      <div class="row-layout__header-append">
        <slot name="append"></slot>
      </div>
    </div>
    <div class="row-layout__body">
      <slot></slot>
    </div>
  </div>
</template>
<script lang="ts" setup>
const props = defineProps({
  title: {
    type: String,
    default: '',
  },
})
</script>
<style lang="scss" scoped>
.row-layout {
  .row-layout__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .row-layout__header-title {
      font-size: 18px;
      font-weight: 600;
      // color: #333;
    }
  }

  .row-layout__body {
    padding: 20px 0;
  }
}
</style>
