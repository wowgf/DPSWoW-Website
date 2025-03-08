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
            <nuxt-link to="/gear/weight"
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
        <TopAction backPath="/gear/weight"></TopAction>
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
                    v-if="record?.combinations && record.combinations[0] && record.combinations[0][key]"
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
          <div :class="{ '!w-full': isMobile }" class="mt-3 bg-[#171B25] p-2">
            <div class="mb-3">
              <TalentsName
                :list="talentsList"
                :value="bestTalents"
              ></TalentsName>
            </div>
            <TalentDisplay :talentStr="bestTalents">
              <template #name> </template>
            </TalentDisplay>
          </div>
          <a-row :gutter="16">
            <a-col :xs="24" :lg="12">
              <Layout title="属性权重">
                <div v-if="scaleFactors.Mastery" class="p-5">
                  <a-descriptions :column="1">
                    <a-descriptions-item
                      v-for="(item, index) in statWeights"
                      :key="index"
                      :label="item.name"
                    >
                      <div class="stat-value-text">
                        {{ item.value.toFixed(2) }}
                      </div>
                    </a-descriptions-item>
                    <a-descriptions-item
                      v-if="scaleFactors.Wdps"
                      label="武器伤害"
                    >
                      <div class="stat-value-text">
                        {{ scaleFactors.Wdps.toFixed(2) }}
                      </div>
                    </a-descriptions-item>
                  </a-descriptions>
                  <div class="mt-1 text-sm text-gray-400">
                    Tips：每一点{{ statWeights[0].name }}平均增加{{
                      statWeights[0].value.toFixed(2)
                    }}点DPS
                  </div>
                </div>
              </Layout>
            </a-col>
          </a-row>
          <a-row :gutter="16">
            <a-col :xs="24" :lg="24">
              <Layout title="Pawn字符">
                <div class="p-3">
                  <div>{{ pawnStr }}</div>
                  <div class="mt-3">
                    <a-checkbox v-model="pawnState.name" class="mb-2 mr-4">
                      角色名
                    </a-checkbox>
                    <a-checkbox v-model="pawnState.spec" class="mb-2 mr-4">
                      专精
                    </a-checkbox>
                    <a-checkbox
                      v-model="pawnState.fightStyle"
                      class="mb-2 mr-4"
                    >
                      战斗方式
                    </a-checkbox>
                    <a-checkbox v-model="pawnState.date" class="mb-2 mr-4">
                      日期
                    </a-checkbox>
                    <a-checkbox v-model="pawnState.format"> 格式化 </a-checkbox>
                  </div>
                  <div class="mt-2">
                    <a-button long @click="copyPawnStr()">{{
                      copyText1
                    }}</a-button>
                  </div>
                </div>
              </Layout>
            </a-col>
          </a-row>
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
import { formatDpsValue } from "@/cool/utils/dps";
import TrendingUp from "~/components/Icon/TrendingUp.vue";
import Layout from "~/components/Result/Layout.vue";
import SimcDetail from "~/components/Result/SimcDetail.vue";
import TalentsName from "~/components/Gear/TalentsName.vue";
import TalentDisplay from "~/components/TalentTree/TalentDisplay.vue";
import TopAction from "~/components/Result/TopAction.vue";
import MiniCode from "~/components/Result/MiniCode.vue";

import { metierColorMap } from "~/consts/wowData";
import {
  getMetier,
  getRace,
  getSpec,
  getMetierNameByInfo,
} from "~/cool/utils/wow";
import { useResult } from "./result";

const {
  getRecord,
  loading,
  record,
  queue,
  errorMessage,
  bestDps,
  bestDpsIncrease,
  tableHeadOptions,
  talentsList,
  bestTalents,
  buffsConstantList,
  isMobile,
  scaleFactors,
  statWeights,
  pawnState,
  pawnStr,
  rawResult,
} = useResult();

const id = useRoute().query.id;
const copyText1 = ref("复制字符");

getRecord(id);

function copyPawnStr() {
  copy(pawnStr.value);
  copyText1.value = "已复制";
  setTimeout(() => {
    copyText1.value = "复制字符";
  }, 1000);
}
</script>

<style lang="scss" scoped>
.page--gear-result {
  .stat-value-text {
    // color: #f6e05e;
    text-align: right;
  }
}
</style>
