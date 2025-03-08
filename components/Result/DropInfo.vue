<template>
  <div class="flex gap-2 text-base drop-info">
    <!-- <div class="drop-info-title">掉落信息</div> -->
    <div class="drop-info-content">{{ dropInfoList }}</div>
    <div v-if="isProfession && difficultyInfo" class="flex items-center gap-2">
      <div>{{ difficultyInfo?.itemLevelOverride }}</div>
      <img
        :src="`/images/wow/item/crafting-${difficultyInfo?.craftingQuality}.png`"
        class="h-5"
      />
      <div v-if="difficultyInfo?.itemId" class="w-5 h-5">
        <ItemImg
          :item-id="difficultyInfo?.itemId"
          :src="`/images/wow/item/${
            getReagentById(difficultyInfo?.itemId)?.icon
          }.png`"
          :quality="getReagentById(difficultyInfo?.itemId)?.quality"
        ></ItemImg>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useJson } from "~/cool/hook/json";
import {
  getDifficultieInfo,
  getEncounter,
  getInstanceInfo,
  getUpgradeSetItemByBounsId,
} from "~/cool/simc";
import {
  replaceQualityNameToZh,
  getLocalValue,
  getAllLocalValue,
} from "~/cool/utils/language";
import ItemImg from "../Gear/ItemImg.vue";

const props = defineProps<{
  data?: {
    dropType: string;
    instanceId: number;
    encounterId: number;
    difficultyId: string;
    customStat: string;
    gemId: number;
    upgradeSetBonusId: number;
  };
}>();
const { json } = useJson(["crafting"]);

const reagents = computed(() => json.crafting?.reagents || []);

const isProfession = computed(() => {
  return props.data?.dropType.startsWith("profession");
});

const instanceInfo = computed(() => {
  if (props.data?.instanceId) return getInstanceInfo(props.data.instanceId);
  return null;
});

const encounterInfo = computed(() => {
  if (props.data?.encounterId) {
    return getEncounter(props.data.encounterId, props.data.instanceId);
  }
  return null;
});

const difficultyInfo = computed(() => {
  if (props.data?.difficultyId) {
    return getDifficultieInfo(props.data.difficultyId);
  }
  return null;
});

const upgradeSetInfo = computed(() => {
  if (props.data?.upgradeSetBonusId) {
    return getUpgradeSetItemByBounsId(props.data.upgradeSetBonusId);
  }
  return null;
});

const statInfo = computed(() => {
  return null;
});

const dropInfoList = computed(() => {
  let arr = [];
  if (instanceInfo.value) {
    arr.push(getAllLocalValue(instanceInfo.value.name));
  }

  if (encounterInfo.value) {
    arr.push(getAllLocalValue(encounterInfo.value.name));
  }

  if (
    difficultyInfo.value &&
    !props.data?.dropType.startsWith("profession") &&
    difficultyInfo.value.name
  ) {
    arr.push(
      getAllLocalValue(
        difficultyInfo.value.nameCn ||
          difficultyInfo.value.name ||
          difficultyInfo.value.itemLevelOverride
      )
    );
  }

  if (upgradeSetInfo.value) {
    arr.push(replaceQualityNameToZh(upgradeSetInfo.value.fullName));
  }

  return arr.join(" | ");
});

function getReagentById(id: number) {
  return reagents.value?.find((item: any) => item.id === id);
}
</script>

<style></style>
