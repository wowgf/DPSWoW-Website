<template>
  <GearMain
    ref="gearMainRef"
    :sourceSlots="['current']"
    :disabledRun="disabledRun"
    :disabledRunContent="disabledRunContent"
    @roleInfo="onParseRoleInfo"
    @run="onRun"
    @parse="onParse"
    :empty-box-text1="'粘贴数据至上方输入框，将会解析出你当前装备和天赋'"
    :empty-box-text2="'选择下方的装备来源，即可找到最大提升的装备'"
  >
    <template #default="{ gearData }">
      <BlockLine></BlockLine>
      <div class="p-3 bg-blockBg">
        <Block label="装备来源" :show-arrow="false" visible>
          <SourceSelect @select="onSelectInstance"></SourceSelect>
          <!-- 团本难度 -->
          <template
            v-if="instanceType == 'raid' && currentDifficultyList.length > 0"
          >
            <Block label="副本难度" :show-arrow="false" visible class="mt-3">
              <LevelSelect
                v-model="difficultyId"
                :data="currentDifficultyList"
              ></LevelSelect>
            </Block>

            <!-- <Block label="自定义属性" :show-arrow="false" visible class="mt-3">
              <StatSelect v-model="customStat"></StatSelect>
            </Block> -->
          </template>

          <!-- 大秘境 -->
          <template
            v-if="['mplus-chest','expansion-dungeon'].includes(instanceType as string)"
          >
            <Block label="地下城" :show-arrow="false" visible class="mt-3">
              <DungeonSelect
                v-model="encounterId"
                :data="currentEncounterList"
              ></DungeonSelect>
            </Block>
          </template>

          <!-- 大秘境难度 -->
          <template
            v-if="
              ['mplus-chest','expansion-dungeon'].includes(instanceType as string) &&
              currentDifficultyList.length > 0
            "
          >
            <Block label="地下城难度" :show-arrow="false" visible class="mt-3">
              <LevelSelect
                v-model="difficultyId"
                :data="currentDifficultyList"
              ></LevelSelect>
            </Block>
          </template>

          <!-- 赛季套装等级 -->
          <template
            v-if="['catalyst'].includes(instanceType as string) &&
              currentDifficultyList.length > 0"
          >
            <Block label="装备等级" :show-arrow="false" visible class="mt-3">
              <LevelSelect
                v-model="difficultyId"
                :data="currentDifficultyList"
              ></LevelSelect>
            </Block>
          </template>

          <!-- 制造业等级 -->
          <template
            v-if="['profession593'].includes(instanceType as string) &&
              currentDifficultyList.length > 0"
          >
            <Block label="装备等级" :show-arrow="false" visible class="mt-3">
              <ProfessionLevelSelect
                v-model="difficultyId"
                :data="currentDifficultyList"
              ></ProfessionLevelSelect>
            </Block>
            <Block label="自定义属性" :show-arrow="false" visible class="mt-3">
              <StatSelect v-model="customStat"></StatSelect>
            </Block>
          </template>
        </Block>
      </div>

      <div v-if="currentItemList.length > 0" class="p-3 mt-6 bg-blockBg">
        <Block label="装备列表" :show-arrow="false" visible>
          <template #label-right>
            <div class="flex gap-3 ml-3">
              <a-checkbox v-model="showOffSpec">其它专精</a-checkbox>
              <a-checkbox
                v-if="['mplus-chest','raid','expansion-dungeon'].includes(instanceType as string)"
                v-model="showCatalyst"
                >套装转化</a-checkbox
              >
            </div>
          </template>
          <template #head-right>
            <div v-if="showGroupSelect">
              <span class="mr-3">分组</span>
              <a-radio-group v-model="groupByType" type="button" size="small">
                <a-radio value="slot">部位</a-radio>
                <a-radio value="boss">来源</a-radio>
              </a-radio-group>
            </div>
          </template>
          <div class="mb-2 gem-wrap">
            <a-form layout="inline">
              <a-form-item v-if="upgradeSetList.length > 0" label="装备升级">
                <UpgradeSetSelect></UpgradeSetSelect>
              </a-form-item>
              <a-form-item label="宝石">
                <GemSelect></GemSelect>
              </a-form-item>
            </a-form>
          </div>
          <ItemList
            :data="currentGearList"
            :metier="roleInfo.metier"
            :spec="roleInfo.spec"
            :groupByType="groupByType"
            :bossList="currentEncounterList"
            :showItemSlot="showGroupSelect"
          ></ItemList>
        </Block>
      </div>
    </template>
  </GearMain>
</template>
<script setup lang="ts">
import GearMain from "~/components/GearMain/index.vue";
import BlockLine from "~/components/Gear/BlockLine.vue";
import Block from "~/components/Gear/Block.vue";

import SourceSelect from "~/components/GearDrop/SourceSelect.vue";
import LevelSelect from "~/components/GearDrop/LevelSelect.vue";
import ProfessionLevelSelect from "~/components/GearDrop/ProfessionLevelSelect.vue";
import DungeonSelect from "~/components/GearDrop/DungeonSelect.vue";
import GemSelect from "~/components/GearDrop/GemSelect.vue";
import UpgradeSetSelect from "~/components/GearDrop/UpgradeSetSelect.vue";
import StatSelect from "~/components/GearDrop/StatSelect.vue";
import ItemList from "~/components/GearDrop/ItemList.vue";

import type {
  EncounterItem,
  Instance,
  InstanceType,
  Override,
} from "~/types/instance";

import { upgradeGearToTargetLevel } from "~/cool/utils/wow";
import type { Gear, GearData, RoleInfo } from "~/types/gear";
import { useMetier } from "@/cool/hook/metier";
import { useJson } from "~/cool/hook/json";
// import { itemNotUsableReason } from "~/cool/utils/wowItem";
import { itemNotUsableReason, canAddSocket } from "~/cool/simc/items";
import {
  DEFAULT_VERY_RARE_SEQUENCE_OFFSET,
  INSTANCE_OVERRIDES,
  SEASONS,
} from "~/cool/simc/droptimizer";
import {
  generalDropSimcStr,
  filterDifficulties,
  getInstanceOverride,
  getUpgradeSet,
  getLevelUpgradeSetBonusId,
  getConversionItems,
  getItemDropLevel,
  getOverrides,
  getUpgradeSetById,
  getItemConversion,
  randomStatToCombList,
} from "~/cool/simc";
import { SLOT_MAP } from "~/cool/simc/constants";
import type { UpgradeSet } from "~/types/wowdata";
import { cloneDeep, sortBy } from "lodash";
import { Message } from "@arco-design/web-vue";
import config from "~/config";

interface InstanceData extends Instance {
  override?: Override;
  type: InstanceType;
}

const { metierMap, specMap } = useMetier();

const { json } = useJson([
  "crafting",
  "bonus-upgrade-sets",
  "encounter-items",
  "instances",
]);

const gearMainRef = ref<any>(null);

const instanceList = computed<InstanceData[]>(() =>
  config.drop.instanceNames
    .map((name) =>
      (json["instances"] || []).find((item: any) => item.name === name)
    )
    .filter((v) => v)
    .map((v: Instance) => {
      const override = INSTANCE_OVERRIDES.find(
        (item) => item.instanceId == v.id
      );

      v.override = override;
      return v as InstanceData;
    })
);

const encounterItemList = computed<EncounterItem[]>(
  () => json["encounter-items"]
);

const sourceContent = ref<any>(null);
const gearData = ref<Gear>();

// 获取当前角色的装备
const currentGear = computed(() => {
  let obj: any = {};
  for (let key in gearData.value) {
    obj[key] = gearData.value[key]?.find((item: any) => item.isCurrent);
  }
  return obj;
});

// 是否显示套装装备
const showCatalyst = ref(false);

// 是否显示其它专精装备
const showOffSpec = ref(false);

// 来源Id
const instanceId = ref<number | null>(null);

// 具体副本Id 例如 5人本的具体副本Id
const encounterId = ref<number | null>(null);

// 装备等级范围
// const levelRange = ref<number[] | null>(null);

const difficultyId = ref<number[] | null>(null);

// 选择的属性
const customStat = ref<number | null>(null);

// 选择的宝石
const gemId = ref<number>(0);

const levelRange = ref<number[]>([]);

const upgradeSetBonusId = ref<number>(0);

// 分组类型 slot - 部位， boss - boss
const groupByType = ref<"slot" | "boss">("slot");

let roleInfo = ref<RoleInfo>({
  playerName: "",
  metier: "",
  paladin: "",
  level: "",
  race: "human",
  region: "",
  server: "",
  role: "",
  professions: "",
  spec: "",
  talents: "",
  talentsList: [],
});

// 当前角色的职业信息
const metierInfo = computed(() => {
  return metierMap.value.get(roleInfo.value.metier);
});

// 当前角色的专精信息
const specInfo = computed(() => {
  return specMap.value.get(roleInfo.value.spec);
});

const metierId = computed(() => {
  return metierInfo.value?.mediaid || 0;
});

// 提供专精Id
const specId = computed(() => {
  return specInfo.value?.mediaid;
});

// 当前选中的来源
const currentInstance = computed(() => {
  return instanceList.value.find((item) => item.id === instanceId.value);
});

// 当前副本的类型 raid - 团队副本， dungeon - 地下城 ，mplus-chest - 史诗钥石地下城, profession593 - 专业制造593, catalyst - 赛季
const instanceType = computed<InstanceType | null>(() => {
  if (!instanceId.value) return null;
  return currentInstance.value?.type || null;
});

const currentUpgradeSet = computed(() => {
  return upgradeSetList.value.find(
    (item) => item.bonusId === upgradeSetBonusId.value
  );
});

// 难度
const difficultyList = computed(() => {
  if (currentInstance.value?.type) {
    return filterDifficulties(
      currentInstance.value?.type,
      currentInstance.value?.id
    );
  }
  return [];
});

// 当前副本的难度
const currentDifficultyList = computed(() => {
  return difficultyList.value;
});

const currentDifficulty = computed(() => {
  return currentDifficultyList?.value?.find(
    (item) => item.id === difficultyId.value
  );
});

// 当前装备覆盖等级
const itemLevelOverride = computed(() => {
  // 如果有难度的等级直接返回
  if (currentDifficulty.value?.itemLevelOverride) {
    return currentDifficulty.value.itemLevelOverride;
  }

  if (instanceId.value) {
    let override = getInstanceOverride(instanceId.value);
    if (override?.itemLevelOverride) {
      return override.itemLevelOverride;
    }
  }

  return 0;
});

// 升级套装列表
const upgradeSetList = computed(() => {
  return getUpgradeSet(
    currentDifficulty.value,
    instanceId.value,
    json["bonus-upgrade-sets"],
    itemLevelOverride.value,
    currentInstance.value?.encounters
  );
});

// 当前来源的角色可使用装备列表
const currentItemList = computed(() => {
  const sourceId = encounterId.value || instanceId.value;
  const idKey = encounterId.value ? "encounterId" : "instanceId";
  if (!sourceId) return [];
  const baseItemList = encounterItemList.value.filter(
    (item) =>
      (item.sources || []).map((source) => source[idKey]).includes(sourceId) &&
      itemNotUsableReason(
        item,
        metierId.value,
        specId.value || 0,
        false,
        !showOffSpec.value
      ) === null
  );
  // 查找其它可掉落的装备
  let expandedItemList: EncounterItem[] = [];

  // 套装装备
  let catalystItemList: EncounterItem[] = [];

  baseItemList.forEach((item1) => {
    if (item1.contains) {
      const list = encounterItemList.value
        .filter(
          (item2) =>
            item1.contains.includes(item2.id) &&
            itemNotUsableReason(
              item2,
              metierId.value,
              specId.value || 0,
              false,
              true
            ) === null
        )
        .map((item) => {
          return {
            ...item,
            sources: item1.sources,
            sourceItem: item1,
            contextLevels: item1.contextLevels,
            fromToken: true,
          };
        });

      expandedItemList = [...expandedItemList, ...list];
    }

    // 添加可转化的套装物品
    if (showCatalyst.value) {
      const itemConversion = getItemConversion(
        item1.sources[0]?.instanceId,
        item1.sources[0]?.encounterId
      );

      if (itemConversion) {
        const conversionItem = getConversionItems(itemConversion.id)
          .filter(
            (item) =>
              itemNotUsableReason(
                item,
                metierId.value,
                specId.value || 0,
                false,
                true
              ) === null
          )
          .find(
            (item) =>
              item.itemClass == item1.itemClass &&
              item.itemSubClass == item1.itemSubClass &&
              item.inventoryType == item1.inventoryType
          );

        const newItem = encounterItemList.value.find(
          (v) => v.id == conversionItem?.id
        );

        if (conversionItem && newItem) {
          catalystItemList.push({
            ...newItem,
            sources: item1.sources,
            tags: ["catalyst"],
          });
        }
      }
    }
  });
  // expandedItemList去重
  expandedItemList = expandedItemList.filter(
    (item, index, self) => index === self.findIndex((t) => t.id === item.id)
  );

  return [...baseItemList, ...expandedItemList, ...catalystItemList].filter(
    (item) => item.inventoryType
  );
});

// 当前副本的装备列表，对可使用的装备配置（掉落等级、升级合集等等）
const currentGearList = computed<GearData[]>(() => {
  let difficultyBonusIds = currentDifficulty.value?.bonusIds || [];
  // debugger
  return currentItemList.value.map((item) => {
    const overrides: any = getOverrides(
      currentInstance.value,
      currentDifficulty.value,
      item
    );

    const levelSelectorSequence = overrides.levelSelectorSequence; // 423
    const encounterSequenceOffset = overrides.encounterSequenceOffset || 0; // 0
    const encounterVeryRareSequenceOffset =
      overrides.encounterVeryRareSequenceOffset;

    let itemDropLevel = overrides.itemLevelOverride;

    let itemUpgradeSetList = [];

    if (levelSelectorSequence) {
      let upgradeIndex = 0;

      if (encounterSequenceOffset) {
        upgradeIndex += encounterSequenceOffset;
      }

      // 是否为稀有掉落
      if (item.sources[0]?.veryRare) {
        upgradeIndex +=
          encounterVeryRareSequenceOffset ?? DEFAULT_VERY_RARE_SEQUENCE_OFFSET;
      }

      itemUpgradeSetList = getUpgradeSetById(levelSelectorSequence);

      itemDropLevel = itemUpgradeSetList.find(
        (item) => item.level == upgradeIndex + 1
      )?.itemLevel;
    }

    const itemTargetLevel = currentUpgradeSet.value?.itemLevel
      ? currentUpgradeSet.value?.itemLevel > itemDropLevel
        ? currentUpgradeSet.value?.itemLevel
        : itemDropLevel
      : itemDropLevel;

    // 是否可以添加插槽
    let isCanAddSocket = canAddSocket(item, "PRISMATIC");

    // 装备的部位
    let inventoryName =
      SLOT_MAP[(item?.inventoryType as keyof typeof SLOT_MAP) || 0];

    // 当前部位的装备
    const currentGearItem: GearData = currentGear.value[inventoryName];

    const gearGemIdStr: string =
      (isCanAddSocket && gemId.value && String(gemId.value)) ||
      currentGearItem?.gem_id ||
      "";

    let bonusIdList = [...(item.bonusLists || []), ...difficultyBonusIds];

    if (gearGemIdStr) {
      let socketNum = gearGemIdStr.split("/").length;
      // 添加宝石插槽
      if (socketNum == 1) bonusIdList.push(523);
      if (socketNum == 2) bonusIdList.push(8781);
      if (socketNum == 3) bonusIdList.push(10629);
    }

    // 升级套装的id
    if (upgradeSetBonusId.value) {
      bonusIdList.push(upgradeSetBonusId.value);
    } else {
      // 查找默认的BonusId
      const defaultBonusId = getLevelUpgradeSetBonusId(
        upgradeSetList.value,
        itemTargetLevel
      );

      if (defaultBonusId) {
        bonusIdList.push(defaultBonusId);
      }
    }

    let gearData: GearData = {
      gearName: item.name,
      // gearName: item.nameEn,
      gearLevel: item.itemLevel,
      level: item.itemLevel,
      id: item.id,
      bonus_id: bonusIdList.join("/"),
      crafted_stats: customStat.value || "",
      itemId: item.id,
      itemClass: item.itemClass,
      itemSubClass: item.itemSubClass,
      inventoryType: item.inventoryType,
      name: item.name,
      iconUrl: `${(import.meta as any).env.VITE_OSS_HOST}/wow/images/items/${
        item.icon
      }.png`,
      quality:
        currentDifficulty.value?.quality ||
        currentDifficulty.value?.itemQuality ||
        4,
      craftingQuality: currentDifficulty.value?.craftingQuality || undefined,
      spells: [],
      gem_id: gearGemIdStr,
      enchant_id: "",
      sources: item.sources,
      slot: "other", // 其他
      status: 0,
      itemSource: item,
      tags: item.tags,
      stats: item.stats,
    };

    return upgradeGearToTargetLevel(gearData, itemTargetLevel);
  });
});

// 当前副本的boss或地下城列表
const currentEncounterList = computed(() => {
  return currentInstance.value?.encounters || [];
});

// 基础等级
const baseLevel = computed(() => {
  return levelRange.value?.[0] || 0;
});

const showGroupSelect = computed(() => {
  return instanceType.value == "raid" || instanceType.value == "profession593";
});

const disabledRunContent = computed(() => {
  if (!instanceId.value) return "请选择装备来源";
  return "";
});

const disabledRun = computed(() => {
  return !!disabledRunContent.value;
});

provide("instanceList", instanceList);
provide("instanceId", instanceId);
provide("baseLevel", baseLevel);
provide("specId", specId);
provide("gemId", gemId);
provide("upgradeSetBonusId", upgradeSetBonusId);
provide("upgradeSetList", upgradeSetList);

watch(
  () => upgradeSetList.value,
  (val) => {
    upgradeSetBonusId.value = 0;
  }
);

function onParseRoleInfo(info: RoleInfo) {
  roleInfo.value = info;
}

function onParse(data: any) {
  sourceContent.value = data.sourceContent;
  gearData.value = data.gearData;
}

/**
 * 选择来源
 * @param id
 */
function onSelectInstance(id: number) {
  instanceId.value = id;
  encounterId.value = null;
  groupByType.value = "slot";

  // 如果是史诗钥石地下城，默认选择第一个地下城
  if (
    ["expansion-dungeon", "mplus-chest", "dungeon"].includes(
      instanceType.value as string
    )
  ) {
    encounterId.value = currentEncounterList.value[0]?.id || null;
  }

  // 默认选择最后一个难度
  if (currentDifficultyList.value.length > 0) {
    difficultyId.value = currentDifficultyList.value[currentDifficultyList.value.length - 1].id;
  } else {
    difficultyId.value = null;
  }
}

function onRun(runParams: any) {
  const itemList = randomStatToCombList(currentGearList.value);
  let simcFullStr = generalDropSimcStr(sourceContent.value, itemList);

  const combinations = [currentGear.value, ...itemList].map((item) => {
    let data: any = cloneDeep(item);
    if (data.itemSource) delete data.itemSource;
    return data;
  });

  if (instanceType.value?.startsWith("profession")) {
    if (!customStat.value) {
      Message.warning("请选择自定义属性");
      gearMainRef.value?.stopRun();
      return;
    }
  }

  service.simc
    .run({
      ...runParams,
      type: 5,
      simcFullStr,
      combinations: combinations,
      params: {
        dropType: instanceType.value,
        instanceId: instanceId.value,
        encounterId: encounterId.value,
        difficultyId: difficultyId.value,
        customStat: customStat.value,
        gemId: gemId.value,
        upgradeSetBonusId: upgradeSetBonusId.value,
      },
    })
    .then((res) => {
      gearMainRef.value.runSuccess(res);
      useRouter().push({
        path: "/gear/result/drop",
        query: { id: res.id, fromType: "run" },
      });
    })
    .finally(() => {
      setTimeout(() => {
        gearMainRef.value?.stopRun();
      }, 3000);
    });
}
</script>
<style lang="scss" scoped></style>
