<template>
  <a-button v-bind="$attrs" class="mz-button">
    <template v-if="showIcon" #icon>
      <slot name="icon"></slot>
    </template>
    <slot></slot>
  </a-button>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    buttonType?: string; // primary primary-solid ouline
    showIcon?: boolean;
  }>(),
  {
    buttonType: "primary",
  }
);
</script>

<style lang="scss">
// .mz-button.arco-btn-primary {
//   border-color: theme("colors.yellow.500") !important;
// }

// .mz-button.arco-btn-primary {
//   border-color: #eab308 !important;
// }

.mz-button {
  &.arco-btn-secondary {
    border-color: theme("colors.themeWowRed") !important;
    color: theme("colors.themeYellow") !important;
    background-color: theme("colors.wowDeepRed") !important;

    &:hover {
      background-color: theme("colors.themeWowRed") !important;
    }
  }

  &.arco-btn-primary {
    background-color: theme("colors.themeWowRed") !important;
  }

  &.arco-btn-outline {
    border-color: #c77e19 !important;
    color: theme("colors.themeYellow") !important;

    &:hover {
      background-color: #b06601 !important;
    }
  }
}
</style>
