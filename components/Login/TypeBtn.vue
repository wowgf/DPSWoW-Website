<template>
  <div :class="{ dark: dark }" class="login-type-btn">
    <div class="icon-wrap">
      <SvgIcon :name="icon"></SvgIcon>
    </div>
    <div v-if="label" class="label-wrap">{{ label }}</div>
  </div>
</template>

<script setup lang="ts" name="login-type-btn">
const props = defineProps<{
  icon: string;
  label?: string;
  dark?: boolean;
}>();
</script>

<style lang="scss" scoped>
.login-type-btn {
  display: inline-flex;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 6666px;
  padding: 6px 10px;
  cursor: pointer;
  margin-left: 10px;

  &:first-child {
    margin-left: 0;
  }

  &.dark {
    border-color: #484849;
  }

  .icon-wrap,
  .label-wrap {
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .icon-wrap {
    font-size: 20px;
  }

  .label-wrap {
    font-size: 14px;
    margin-left: 5px;
  }
}
</style>
