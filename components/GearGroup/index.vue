<template>
  <div class="mb-3 gear-group">
    <div class="text-lg font-semibold group-label">{{ label }}</div>
    <div class="mt-3 group-body">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  label: string;
}>();
</script>

<style></style>
