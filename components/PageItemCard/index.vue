<template>
  <div
    :class="{ '!border-0': hideBorder }"
    class="p-5 border rounded-md user-item-card border-zinc-800 bg-zinc-900"
  >
    <div class="user-item-card__head">
      <div class="user-item-card__head__left">
        <div v-if="label" class="flex items-center">
          <span class="head-label">{{ label }}</span>
          <slot name="label-right"> </slot>
        </div>
        <slot name="headLeft"> </slot>
      </div>
      <div class="user-item-card__head__right">
        <slot name="headRight"></slot>
      </div>
    </div>
    <div class="user-item-card__body">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  label?: string;
  content?: string;
  icon?: string;
  hideBorder?: boolean;
}>();
</script>

<style lang="scss" scoped>
.user-item-card {
  background-color: #111218;

  border-radius: 12px;

  .user-item-card__head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    overflow: hidden;
    .user-item-card__head__left {
      display: flex;
      align-items: center;
      overflow: hidden;
      .head-label {
        font-size: 16px;
        font-weight: 600;
        // color: #000;
      }
    }
  }

  .user-item-card__body {
    // margin-top: 10px;
  }
}
</style>
