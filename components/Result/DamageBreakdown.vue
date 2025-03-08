<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%"
      row-key="id"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      :row-class-name="tableRowClassName"
      class="damage-table"
    >
      <!-- <el-table-column width="30"> </el-table-column> -->
      <el-table-column label="技能名称" width="220" class-name="spell-name-col">
        <template #default="{ row }">
          <div class="inline-flex">
            <SpellTooltip :id="row.id">
              <img
                v-if="getSpellById(row.id)?.icon_url"
                :src="getSpellById(row.id)?.icon_url"
                class="object-cover w-6 h-6 mr-3 overflow-hidden leading-6 rounded cursor-pointer"
              />
            </SpellTooltip>
            <span class="text-slate-300">{{
              getSpellById(row.id)?.name || row.spell_name || row.name
            }}</span>
          </div>
        </template>
      </el-table-column>

      <el-table-column label="伤害" min-width="400" align="center">
        <template #default="{ row }">
          <div class="flex items-center gap-4">
            <span class="w-16 text-slate-300"
              >{{ calculatePercentage(row.compound_amount) }}%</span
            >
            <div class="flex-1 h-3 bg-gray-700 rounded">
              <div
                class="h-full bg-blue-400 rounded"
                :style="{
                  width: `${calculateBarWidth(row.compound_amount)}%`,
                  backgroundColor: metierColorMap[metier]?.color,
                }"
              ></div>
            </div>
            <span class="w-[100px] text-slate-300">{{
              formatNumber(row.compound_amount)
            }}</span>
          </div>
        </template>
      </el-table-column>

      <el-table-column prop="hits" label="次数" width="100" align="center">
        <template #default="{ row }">
          <span class="text-slate-300">{{
            Number(row.num_executes.mean).toFixed(0)
          }}</span>
        </template>
      </el-table-column>

      <el-table-column
        prop="coverage"
        label="覆盖时间"
        width="100"
        align="right"
      >
        <template #default="{ row }">
          <span class="text-slate-300">{{
            row.total_tick_time
              ? calculateCoverageTime(row.total_tick_time.mean) + "%"
              : "—"
          }}</span>
        </template>
      </el-table-column>
      <template #empty>
        <div>数据加载中</div>
      </template>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { metierColorMap } from "~/consts/wowData";
import { useWowDataStore } from "~/store/wowData";
const { getSpellById } = useWowDataStore();
const props = withDefaults(
  defineProps<{
    list: any[];
    // 总时间 秒
    totalTime?: number;
    metier?: string;
  }>(),
  {
    totalTime: 300,
    metier: "dps",
  }
);

// 总伤害
const totalDamage = computed(() => {
  return props.list?.reduce((acc, cur) => acc + cur.compound_amount, 0) || 0;
});

const formatNumber = (num: number) => {
  return new Intl.NumberFormat().format(Number(num.toFixed(0)));
};

// 计算伤害占比
function calculatePercentage(damage: number) {
  return ((damage / totalDamage.value) * 100).toFixed(1);
}

// 计算百分比条宽度
function calculateBarWidth(damage: number) {
  return ((damage / (props.list || [])[0]?.compound_amount) * 100).toFixed(1);
}

// 计算覆盖时间占比
function calculateCoverageTime(time: number) {
  return ((time / props.totalTime) * 100).toFixed(1);
}

const tableRowClassName = () => {
  return "dark-row";
};
</script>

<style>
.damage-table {
  --el-table-bg-color: transparent !important;
  --el-table-tr-bg-color: transparent !important;
  --el-table-header-bg-color: #1a1a1a !important;
  --el-table-border-color: #2a2a2a !important;
  --el-table-header-text-color: #ffffff !important;
}

.spell-name-col .cell {
  display: flex;
  align-items: center;
}

.dark-row {
  background-color: transparent !important;
}

.dark-row:hover > td {
  background-color: rgba(255, 255, 255, 0.05) !important;
}

/* .el-table {
  background-color: transparent !important;
}

.el-table th {
  background-color: #1a1a1a !important;
  border-bottom: 1px solid #2a2a2a !important;
}

.el-table td {
  border-bottom: 1px solid #2a2a2a !important;
}

.el-table__expand-icon {
  color: white !important;
}

.el-table__expand-icon .el-icon {
  font-size: 12px !important;
}

.el-table tbody tr:hover > td {
  background-color: rgba(255, 255, 255, 0.05) !important;
} */
</style>
