<template>
  <table class="w-full">
    <thead>
      <tr>
        <th class="w-[120px]"></th>
        <th class="w-[300px]"></th>
        <th class="w-[500px]"></th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="({ comboOption: item, mean }, index) in selectList"
        :key="index"
        class="h-[50px] border-b-[1px] border-gray-500 last:border-0 cursor-pointer"
      >
        <td class="px-3">
          <div class="flex items-center justify-center">
            <div>
              <span>第</span>
              <span>{{ rankValueList[index] }}</span>
            </div>
            <!-- 金牌 -->
            <SvgIcon
              v-if="index == 0"
              name="jiangbei"
              class="ml-3 text-xl text-[#F8C51C]"
            ></SvgIcon>
            <!-- 银牌 -->
            <SvgIcon
              v-if="index == 1"
              name="jiangbei"
              class="ml-3 text-xl text-[#B0B0B0]"
            ></SvgIcon>
            <!-- 铜牌 -->
            <SvgIcon
              v-if="index == 2"
              name="jiangbei"
              class="ml-3 text-xl text-[#A67D3D]"
            ></SvgIcon>
          </div>
        </td>
        <td class="px-3 py-3">
          <div v-if="isCurrentComb(item)" class="font-bold text-themeGreen">
            自身装备
          </div>
          <template v-for="gearKey in tableHeadOptions" :key="gearKey">
            <div
              v-if="item[gearKey] && item[gearKey].isSelected"
              class="relative flex items-center p-2 overflow-hidden border border-gray-400 rounded cursor-pointer bg-slate-900"
            >
              <div class="w-8 h-8 gear-icon">
                <GearImg
                  :src="item[gearKey].iconUrl"
                  :data="item[gearKey]"
                  :quality="item[gearKey].quality"
                  :level="item[gearKey].gearLevel"
                  :show-border="true"
                  :showSlot="false"
                  hideMask
                  hideLevel
                ></GearImg>
              </div>
              <div class="ml-2">
                <div class="text-sm text-gray-300">
                  {{ item[gearKey].name }}
                </div>
                <div class="text-xs text-gray-400">
                  {{ item[gearKey].gearLevel }}
                </div>
              </div>
            </div>
          </template>
        </td>
        <!-- <td>
          <span class="text-yellow-600">{{ formatDpsValue(mean) }}万</span>
        </td> -->
        <td class="px-3">
          <div v-if="mean - currentDps > 0" class="flex items-center">
            <div
              className="flex items-center bg-green-500/20 rounded-lg px-2 py-2 ml-2"
            >
              <span className="text-green-400 font-semibold">
                +{{ formatDpsValue(Math.abs(mean - currentDps), 2, true) }}
                <!-- <span v-if="Math.abs(mean - currentDps) > 10000">万</span> -->
              </span>
            </div>
          </div>

          <div v-if="mean - currentDps < 0" class="flex items-center">
            <span>-</span>
            <div
              className="flex items-center bg-red-500/20 rounded-lg px-2 py-2 ml-2"
            >
              <span className="text-red-400 font-semibold">
                {{ formatDpsValue(Math.abs(mean - currentDps), 2, true) }}
                <!-- <span v-if="mean - currentDps > 10000">万</span> -->
              </span>
            </div>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import { formatDpsValue } from "@/cool/utils/dps";
import TrendingUp from "~/components/Icon/TrendingUp.vue";
const props = defineProps<{
  dpsResultList: any;
}>();

const selectList = computed(() => {
  // return props.dpsResultList
  //   .filter((item: any) => !isCurrentComb(item.comboOption))
  //   .sort((a: any, b: any) => b.mean - a.mean);
  return props.dpsResultList.sort((a: any, b: any) => b.mean - a.mean);
});

// 计算自身dps
const currentDps = computed(() => {
  return (
    props.dpsResultList.find((item: any) => isCurrentComb(item.comboOption))
      ?.mean || 0
  );
});

const rankValueList = [
  "一",
  "二",
  "三",
  "四",
  "五",
  "六",
  "七",
  "八",
  "九",
  "十",
];

// 表格配置
const tableHeadOptions = [
  "head",
  "neck",
  "shoulder",
  "back",
  "chest",
  "wrist",
  "hands",
  "waist",
  "legs",
  "feet",
  "finger1",
  "finger2",
  "trinket1",
  "trinket2",
  "main_hand",
  "off_hand",
];

/**
 * 检查是否是当前组合
 * @param comb
 */
function isCurrentComb(comb: any) {
  let isCurrentGear = Object.keys(comb)
    .filter((key) => comb[key] && typeof comb[key] != "string")
    .every((key) => comb[key]?.isCurrent);

  return isCurrentGear;
}
</script>

<style></style>
