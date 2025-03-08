<template>
  <div class="flex items-center justify-center w-full h-full bg-[#33363D]">
    {{ GearNameMap[key] }}
  </div>
</template>

<script setup lang="ts">
import { GearNameMap } from "~/consts/wowItem";
const props = defineProps<{
  key: string;
}>();
const a = GearNameMap;
</script>

<style></style>
