<template>
  <div>
    <el-table
      :data="tableList"
      :show-header="false"
      style="width: 100%"
      row-key="id"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      :row-class-name="tableRowClassName"
      highlight-current-row
      max-height="600px"
      class="damage-table"
      @current-change="handleCurrentChange"
    >
      <el-table-column label="空白" align="center" width="50"></el-table-column>
      <el-table-column label="装备" align="center" :width="100">
        <template #default="{ $index }">
          <div class="flex items-center justify-center gap-2">
            <!-- <div>
              <span>第</span>
              <span>{{ rankValueList[$index] }}</span>
            </div> -->
            <div>
              <!-- <span>第</span> -->
              <span>{{ $index + 1 }}</span>
            </div>
            <!-- 金牌 -->
            <SvgIcon
              v-if="$index == 0"
              name="jiangbei"
              class="text-xl text-[#F8C51C]"
            ></SvgIcon>
            <!-- 银牌 -->
            <SvgIcon
              v-if="$index == 1"
              name="jiangbei"
              class="text-xl text-[#B0B0B0]"
            ></SvgIcon>
            <!-- 铜牌 -->
            <SvgIcon
              v-if="$index == 2"
              name="jiangbei"
              class="text-xl text-[#A67D3D]"
            ></SvgIcon>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="装备" align="right" :width="260">
        <template #default="{ row }">
          <div class="text-center">
            <ItemCard
              v-if="row?.gearData?.id"
              :data="row.gearData"
              showSlot
              :slotName="getSlotName(row.name.split('/')[0])"
            ></ItemCard>
            <span v-else class="font-bold text-themeGreen">{{ row.name }}</span>
          </div>
        </template>
      </el-table-column>

      <el-table-column label="输出" align="left" :width="110">
        <template #default="{ row }">
          <div :style="{ color: metierInfo.namecolor }" class="text-base">
            {{ formatDpsValue(row.mean, 2, true) }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="伤害差值" align="left" :width="100">
        <template #default="{ row }">
          <div class="text-base">
            <Increase
              :dps1="currentRowDps"
              :dps2="row.mean"
              :showPercent="showPercent"
            ></Increase>
          </div>
        </template>
      </el-table-column>
      <el-table-column v-if="showDrop" label="掉落">
        <template #default="{ row }">
          <div v-if="row.gearData?.sources" class="flex gap-1">
            <span
              v-for="(item, index) in formatSourceEnterNameList(
                row.gearData.sources
              )"
              :key="index"
            >
              {{ item }}
            </span>
          </div>
        </template>
      </el-table-column>
      <!-- <el-table-column v-if="!showAllList" label="隐藏数量">
        <template #default="{ row }">
          <div v-if="row.hideCount > 0">{{ row.hideCount }}</div>
        </template>
      </el-table-column> -->
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { formatDpsValue } from "~/cool/utils/dps";
import Increase from "./Increase.vue";
import ItemCard from "../GearDrop/ItemCard.vue";
import { getEncounter, getSlotNameByKey } from "~/cool/simc";
import { getAllLocalValue } from "~/cool/utils/language";
import { useJson } from "~/cool/hook/json";
const { json } = useJson(["metier"]);
const props = withDefaults(
  defineProps<{
    data: any[];
    showDrop?: boolean;
    metier?: string;
    showPercent?: boolean;
    showAllList?: boolean;
  }>(),
  {
    totalTime: 300,
    showDrop: true,
    showPercent: true,
    showAllList: false,
  }
);

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

const currentRow = ref();

const tableList = computed(() => {
  return props.showAllList
    ? props.data
    : props.data.filter((item) => !item.isHide);
});

const currentRowDps = computed(() => {
  return currentRow.value?.mean;
});

const metierInfo = computed(() => {
  return json.metier?.find((item: any) => item.namenick === props.metier) || {};
});

watch(
  () => props.data,
  () => {
    if (props.data?.length > 0) {
      const currentGearRow = props.data.find((item) => item.isCurrentComb);
      currentRow.value = currentGearRow;
    }
  },
  { immediate: true }
);

const handleCurrentChange = (val: any) => {
  currentRow.value = val;
};

const tableRowClassName = () => {
  return "dark-row";
};

function getSlotName(key: string) {
  return getSlotNameByKey(key);
}

function getEnterName(encounterId: number, instanceId: number) {
  return getEncounter(encounterId, instanceId)?.name;
}

function formatSourceEnterNameList(
  sources: { encounterId: number; instanceId: number }[]
) {
  let nameList = sources.map((item) => {
    return getAllLocalValue(getEnterName(item.encounterId, item.instanceId));
  });
  return [...new Set(nameList)];
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
