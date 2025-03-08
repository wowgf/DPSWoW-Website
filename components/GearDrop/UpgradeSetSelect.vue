<template>
  <a-select v-model="upgradeSetBonusId" :style="{ width: '160px' }">
    <template v-if="selectedData" #label>
      <span v-if="selectedData.itemLevel" class="mr-2 font-semibold">{{
        selectedData.itemLevel
      }}</span>
      <span>{{ selectedData.fullName }}</span>
    </template>
    <a-option
      v-for="(item, index) in [
        { bonusId: 0, fullName: '初始等级', label: '初始等级', itemLevel: 0 },
        ...list,
      ]"
      :key="index"
      :value="item.bonusId"
      :label="item.label"
    >
      <span v-if="item.itemLevel" class="mr-2 font-semibold">{{
        item.itemLevel
      }}</span>
      <span>{{ item.fullName }}</span>
    </a-option>
  </a-select>
</template>

<script setup lang="ts">
import { replaceQualityNameToZh } from "~/cool/utils/language";
import type { UpgradeSet } from "~/types/wowdata";

const upgradeSetList = inject("upgradeSetList") as Ref<UpgradeSet[]>;

const upgradeSetBonusId = inject("upgradeSetBonusId") as unknown as Ref<number>;

const list = computed(() => {
  return upgradeSetList.value
    .sort((a, b) => b.itemLevel - a.itemLevel)
    .map((item) => {
      let label = item.fullName;
      if (item.itemLevel > 0) {
        label = `${item.itemLevel} ${replaceQualityNameToZh(item.fullName)}`;
      }
      return {
        label: label,
        bonusId: item.bonusId,
        fullName: replaceQualityNameToZh(item.fullName),
        itemLevel: item.itemLevel,
      };
    });
});

const selectedData = computed(() => {
  return list.value.find(
    (item) => item.bonusId === upgradeSetBonusId.value
  );
});
</script>

<style></style>
