<template>
  <div class="bg-[#171B25] p-3 overflow-hidden">
    <div class="flex flex-wrap gap-1 mb-1">
      <SpellTooltip
        v-for="(row, index) in buffsConstantList"
        :key="index"
        :id="row.spell"
      >
        <img
          v-if="row.spellInfo?.icon_url"
          :src="row.spellInfo?.icon_url"
          class="object-cover w-6 h-6 overflow-hidden rounded cursor-pointer"
        />
      </SpellTooltip>
    </div>
    <a-descriptions :column="1">
      <a-descriptions-item label="提交时间">
        <span class="desc-value">{{ record.createTime }}</span>
      </a-descriptions-item>
      <a-descriptions-item label="完成时间">
        <span class="desc-value">{{ record.updateTime }}</span>
      </a-descriptions-item>
      <a-descriptions-item label="模拟次数">
        <span class="desc-value"
          >{{ rawResult.sim?.statistics?.raid_dps.count || 1000 }}次</span
        >
      </a-descriptions-item>
      <a-descriptions-item label="战斗方式">
        <span class="desc-value">
          {{
            getNameByValue("fightStyleOptions", record.simcConfig.fight_style)
          }}
        </span>
      </a-descriptions-item>
      <a-descriptions-item label="目标数量">
        <span class="desc-value">
          {{ record.simcConfig.desired_targets }}个
        </span>
      </a-descriptions-item>
      <a-descriptions-item label="战斗时长">
        <span class="desc-value">
          {{ getNameByValue("maxTimeOptions", record.simcConfig.max_time) }}
        </span>
      </a-descriptions-item>
      <a-descriptions-item label="SIMC版本">
        <span class="desc-value">
          {{ rawResult.version }}
        </span>
      </a-descriptions-item>
    </a-descriptions>
    <nuxt-link
      :to="{ path: '/report', query: { id: record.id } }"
      target="_blank"
    >
      <div class="text-center cursor-pointer text-themeYellow">
        查看HTML完整报告
      </div>
    </nuxt-link>
  </div>
</template>

<script setup lang="ts">
import { useDict } from "~/cool";

const props = defineProps<{
  record: any;
  rawResult: any;
  buffsConstantList: any[];
}>();

const { getNameByValue } = useDict([]);
</script>

<style></style>
