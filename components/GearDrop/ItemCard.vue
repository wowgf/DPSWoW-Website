<template>
  <div class="relative flex p-2 item-card">
    <div
      v-if="data?.tags?.includes('catalyst')"
      class="absolute top-1 left-1 z-10 text-[10px] text-orange-400 font-[900]"
    >
      套装
    </div>
    <div class="relative w-10 overflow-hidden item-card__left">
      <GearImg
        :data="data"
        :show-border="true"
        :showQuilityBorderColor="true"
        :borderStyle="data?.tags?.includes('catalyst') ? 'dashed' : 'solid'"
        full-mask
        hideLevel
        showCraftingQuality
      ></GearImg>
    </div>
    <div
      class="flex flex-col items-start justify-between flex-1 ml-3 overflow-hidden item-card__right"
    >
      <div class="text-sm font-[600] text-gray-300 text-nowrap text-ellipsis">
        {{ data.gearName }}
      </div>
      <div class="flex gap-2 text-xs">
        <span class="text-gray-300 text-nowrap">{{ data.gearLevel }}</span>
        <span v-if="showSlot" class="text-gray-300">{{ slotName }}</span>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getGearItemSlotInfo } from "~/cool/simc";
import type { GearData } from "~/types/gear";
const props = defineProps<{
  data: GearData;
  showSlot?: boolean;
  slotName?: string;
}>();

const slotName = computed(() => {
  return (
    props.slotName ||
    getGearItemSlotInfo(props.data.itemClass, props.data.inventoryType)?.name
  );
});
</script>

<style></style>
