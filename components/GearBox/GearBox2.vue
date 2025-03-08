<template>
  <a-row :gutter="20">
    <a-col v-for="(keys, index) in options" :key="index" :span="12">
      <div
        v-for="(key, index) in keys"
        :key="index"
        class="flex mb-4 gear-line h-[70px]"
      >
        <div class="current-wrap w-[50px]">
          <div class="h-[50px] w-[50px] relative bg-[#33363D] rounded">
            <div
              class="absolute top-0 left-0 z-0 flex items-center justify-center w-full h-full name-bg"
            >
              {{ GearNameMap[key] }}
            </div>
            <GearImg
              v-if="currentGear[key]"
              :src="currentGear[key].iconUrl || currentGear[key].icon_url"
              :data="currentGear[key]"
              :quality="currentGear[key].quality"
              :level="currentGear[key].gearLevel"
              :show-border="true"
            ></GearImg>
          </div>
          <div
            class="mt-2 overflow-hidden text-[10px] gear-name-wrap text-ellipsis text-nowrap"
          >
            {{ currentGear[key]?.gearName }}
          </div>
        </div>
        <div
          class="flex-1 other-wrap bg-[#111218] ml-3 rounded flex p-3 items-center"
        >
          <div
            v-for="(item2, index) in gearData[key].filter((v:GearData) => !v.isCurrent)"
            :key="index"
            class="flex flex-col items-center justify-center mr-3 gear-item"
          >
            <div
              class="h-[40px] w-[40px] relative"
              @click="onSelect(key, item2)"
            >
              <GearImg
                :src="item2.iconUrl || item2.icon_url"
                :data="item2"
                :quality="item2.quality"
                :level="item2.gearLevel"
                :selected="checkIsSelected(key, item2)"
                :show-border="true"
              ></GearImg>
            </div>
            <div
              :style="{ color: slotColorMap[item2.slot] }"
              class="mt-2 text-[10px] text-center leading-none h-[10px] text-slate-500"
            >
              {{ slotMap[item2.slot] || "" }}
            </div>
          </div>
        </div>
      </div>
    </a-col>
  </a-row>
</template>

<script setup lang="ts">
import { GearNameMap } from "~/consts/wowItem";
import type { GearData } from "~/types/gear";

const props = defineProps<{
  gearData: any;
  onSelect: any;
  checkIsSelected: any;
  currentGear: any;
  options: any;
}>();

const slotMap: any = {
  bag: "背包",
  weekly: "低保",
};

const slotColorMap: any = {
  // bag: "#fff",
  // weekly: "#fff",
};
</script>

<style></style>
