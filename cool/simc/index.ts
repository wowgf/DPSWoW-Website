import type { GearData } from "~/types/gear";
import { getItemSlotName } from "../utils/wowItem";
import type { Difficulty, Encounter, EncounterItem, Instance } from "~/types/instance";
import { DIFFICULTIES, ENCOUNTER_OVERRIDES, getSeason, INSTANCE_DIFFICULTY_OVERRIDES, INSTANCE_ITEM_OVERRIDES, INSTANCE_OVERRIDES, SEASONS } from "./droptimizer";
import _, { cloneDeep } from "lodash";
import type { UpgradeSet } from "~/types/wowdata";
import { useJson } from "../hook/json";
import { GearNameMap, itemSubClassList } from "~/consts/wowItem";
import { CRAFTED_STATS, getStatCombos, getUpgradeSet1 } from "./items";
import { STATS } from "./stats";

const CRAFT_STAT_1 = _.find(STATS, { enum: 'STAT_CRAFT_MOD_1' });
const CRAFT_STAT_2 = _.find(STATS, { enum: 'STAT_CRAFT_MOD_2' });

export function randomStatToCombList(list: GearData[]) {
  // 随机属性的装备
  const statItemList = list.filter(item => item.stats?.some(stat => [CRAFT_STAT_1?.dataId, CRAFT_STAT_2?.dataId].includes(stat.id)))
  const otherItemList = list.filter(item => !item.stats?.some(stat => [CRAFT_STAT_1?.dataId, CRAFT_STAT_2?.dataId].includes(stat.id)))
  const newList: GearData[] = []

  // 所有两个属性的组合
  const statCombs: { id: any }[] = getStatCombos()
  // 所有单个属性的组合
  const statOneCombs: { id: any }[] = CRAFTED_STATS

  statItemList.forEach(item => {
    // 两个属性的组合
    if ([CRAFT_STAT_1?.dataId, CRAFT_STAT_2?.dataId].every(statId => item.stats?.some(stat => stat.id == statId))) {
      statCombs.forEach(stat => {
        newList.push({ ...item, crafted_stats: stat.id + '' })
      })
    } else {
      // 单个属性的组合
      statOneCombs.forEach(stat => {
        newList.push({ ...item, crafted_stats: stat.id + '' })
      })
    }
  })

  return cloneDeep([...newList, ...otherItemList])
}

export function generalDropSimcStr(defaultStr: string, GearDataList: GearData[]) {
  let simcStr = defaultStr
  let profilesetStr = ''

  let profilesetList: { name: string; slot: string; itemId: number; bonusId?: any; enchantId?: any; gemId?: any; crafted_stats?: any }[] = []

  GearDataList.forEach((gearData) => {
    let slot: any = getItemSlotName(gearData.itemSource as EncounterItem)
    const commParam = { itemId: gearData.id, bonusId: gearData.bonus_id, enchantId: gearData.enchant_id, gemId: gearData.gem_id, crafted_stats: gearData.crafted_stats }
    if (slot == 'finger' || slot == 'trinket') {
      profilesetList.push({ name: getItemProfilesetName(gearData, `${slot}1`), slot: `${slot}1`, ...commParam })
      profilesetList.push({ name: getItemProfilesetName(gearData, `${slot}2`), slot: `${slot}2`, ...commParam })
    } else {
      profilesetList.push({ name: getItemProfilesetName(gearData, slot), slot: slot, ...commParam })
    }
  })

  profilesetList.forEach((profileset) => {
    profilesetStr += `profileset."${profileset.name}"+=${profileset.slot}=,id=${profileset.itemId}`
    if (profileset.bonusId) {
      profilesetStr += `,bonus_id=${profileset.bonusId}`
    }
    if (profileset.enchantId) {
      profilesetStr += `,enchant_id=${profileset.enchantId}`
    }
    if (profileset.gemId) {
      profilesetStr += `,gem_id=${profileset.gemId}`
    }
    if (profileset.crafted_stats) {
      profilesetStr += `,crafted_stats=${profileset.crafted_stats}`
    }

    profilesetStr += '\n'
  })

  simcStr = simcStr + '\n' + `name=火灬炎龙

# Consumables

# Expansion Options
temporary_enchant=
thewarwithin.dawn_dusk_thread_lining_uptime=0.45` + '\n'
    + profilesetStr + '\n'
    + `# Simulation Options
iterations=100000
desired_targets=1
max_time=300
calculate_scale_factors=0
scale_only=strength,intellect,agility,crit,mastery,vers,haste,weapon_dps,weapon_offhand_dps
override.bloodlust=1
override.arcane_intellect=1
override.power_word_fortitude=1
override.battle_shout=1
override.mystic_touch=1
override.chaos_brand=1
override.skyfury=1
override.mark_of_the_wild=1
override.hunters_mark=1
override.bleeding=1
report_details=1
single_actor_batch=1
optimize_expressions=1
target_error=0.1`

  return simcStr
}

export function getItemProfilesetNameStat(crafted_stats: string) {
  const statsName = crafted_stats.split('/').map((v: any) => CRAFTED_STATS.find(stat => stat.id == v)?.name).join(':')
  return 'stats-' + statsName
}

export function getItemProfilesetName(item: GearData, slotName: string) {
  let name = `${slotName}/${item.gearLevel}/${item.id}`
  if (item.crafted_stats) {
    const stats = getItemProfilesetNameStat(item.crafted_stats)
    name += `/${stats}`
  }
  return name
}

export function filterDifficultiesOverrides(instanceId: number) {
  return INSTANCE_DIFFICULTY_OVERRIDES.filter(override => override.instanceId == instanceId)
}

/**
 * 获取副本难度列表
 * @param type 
 * @param instanceId 
 * @returns 
 */
export function filterDifficulties(type: string, instanceId: number) {

  // 生成团队副本难度覆盖表
  const overrideMap = new Map();
  INSTANCE_DIFFICULTY_OVERRIDES.forEach(item => {
    if (!overrideMap.has(item.instanceId)) {
      overrideMap.set(item.instanceId, new Map());
    }
    overrideMap.get(item.instanceId).set(item.difficulty, item);
  });

  return DIFFICULTIES.filter((difficulty) => {
    return difficulty?.type === type
  }).map((difficulty) => {

    let override: any = {}

    // 团队副本
    if (type === 'raid') {
      override = overrideMap.get(instanceId)?.get(difficulty?.id) || {}
      if (override.itemLevel) {
        override.itemLevelOverride = override.itemLevel.split(' - ').map(Number)[0]
      }
    }

    return {
      ...difficulty,
      ...override
    }

  }).filter((difficulty) => {
    return !difficulty?.disable && difficulty?.itemLevelOverride && !difficulty?.archive
  })
}

/**
 * 查找副本难度覆盖
 * @param instanceId 
 * @returns 
 */
export function getInstanceOverride(instanceId: number) {
  return INSTANCE_OVERRIDES.find(override => override.instanceId == instanceId)
}

/**
 * 获取升级装备集合
 */
export function getUpgradeSet(difficulty: Difficulty, instanceId: number | null, itemUpgradeSets: any, targetItemLevel: number, encounterList?: Encounter[]): UpgradeSet[] {

  let upgradeSetList: UpgradeSet[] = []

  // 如果难度有指定升级装备集合
  if (difficulty?.levelSelectorSequence) {
    return itemUpgradeSets[difficulty.levelSelectorSequence] || []
  }

  const instanceOverride = getInstanceOverride(instanceId as number)

  encounterList?.forEach(encounter => {
    const encounterOverride = ENCOUNTER_OVERRIDES.find(v => v.encounterId == encounter.id)
    if (encounterOverride?.itemLevelOverride && encounterOverride.season) {
      const seasonId = instanceOverride ? SEASONS[encounterOverride.season as keyof typeof SEASONS]?.seasonId : undefined

      const itemUpgradeSetObj: any = {}
      /** 筛选出对应seasonId的集合 */
      for (const key in itemUpgradeSets) {
        const upgradeSet = itemUpgradeSets[key]
        if (upgradeSet[0].seasonId == seasonId) {
          itemUpgradeSetObj[key] = upgradeSet
        }
      }

      if (Object.keys(itemUpgradeSetObj).length > 0) {
        upgradeSetList = [...getLevelUpgradeSet(itemUpgradeSetObj, encounterOverride?.itemLevelOverride)[0] || []]
      }
    }
  })

  const seasonId = instanceOverride ? SEASONS[instanceOverride.season as keyof typeof SEASONS]?.seasonId : undefined

  const itemUpgradeSetObj: any = {}
  /** 筛选出对应seasonId的集合 */
  for (const key in itemUpgradeSets) {
    const upgradeSet = itemUpgradeSets[key]
    if (upgradeSet[0].seasonId == seasonId) {
      itemUpgradeSetObj[key] = upgradeSet
    }
  }


  if (Object.keys(itemUpgradeSetObj).length > 0) {
    upgradeSetList = [...upgradeSetList, ...(getLevelUpgradeSet(itemUpgradeSetObj, targetItemLevel)[0] || [])]
  }

  return upgradeSetList
}

/**
 * 获取升级装备集合
 */
export function getLevelUpgradeSetBonusId(upgradeSetList: UpgradeSet[], itemLevel: number) {
  return upgradeSetList.find(upgradeSet => upgradeSet.itemLevel == itemLevel)?.bonusId
}

/**
 * 获取包含对应等级的集合
 */
export function getLevelUpgradeSet(itemUpgradeSets: { [key: string]: UpgradeSet[] }, itemLevel: number) {

  const list: UpgradeSet[][] = []

  for (const key in itemUpgradeSets) {
    const upgradeSetList = itemUpgradeSets[key]

    const upgradeSet = upgradeSetList.find(item => item.itemLevel == itemLevel)

    if (upgradeSet) {
      list.push(upgradeSetList)
    }

  }

  // 排序
  list.sort((a, b) => getTargetLevel(a, itemLevel) - getTargetLevel(b, itemLevel))

  return list
}

/**
 * 获取升级装备集合
 * @param id 
 * @returns 
 */
export function getUpgradeSetById(id: number) {
  const { json } = useJson(['bonus-upgrade-sets'])
  const itemUpgradeSets: {
    [key: string]: UpgradeSet[]
  } = json['bonus-upgrade-sets']
  return itemUpgradeSets[id]
}

/**
 * 根据奖励ID检索升级装备集合项。
 *
 * @param {number} bonusId - 要搜索的奖励ID。
 * @returns {UpgradeSet | undefined} 对应于给定奖励ID的升级装备集合项，如果未找到则为undefined。
 */
export function getUpgradeSetItemByBounsId(bonusId: number) {
  const { json } = useJson(['bonus-upgrade-sets'])
  const itemUpgradeSets: {
    [key: string]: UpgradeSet[]
  } = json['bonus-upgrade-sets']

  for (const key in itemUpgradeSets) {
    const upgradeSetList = itemUpgradeSets[key]
    const upgradeSet = upgradeSetList.find(item => item.bonusId == bonusId)
    if (upgradeSet) {
      return upgradeSet
    }
  }
}

function getTargetLevel(upgradeSetList: UpgradeSet[], targetItemLevel: number) {
  return upgradeSetList.find(upgradeSet => upgradeSet.itemLevel == targetItemLevel)?.level || 0
}

/**
 * 获取装备部位信息
 */
export function getGearItemSlotInfo(itemClass: number, inventoryType: number) {
  // 武器
  if (itemClass == 2) {
    return {
      name: '武器',
    }
  }
  // 护甲
  if (itemClass == 4) {
    return itemSubClassList.find(item => item.id == inventoryType)
  }

  return null
}

/**
 * 获取装备部位名称
 * @param slotKey 
 */
export function getSlotNameByKey(slotKey: string) {
  return GearNameMap[slotKey]
}

/**
 * 获取副本信息
 * @param encounterId 
 * @param instanceId 
 */
export function getEncounter(encounterId: number, instanceId: number): EncounterItem {
  const { json } = useJson(['instances'])
  const instance = json.instances?.find((item: Instance) => item.id == instanceId)
  const encounter = instance?.encounters?.find((item: EncounterItem) => item.id == encounterId)

  return encounter
}

/**
 * 获取来源信息
 * @param id 
 */
export function getInstanceInfo(id: number) {
  const { json } = useJson(['instances'])
  return json.instances?.find((item: Instance) => item.id == id)
}

/**
 * 获取副本信息
 * @param id 
 * @param instanceId 
 * @returns 
 */
export function getEncounterInfo(id: number, instanceId?: number) {
  const { json } = useJson(['instances'])
  if (instanceId) {
    return json.instances?.find((item: Instance) => item.id == instanceId)?.encounters?.find((item: EncounterItem) => item.id == id)
  } else {
    return json.instances?.find((item: Instance) => item.encounters?.some((encounter: EncounterItem) => encounter.id == id)).encounters?.find((item: EncounterItem) => item.id == id)
  }

}

/**
 * 获取难度信息
 * @param id 
 */
export function getDifficultieInfo(id: string): Difficulty {
  return DIFFICULTIES.find((item: any) => item.id == id) as Difficulty
}

// 获取部位名称
export function getSlotNameByInventoryType(id: number) {
  let item = itemSubClassList.find(v => v.id == id)
  return item?.name
}

// 获取boss名
export function getBossNameById(bossList: Encounter[], id: number) {
  return bossList.find(boss => boss.id == id)?.name
}

// 添加可转化的物品
export function getConversionItems(id: any): EncounterItem[] {
  const { json } = useJson(['item-conversions'])
  let items = []
  if (json['item-conversions']) {
    items = json['item-conversions'][id].items
  }
  return items
}

/**
 * 获取装备掉落等级
 */
export function getItemDropLevel(item: EncounterItem, difficulty: Difficulty) {
  if (difficulty?.itemLevelOverride) {
    return difficulty.itemLevelOverride
  }
  return 0
}


export function getOverrides(instance: any, difficulty: Difficulty, item: EncounterItem) {
  // instance + encounter
  let encounterOverrides: any = [];
  let instanceId = instance.id
  let encounterId = item?.sources && item?.sources[0]?.encounterId
  let difficultyId = difficulty?.id
  let itemId = item.id

  const allEncounterOverrides = _.filter(ENCOUNTER_OVERRIDES, {
    encounterId,
  });
  if (difficultyId) {
    encounterOverrides = _.find(allEncounterOverrides, {
      difficulty: difficultyId,
    });
  } else if (instance) {
    // if difficultyId is null, see if there is a single matching difficulty for the instance type
    // this should catch things like pvp-conquest where there is only 1 option
    const difficulties = _.filter(DIFFICULTIES, { type: instance.type });
    if (difficulties.length === 1) {
      difficulty = _.first(difficulties);
    }
  }
  // didn't find specific difficulty overrides, use a generic one if available
  if (_.size(encounterOverrides) === 0) {
    encounterOverrides = _.find(allEncounterOverrides, (o) => !o.difficulty);
  }

  // instance + difficulty
  const instanceDifficultyOverrides = _.find(INSTANCE_DIFFICULTY_OVERRIDES, {
    instanceId,
    difficulty: difficultyId,
  });

  // general instance overrides
  const instanceOverrides = _.find(INSTANCE_OVERRIDES, {
    instanceId,
  });

  const itemOverrides = _.find(INSTANCE_ITEM_OVERRIDES, {
    instanceId,
    itemId,
  });

  let season;
  if (instanceOverrides) {
    season = getSeason(instanceOverrides.season);
  }
  if (encounterOverrides?.season) {
    season = getSeason(encounterOverrides.season);
  }

  const overrides = {};

  _.defaults(
    overrides,
    itemOverrides,
    encounterOverrides,
    instanceDifficultyOverrides,
    instanceOverrides,
    season,
    {
      instance,
      // encounter,
      difficulty,
      context: difficulty?.context,
      encounterType: "boss",
      encounterTypePlural: "bosses",
      quality: difficulty?.quality ?? 4,

      // add some difficulty options at the top level (but not everything)
      // (Not sure why not everything, need to spend some more time remembering why it wrote it that way)
      itemLevel: difficulty?.itemLevel,
      itemLevelOverride: difficulty?.itemLevelOverride,
      itemLevelOffset: difficulty?.itemLevelOffset,
      gambling: difficulty?.gambling,
      itemFilter: difficulty?.itemFilter,

      levelSelectorSequence: difficulty?.levelSelectorSequence,
    }
  );

  return overrides;
};

/**
 * 获取物品转化
 * @param instanceId 
 * @param encounterId 
 * @returns 
 */
export function getItemConversion(instanceId: number, encounterId: number) {
  const { json } = useJson(['item-conversions', 'instances'])
  const instance = json.instances.find((item: Instance) => item.id == instanceId)
  const encounter = instance?.encounters?.find((item: Encounter) => item.id == encounterId)

  if (!instance || !encounter) return null

  const encounterOverride = ENCOUNTER_OVERRIDES.find(v => v.encounterId == encounterId)
  const instanceOverride = INSTANCE_OVERRIDES.find(item => item.instanceId == instanceId)

  if (encounterOverride?.season) {
    const season = getSeason(encounterOverride.season)
    return season?.itemConversion || null
  }

  if (instanceOverride?.season) {
    const season = getSeason(instanceOverride.season)
    return season?.itemConversion || null
  }

  return null
}
