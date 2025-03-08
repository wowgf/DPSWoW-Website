<template>
  <Container class="h-full">
    <template v-if="!loading">
      <div
        v-if="errorMessage"
        class="bg-[#171B25] flex items-center px-3 justify-center h-full"
      >
        <a-empty :description="errorMessage" />
      </div>
      <div
        v-if="record.status !== 3 && !errorMessage"
        class="bg-[#171B25] flex items-center px-3 justify-center h-full"
      >
        <div v-if="record.status == 1" class="text-base text-slate-100">
          排队中，前面还有{{
            queue.position - 1 > 0 ? queue.position - 1 : 1
          }}人，请耐心等待
        </div>

        <div
          v-if="record.status == 2"
          class="flex items-center text-base text-slate-100"
        >
          <a-spin class="mr-2" /> 服务器正在运算中，请等待...
        </div>

        <a-empty v-if="record.status == 9">
          <template #image>
            <icon-exclamation-circle-fill />
          </template>
          <div>
            <span>运行失败，</span>
            <nuxt-link to="/gear/quick"
              ><span class="cursor-pointer text-themeGreen"
                >请重试</span
              ></nuxt-link
            >
          </div>
        </a-empty>
      </div>
    </template>

    <div
      v-if="record.status == 3"
      :class="isMobile ? 'pb-10' : 'pb-20 page--gear-result'"
    >
      <div v-if="isMobile" class="flex items-center mb-3">
        <TopAction backPath="/gear/weekly"></TopAction>
      </div>
      <div :class="isMobile ? 'flex flex-col' : 'flex justify-between'">
        <div :class="isMobile ? 'w-full' : 'flex-1 overflow-hidden'">
          <div class="bg-[#171B25] p-4 flex justify-between relative">
            <div
              class="absolute flex items-center cursor-pointer top-4 right-4"
            >
              <div v-if="!isMobile" class="flex items-center ml-3">
                <TopAction backPath="/gear/weekly"></TopAction>
              </div>
            </div>
            <div>
              <div class="flex">
                <div class="flex text-3xl font-bold text-themeGreen dps-wrap">
                  <span>DPS：</span>
                  <span class="mr-1">
                    {{ formatDpsValue(bestDps.mean) }} 万
                  </span>
                </div>
                <div
                  v-if="bestDpsIncrease > 0"
                  className="flex items-center bg-green-500/20 rounded-lg px-2 py-2 ml-2"
                >
                  <TrendingUp />
                  <span className="text-green-400 font-semibold">
                    +{{ formatDpsValue(bestDpsIncrease) }} 万
                  </span>
                </div>
              </div>
              <div class="mt-1">
                <span class="text-sm text-slate-300">🥇最佳输出</span>
              </div>
              <div
                :style="{
                  color: metierColorMap[record.playerInfo.metier]?.color,
                }"
                class="flex items-baseline mt-2 text-slate-300"
              >
                <span class="text-xl font-bold">{{
                  record.playerInfo?.playerName
                }}</span>
                <div class="ml-2 text-sm">
                  <span>{{ getRace(record.playerInfo.race) }}</span>
                  <span class="mx-1">/</span>
                  <span>
                    {{
                      getMetier(
                        getMetierNameByInfo(record.playerInfo as any) as any
                      )
                    }}
                  </span>
                  <span class="mx-1">/</span>
                  <span>{{ getSpec(record.playerInfo.spec) }}</span>
                </div>
              </div>
              <div class="mt-2">
                <div
                  v-for="(key, index) in tableHeadOptions"
                  :key="index"
                  class="icon-box h-[25px] w-[25px] z-1 relative inline-flex mr-2"
                >
                  <GearImg
                    v-if="
                      record?.combinations &&
                      record?.combinations[0] &&
                      record.combinations[0][key]
                    "
                    :src="
                      record.combinations[0][key].iconUrl ||
                      record.combinations[0][key].icon_url
                    "
                    :data="record.combinations[0][key]"
                    :quality="record.combinations[0][key].quality"
                    :level="record.combinations[0][key].gearLevel"
                    :show-border="false"
                    hideMask
                    hideLevel
                  ></GearImg>
                </div>
              </div>
            </div>
          </div>
          <!-- 如果最佳提升大于0显示推荐装备 -->
          <div
            v-if="bestDpsIncrease > 0"
            class="mt-3 bg-[#171B25] p-5 flex items-center"
          >
            <span class="mr-3 text-xl font-bold text-orange-500">推荐选择</span>
            <div
              v-for="(item, index) in bestGearList"
              :key="index"
              class="relative flex items-center w-[230px] py-2 px-3 overflow-hidden border border-themeGreen rounded cursor-pointer bg-slate-900"
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
                <div class="text-sm text-gray-300">
                  {{ item.name }}
                </div>
                <div class="text-xs text-gray-400">
                  {{ item.gearLevel }}
                </div>
              </div>
            </div>
            <div class="ml-3 text-xl font-black">
              <span class="ml-1 text-themeGreen">
                伤害提升{{ formatDpsValue(bestDpsIncrease) }} 万</span
              >
            </div>
          </div>
          <div
            v-if="bestDpsIncrease <= 0"
            class="mt-3 bg-[#171B25] p-5 py-6 flex items-center text-xl font-black text-orange-500"
          >
            没有更好的低保装备，伤害无提升
          </div>
          <template v-if="rawResult">
            <Layout title="装备收益排行">
              <GearRank :dpsResultList="dpsResultList"></GearRank>
            </Layout>

            <Layout title="伤害分析">
              <DamageBreakdown
                :list="damageList"
                :metier="getMetierNameByInfo(record.playerInfo)"
              ></DamageBreakdown>
            </Layout>

            <Layout title="Buff持续时间">
              <BuffUptime
                :list="buffList"
                :metier="getMetierNameByInfo(record.playerInfo)"
              ></BuffUptime>
            </Layout>

            <Layout title="战斗日志">
              <SampleAbilityLog
                :pre-pull-actions="prePullActions"
                :pull-actions="pullActions"
              ></SampleAbilityLog>
            </Layout>
          </template>
        </div>
        <div :class="isMobile ? 'w-full mt-3' : 'ml-3 w-[280px]'">
          <SimcDetail
            :record="record"
            :rawResult="rawResult"
            :buffsConstantList="buffsConstantList"
          ></SimcDetail>
          <MiniCode class="mt-3"></MiniCode>
        </div>
      </div>
    </div>
  </Container>
</template>

<script setup lang="ts">
import { QualityColorMap } from "~/consts/quality";
import { formatDpsValue } from "@/cool/utils/dps";
import TrendingUp from "~/components/Icon/TrendingUp.vue";
import TopAction from "~/components/Result/TopAction.vue";
import GearRank from "~/components/Result/GearRank.vue";
import DamageBreakdown from "~/components/Result/DamageBreakdown.vue";
import BuffUptime from "~/components/Result/BuffUptime.vue";
import ShareBtn from "~/components/Result/ShareBtn.vue";
import SampleAbilityLog from "~/components/Result/SampleAbilityLog.vue";
import Layout from "~/components/Result/Layout.vue";
import TalentsName from "~/components/Gear/TalentsName.vue";
import TalentDisplayFlow from "~/components/TalentTree/TalentDisplayFlow.vue";
import TalentDisplay from "~/components/TalentTree/TalentDisplay.vue";
import SimcDetail from "~/components/Result/SimcDetail.vue";
import MiniCode from "~/components/Result/MiniCode.vue";

import { useDict } from "~/cool";
import { metierColorMap } from "~/consts/wowData";
import {
  wowContent,
  parseDocument,
  getMetier,
  getRace,
  getRole,
  getSpec,
  getMetierNameByInfo,
  getTalentsInfoByValue,
  checkDefaultTalents,
} from "~/cool/utils/wow";
import { CONFIRM_VERIFICATION_CODE } from "~/consts/trackEvent";
import { useAppStore } from "~/store/app";
import axios from "axios";
import { useWowDataStore } from "~/store/wowData";

import { useResult } from "./result";

const {
  getRecord,
  loading,
  record,
  queue,
  errorMessage,
  bestDps,
  bestDpsIncrease,
  playerInfo,
  tableHeadOptions,
  talentsList,
  bestTalents,
  options,
  bestComb,
  dpsResultList,
  damageList,
  buffList,
  prePullActions,
  pullActions,
  buffsConstantList,
  rawResult,
  selectCombIndex,
  selectComb,
  isCurrentComb,
  getNameByValue,
  isMobile,
  qualityColor,
  combinations,
} = useResult();

const id = useRoute().query.id;

// 最佳装备
const bestGearList = computed(() => {
  let list: any[] = [];
  Object.keys(bestComb.value).forEach((key) => {
    if (bestComb.value[key].isSelected) {
      list.push(bestComb.value[key]);
    }
  });
  return list;
});

getRecord(id);
</script>

<style lang="scss" scoped>
.page--gear-result {
  .desc-value {
  }
}
</style>
