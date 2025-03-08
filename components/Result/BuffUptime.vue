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
      <el-table-column label="BUFF" width="220">
        <template #default="{ row }">
          <div class="flex">
            <SpellTooltip :id="row.spell">
              <img
                v-if="row.spellInfo?.icon_url"
                :src="row.spellInfo?.icon_url"
                class="object-cover w-6 h-6 mr-3 overflow-hidden rounded cursor-pointer"
              />
            </SpellTooltip>
            <span class="text-slate-300">{{
              row.spellInfo?.name || row.spell_name || row.name
            }}</span>
          </div>
        </template>
      </el-table-column>

      <el-table-column label="覆盖时间" min-width="400" align="center">
        <template #default="{ row }">
          <div class="flex items-center gap-4">
            <span class="w-16 text-slate-300"
              >{{ Number(row.uptime).toFixed(1) }}%</span
            >
            <div class="flex-1 h-3 bg-gray-700 rounded">
              <div
                class="h-full bg-blue-400 rounded"
                :style="{
                  width: `${row.uptime}%`,
                  backgroundColor: metierColorMap[metier]?.color,
                }"
              ></div>
            </div>
          </div>
        </template>
      </el-table-column>

      <el-table-column prop="hits" label="触发次数" width="100" align="center">
        <template #default="{ row }">
          <span class="text-slate-300">{{
            Number(row.trigger || 1).toFixed(0)
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
import { ref } from "vue";
import { metierColorMap } from "~/consts/wowData";
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

.dark-row {
  background-color: transparent !important;
}

.dark-row:hover > td {
  background-color: rgba(255, 255, 255, 0.05) !important;
}


</style>
