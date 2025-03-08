import _ from "lodash";
import * as Combinatorics from "js-combinatorics";

import { FAKE_INSTANCE_IDS, FAKE_ENCOUNTER_IDS } from "./constants";
import { professionCraftingQualities, slotMap } from "./items";

export const DEFAULT_VERY_RARE_SEQUENCE_OFFSET = 2;

const WARFORGED_BONUS_ID = 4783;
const TITANFORGED_BONUS_ID = 4784;

const jewelryIgnoreInstances = [1178];
const mythicPlusItemFilter = (item) => {
  const slot = slotMap[item.inventoryType];
  if (slot === "neck" || slot === "finger") {
    const ignoredInstance = _.some(item.sources, (s) =>
      _.includes(jewelryIgnoreInstances, s.instanceId)
    );
    return !ignoredInstance;
  }
  const realSources = _.filter(item.sources, (s) => s.instanceId > 0);
  const mplusSources = _.filter(realSources, (source) => {
    const encounter = getEncounter(source.encounterId);
    return !encounter.difficulties || _.includes(encounter.difficulties, 8);
  });

  // remove any items that come from encounters that aren't in M+
  // This can happen with M+ instances that are part of a megadungeon split.
  // In 11.1, Mechagon Workshop is in the season but the first half is not. This remove the earlier items
  if (_.size(mplusSources) === 0) {
    return false;
  }

  return true;
};

const MPLUS_ITEM_LEVELS = [
  {
    id: "dungeon-heroic",
    name: "Heroic",
    quality: 3, // rare
    itemLevelOverride: 619,
    // itemFilter: mythicPlusItemFilter,
    bonusIds: [
      7244, // rare
    ],
  },
  {
    id: "dungeon-mythic1",
    name: "Mythic",
    itemLevelOverride: 632,
    itemFilter: mythicPlusItemFilter,
    bonusIds: [
      4786, // epic
    ],
  },
  {
    id: "dungeon-mythic2",
    name: "Mythic 2",
    itemLevelOverride: 636,
    itemFilter: mythicPlusItemFilter,
    bonusIds: [
      4786, // epic
    ],
  },
  {
    id: "dungeon-mythic3",
    name: "Mythic 3",
    itemLevelOverride: 636,
    itemFilter: mythicPlusItemFilter,
    bonusIds: [
      4786, // epic
    ],
  },
  {
    id: "dungeon-mythic4",
    name: "Mythic 4",
    itemLevelOverride: 639,
    itemFilter: mythicPlusItemFilter,
    bonusIds: [
      4786, // epic
    ],
  },
  {
    id: "dungeon-mythic5",
    name: "Mythic 5",
    itemLevelOverride: 642,
    itemFilter: mythicPlusItemFilter,
    bonusIds: [
      4786, // epic
    ],
  },
  {
    id: "dungeon-mythic6",
    name: "Mythic 6",
    itemLevelOverride: 645,
    itemFilter: mythicPlusItemFilter,
    bonusIds: [
      4786, // epic
    ],
  },
  {
    id: "dungeon-mythic7",
    name: "Mythic 7",
    itemLevelOverride: 649,
    itemFilter: mythicPlusItemFilter,
    bonusIds: [
      4786, // epic
    ],
  },
  {
    id: "dungeon-mythic8",
    name: "Mythic 8",
    itemLevelOverride: 649,
    itemFilter: mythicPlusItemFilter,
    bonusIds: [
      4786, // epic
    ],
  },
  {
    id: "dungeon-mythic9",
    name: "Mythic 9",
    itemLevelOverride: 652,
    itemFilter: mythicPlusItemFilter,
    bonusIds: [
      4786, // epic
    ],
  },
  {
    id: "dungeon-mythic10",
    name: "Mythic 10",
    itemLevelOverride: 652,
    itemFilter: mythicPlusItemFilter,
    bonusIds: [
      4786, // epic
    ],
  },
];

const MPLUS_DIFFICULTIES = [
  // ======================================================
  // Merge in mlpus levels into mplus-chest type
  // We also reuse these item levels for M+ timewalking
  ..._.map(MPLUS_ITEM_LEVELS, (itemLevelInfo) => ({
    type: "mplus-chest",
    ...itemLevelInfo,
  })),
  {
    id: "dungeon-mythic-weekly5",
    type: "mplus-chest",
    name: "+5-6 Vault",
    itemLevelOverride: 652,
    itemFilter: mythicPlusItemFilter,
    bonusIds: [
      4786, // epic
    ],
  },
  {
    id: "dungeon-mythic-weekly7",
    type: "mplus-chest",
    name: "+7 Vault",
    itemLevelOverride: 655,
    itemFilter: mythicPlusItemFilter,
    bonusIds: [
      4786, // epic
    ],
  },
  {
    id: "dungeon-mythic-weekly8",
    type: "mplus-chest",
    name: "+8-9 Vault",
    itemLevelOverride: 658,
    itemFilter: mythicPlusItemFilter,
    bonusIds: [
      4786, // epic
    ],
  },
  {
    id: "dungeon-mythic-weekly10",
    type: "mplus-chest",
    name: "+10 Vault",
    itemLevelOverride: 662,
    itemFilter: mythicPlusItemFilter,
    bonusIds: [
      4786, // epic
    ],
  },
];

/*
const TIMEWALKING_DIFFICULTIES = [
  ..._.map(MPLUS_ITEM_LEVELS, itemLevelInfo => ({
    type: 'mplus-timewalking',
    ...itemLevelInfo,
  })), {
    id: 'dungeon-upgrade-10',
    type: 'mplus-timewalking',
    name: 'Upgrade Level 10',
    itemLevelOverride: 291,
    itemFilter: mythicPlusItemFilter,
    bonusIds: [
      7604, // Upgrade Level 10
      4786, // epic
    ],
  }, {
    id: 'dungeon-upgrade-11',
    type: 'mplus-timewalking',
    name: 'Upgrade Level 11',
    itemLevelOverride: 294,
    itemFilter: mythicPlusItemFilter,
    bonusIds: [
      7605, // Upgrade Level 11
      4786, // epic
    ],
  }, {
    id: 'dungeon-upgrade-12',
    type: 'mplus-timewalking',
    name: 'Upgrade Level 12',
    itemLevelOverride: 298,
    itemFilter: mythicPlusItemFilter,
    bonusIds: [
      7606, // Upgrade Level 12
      4786, // epic
    ],
  },
];
*/

const professionLevelUpgrades = [{
  key: 'base',
  name: 'Base',
  archive: true,
}, {
  key: 'base545',
  name: 'Soul Sigil I',
  baseLevel: 545,
  itemId: 228338,
  itemQuality: 3,
  archive: true,
}, {
  key: 'base561',
  name: 'Soul Sigil II',
  baseLevel: 561,
  itemId: 228339,
  itemQuality: 3,
  archive: true,
}, {
  key: 'base577',
  name: 'Enchanted Weathered Harbinger Crest',
  baseLevel: 577,
  itemId: 224069,
  itemQuality: 4,
  archive: true,
}, {
  key: 'base606',
  name: 'Enchanted Runed Harbinger Crest',
  baseLevel: 606,
  itemId: 224072,
  itemQuality: 4,
  archive: true,
}, {
  key: 'base623',
  name: 'Enchanted Gilded Harbinger Crest',
  baseLevel: 623,
  itemId: 224073,
  itemQuality: 4,
  archive: true,
}, {

  // Season 2

  key: 'base616',
  name: 'Enchanted Weathered Undermine Crest',
  baseLevel: 616,
  itemId: 230937,
  itemQuality: 4,
  archive: true,
}, {
  key: 'base632',
  name: 'Spark of Fortunes',
  baseLevel: 632,
  itemId: 230906,
  itemQuality: 4,
}, {
  key: 'base645',
  name: 'Enchanted Runed Undermine Crest',
  baseLevel: 645,
  itemId: 230936,
  itemQuality: 4,
}, {
  key: 'base662',
  name: 'Enchanted Gilded Undermine Crest',
  baseLevel: 662,
  itemId: 230935,
  itemQuality: 4,
  /*
}, {
  key: 'base408',
  name: 'Concentrated Primal Infusion',
  baseLevel: 408,
  itemId: 198046,
  itemQuality: 4,
  archive: true,
}, {
  key: 'base411',
  name: 'Spark of Shadowflame',
  baseLevel: 411,
  itemId: 204440,
  itemQuality: 4,
  archive: true,
}, {
  key: 'base424',
  name: 'Enchanted Wyrm\'s Shadowflame Crest',
  baseLevel: 424,
  itemId: 204682,
  itemQuality: 4,
  archive: true,
}, {
  key: 'base434',
  name: 'Enchanted Aspect\'s Shadowflame Crest',
  baseLevel: 434,
  itemId: 204697,
  itemQuality: 4,
  archive: true,
}, {
  key: 'base450',
  name: 'Spark of Dreams',
  baseLevel: 450,
  itemId: 206959,
  itemQuality: 4,
  archive: true,
}, {
  key: 'base463',
  name: 'Enchanted Wyrm\'s Dreaming Crest',
  baseLevel: 463,
  itemId: 206960,
  itemQuality: 4,
  archive: true,
}, {
  key: 'base473 ',
  name: 'Enchanted Aspect\'s Dreaming Crest',
  baseLevel: 473,
  itemId: 206961,
  itemQuality: 4,
  archive: true,
}, {

  // Season 4

  key: 'base489',
  name: 'Spark of Awakening',
  baseLevel: 489,
  itemId: 211516,
  itemQuality: 4,
}, {
  key: 'base502',
  name: 'Enchanted Wyrm\'s Awakened Crest',
  baseLevel: 502,
  itemId: 211518,
  itemQuality: 4,
}, {
  key: 'base512 ',
  name: 'Enchanted Aspect\'s Awakened Crest',
  baseLevel: 512,
  itemId: 211519,
  itemQuality: 4,
  */
}];

const professionDifficulties = (baseLevel, maxLevel = Infinity) =>
  _.filter(
    _.map(
      new Combinatorics.CartesianProduct(
        professionCraftingQualities,
        professionLevelUpgrades
      ).toArray(),
      ([craftingQuality, levelUpgrade]) => {
        const base = levelUpgrade.baseLevel || baseLevel;
        const level = base + craftingQuality.levelOffset;
        if (
          !levelUpgrade.baseLevel ||
          (baseLevel < levelUpgrade.baseLevel && level <= maxLevel)
        ) {
          return {
            id: `profession${baseLevel}-${level}-${_.camelCase(
              levelUpgrade.name
            )}`,
            type: `profession${baseLevel}`,
            name: `${levelUpgrade.name}, Quality ${craftingQuality.tier}`,
            itemLevelOverride: level,
            craftingQuality: craftingQuality.tier,
            archive: levelUpgrade.archive,

            itemId: levelUpgrade.itemId,
            itemQuality: levelUpgrade.itemQuality,
          };
        }
        return null;
      }
    )
  );

const PROFESSION_DIFFICULTIES = [
  ...professionDifficulties(515, 590),
  ...professionDifficulties(593),
];

/*
const isNewPrimalStormItem = item => {
  // remove the 10.0.5 items from the low level group
  const slot = slotMap[item.inventoryType];
  return _.includes(['neck', 'finger', 'trinket'], slot);
};

const isTrinket = item => slotMap[item.inventoryType] === 'trinket';
*/

export const DIFFICULTIES = [
  ...MPLUS_DIFFICULTIES,

  //...TIMEWALKING_DIFFICULTIES,

  {
    id: "dungeon-normal",
    type: "expansion-dungeon",
    nameCn: "普通",
    name: "Normal",
    quality: 3, // rare
    itemLevelOverride: 593,
    itemFilter: mythicPlusItemFilter,
    bonusIds: [
      7244, // rare
    ],
  },
  {
    id: "dungeon-heroic",
    type: "expansion-dungeon",
    nameCn: "英雄",
    name: "Heroic",
    quality: 3, // rare
    itemLevelOverride: 619,
    itemFilter: mythicPlusItemFilter,
    bonusIds: [
      7244, // rare
    ],
  },
  {
    id: "raid-lfr",
    type: "raid",
    nameCn: "随机",
    name: "Raid Finder",
    bonusIds: [
      4825, // Raid Finder
      4786, // epic
    ],
  },
  {
    id: "raid-normal",
    type: "raid",
    nameCn: "普通",
    name: "Normal",
    bonusIds: [
      4822, // Normal (doesn't actually do anything)
      4786, // epic
    ],
  },
  {
    id: "raid-heroic",
    type: "raid",
    nameCn: "英雄",
    name: "Heroic",
    bonusIds: [
      4799, // Heroic
      4786, // epic
    ],
  },
  {
    id: "raid-mythic",
    type: "raid",
    nameCn: "史诗",
    name: "Mythic",
    bonusIds: [
      4800, // Mythic
      4786, // epic
    ],

    /*
  }, {
    id: 'raid-lfr-fated',
    type: 'raid',
    name: 'Awakened Raid Finder',
    context: 83,
    bonusIds: [
      10884, // Awakened
      4786, // epic
    ],
    itemLevel: '480 - 489',

    levelSelectorSequence: 355,
  }, {
    id: 'raid-normal-fated',
    type: 'raid',
    name: 'Awakened Normal',
    context: 82,
    bonusIds: [
      10884, // Awakened
      4786, // epic
    ],
    itemLevel: '493 - 502',

    levelSelectorSequence: 356,
  }, {
    id: 'raid-heroic-fated',
    type: 'raid',
    name: 'Awakened Heroic',
    context: 84,
    bonusIds: [
      10884, // Awakened
      4786, // epic
    ],
    itemLevel: '506 - 515',

    levelSelectorSequence: 357,
  }, {
    id: 'raid-mythic-fated',
    type: 'raid',
    name: 'Awakened Mythic',
    context: 85,
    bonusIds: [
      10884, // Awakened
      4786, // epic
    ],
    itemLevel: '519 - 528',

    levelSelectorSequence: 358,
  */
  },
  {
    // PVP VENDORS

    id: "pvp-honor",
    type: "pvp-honor",
    name: "Base Level",
    quality: 2,
    itemLevelOverride: 558,
  },
  {
    id: "pvp-world-rare",
    type: "pvp-world",
    name: "Bloody Tokens",
    quality: 4,
    itemLevelOverride: 593,
    /*
  }, {
    id: 'pvp-world-epic',
    type: 'pvp-world',
    name: 'Trophy of Strife',
    itemLevelOverride: 593,
    bonusIds: [
      4786, // epic
    ],
    */
  },
  {
    id: "pvp-conquest",
    type: "pvp-conquest",
    name: "Base Level",
    itemLevelOverride: 597,
  },
  {
    id: "megadungeon-heroic",
    type: "megadungeon",
    name: "Heroic",
    itemLevelOverride: 476,
  },
  {
    id: "megadungeon-mythic",
    type: "megadungeon",
    name: "Mythic",
    itemLevelOverride: 493,
  },
  {
    id: "megadungeon-mythic-hard",
    type: "megadungeon",
    name: "Mythic Hard Mode",
    itemLevelOverride: 506,
    itemLevel: "506",
  },

  ..._.reject(
    _.map(
      _.uniqBy(MPLUS_DIFFICULTIES, "itemLevelOverride"),
      (itemLevelInfo) => ({
        id: `catalyst-${itemLevelInfo.itemLevelOverride}`,
        type: "catalyst",
        itemLevelOverride: itemLevelInfo.itemLevelOverride,
      })
    ),
    (diff) => !diff.itemLevelOverride
  ),

  ...PROFESSION_DIFFICULTIES,

  // Delves
  /*
  {
    id: 'delve-rare',
    type: 'delve-rare',
    name: 'Vendor',
    itemLevelOverride: 567,
    quality: 2,
  }, {
  */

  {
    id: "delve-epic-1",
    type: "delve-epic",
    name: "Tier 1",
    itemLevelOverride: 561,
    quality: 4,
  },
  {
    id: "delve-epic-2",
    type: "delve-epic",
    name: "Tier 2",
    itemLevelOverride: 564,
    quality: 4,
  },
  {
    id: "delve-epic-3",
    type: "delve-epic",
    name: "Tier 3",
    itemLevelOverride: 571,
    quality: 4,
  },
  {
    id: "delve-epic-4",
    type: "delve-epic",
    name: "Tier 4",
    itemLevelOverride: 577,
    quality: 4,
  },
  {
    id: "delve-epic-5",
    type: "delve-epic",
    name: "Tier 5",
    itemLevelOverride: 584,
    quality: 4,
  },
  {
    id: "delve-epic-6",
    type: "delve-epic",
    name: "Tier 6",
    itemLevelOverride: 590,
    quality: 4,
  },
  {
    id: "delve-epic-7",
    type: "delve-epic",
    name: "Tier 7",
    itemLevelOverride: 597,
    quality: 4,
  },
  {
    id: "delve-epic-8",
    type: "delve-epic",
    name: "Tier 8",
    itemLevelOverride: 603,
    quality: 4,
  },
  {
    id: "delve-epic-9",
    type: "delve-epic",
    name: "Tier 9",
    itemLevelOverride: 603,
    quality: 4,
  },
  {
    id: "delve-epic-10",
    type: "delve-epic",
    name: "Tier 10",
    itemLevelOverride: 603,
    quality: 4,
  },
  {
    id: "delve-epic-11",
    type: "delve-epic",
    name: "Tier 11",
    itemLevelOverride: 603,
    quality: 4,
  },
  {
    id: "delve-epic-vault6",
    type: "delve-epic",
    name: "Vault - Tier 6",
    itemLevelOverride: 606,
    quality: 4,
  },
  {
    id: "delve-epic-vault7",
    type: "delve-epic",
    name: "Vault - Tier 7",
    itemLevelOverride: 610,
    quality: 4,
  },
  {
    id: "delve-epic-vault8",
    type: "delve-epic",
    name: "Vault - Tier 8-11",
    itemLevelOverride: 616,
    quality: 4,
  },

  /*
  {
    id: 'primalStorms-rare',
    type: 'primalStorms',
    name: 'Level 1',
    itemLevelOverride: 359,
    quality: 3,
    itemFilter: (item) => !isNewPrimalStormItem(item),
  }, {
    id: 'primalStorms-epic',
    type: 'primalStorms',
    name: 'Level 2',
    quality: 4,
    itemLevelOverride: 385,
    bonusIds: [
      8943, // "Primal Infused" tag
    ],
    itemFilter: (item) => !isNewPrimalStormItem(item),
  }, {
    id: 'primalStorms-389',
    type: 'primalStorms',
    name: 'Rings, Neck, Trinket',
    quality: 4,
    itemLevelOverride: 389,
    bonusIds: [
      8943, // "Primal Infused" tag
    ],
    itemFilter: (item) => isNewPrimalStormItem(item),
  }, {
    id: 'primalStorms-3',
    type: 'primalStorms',
    name: 'Level 3',
    quality: 4,
    itemLevelOverride: 395,
    bonusIds: [
      // this is a guess, seems logical
      9378, // "Primal Empowered" tag
    ],
    itemFilter: (item) => !isNewPrimalStormItem(item),
  }, {

    id: 'timeRifts-flakes',
    type: 'solo',
    name: 'Trinkets',
    quality: 4,
    itemLevelOverride: 454,
    itemFilter: isTrinket,
  }, {
    id: 'timeRifts',
    type: 'solo',
    name: 'Weapons/Armor',
    quality: 4,
    itemLevelOverride: 467,
    itemFilter: item => !isTrinket(item),
  }, {

    // dreamsurge 402

    id: 'dreamsurges-rare',
    type: 'dreamsurges',
    name: 'Dreamsurges',
    quality: 3,
    itemLevelOverride: 454,
  }, {

    // dreamsurge 415
    id: 'dreamsurges-epic',
    type: 'dreamsurges',
    name: 'Dreamsurges',
    quality: 4,
    itemLevelOverride: 467,
  }, {

    // DF Season 4 Vendor

    id: 'raid-vendor-season4',
    type: 'raid-vendor-season4',
    name: 'Raid Vendor Season 4',
    quality: 4,
    itemLevelOverride: 493,
  },
  */
];

export const INSTANCE_OVERRIDES = [
  {
    /////////////////////////////////////////////////////////////////////////////////
    //
    // 11.1
    //
    /////////////////////////////////////////////////////////////////////////////////

    // 11.1 Liberation of Undermine
    instanceId: 1296,
    season: "tww2",
    levelSelectorSetUpgradeTrack: true,
  },
  {
    // 11.1 has a Mechagon wing in M+. This hides the full Mechagon from the Droptimizer list
    instanceId: 1178,
    disabled: true,
  },
  {
    // MYTHIC+ END OF DUNGEON CHEST
    instanceId: -1,
    season: "tww2",

    showEncounters: true,

    encounterType: "dungeon",
    encounterTypePlural: "dungeons",
    encounterAllId: -1,

    enableSockets: true,
    repeatable: true,
  },
  {
    // Normal/Heroic/M0 Dungeons
    instanceId: -32,
    season: "tww2",

    showEncounters: true,

    encounterType: "dungeon",
    encounterTypePlural: "dungeons",
    encounterAllId: -32,

    enableSockets: true,
    repeatable: true,
  },
  {
    instanceId: FAKE_INSTANCE_IDS.delveEpicsWarWithinSeason1,
    season: "tww2",
  },
  {
    // Season 2 PVP Conquest
    instanceId: FAKE_INSTANCE_IDS.pvpConquestWarWithinSeason2,
    season: "tww2",

    showChances: false,
    disableDifficulties: true,
  },
  {
    // Season 2 PVP Honor
    instanceId: FAKE_INSTANCE_IDS.pvpHonorWarWithinSeason2,
    season: "tww2",

    showChances: false,
    disableDifficulties: true,
  },
  {
    // Season 2 PVP World
    instanceId: FAKE_INSTANCE_IDS.pvpWorldWarWithinSeason2,
    season: "tww2",

    showChances: false,
    disableDifficulties: true,
  },
  {
    /////////////////////////////////////////////////////////////////////////////////
    //
    // 11.0.5
    //
    /////////////////////////////////////////////////////////////////////////////////

    // 11.0.5 Blackrock Depths
    instanceId: 1301,
    season: "tww1",
    levelSelectorSetUpgradeTrack: true,

    archive: true,
  },
  {
    /////////////////////////////////////////////////////////////////////////////////
    //
    // THE WAR WITHIN RELEASE 11.0.2
    //
    /////////////////////////////////////////////////////////////////////////////////

    // 11.0 CATALYST - tier upgrader
    instanceId: FAKE_INSTANCE_IDS.catalystWarWithinSeason1,
    season: "tww1",

    archive: true,

    disableWarforgeLevel: true,

    enableSockets: true,

    showChances: false,
  },
  {
    // TWW WORLD BOSSES
    instanceId: 1278,
    season: "tww1",
    disableDifficulties: true,

    itemLevelOverride: 603,

    enableSockets: true,
  },
  {
    // 11.0 Nerub-ar Palace
    instanceId: 1273,
    season: "tww1",
    levelSelectorSetUpgradeTrack: true,

    archive: true,
  },
  {
    // PROFESSIONS Epic items
    instanceId: FAKE_INSTANCE_IDS.warWithinProfessionsEpic,
    disableDifficulties: false,

    showEncounters: false,

    encounterType: "profession",
    encounterTypePlural: "professions",
    encounterAllId: FAKE_INSTANCE_IDS.warWithinProfessionsEpic,

    showChances: false,

    enableSockets: true,

    // NOT seasonal gear
    season: "",
  },
  {
    // PROFESSIONS rare items
    instanceId: FAKE_INSTANCE_IDS.warWithinProfessionsRare,
    disableDifficulties: false,

    showEncounters: false,

    encounterType: "profession",
    encounterTypePlural: "professions",
    encounterAllId: FAKE_INSTANCE_IDS.warWithinProfessionsRare,

    showChances: false,

    enableSockets: true,

    // NOT seasonal gear
    season: "",
  },
  {
    // Season 1 PVP Conquest
    instanceId: FAKE_INSTANCE_IDS.pvpConquestWarWithinSeason1,
    season: "tww1",

    showChances: false,
    disableDifficulties: true,

    archive: true,
  },
  {
    // Season 1 PVP Honor
    instanceId: FAKE_INSTANCE_IDS.pvpHonorWarWithinSeason1,
    season: "tww1",

    showChances: false,
    disableDifficulties: true,

    archive: true,
  },
  {
    // Season 1 PVP World
    instanceId: FAKE_INSTANCE_IDS.pvpWorldWarWithinSeason1,
    season: "tww1",

    showChances: false,
    disableDifficulties: true,

    archive: true,
  },
  {
    /////////////////////////////////////////////////////////////////////////////////
    //
    // Dragonflight
    //
    /////////////////////////////////////////////////////////////////////////////////

    //////////////////////////////////////
    // Dragonflight Season 4
    //////////////////////////////////////

    // 10.2 CATALYST - tier upgrader
    instanceId: -46,
    season: "df4",

    disableWarforgeLevel: true,

    enableSockets: true,

    showChances: false,
  },
  {
    // Season 4 PVP Conquest
    instanceId: -60,
    season: "df4",

    showChances: false,
    disableDifficulties: true,
  },
  {
    // Season 4 PVP Honor
    instanceId: -59,
    season: "df4",

    showChances: false,
    disableDifficulties: true,
  },
  {
    // Season 4 PVP World
    instanceId: -61,
    season: "df4",

    showChances: false,
  },
  {
    //////////////////////////////////////
    // Dragonflight Season 3
    //////////////////////////////////////

    // 10.2 Amirdrassil
    instanceId: 1207,
    season: "df4",

    archive: true,
  },
  {
    // 10.2 PVP Conquest
    instanceId: -53,
    season: "df3",

    showChances: false,
    disableDifficulties: true,

    archive: true,
  },
  {
    // 10.2 PVP Honor
    instanceId: -52,
    season: "df3",

    showChances: false,
    disableDifficulties: true,

    archive: true,
  },
  {
    // 10.2 PVP World
    instanceId: -57,
    season: "df3",

    showChances: false,

    archive: true,
  },
  {
    // Dreamsurges have been bumped to season 4
    instanceId: -51,
    season: "df4",
  },
  {
    // Time Rifts have been bumped to season 4
    instanceId: -50,
    season: "df4",
  },
  {
    //////////////////////////////////////
    // Dragonflight Season 2
    //////////////////////////////////////

    // Dawn of the Infinite was originally season 2. Items are now season 3 track
    instanceId: 1209,
    season: "df4",
  },
  {
    // 10.1 Aberrus
    instanceId: 1208,
    season: "df4",
    archive: false,
  },
  {
    // 10.1 PVP Conquest
    instanceId: -47,
    season: "df2",

    showChances: false,

    archive: true,
  },
  {
    // 10.1 PVP Honor
    instanceId: -48,
    season: "df2",

    showChances: false,

    archive: true,
  },
  {
    //////////////////////////////////////
    // Dragonflight Season 1
    //////////////////////////////////////

    // 10.0 PVP Conquest
    instanceId: -31,
    season: "df1",

    showChances: false,

    archive: true,
  },
  {
    // 10.0 PVP Honor
    instanceId: -30,
    season: "df1",

    showChances: false,

    archive: true,
  },
  {
    // 10.0 Vault of the Incarnates raid
    instanceId: 1200,
    season: "df4",

    archive: false,
  },
  {
    // 10.0 PRIMAL STORMS
    instanceId: -45,
    season: "df1",

    showEncounters: false,

    enableSockets: false,

    showChances: false,

    archive: true,
  },
  {
    // PROFESSIONS 382 items
    instanceId: -42,
    disableDifficulties: false,

    showEncounters: false,

    encounterType: "profession",
    encounterTypePlural: "professions",
    encounterAllId: -42,

    showChances: false,

    enableSockets: true,

    // NOT seasonal gear
    season: "",
  },
  {
    // PROFESSIONS 333 items
    instanceId: -41,
    disableDifficulties: false,

    showEncounters: false,

    encounterType: "profession",
    encounterTypePlural: "professions",
    encounterAllId: -41,

    showChances: false,

    enableSockets: true,

    warning: {
      text: "306 items and Titan Training Matrix I infusions are not supported",
    },

    // NOT seasonal gear
    season: "",

    archive: true,
  },
  {
    // DF WORLD BOSSES
    instanceId: 1205,
    season: "df3",
    disableDifficulties: true,

    itemLevelOverride: 395,

    enableSockets: true,
  },
];

export const SEASONS = {
  tww2: {
    seasonId: 25,

    disableWarforgeLevel: true,
    enableSockets: true,

    itemConversion: {
      id: 10,
      minLevel: 623, // TODO: This is a guess based on lowest level of LFR drops
    },
  },
  tww1: {
    seasonId: 24,

    disableWarforgeLevel: true,
    enableSockets: true,

    itemConversion: {
      id: 8,
      minLevel: 584, // TODO: This is a guess based on lowest level of LFR drops
    },
  },
  df4: {
    seasonId: 23,

    disableWarforgeLevel: true,
    enableSockets: true,

    // Dragonflight season 4 Catalyst conversion
    itemConversion: {
      id: 9,
      minLevel: 480, // TODO: This is a guess based on lowest level of LFR drops
    },
  },
  df3: {
    seasonId: 22,

    disableWarforgeLevel: true,
    enableSockets: true,

    // Dragonflight season 3 Catalyst conversion
    itemConversion: {
      id: 7,
      minLevel: 441, // TODO: This is a guess based on lowest level of LFR drops
    },
  },
  df2: {
    disableWarforgeLevel: true,
    enableSockets: true,

    // Dragonflight season 2 Revival Catalyst conversion
    itemConversion: {
      id: 6,
      minLevel: 402, // TODO: This is a guess based on lowest level of LFR drops
    },
  },
  df1: {
    disableWarforgeLevel: true,
    enableSockets: true,

    // Dragonflight season 1 Revival Catalyst conversion
    itemConversion: {
      id: 3,
      minLevel: 376,
    },
  },
  // 9.2.7
  sl4: {
    disableWarforgeLevel: true,
    enableSockets: true,
  },
  // 9.2
  sl3: {
    disableWarforgeLevel: true,
    enableSockets: true,
  },
  // 9.1
  sl2: {
    disableWarforgeLevel: true,
    enableSockets: true,
  },
  // 9.0
  sl1: {
    disableWarforgeLevel: true,
  },
  bfa4: {
    disableWarforgeLevel: true,
  },
  bfa3: {
    warforgeMax: 455,
  },
  bfa2: {
    warforgeMax: 425,
  },
};

const OFFSET_INCREMENT = 13;

const OFFSET_LFR = -13;
const OFFSET_NORMAL = 0;
const OFFSET_HEROIC = 13;
const OFFSET_MYTHIC = 26;

// Some instances start their base item level at LFR?
const LFR_BASE_OFFSET_LFR = 0;
const LFR_BASE_OFFSET_NORMAL = 13;
const LFR_BASE_OFFSET_HEROIC = 26;
const LFR_BASE_OFFSET_MYTHIC = 39;

export const INSTANCE_DIFFICULTY_OVERRIDES = [
  {
    // 11.1 Liberation of Undermine

    instanceId: 1296,
    difficulty: "raid-lfr",
    itemLevel: "623 - 639",
    levelSelectorSequence: 439, // TWW2 Veteran
  },
  {
    instanceId: 1296,
    difficulty: "raid-normal",
    itemLevel: "636 - 652",
    levelSelectorSequence: 440, // TWW2 Champion
  },
  {
    instanceId: 1296,
    difficulty: "raid-heroic",
    itemLevel: "649 - 665",
    levelSelectorSequence: 441, // TWW2 Hero
  },
  {
    instanceId: 1296,
    difficulty: "raid-mythic",
    itemLevel: "662 - 678",
    levelSelectorSequence: 442, // TWW2 Myth
  },
  {
    // 11.0.5 Blackrock Depths

    instanceId: 1301,
    difficulty: "raid-lfr",
    itemLevel: "584 - 593",
    levelSelectorSequence: 331, // TWW1 Veteran
  },
  {
    instanceId: 1301,
    difficulty: "raid-normal",
    itemLevel: "597 - 606",
    levelSelectorSequence: 332, // TWW1 Champion
  },
  {
    instanceId: 1301,
    difficulty: "raid-heroic",
    itemLevel: "610 - 619",
    levelSelectorSequence: 333, // TWW1 Hero
  },
  {
    instanceId: 1301,
    difficulty: "raid-mythic",
    disable: true,
  },
  {
    // 11.0 Nerub-ar Palance
    // Item based level is 571 which is below LFR

    instanceId: 1273,
    difficulty: "raid-lfr",
    itemLevel: "584 - 600",
    itemLevelOffset: 1 * OFFSET_INCREMENT,
    levelSelectorSequence: 331, // TWW1 Veteran
  },
  {
    instanceId: 1273,
    difficulty: "raid-normal",
    itemLevel: "597 - 613",
    levelSelectorSequence: 332, // TWW1 Champion
  },
  {
    instanceId: 1273,
    difficulty: "raid-heroic",
    itemLevel: "610 - 626",
    levelSelectorSequence: 333, // TWW1 Hero
  },
  {
    instanceId: 1273,
    difficulty: "raid-mythic",
    itemLevel: "623 - 639",
    levelSelectorSequence: 334, // TWW1 Myth
  },
  {
    // 10.2 Amirdrassil

    instanceId: 1207,
    difficulty: "raid-lfr",
    itemLevel: "441 - 450",
    itemLevelOffset: LFR_BASE_OFFSET_LFR,
  },
  {
    instanceId: 1207,
    difficulty: "raid-normal",
    itemLevel: "454 - 463",
    itemLevelOffset: LFR_BASE_OFFSET_NORMAL,
  },
  {
    instanceId: 1207,
    difficulty: "raid-heroic",
    itemLevel: "467 - 476",
    itemLevelOffset: LFR_BASE_OFFSET_HEROIC,
  },
  {
    instanceId: 1207,
    difficulty: "raid-mythic",
    itemLevel: "480 - 489",
    itemLevelOffset: LFR_BASE_OFFSET_MYTHIC,
  },
  {
    // 10.1 Aberrus, the Shadowed Crucible

    instanceId: 1208,
    difficulty: "raid-lfr",
    itemLevel: "402 - 418",
    itemLevelOffset: OFFSET_LFR,
  },
  {
    instanceId: 1208,
    difficulty: "raid-normal",
    itemLevel: "415 - 431",
    itemLevelOffset: OFFSET_NORMAL,
  },
  {
    instanceId: 1208,
    difficulty: "raid-heroic",
    itemLevel: "428 - 444",
    itemLevelOffset: OFFSET_HEROIC,
  },
  {
    instanceId: 1208,
    difficulty: "raid-mythic",
    itemLevel: "441 - 457",
    itemLevelOffset: OFFSET_MYTHIC,
  },
  {
    // 10.0 Vault of the Incarnates

    instanceId: 1200,
    difficulty: "raid-lfr",
    itemLevel: "376 - 392",
    itemLevelOffset: -13,
  },
  {
    instanceId: 1200,
    difficulty: "raid-normal",
    itemLevel: "389 - 405",
    itemLevelOffset: 0,
  },
  {
    instanceId: 1200,
    difficulty: "raid-heroic",
    itemLevel: "402 - 418",
    itemLevelOffset: 13,
  },
  {
    instanceId: 1200,
    difficulty: "raid-mythic",
    itemLevel: "415 - 430",
    itemLevelOffset: 26,
  },
];

export const ENCOUNTER_OVERRIDES = [
  {
    // 11.1 Liberation of Undermine

    // 11.1 World Boss (Gobfather)
    encounterId: 2683,
    itemLevelOverride: 642,
    season: "tww2",
  },
  {
    // Vexie and the Geargrinders
    encounterId: 2639,
    encounterSequenceOffset: 0,
  },
  {
    // Cauldron of Carnage
    encounterId: 2640,
    encounterSequenceOffset: 1,
  },
  {
    // Rik Reverb
    encounterId: 2641,
    encounterSequenceOffset: 1,
  },
  {
    // Stix Bunkjunker
    encounterId: 2642,
    encounterSequenceOffset: 2,
  },
  {
    // Sprocketmonger Lockenstock
    encounterId: 2653,
    encounterSequenceOffset: 2,
    encounterVeryRareSequenceOffset: 3,
  },
  {
    // The One-Armed Bandit
    encounterId: 2644,
    encounterSequenceOffset: 2,
    encounterVeryRareSequenceOffset: 3,
  },
  {
    // Mug'Zee, Heads of Security
    encounterId: 2645,
    encounterSequenceOffset: 3,
    encounterVeryRareSequenceOffset: 3,
  },
  {
    // Chrome King Gallywix
    encounterId: 2646,
    encounterSequenceOffset: 3,
    encounterVeryRareSequenceOffset: 2,
  },
  {
    // 11.0.5 Blackrock Depths

    // Lord Roccor
    encounterId: 2663,
    encounterSequenceOffset: 0,
  },
  {
    // Bael'Gar
    encounterId: 2664,
    encounterSequenceOffset: 0,
  },
  {
    // Lord Incendius
    encounterId: 2665,
    encounterSequenceOffset: 1,
  },
  {
    // Golem Lord Argelmach
    encounterId: 2666,
    encounterSequenceOffset: 1,
  },
  {
    // The Seven
    encounterId: 2667,
    encounterSequenceOffset: 1,
  },
  {
    // General Angerforge
    encounterId: 2668,
    encounterSequenceOffset: 2,
  },
  {
    // Ambassador Flamelash
    encounterId: 2669,
    encounterSequenceOffset: 2,
  },
  {
    // Emperor Dagran Thaurissan
    encounterId: 2670,
    encounterSequenceOffset: 3,
  },
  {
    // 11.0 Nerub-ar Palance

    // Trash drops
    encounterId: FAKE_ENCOUNTER_IDS.boeNerubarTrash,
    encounterSequenceOffset: 2,
  },
  {
    // Ulgrax
    encounterId: 2607,
    encounterSequenceOffset: 0,
  },
  {
    // Bloodbound Horror
    encounterId: 2611,
    encounterSequenceOffset: 0,
  },
  {
    // Sikran
    encounterId: 2599,
    encounterSequenceOffset: 1,
    encounterVeryRareSequenceOffset: 4,
  },
  {
    // Rasha'nan
    encounterId: 2609,
    encounterSequenceOffset: 1,
    encounterVeryRareSequenceOffset: 4,
  },
  {
    // Broodtwister
    encounterId: 2612,
    encounterSequenceOffset: 2,
  },
  {
    // Nexus-Princess Ky'veza
    encounterId: 2601,
    encounterSequenceOffset: 2,
    encounterVeryRareSequenceOffset: 3,
  },
  {
    // The Silken Court
    encounterId: 2608,
    encounterSequenceOffset: 3,
  },
  {
    // Queen Ansurek
    encounterId: 2602,
    encounterSequenceOffset: 3,
    encounterVeryRareSequenceOffset: 2,
  },
  {
    // Awakened Raid stuff, wasn't needed when the raid originally came out

    // Vault of the Incarnates

    // Eranog
    encounterId: 2480,
    encounterSequenceOffset: 0,
  },
  {
    // Terros
    encounterId: 2500,
    encounterSequenceOffset: 0,
  },
  {
    // The Primal Council
    encounterId: 2486,
    encounterSequenceOffset: 0,
  },
  {
    // Sennarth
    encounterId: 2482,
    encounterSequenceOffset: 0,
  },
  {
    // Dathea
    encounterId: 2502,
    encounterSequenceOffset: 2,
  },
  {
    // Kurog
    encounterId: 2491,
    encounterSequenceOffset: 2,
  },
  {
    // Broodkeeper Diurna
    encounterId: 2493,
    encounterSequenceOffset: 3,
  },
  {
    // Raszageth
    encounterId: 2499,
    encounterSequenceOffset: 3,
  },
  {
    // Aberrus

    // Kazzara
    encounterId: 2522,
  },
  {
    // Forgotten Experiments
    encounterId: 2530,
    encounterSequenceOffset: 1,
  },
  {
    // Rashok
    encounterId: 2525,
    encounterSequenceOffset: 1,
  },
  {
    // Zskarn
    encounterId: 2532,
    encounterSequenceOffset: 2,
  },
  {
    // Magmorax
    encounterId: 2527,
    encounterSequenceOffset: 2,
  },
  {
    // Echo of Neltharion
    encounterId: 2523,
    encounterSequenceOffset: 3,
  },
  {
    // Sarkareth
    encounterId: 2520,
    encounterSequenceOffset: 3,
  },
  {
    // 10.2 Amirdrassil
    // Back to manually editing item level offsets for each encounter :(

    // Volcoross
    encounterId: 2557,
    encounterSequenceOffset: 1,
  },
  {
    // Council of Dreams
    encounterId: 2555,
    encounterSequenceOffset: 1,
  },
  {
    // Larodar, Keeper of the Flame
    encounterId: 2553,
    encounterSequenceOffset: 2,
  },
  {
    // Nymue, Weaver of the Cycle
    encounterId: 2556,
    encounterSequenceOffset: 2,
    encounterVeryRareSequenceOffset: 1,
  },
  {
    // Smolderon
    encounterId: 2563,
    encounterSequenceOffset: 2,
  },
  {
    // Tindral Sageswift
    encounterId: 2565,
    encounterSequenceOffset: 3,
  },
  {
    // Fyrakk
    encounterId: 2519,
    encounterSequenceOffset: 3,
  },
  {
    // Dawn of the Infinite hard mode last boss
    /*
  encounterId: 2538,
  difficulty: 'megadungeon-heroic-hard',
  itemLevelOverride: 480,
}, {
  encounterId: 2538,
  difficulty: 'megadungeon-mythic-hard',
  itemLevelOverride: 506,
}, {
*/

    // 10.2 Aurostor, the Hibernator
    encounterId: 2562,
    itemLevelOverride: 460,
    season: "df3",
  },
  {
    // Zaqali Elders world boss
    encounterId: 2531,
    itemLevelOverride: 415,
    season: "df2",

    /*
{
  ///////////////////////////////////////////////
  // 9.2.7 FATED RAIDS
  // Also simplify fixed increased ilevel bosses

  // THE JAILER
  encounterId: 2464,
  encounterLevelOffset: 7,
}, {
  // RYGELON
  encounterId: 2467,
  encounterLevelOffset: 7,
}, {
  // LORDS OF DREAD
  encounterId: 2457,
  encounterLevelOffset: 7,
}, {
  // SANCTUM OF DOMINATION
  // KEL'THUZAD
  encounterId: 2440,
  encounterLevelOffset: 7,
}, {
  // SYLVANAS WINDRUNNER
  encounterId: 2441,
  encounterLevelOffset: 7,
}, {
  // CASTLE NATHRIA
  // STONE LEGION GENERALS
  encounterId: 2425,
  encounterLevelOffset: 7,
}, {
  // SIRE DENATHRIUS
  encounterId: 2424,
  encounterLevelOffset: 7,
},
*/
  },
];

export const INSTANCE_ITEM_OVERRIDES = [
  {
    // Season 4 Raid Vendor items that have higher upgrade tracks

    // Blossom of Amirdrassil
    instanceId: -58,
    itemId: 207171,
    upgradeSet: 382,
  },
  {
    // Augury of the Primal Flame
    instanceId: -58,
    itemId: 208614,
    upgradeSet: 382,
  },
  {
    // Fyrakk's Tainted Rageheart
    instanceId: -58,
    itemId: 207174,
    upgradeSet: 382,
  },
  {
    // Neltharion's Call to Chaos
    instanceId: -58,
    itemId: 204201,
    upgradeSet: 382,
  },
  {
    // Neltharion's Call to Dominance
    instanceId: -58,
    itemId: 204202,
    upgradeSet: 382,
  },
  {
    // Neltharion's Call to Suffering
    instanceId: -58,
    itemId: 204211,
    upgradeSet: 382,
  },
  {
    // Voice of the Silent Star
    instanceId: -58,
    itemId: 204465,
    upgradeSet: 382,
  },
  {
    // Seal of Filial Duty
    instanceId: -58,
    itemId: 195526,
    upgradeSet: 382,
  },
  {
    // Neltharax, Enemy of the Sky
    instanceId: -58,
    itemId: 195527,
    upgradeSet: 382,
  },
  {
    // Nasz'uro, the Unbound Legacy
    instanceId: -58,
    itemId: 204177,
    upgradeSet: 382,
  },
  {
    // Fyr'alath the Dreamrender
    instanceId: -58,
    itemId: 206448,
    upgradeSet: 382,
  },
];

// export const getInstance = (instanceId) => _.find(Instances, { id: instanceId });
// export const getEncounter = (encounterId) => _.find(Encounters, { id: encounterId });
export const getDifficulty = (difficultyId) =>
  _.find(DIFFICULTIES, { id: difficultyId });
export const getSeason = (seasonId) => SEASONS[seasonId];

export const getOverrides = (instance, encounter, difficulty, itemId) => {
  // instance + encounter
  let encounterOverrides = [];
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
      encounter,
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
