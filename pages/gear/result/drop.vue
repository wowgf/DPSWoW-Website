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
          <a-spin class="mr-2" /> 当前模块运算数据量大，请耐心等待1-3分钟...
        </div>
        <a-empty v-if="record.status == 9">
          <template #image>
            <icon-exclamation-circle-fill />
          </template>
          <div>
            <span>运行失败，</span>
            <nuxt-link to="/gear/drop"
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
        <TopAction backPath="/gear/drop"></TopAction>
      </div>
      <div :class="isMobile ? 'flex flex-col' : 'flex justify-between'">
        <div :class="isMobile ? 'w-full' : 'flex-1'" class="overflow-hidden">
          <div class="bg-[#171B25] p-4 flex justify-between relative">
            <div
              class="absolute flex items-center cursor-pointer top-4 right-4"
            >
              <div v-if="!isMobile" class="flex items-center ml-3">
                <TopAction backPath="/gear/drop"></TopAction>
              </div>
            </div>

            <div>
              <div
                :style="{
                  color: metierColorMap[record.playerInfo.metier]?.color,
                }"
                class="flex items-baseline text-slate-300"
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
              <div class="mt-3">
                <DropInfo :data="dropParams"></DropInfo>
              </div>
              <div class="mt-2">
                <div
                  v-for="(key, index) in tableHeadOptions"
                  :key="index"
                  class="icon-box h-[25px] w-[25px] z-1 relative inline-flex mr-2"
                >
                  <GearImg
                    v-if="combinations[0] && combinations[0][key]"
                    :src="
                      combinations[0][key].iconUrl ||
                      combinations[0][key].icon_url
                    "
                    :data="combinations[0][key]"
                    :quality="combinations[0][key].quality"
                    :level="combinations[0][key].gearLevel"
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
          <BossRank
            :data="dpsResultList"
            :instance-id="instanceId"
            :dropType="dropType"
            :showPercent="showPercent"
          >
            <template #head-right>
              <div class="ml-5">
                <a-checkbox v-model="showPercent">百分比DPS</a-checkbox>
              </div>
            </template>
          </BossRank>
          <Layout title="掉落输出排行">
            <template #head-right>
              <div>
                <!-- <a-checkbox v-model="showAllList">展示全部</a-checkbox> -->
                <a-checkbox v-model="showPercent">百分比DPS</a-checkbox>
              </div>
            </template>
            <DropRank
              :data="dpsResultList"
              :metier="playerInfo.metier"
              :showPercent="showPercent"
              :showAllList="showAllList"
            ></DropRank>
          </Layout>
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
import DropRank from "~/components/Result/DropRank.vue";
import BossRank from "~/components/Result/BossRank.vue";
import Layout from "~/components/Result/Layout.vue";
import TalentsName from "~/components/Gear/TalentsName.vue";
import TalentDisplay from "~/components/TalentTree/TalentDisplay.vue";
import TopAction from "~/components/Result/TopAction.vue";
import DropInfo from "~/components/Result/DropInfo.vue";
import SimcDetail from "~/components/Result/SimcDetail.vue";
import MiniCode from "~/components/Result/MiniCode.vue";

import { useDict } from "~/cool";
import { metierColorMap } from "~/consts/wowData";
import {
  getMetier,
  getRace,
  getSpec,
  getMetierNameByInfo,
} from "~/cool/utils/wow";
import { useJson } from "~/cool/hook/json";
const {} = useJson(["instances"]);
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
  getGearData,
} = useResult();

const id = useRoute().query.id;

const showPercent = ref(false);

const showAllList = ref(false);

const dropParams = computed(() => {
  return record.value?.params;
});

const dropType = computed(() => {
  return record.value?.params?.dropType;
});

const instanceId = computed(() => {
  return record.value?.params?.instanceId;
});

// 输出结果
const dpsResultList = computed(() => {
  if (record.value.status != 3) return [];
  let list = [
    {
      ...rawResult.value?.sim?.statistics?.raid_dps,
      name: "自身装配",
      isCurrentComb: true,
    }, // 当前装备的组合的dps
    ...(rawResult.value?.sim?.profilesets?.results || []), // 其他组合的dps
  ]
    .map((item) => ({
      ...item,
      // gearData: getGearData(item.name.split("/")[2]),
      gearData: getGearData(item.name),
      // comboOption: record.value.combinations[item.name.split(" ")[1] - 1] || {},
      // comboIndex: item.name.split(" ")[1] - 1,
      increaseDps: item.mean - rawResult.value?.sim?.statistics?.raid_dps.mean, // 提升的数值
    }))
    .map((value, index, array) => {
      // 判断是否有比当前装备高的
      let sameList = array.some(
        (v) =>
          parseInt(v.mean) > parseInt(value.mean) &&
          v.gearData?.itemId == value?.gearData?.itemId
      );
      // 查询比当前装备低的数量
      let lowerCount = array.filter(
        (v) =>
          parseInt(v.mean) < parseInt(value.mean) &&
          v.gearData?.itemId == value?.gearData?.itemId
      ).length;
      return {
        ...value,
        isHide: sameList,
        hideCount: lowerCount,
      };
    })

    .sort((a, b) => b.mean - a.mean);
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
