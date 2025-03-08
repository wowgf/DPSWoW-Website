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
        <!-- <a-empty
          v-if="record.status == 1"
          :description="`排队中，前面还有${queue.position}人，请耐心等待`"
        >
          <template #image>
            <div class="mb-5"></div>
          </template>
        </a-empty> -->
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

        <!-- <div
          v-if="record.status == 9"
          class="flex items-center text-base text-slate-100"
        >
          <span>运行失败</span>
          <nuxt-link to="/gear"
            ><span class="cursor-pointer text-themeGreen"
              >请重试</span
            ></nuxt-link
          >
        </div> -->
        <a-empty v-if="record.status == 9">
          <template #image>
            <icon-exclamation-circle-fill />
          </template>
          <div>
            <span>运行失败，</span>
            <nuxt-link to="/gear"
              ><span class="cursor-pointer text-themeGreen"
                >请重试</span
              ></nuxt-link
            >
          </div>
        </a-empty>
        <!-- <a-empty
          v-if="record.status == 2"
          description="服务器正在运算中，请等待..."
        >
          <template #image>
            <div class="mb-5"></div>
          </template>
        </a-empty> -->
      </div>
    </template>
    <div
      v-if="record.status == 3"
      :class="isMobile ? 'pb-10' : 'pb-20 page--gear-result'"
    >
      <div v-if="isMobile" class="flex items-center mb-3">
        <TopAction backPath="/gear"></TopAction>
      </div>
      <div :class="isMobile ? 'flex flex-col' : 'flex justify-between'">
        <div :class="isMobile ? 'w-full' : 'flex-1 overflow-hidden'">
          <div class="bg-[#171B25] p-4 flex justify-between relative">
            <div
              class="absolute flex items-center cursor-pointer top-4 right-4"
            >
              <div v-if="!isMobile" class="flex items-center ml-3">
                <TopAction backPath="/gear"></TopAction>
              </div>
            </div>
            <div>
              <div class="flex">
                <div class="flex text-3xl font-bold text-themeGreen dps-wrap">
                  <span>DPS：</span>
                  <span class="mr-1">
                    {{ formatDpsValue(bestDps.mean) }}
                  </span>
                </div>
                <div
                  v-if="bestDpsIncrease > 0"
                  className="flex items-center bg-green-500/20 rounded-lg px-2 py-2 ml-2"
                >
                  <TrendingUp />
                  <span className="text-green-400 font-semibold">
                    +{{ formatDpsValue(bestDpsIncrease) }}
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
              <!-- <div class="mt-2 text-sm text-slate-300">
                <span>{{ getRace(record.playerInfo.race) }}</span>
                <span class="mx-1">/</span>
                <span>
                  {{ getMetier(getMetierNameByInfo(record.playerInfo)) }}
                </span>
                <span class="mx-1">/</span>
                <span>{{ getSpec(record.playerInfo.spec) }}</span>
              </div> -->
              <!-- <div class="mt-1">
                <span class="text-base text-slate-300">🥇最佳输出</span>
              </div> -->
            </div>
          </div>
          <!-- <div
            v-if="bestTalents"
            :class="{ '!w-full': isMobile }"
            class="mt-3 bg-[#171B25]"
          >
            <TalentDisplayFlow :talentStr="bestTalents">
              <template #name>
                <TalentsName
                  :list="talentsList"
                  :value="bestTalents"
                  hide-label
                  class="mr-3"
                ></TalentsName>
              </template>
            </TalentDisplayFlow>
          </div> -->
          <div
            v-if="
              bestTalents &&
              dpsResultList.length > 1 &&
              !checkDefaultTalents(talentsList, bestTalents)
            "
            :class="{ '!w-full': isMobile }"
            class="mt-3 bg-[#171B25] p-2"
          >
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

          <div
            class="mt-3 gear-wrap bg-[#171B25] py-4 px-5 flex justify-between flex-wrap"
          >
            <div class="flex-1 overflow-hidden">
              <div
                class="flex justify-center mb-3 text-lg font-semibold text-themeGreen"
              >
                🏆最佳组合
              </div>
              <a-row :gutter="20">
                <a-col :span="isMobile ? 24 : 12">
                  <div
                    v-for="(key, index) in options[0]"
                    :key="index"
                    :class="{
                      'border-[1px] border-solid border-green-500 rounded bg-[#152218]':
                        bestComb && bestComb[key]?.isSelected,
                    }"
                    class="flex items-center gear-line h-[55px] mb-2"
                  >
                    <div
                      class="current-gear h-[50px] w-[60px] relative flex justify-center items-center"
                    >
                      <div
                        class="icon-box h-[43px] w-[43px] z-10 relative inline-flex"
                      >
                        <GearImg
                          v-if="bestComb && bestComb[key]"
                          :level="bestComb[key].gearLevel"
                          :data="bestComb[key]"
                          hideLevel
                        ></GearImg>
                      </div>
                    </div>
                    <div v-if="bestComb && bestComb[key]" class="px-2">
                      <div
                        :style="{ color: qualityColor[bestComb[key]?.quality] }"
                        class="name"
                      >
                        {{ bestComb[key].gearName }}
                      </div>
                      <div class="mt-2 name">{{ bestComb[key].gearLevel }}</div>
                    </div>
                    <div
                      v-if="bestComb && bestComb[key]?.isSelected"
                      class="flex justify-end flex-1 px-3 font-bold text-red-400"
                    >
                      更好
                    </div>
                  </div>
                </a-col>

                <a-col :span="isMobile ? 24 : 12">
                  <div
                    v-for="(key, index) in options[1]"
                    :key="index"
                    :class="{
                      'border-[1px] border-solid border-green-500 rounded bg-[#152218]':
                        bestComb && bestComb[key]?.isSelected,
                    }"
                    class="flex items-center gear-line h-[55px] justify-end mb-2"
                  >
                    <div
                      v-if="bestComb && bestComb[key]?.isSelected"
                      class="flex justify-start flex-1 px-3 font-bold text-red-400"
                    >
                      更好
                    </div>
                    <div v-if="bestComb && bestComb[key]" class="px-2 text-end">
                      <div
                        :style="{ color: qualityColor[bestComb[key]?.quality] }"
                        class="name"
                      >
                        {{ bestComb[key].gearName }}
                      </div>
                      <div class="mt-2 name">{{ bestComb[key].gearLevel }}</div>
                    </div>
                    <div
                      class="current-gear h-[50px] w-[60px] relative flex justify-center items-center"
                    >
                      <div
                        class="icon-box h-[43px] w-[43px] z-10 relative inline-flex"
                      >
                        <GearImg
                          v-if="bestComb && bestComb[key]"
                          :level="bestComb[key].gearLevel"
                          :data="bestComb[key]"
                          hideLevel
                        ></GearImg>
                      </div>
                    </div>

                    <!-- 除了gearData[item]中第0个之后的数据 -->
                  </div>
                </a-col>
              </a-row>
              <a-row class="mt-3">
                <a-col :span="isMobile ? 24 : 12">
                  <div class="flex justify-end">
                    <div
                      :class="{
                        'border-[1px] border-solid border-green-500 rounded bg-[#152218]':
                          bestComb && bestComb['main_hand']?.isSelected,
                      }"
                      class="inline-flex items-center gear-line h-[50px] justify-end"
                    >
                      <div
                        v-if="bestComb && bestComb['main_hand']?.isSelected"
                        class="flex justify-start flex-1 px-3 font-bold text-red-400"
                      >
                        更好
                      </div>
                      <div
                        v-if="bestComb && bestComb['main_hand']"
                        class="px-2 text-end"
                      >
                        <div
                          :style="{
                            color: qualityColor[bestComb['main_hand']?.quality],
                          }"
                          class="name"
                        >
                          {{ bestComb["main_hand"].gearName }}
                        </div>
                        <div class="mt-2 name">
                          {{ bestComb["main_hand"].gearLevel }}
                        </div>
                      </div>
                      <div
                        class="current-gear h-[50px] w-[60px] relative flex justify-center items-center"
                      >
                        <div
                          class="icon-box h-[43px] w-[43px] z-10 relative inline-flex"
                        >
                          <GearImg
                            v-if="bestComb && bestComb['main_hand']"
                            :level="bestComb['main_hand'].gearLevel"
                            :data="bestComb['main_hand']"
                            hideLevel
                          ></GearImg>
                        </div>
                      </div>
                    </div>
                  </div>
                </a-col>
                <a-col :span="isMobile ? 24 : 12">
                  <div class="flex">
                    <div
                      :class="{
                        'border-[1px] border-solid border-green-500 rounded bg-[#152218]':
                          bestComb && bestComb['off_hand']?.isSelected,
                      }"
                      class="inline-flex items-center gear-line h-[50px] justify-end ml-3"
                    >
                      <div
                        class="current-gear h-[50px] w-[60px] relative flex justify-center items-center"
                      >
                        <div
                          class="icon-box h-[43px] w-[43px] z-10 relative inline-flex"
                        >
                          <GearImg
                            v-if="bestComb && bestComb['off_hand']"
                            :level="bestComb['off_hand'].gearLevel"
                            :data="bestComb['off_hand']"
                            hideLevel
                          ></GearImg>
                        </div>
                      </div>
                      <div v-if="bestComb && bestComb['off_hand']" class="px-2">
                        <div
                          :style="{
                            color: qualityColor[bestComb['off_hand']?.quality],
                          }"
                          class="name"
                        >
                          {{ bestComb["off_hand"].gearName }}
                        </div>
                        <div class="mt-2 name">
                          {{ bestComb["off_hand"].gearLevel }}
                        </div>
                      </div>
                      <div
                        v-if="bestComb && bestComb['off_hand']?.isSelected"
                        class="flex justify-start flex-1 px-3 font-bold text-red-400"
                      >
                        更好
                      </div>
                    </div>
                  </div>
                </a-col>
              </a-row>
            </div>
          </div>
          <div
            class="mt-10 bg-[#171B25] border-solid border-2 rounded-lg border-[#66656A]"
          >
            <div class="bg-[#66656A] px-5 py-2 text-base">配装输出排行</div>
            <div class="comb-body">
              <table class="w-full">
                <thead>
                  <tr>
                    <th class="w-[300px]"></th>
                    <th class="w-[100px]"></th>
                    <th class="w-[100px]"></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(
                      { comboOption: item, mean }, index
                    ) in dpsResultList"
                    :key="index"
                    :class="{ 'bg-[#1E222E]': index == selectCombIndex }"
                    class="h-[50px] border-b-[1px] border-gray-500 last:border-0 cursor-pointer"
                    @click="selectComb(item, index)"
                  >
                    <td
                      v-if="isCurrentComb(item)"
                      class="flex justify-end w-auto py-2"
                    >
                      <div
                        class="h-[40px] w-full inline-flex items-center justify-between text-slate-200"
                      >
                        <div></div>
                        <div>
                          <span class="mr-1 font-bold text-themeGreen">-</span>
                          <span>自身装配</span>
                        </div>
                      </div>
                    </td>
                    <td v-else class="flex justify-end py-2">
                      <template
                        v-for="gearKey in tableHeadOptions"
                        :key="gearKey"
                      >
                        <div
                          v-if="item[gearKey] && item[gearKey].isSelected"
                          class="w-[40px] h-40px ml-3"
                        >
                          <GearImg
                            :src="
                              item[gearKey]?.iconUrl || item[gearKey]?.icon_url
                            "
                            :quality="item[gearKey]?.quality"
                            :level="item[gearKey]?.gearLevel"
                            :data="item[gearKey]"
                            full-mask
                          ></GearImg>
                        </div>
                      </template>
                    </td>
                    <td class="text-center">
                      <span class="mr-2 text-yellow-600">{{
                        formatDpsValue(mean)
                      }}</span>
                      <!-- <span class="text-yellow-600">万</span> -->
                    </td>
                    <td class="text-start">
                      <span v-if="index == selectCombIndex">-</span>
                      <div
                        v-else
                        :class="{
                          'text-green-400':
                            mean - dpsResultList[selectCombIndex]?.mean > 0,
                          'text-red-400':
                            mean - dpsResultList[selectCombIndex]?.mean < 0,
                        }"
                      >
                        <span
                          v-if="mean - dpsResultList[selectCombIndex].mean > 0"
                          >+</span
                        >
                        <span>
                          {{
                            (
                              mean - dpsResultList[selectCombIndex].mean
                            ).toFixed(0)
                          }}
                        </span>
                      </div>
                    </td>
                    <td>
                      <div class="flex">
                        <div class="text-green-400 w-[160px]">
                          <span v-if="index == 0">🥇最佳搭配组合</span>
                        </div>
                        <div>
                          <TalentsName
                            :list="talentsList"
                            :value="item.talents"
                          ></TalentsName>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <template v-if="rawResult">
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
} = useResult();

const id = useRoute().query.id;

getRecord(id);
</script>

<style lang="scss" scoped>
.page--gear-result {
  .desc-value {
  }
}
</style>
