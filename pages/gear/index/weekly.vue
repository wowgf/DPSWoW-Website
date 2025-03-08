<template>
  <GearMain
    ref="gearMainRef"
    :sourceSlots="['current', 'weekly']"
    :disabledRun="weeklyList.length == 0"
    disabledRunContent="无可对比的低保装备，需打开低保宝库界面再输入/simc指令"
    @run="onRun"
    @parse="onParse"
    :empty-box-text1="'粘贴数据至上方输入框，将会解析出你的低保装备'"
    :empty-box-text2="'点击开始模拟后，将会帮你选择最优的装备'"
  >
    <template #default="{ gearData }">
      <BlockLine></BlockLine>
      <Block label="低保装备" visible>
        <a-empty
          v-if="weeklyList.length == 0"
          description="没有可选的低保装备"
        ></a-empty>
        <a-row :gutter="[16, 16]">
          <a-col
            v-for="(item, index) in weeklyList"
            :key="index"
            :lg="6"
            :md="8"
            :sm="12"
            :xs="24"
          >
            <div
              class="relative flex items-center p-2 overflow-hidden border rounded cursor-pointer bg-slate-900 border-themeGreen"
            >
              <div class="w-10 h-10 gear-icon">
                <GearImg
                  :src="item.iconUrl"
                  :data="item"
                  :quality="item.quality"
                  :level="item.gearLevel"
                  :show-border="true"
                  :showSlot="false"
                  hideMask
                  hideLevel
                ></GearImg>
              </div>
              <div class="ml-2">
                <div class="text-sm text-gray-300">{{ item.name }}</div>
                <div class="text-xs text-gray-400">{{ item.gearLevel }}</div>
              </div>
              <div
                v-if="item.gearKey"
                class="absolute px-1 text-xs text-white bg-gray-600 rounded top-2 right-2"
              >
                {{ GearNameMap[item.gearKey] }}
              </div>
            </div>
          </a-col>
        </a-row>
        <!-- <div class="flex gap-4">
          <div
            v-for="(item, index) in weeklyList"
            :key="index"
            class="flex items-center w-[300px] p-2 bg-slate-900"
          >
            <div class="w-8 h-8 gear-icon">
              <GearImg
                :src="item.iconUrl"
                :data="item"
                :quality="item.quality"
                :level="item.gearLevel"
                :show-border="true"
                hideMask
                hideLevel
              ></GearImg>
            </div>
            <div class="ml-2">
              <div class="text-sm text-gray-500">{{ item.name }}</div>
              <div class="text-xs text-gray-400">{{ item.gearLevel }}</div>
            </div>
          </div>
        </div> -->
      </Block>
    </template>
  </GearMain>
</template>
<script setup lang="ts">
import GearMain from "~/components/GearMain/index.vue";
import BlockLine from "~/components/Gear/BlockLine.vue";
import Block from "~/components/Gear/Block.vue";
import type { Gear, GearData } from "~/types/gear";
import { GearNameMap } from "~/consts/wowItem";

const gearMainRef = ref<any>(null);

const weeklyList = ref<GearData[]>([]); // 低保装备列表 - 仅用于展示

function onParse(parseParams: any) {
  weeklyList.value = [];
  const gearData: Gear = parseParams.gearData;
  let combList: GearData[] = []; // 低保装备列表 - 用于生成组合

  Object.keys(gearData).forEach((key) => {
    gearData[key].forEach((item) => {
      if (item.slot == "weekly") {
        item.gearKey = key;
        item.isSelected = true;
        // 戒指和饰品在rings和trinkets中，不需要部位的
        if (
          key != "finger1" &&
          key != "finger2" &&
          key != "trinket1" &&
          key != "trinket2"
        ) {
          combList.push(item);
          weeklyList.value.push(item);
        }
      }
    });
  });

  gearMainRef.value?.generateSimpleCombinations(combList);
}

function onRun(runParams: any) {
  service.simc
    .run({ ...runParams, type: 4 })
    .then((res) => {
      gearMainRef.value.runSuccess(res);
      useRouter().push({
        path: "/gear/result/weekly",
        query: { id: res.id, fromType: "run" },
      });
    })
    .finally(() => {
      setTimeout(() => {
        gearMainRef.value?.stopRun();
      }, 3000);
    });
}
</script>
<style lang="scss" scoped></style>
