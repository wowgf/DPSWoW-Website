<template>
  <!-- <a-tooltip
    v-if="!!upgradeList?.length"
    v-model:popup-visible="visible"
    position="right"
    trigger="click"
    :content-style="{ padding: 0 }"
    popup-container="#main"
  >
    <slot></slot>
    <template #content>
      <div v-if="visible" class="p-2" @click.stop>
        <ul class="mt-1">
          <div v-if="upgradeList?.length == 0">
            <li class="px-1 py-1 text-[10px]">无可升级选项</li>
          </div>
          <li
            v-for="(item, index) in upgradeList"
            :key="index"
            class="flex px-1 py-1 text-xs cursor-pointer hover:bg-gray-400 hover:text-slate-900"
            @click="onUpgrade(item)"
          >
            <div>
              <span>升级到 </span>
              <span>{{ item.itemLevel }}</span>
            </div>
            <div class="flex">
              <div v-for="(cost, index) in item.costs" :key="index"></div>
            </div>
          </li>
        </ul>
      </div>
    </template>
  </a-tooltip> -->
  <el-tooltip
    v-if="!!upgradeList?.length"
    v-model:visible="visible"
    placement="right"
    trigger="click"
    effect="light"
    :hide-after="10"
    :content-style="{ padding: 0 }"
    popup-container="#main"
    popper-class="!p-0"
  >
    <slot></slot>
    <template #content>
      <div class="p-2">
        <ul class="mt-1">
          <div v-if="upgradeList?.length == 0">
            <li class="px-1 py-1 text-[10px]">无可升级选项</li>
          </div>
          <li
            v-for="(item, index) in upgradeList"
            :key="index"
            class="flex px-3 py-1 text-xs rounded cursor-pointer hover:bg-gray-500 hover:text-black"
            @click="onUpgrade(item)"
          >
            <div class="text-themeGreen">
              <span>升级到 </span>
              <span>{{ item.itemLevel }}</span>
            </div>
            <div class="flex">
              <div v-for="(cost, index) in item.costs" :key="index"></div>
            </div>
          </li>
        </ul>
      </div>
    </template>
  </el-tooltip>
</template>

<script setup lang="ts">
import { cloneDeep } from "lodash";
import { ADD_NEW_GEAR } from "~/consts/windowEmits";
import { useMitt } from "~/cool/hook/mitt";
import {
  getLevelIdFromBonusId,
  getLevelIdFromValue,
  getUpgradeInfoByBonusId,
  getValueFromLevelId,
  calculateUpgradeCost,
} from "~/cool/utils/wow";
// import { calculateMaterials } from "~/data/test";
import type { GearData } from "~/types/gear";
import type { UpgradeSet } from "~/types/wowdata";
const mitt = useMitt();
const props = defineProps<{
  data: GearData;
  slotKey: string;
}>();

const visible = ref(false);

const allList = computed(() => {
  return props.data.upgradeSets?.list || [];
});

const upgradeList = computed(() => {
  return props.data.upgradeSets?.list
    .filter((v) => v.itemLevel > props.data.gearLevel)
    .sort((a, b) => b.itemLevel - a.itemLevel);
});

function onUpgrade(upgradeData: UpgradeSet) {
  visible.value = false;
  let newItemLevel = upgradeData.itemLevel;

  let oldSetsBonusId = props.data.upgradeSets?.levelBonusId; // 旧的关于等级级别的bonus_id
  let oldLevelBonusId = getLevelIdFromBonusId(props.data.bonus_id) || undefined; // 旧的等级bonus_id

  let levelValue = getValueFromLevelId(oldLevelBonusId || 0); // 旧的等级值

  // 原始装备等级
  let oldGearLevel = props.data.gearLevel - levelValue;

  // 需要提升的等级
  let needLevel = newItemLevel - oldGearLevel;
  let newLevelId = getLevelIdFromValue(needLevel);

  // 新数据
  let newGearData = cloneDeep(props.data);

  let oldBonusIds = props.data.bonus_id.split("/");

  // 替换oldBonusIds中的oldSetsBonusId
  let oldBonusIdIndex = oldBonusIds.findIndex((v) => v == oldSetsBonusId);
  oldBonusIds[oldBonusIdIndex] = upgradeData.bonusId + "";

  // 替换oldBonusIds中的oldLevelBonusId
  let oldLevelIdIndex = oldBonusIds.findIndex(
    (v) => v == oldLevelBonusId?.toString()
  );
  oldBonusIds[oldLevelIdIndex] = newLevelId + "";

  // 生成新的bonus_id
  let newBonusIdsStr = oldBonusIds.join("/");

  // 更新新的数据
  newGearData.gearLevel = upgradeData.itemLevel;
  newGearData.bonus_id = newBonusIdsStr;
  newGearData.slot = "bag";
  newGearData.isCurrent = false;
  newGearData.isUpgraded = true;

  newGearData.upgradeSets = getUpgradeInfoByBonusId(newGearData.bonus_id);

  // 需要添加到的slotKey
  let slotKey = props.slotKey;

  if (slotKey == "trinket2") {
    slotKey = "trinket1";
  }

  if (slotKey == "finger2") {
    slotKey = "finger1";
  }

  mitt.emit(ADD_NEW_GEAR, { key: slotKey, gearData: newGearData });

  // calculateUpgradeCost(3, 4, newGearData.upgradeSets?.list || []);
  // let test = calculateUpgradeCost(3, 4, allList.value);
  // console.log("test", test);
}
</script>

<style></style>
