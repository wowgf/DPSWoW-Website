<template>
  <a-row>
    <a-col v-for="(keys, index) in options" :key="index" :span="12">
      <div
        v-for="(key, index) in keys"
        :key="index"
        class="flex items-center gear-line h-[50px] mb-2 overflow-hidden"
      >
        <div
          class="current-gear h-[50px] w-[50px] relative flex justify-center items-center bg-[#33363D] mr-5"
        >
          <div
            class="absolute top-0 left-0 z-0 flex items-center justify-center w-full h-full name-bg"
          >
            {{ GearNameMap[key] }}
          </div>
          <div class="icon-box h-[50px] w-[50px] z-1 relative inline-flex">
            <GearImg
              v-if="currentGear[key]"
              :src="currentGear[key].iconUrl || currentGear[key].icon_url"
              :data="currentGear[key]"
              :quality="currentGear[key].quality"
              :level="currentGear[key].gearLevel"
            ></GearImg>
          </div>
        </div>
        <!-- 除了gearData[item]中第0个之后的数据 -->
        <div
          v-for="(item2, index) in gearData[key].filter((v:GearData) => !v.isCurrent)"
          :key="index"
          class="h-[40px] w-[40px] ml-2"
          @click="onSelect(key, item2)"
        >
          <GearImg
            :src="item2.iconUrl || item2.icon_url"
            :data="item2"
            :quality="item2.quality"
            :level="item2.gearLevel"
            :selected="checkIsSelected(key, item2)"
          ></GearImg>
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
</script>

<style></style>
