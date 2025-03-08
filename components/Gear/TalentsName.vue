<template>
  <div v-if="!isHide" class="text-slate-300">
    <template v-if="!hideLabel">
      <span class="text-gray-400">天赋：</span>
    </template>
    <span>
      {{ talentsName }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { getTalentsInfoByValue } from "~/cool/utils/wow";
import type { TalentsData } from "~/types/gear";

const props = defineProps<{
  list: TalentsData[];
  value: string;
  hideDefault?: boolean;
  hideLabel?: boolean;
}>();

const isHide = computed(() => {
  if (!talentsName.value) return true;
  if (isDefault.value) return true;
  return false;
});

const talentsInfo = computed(() => {
  return getTalentsInfoByValue(props.list, props.value);
});

const talentsName = computed(() => {
  return talentsInfo.value?.name || "";
});

const isDefault = computed(() => {
  return talentsInfo.value?.isDefault || false;
});
</script>

<style></style>
