<template>
  <Layout :title="title">
    <template #head-right>
      <div class="flex items-center">
        <div
          v-if="sortTypeOptions?.length > 0 && bossSortList.length > 1"
          class="flex items-center gap-2"
        >
          <span>排序：</span>
          <TagRadio v-model="sortType" :options="sortTypeOptions"></TagRadio>
        </div>
        <slot name="head-right"></slot>
      </div>
    </template>
    <el-table
      :data="bossSortList"
      :show-header="false"
      style="width: 100%"
      row-key="id"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      :row-class-name="tableRowClassName"
    >
      <el-table-column
        label="推荐"
        align="center"
        v-if="bossSortList.length > 1"
      >
        <template #default="{ row }">
          <div class="flex flex-col">
            <span class="text-xl font-semibold text-themeGreen">{{
              row.priority
            }}</span>
            <span class="text-xs text-gray-400">推荐</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        v-if="dropType == 'raid'"
        label="boss"
        prop="name"
        :min-width="260"
      >
        <template #default="{ row }">
          <div class="flex items-center">
            <div class="w-[105px] h-[60px]">
              <img
                v-if="row.icon"
                :src="`${ossHost}/wow/images/EncounterJournal/orig/${row.icon}.png`"
                class="w-full h-full"
              />
            </div>
            <span>{{ getAllLocalValue(row.name) }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column v-else label="boss" prop="name" :width="150">
        <template #default="{ row }">
          <div class="flex items-center">
            <img
              v-if="row.icon"
              :src="`${ossHost}/wow/images/EncounterJournal/orig/${row.icon}.png`"
              class="w-[105px] h-[60px]"
            />
            <span>{{ getAllLocalValue(row.name) }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column :min-width="200">
        <template #default="{ row }">
          <div class="inline-flex flex-wrap gap-2">
            <div
              v-for="(item, index) in row.itemList.filter((v:any) => !v.isHide)"
              :key="index"
              :class="{ 'opacity-45': item.dps <= equippedRowDps }"
              class="flex flex-col items-center"
            >
              <div class="w-8">
                <GearImg :data="item.gearData" hide-level></GearImg>
              </div>
              <span
                :class="{
                  'text-green-400': parseInt(item.dps) > equippedRowDps,
                }"
                class="text-[10px]"
              >
                {{ getItemIncreaseRelative(item.dps) }}%</span
              >
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        v-if="['raid', 'mplus-chest'].includes(dropType)"
        label="预期提升"
        align="center"
        :width="110"
      >
        <template #default="{ row }">
          <div
            v-if="row.bestIncrease > 0"
            class="flex flex-col items-center text-base"
          >
            <IncreaseValue
              :value="row.expectedIncrease"
              :compare-value="equippedRowDps"
              :showPercent="showPercent"
            ></IncreaseValue>
            <span class="text-xs text-gray-400">预计提升</span>
          </div>
          <div v-else>-</div>
        </template>
      </el-table-column>
      <el-table-column label="最大提升" align="center" :width="110">
        <template #default="{ row }">
          <div
            v-if="row.bestIncrease > 0"
            class="inline-flex flex-col items-center text-base"
          >
            <IncreaseValue
              :value="row.bestIncrease"
              :compare-value="equippedRowDps"
              :showPercent="showPercent"
            ></IncreaseValue>
            <span class="text-xs text-gray-400">最大提升</span>
          </div>
          <div v-else>-</div>
        </template>
      </el-table-column>
    </el-table>
  </Layout>
</template>

<script setup lang="ts">
import Layout from "~/components/Result/Layout.vue";
import TagRadio from "~/components/TagRadio/index.vue";
import IncreaseValue from "./IncreaseValue.vue";
import { useJson } from "~/cool/hook/json";
import type { Encounter, Instance } from "~/types/instance";
import type { GearData } from "~/types/gear";
import { max, orderBy } from "lodash";
import { getAllLocalValue } from "~/cool/utils/language";
interface PropData {
  gearData: GearData;
  [key: string]: any;
}

interface DpsListItem extends PropData {
  dps: number;
}

const props = withDefaults(
  defineProps<{
    data: PropData[];
    showDrop?: boolean;
    instanceId: number;
    showPercent?: boolean;
    dropType?: string; // raid - 副本掉落 | mplus-chest - 史诗地下城 | catalyst - 赛季套装 | profession593 - 专业制造
  }>(),
  {
    totalTime: 300,
    metier: "dps",
    showDrop: true,
    showPercent: false,
  }
);

const ossHost = (import.meta as any).env.VITE_OSS_HOST;

const { json } = useJson(["instances"]);

const sortType = ref("priority:asc");

const title = computed(() => {
  const map: any = {
    raid: "BOSS-统计",
    "mplus-chest": "史诗地下城-统计",
    catalyst: "赛季套装-统计",
    profession593: "专业制造-统计",
  };
  return map[props.dropType] || "BOSS-统计";
});

const sortTypeOptions = computed(() => {
  if (props.dropType === "raid") {
    return [
      { label: "推荐", value: "priority:asc" },
      { label: "BOSS", value: "order:asc" },
      { label: "预计提升", value: "expectedIncrease:desc" },
      { label: "最大提升", value: "bestIncrease:desc" },
    ];
  }

  if (props.dropType?.startsWith("profession")) {
    return [
      { label: "推荐", value: "priority:asc" },
      { label: "专业", value: "order:asc" },
      { label: "预计提升", value: "expectedIncrease:desc" },
      { label: "最大提升", value: "bestIncrease:desc" },
    ];
  }

  return [];
});

const dpsList = computed<DpsListItem[]>(() => {
  return props.data.map((item) => ({
    ...item,
    dps: parseInt(item.mean),
  }));
});

const equippedRow = computed(() => {
  return dpsList.value.find((item) => item.isCurrentComb);
});

const equippedRowDps = computed(() => {
  return equippedRow.value?.dps || 0;
});

const bossList = computed(() => {
  return json.instances
    ?.find((item: Instance) => item.id === props.instanceId)
    ?.encounters.map((encounter: Encounter) => ({
      ...encounter,
      itemList: getEncounterItemList(encounter.id),
      expectedIncrease: getExpectedIncrease(getEncounterItemList(encounter.id)),
      bestIncrease: getBossIncreaseValue(getEncounterItemList(encounter.id)),
    }))
    .sort((a: any, b: any) => b.expectedIncrease - a.expectedIncrease)
    .map((item: any, index: number) => ({
      ...item,
      priority: index + 1,
    }))
    .filter((item: any) => item.itemList.length > 0);
});

// 排序后的boss列表
const bossSortList = computed(() => {
  const [sortKey, type] = sortType.value.split(":");

  return orderBy(bossList.value, sortKey, type as "asc" | "desc");
});

const tableRowClassName = () => {
  return "dark-row";
};

// 获取boss的装备列表 - 过滤掉隐藏的（输出低的）
function getEncounterItemList(encounterId: number) {
  return dpsList.value.filter(
    (item) =>
      item.gearData?.sources?.some(
        (source) => source.encounterId === encounterId
      ) && !item.isHide
  );
}

// 获取装备相对于当前装备的提升百分比
function getItemIncreaseRelative(
  value: number,
  sourceValue: number = equippedRowDps.value
) {
  return ((getDpsIncrease(value, sourceValue) / sourceValue) * 100).toFixed(1);
}

// 获取装备相对于当前装备的提升数值
function getDpsIncrease(
  value1: number,
  value2: number = equippedRowDps.value || 0
) {
  return value1 - value2;
}

function getIncreaseValues(itemList: DpsListItem[]) {
  return itemList
    .map((item) => {
      return getDpsIncrease(item.dps);
    })
    .filter((item) => item > 0);
}

// 获取最大提升值
function getBossIncreaseValue(itemDpsList: any[]) {
  return max(getIncreaseValues(itemDpsList));
}

// 获取预期提升
function getExpectedIncrease(itemDpsList: any[]) {
  let length = itemDpsList.length;
  if (length === 0) return 0;
  return (
    getIncreaseValues(itemDpsList).reduce((prev, next) => prev + next, 0) /
    length
  );
}
</script>

<style>
.damage-table {
  --el-table-bg-color: transparent !important;
  --el-table-tr-bg-color: transparent !important;
  --el-table-header-bg-color: #1a1a1a !important;
  --el-table-border-color: #2a2a2a !important;
  --el-table-header-text-color: #ffffff !important;
  --el-table-current-row-bg-color: rgba(255, 255, 255, 0.05) !important;
}

.dark-row {
  background-color: transparent !important;
}

.dark-row:hover > td {
  background-color: rgba(255, 255, 255, 0.05) !important;
}
</style>
