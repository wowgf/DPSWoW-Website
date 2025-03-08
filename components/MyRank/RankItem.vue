<template>
  <div class="w-[160px]">
    <div class="text-sm text-wowText">{{ label }}</div>
    <div class="text-xl font-bold">
      <slot>{{ content }}</slot>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  label: string;
  content?: any;
}>();
</script>

<style></style>
