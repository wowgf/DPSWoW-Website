<template>
  <a-row :gutter="20">
    <a-col
      v-for="(keys, colIndex) in options"
      :key="colIndex"
      :xs="24"
      :lg="12"
      :order="colIndex == 0 ? (isMobile ? 3 : colIndex) : colIndex"
    >
      <div
        v-for="(key, lineIndex) in keys"
        :key="lineIndex"
        class="flex gear-line h-[83px]"
      >
        <div class="gear-name pt-[15px] mr-3 text-right text-gray-400">
          {{ GearNameMap[key] }}
        </div>
        <div class="current-wrap w-[50px] pt-[16px]">
          <div class="h-[50px] w-[50px] relative bg-[#33363D] rounded">
            <div
              class="absolute top-0 left-0 z-0 flex items-center justify-center w-full h-full name-bg"
            >
              {{ GearNameMap[key] }}
            </div>
            <GearImg
              v-if="currentGear[key]"
              :data="currentGear[key]"
              :show-border="true"
              full-mask
              hideLevel
            ></GearImg>
          </div>
          <div class="flex">
            <UpgradeTooltip
              v-if="currentGear[key]?.upgradeSets"
              :data="currentGear[key]"
              :slotKey="key"
            >
              <div class="upgrade-btn text-green-400 text-[16px] mt-1 mr-[1px]">
                +
              </div>
            </UpgradeTooltip>
            <span
              class="text-gray-100 opacity-[0.8] text-[12px] font-bold mt-[6px] ml-[1px]"
              >{{ currentGear[key]?.gearLevel }}</span
            >
          </div>
        </div>
        <div
          class="flex-1 other-wrap bg-[#111218] ml-3 rounded flex overflow-x-hidden px-2"
        >
          <ItemLine
            v-if="!['finger2', 'trinket2'].includes(key)"
            :gearData="gearData"
            :onSelect="onSelect"
            :checkIsSelected="checkIsSelected"
            :currentGear="currentGear"
            :options="options"
            :gearKey="key"
            :list="[...gearData[key].filter((v: GearData) => !v.isCurrent).filter((v: any) => v.slot == 'weekly').sort((a: GearData, b: GearData) => b.gearLevel - a.gearLevel), ...gearData[key].filter((v: GearData) => !v.isCurrent).filter((v: any) => v.slot != 'weekly').sort((a: GearData, b: GearData) => b.gearLevel - a.gearLevel)]"
          >
          </ItemLine>
        </div>
      </div>
    </a-col>
  </a-row>
</template>

<script setup lang="ts">
import ItemLine from "./ItemLine.vue";
import { GearNameMap } from "~/consts/wowItem";
import { useAppStore } from "~/store/app";
import type { GearData } from "~/types/gear";
const props = defineProps<{
  gearData: any;
  onSelect: any;
  checkIsSelected: any;
  currentGear: any;
  options: any;
}>();

const { isMobile } = storeToRefs(useAppStore());
</script>

<style>
.upgrade-btn {
  cursor: pointer;
  line-height: 12px;
  color: #4ade80;
  border: 1px solid gray;
  font-weight: 600;
  border-radius: 25%;
  padding: 1px 5px 3px 5px;
  z-index: 10;
}
</style>
