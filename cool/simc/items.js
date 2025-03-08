import { SLOT_MAP, SOCKET_TYPES } from "./constants";
import { getSpecInfo } from "./character";
import _ from "lodash";
import { STATS } from "./stats";

const weaponClassDetailsRaw = [
  {
    // 1h axe
    itemClass: 2,
    itemSubClass: 0,
    specsCanDrop: [
      // str
      ["paladin", "protection"],
      ["warrior", "protection"],
      ["warrior", "fury"],
      ["deathknight", "frost"],

      // int
      ["paladin", "holy"],
      ["shaman", "elemental"],
      ["shaman", "restoration"],
      ["monk", "mistweaver"],
      ["evoker", "augmentation"],
      ["evoker", "devastation"],
      ["evoker", "preservation"],

      // agi
      ["demon_hunter", "havoc"],
      ["demon_hunter", "vengeance"],
      ["rogue", "outlaw"],
      ["shaman", "enhancement"],
      ["monk", "windwalker"],
      ["monk", "brewmaster"],
    ],
    specsAlsoCanUse: [["rogue", "assassination"]],
  },
  {
    // 2h axe
    itemClass: 2,
    itemSubClass: 1,
    specsCanDrop: [
      ["paladin", "retribution"],
      ["warrior", "fury"],
      ["warrior", "arms"],
      ["deathknight", "blood"],
      ["deathknight", "unholy"],
      ["deathknight", "frost"],
      ["hunter", "survival"],
      ["evoker", "augmentation"],
      ["evoker", "devastation"],
      ["evoker", "preservation"],
    ],
  },
  {
    // gun
    itemClass: 2,
    itemSubClass: 2,
    hand: "2h",
    specsCanDrop: [
      ["hunter", "beast_mastery"],
      ["hunter", "marksmanship"],
    ],
  },
  {
    // gun
    itemClass: 2,
    itemSubClass: 3,
    hand: "2h",
    specsCanDrop: [
      ["hunter", "beast_mastery"],
      ["hunter", "marksmanship"],
    ],
  },
  {
    // 1h mace
    itemClass: 2,
    itemSubClass: 4,
    specsCanDrop: [
      // tanks
      ["paladin", "protection"],
      ["warrior", "fury"],
      ["warrior", "protection"],
      ["deathknight", "frost"],

      // casters/healers
      ["paladin", "holy"],
      ["druid", "balance"],
      ["druid", "restoration"],
      ["priest", "discipline"],
      ["priest", "holy"],
      ["priest", "shadow"],
      ["shaman", "elemental"],
      ["shaman", "restoration"],
      ["monk", "mistweaver"],
      ["evoker", "devastation"],
      ["evoker", "augmentation"],
      ["evoker", "preservation"],

      // agi
      ["rogue", "outlaw"],
      ["shaman", "enhancement"],
      ["monk", "windwalker"],
      ["monk", "brewmaster"],
    ],
  },
  {
    // 2h mace
    itemClass: 2,
    itemSubClass: 5,
    specsCanDrop: [
      ["paladin", "retribution"],
      ["warrior", "fury"],
      ["warrior", "arms"],
      ["deathknight", "blood"],
      ["deathknight", "unholy"],
      ["deathknight", "frost"],
      ["shaman", "elemental"],
      ["druid", "balance"],
      ["druid", "restoration"],
      ["evoker", "preservation"],
      ["evoker", "devastation"],
      ["evoker", "augmentation"],
    ],
  },
  {
    // polearm
    itemClass: 2,
    itemSubClass: 6,
    specsCanDrop: [
      // agi
      ["druid", "feral"],
      ["druid", "guardian"],
      ["hunter", "survival"],
      ["monk", "windwalker"],
      ["monk", "brewmaster"],

      // str
      ["paladin", "retribution"],
      ["warrior", "arms"],
      ["warrior", "fury"],
      ["deathknight", "blood"],
      ["deathknight", "unholy"],
      ["deathknight", "frost"],
    ],
    specsAlsoCanUse: [["druid", "balance"]],
  },
  {
    // 1h sword
    itemClass: 2,
    itemSubClass: 7,
    specsCanDrop: [
      // tank
      ["paladin", "protection"],
      ["warrior", "fury"],
      ["warrior", "protection"],
      ["deathknight", "frost"],

      // agi sword
      ["rogue", "outlaw"],
      ["monk", "windwalker"],
      ["monk", "brewmaster"],
      ["demon_hunter", "havoc"],
      ["demon_hunter", "vengeance"],
      ["evoker", "devastation"],
      ["evoker", "augmentation"],
      ["evoker", "preservation"],

      // int sword
      ["mage", "arcane"],
      ["mage", "fire"],
      ["mage", "frost"],
      ["paladin", "holy"],
      ["warlock", "affliction"],
      ["warlock", "demonology"],
      ["warlock", "destruction"],
      ["monk", "mistweaver"],
    ],
    specsAlsoCanUse: [["rogue", "assassination"]],
  },
  {
    // 2h sword
    itemClass: 2,
    itemSubClass: 8,
    specsCanDrop: [
      ["paladin", "retribution"],
      ["warrior", "fury"],
      ["warrior", "arms"],
      ["deathknight", "blood"],
      ["deathknight", "unholy"],
      ["deathknight", "frost"],
      ["hunter", "survival"],
      ["evoker", "devastation"],
      ["evoker", "augmentation"],
      ["evoker", "preservation"],
    ],
  },
  {
    // warglaive
    itemClass: 2,
    itemSubClass: 9,
    specsCanDrop: [
      ["demon_hunter", "havoc"],
      ["demon_hunter", "vengeance"],
    ],
  },
  {
    // staff
    itemClass: 2,
    itemSubClass: 10,
    specsCanDrop: [
      // int
      ["mage", "arcane"],
      ["mage", "fire"],
      ["mage", "frost"],
      ["druid", "balance"],
      ["druid", "restoration"],
      ["priest", "discipline"],
      ["priest", "holy"],
      ["priest", "shadow"],
      ["shaman", "elemental"],
      ["shaman", "restoration"],
      ["warlock", "affliction"],
      ["warlock", "demonology"],
      ["warlock", "destruction"],
      ["monk", "mistweaver"],
      ["evoker", "devastation"],
      ["evoker", "augmentation"],
      ["evoker", "preservation"],

      // agi
      ["druid", "feral"],
      ["druid", "guardian"],
      ["hunter", "survival"],
      ["monk", "windwalker"],
      ["monk", "brewmaster"],
    ],
    specsAlsoCanUse: [
      ["warrior", "arms"],
      ["warrior", "fury"],
    ],
  },
  {
    // fist
    itemClass: 2,
    itemSubClass: 13,
    specsCanDrop: [
      // agi
      ["rogue", "outlaw"],
      ["shaman", "enhancement"],
      ["monk", "windwalker"],
      ["monk", "brewmaster"],
      ["demon_hunter", "havoc"],
      ["demon_hunter", "vengeance"],

      ["evoker", "devastation"],
      ["evoker", "augmentation"],
      ["evoker", "preservation"],

      ["druid", "balance"],
      ["druid", "feral"],
      ["druid", "guardian"],
      ["druid", "restoration"],
    ],
    specsAlsoCanUse: [["shaman", "elemental"]],
  },
  {
    // dagger
    itemClass: 2,
    itemSubClass: 15,
    specsCanDrop: [
      // int
      ["mage", "arcane"],
      ["mage", "fire"],
      ["mage", "frost"],
      ["druid", "balance"],
      ["druid", "restoration"],
      ["priest", "discipline"],
      ["priest", "holy"],
      ["priest", "shadow"],
      ["shaman", "elemental"],
      ["shaman", "restoration"],
      ["warlock", "affliction"],
      ["warlock", "demonology"],
      ["warlock", "destruction"],
      ["evoker", "devastation"],
      ["evoker", "augmentation"],
      ["evoker", "preservation"],

      // agi
      ["rogue", "assassination"],
      ["rogue", "subtlety"],
    ],
    specsAlsoCanUse: [["rogue", "outlaw"]],
  },
  {
    // bow/crossbow
    itemClass: 2,
    itemSubClass: 18,
    hand: "2h",
    specsCanDrop: [
      ["hunter", "beast_mastery"],
      ["hunter", "marksmanship"],
    ],
  },
  {
    // wand
    itemClass: 2,
    itemSubClass: 19,
    hand: "mh",
    specsCanDrop: [
      ["mage", "arcane"],
      ["mage", "fire"],
      ["mage", "frost"],
      ["priest", "discipline"],
      ["priest", "holy"],
      ["priest", "shadow"],
      ["warlock", "affliction"],
      ["warlock", "demonology"],
      ["warlock", "destruction"],
    ],
  },
  {
    // misc (off hands, tomes)
    itemClass: 4,
    itemSubClass: 0,
    hand: "oh",
    noEnchant: true,
    specsCanDrop: [
      ["mage", "arcane"],
      ["mage", "fire"],
      ["mage", "frost"],
      ["paladin", "holy"],
      ["druid", "balance"],
      ["druid", "restoration"],
      ["priest", "discipline"],
      ["priest", "holy"],
      ["priest", "shadow"],
      ["warlock", "affliction"],
      ["warlock", "demonology"],
      ["warlock", "destruction"],
      ["monk", "mistweaver"],
      ["evoker", "devastation"],
      ["evoker", "augmentation"],
      ["evoker", "preservation"],
    ],
    specsAlsoCanUse: [["shaman", "elemental"]],
  },
  {
    // shield
    itemClass: 4,
    itemSubClass: 6,
    hand: "oh",
    noEnchant: true,
    specsCanDrop: [
      ["paladin", "holy"],
      ["paladin", "protection"],
      ["warrior", "protection"],
      ["shaman", "elemental"],
      ["shaman", "restoration"],
    ],
  },
];

const mainStatMap = {
  agi: ["STAT_AGILITY", "STAT_AGI_INT", "STAT_STR_AGI", "STAT_STR_AGI_INT"],
  int: ["STAT_INTELLECT", "STAT_AGI_INT", "STAT_STR_INT", "STAT_STR_AGI_INT"],
  str: ["STAT_STRENGTH", "STAT_STR_AGI", "STAT_STR_INT", "STAT_STR_AGI_INT"],
};

export const secondaryBonuses = [
  {
    bonusId: 603,
    stat: "crit",
    name: "Crit",
  },
  {
    bonusId: 604,
    stat: "haste",
    name: "Haste",
  },
  {
    bonusId: 605,
    stat: "mastery",
    name: "Mastery",
  },
  {
    bonusId: 607,
    stat: "vers",
    name: "Versatility",
  },
];

export const CRAFTED_STATS = [
  {
    id: 32,
    name: "crit",
  },
  {
    id: 36,
    name: "haste",
  },
  {
    id: 49,
    name: "mastery",
  },
  {
    id: 40,
    name: "vers",
  },
];

/**
 * CRAFTED_STATS中的对象两两组合
 */
export const getStatCombos = () => {
  let statCombos = [];
  CRAFTED_STATS.forEach((s1) => {
    CRAFTED_STATS.filter((s2) => s2.id !== s1.id).forEach((s2) => {
      statCombos.push({
        id: `${s1.id}/${s2.id}`,
        name: `${s1.name}/${s2.name}`,
        value: `${s1.id}/${s2.id}`,
        stats: [s1.id, s2.id],
        names: [s1.name, s2.name],
      });
    });
  });
  return statCombos;
};

export const EMBELLISHED_REAGENT_SLOT_IDS = [
  // Dragonflight
  112, 123, 178, 179, 180, 226, 233,

  // The War Within
  //202, // Darkmoon Sigils?
  281, 312, 334, 340, 341,
];

// TODO: Figure out where this is encoded in game data
// ItemBonusListGroup 296 looks to collect these in 10.1 but I can't figure out a map back to crafting
export const professionCraftingQualities = [
  {
    tier: 1,
    levelOffset: 0,
    bonusId: 9623,
  },
  {
    tier: 2,
    levelOffset: 3,
    bonusId: 9624,
  },
  {
    tier: 3,
    levelOffset: 6,
    bonusId: 9625,
  },
  {
    tier: 4,
    levelOffset: 9,
    bonusId: 9626,
  },
  {
    tier: 5,
    levelOffset: 13,
    bonusId: 9627,
  },
];

// map each crafted item back to the main crest
export const CRAFTING_CURRENCY_ALTERNATE = {
  // Enchanted Weathered Harbinger Crest
  224069: {
    id: 2914,
    amount: 30,
    type: "currency",
    name: "Weathered Harbinger Crest",
    icon: "inv_crestupgrade_xalatath_weathered",
  },
  // Enchanted Runed Harbinger Crest
  224072: {
    id: 2916,
    amount: 45,
    type: "currency",
    name: "Runed Harbinger Crest",
    icon: "inv_crestupgrade_xalatath_runed",
  },
  // Enchanted Gilded Harbinger Crest
  224073: {
    id: 2917,
    amount: 60, // 11.0.7
    type: "currency",
    name: "Gilded Harbinger Crest",
    icon: "inv_crestupgrade_xalatath_gilded",
  },
};

export const WARBAND_CREST_DISCOUNT_AMOUNT = 1 / 3;
export const WARBAND_CREST_DISCOUNT_ACHIEVEMENT = {
  2914: 40107, // Weathered
  2915: 40115, // Carved
  2916: 40118, // Runed
  2917: 40939, // Gilded
};

const seasonUpgradeNames = new Set([
  "Explorer",
  "Adventurer",
  "Veteran",
  "Champion",
  "Hero",
  "Myth",
]);

const ROLLABLE_SOCKET_TYPES = [SOCKET_TYPES.PRISMATIC];

const ITEMS_NO_DYNAMIC_SOCKET = [
  // pocket-sized computation device
  167555,
];

// max sockets on one piece of gear
export const MAX_ITEM_SOCKETS = 3;

// Seasonal maximum sockets per slot
export const SLOT_SOCKETS = {
  neck: 2,
  finger: 2,
  head: 1,
  wrist: 1,
  waist: 1,
};

// slots that can always get sockets from crafting, not gated by drop chance or limited currency
export const SLOT_SOCKETS_UNGATED = ["neck", "finger", "finger1", "finger2"];

// max sockets on a valid gearset
// Ignores PVP sockets from The War Within
export const MAX_TOTAL_SOCKETS = _.reduce(
  SLOT_SOCKETS,
  (res, num, slot) => {
    if (slot === "finger" || slot === "trinket") {
      return res + 2 * num;
    }
    return res + num;
  },
  0
);

export const SOCKET_DISABLE_BONUSES = [
  7756, // Timewarped
];

export const slotMap = SLOT_MAP;

export const armorSubClasses = [
  {
    itemSubClass: 0,
    key: "misc",
    name: "Misc",
  },
  {
    itemSubClass: 1,
    key: "cloth",
    name: "Cloth",
  },
  {
    itemSubClass: 2,
    key: "leather",
    name: "Leather",
  },
  {
    itemSubClass: 3,
    key: "mail",
    name: "Mail",
  },
  {
    itemSubClass: 4,
    key: "plate",
    name: "Plate",
  },
  {
    itemSubClass: 6,
    key: "shield",
    name: "Shield",
  },
];

const mainStatIdMap = _.mapValues(mainStatMap, (statEnums) =>
  _.map(statEnums, (enumName) =>
    _.get(_.find(STATS, { enum: enumName }), "dataId")
  )
);

const allMainStats = _.flatten(_.values(mainStatIdMap));

export const invertedSlotMap = _.mapValues(_.invert(slotMap), (slotId) =>
  parseInt(slotId, 10)
);

const itemHasAnyMainStat = (item) => {
  let hasStat = false;
  _.each(item.stats, (stat) => {
    hasStat = hasStat || _.includes(allMainStats, stat.id);
  });
  return hasStat;
};

const itemHasMainStat = (item, mainStatShortName) => {
  let hasStat = false;
  _.each(item.stats, (stat) => {
    hasStat = hasStat || _.includes(mainStatIdMap[mainStatShortName], stat.id);
  });
  return hasStat;
};

const weaponClassDetails = _.map(weaponClassDetailsRaw, (details) => {
  const specsCanDrop = _.map(details.specsCanDrop, (spec) =>
    _.get(getSpecInfo(spec[0], spec[1]), "id")
  );
  const specsCanUse = _.union(
    specsCanDrop,
    _.map(details.specsAlsoCanUse, (spec) =>
      _.get(getSpecInfo(spec[0], spec[1]), "id")
    )
  );
  return {
    ...details,
    specsCanDrop,
    specsCanUse,
  };
});

export const getItemSlotName = (item) => SLOT_MAP[item.inventoryType];
export const itemNotUsableReason = (
  item,
  classSearch,
  specSearch,
  onlyDrop = false,
  checkSpec = true
) => {
  const specInfo = getSpecInfo(classSearch, specSearch);

  ///////////////////////////////////////////////////
  // check class/spec constraints first

  if (!specInfo) {
    return "no_spec_info";
  }

  if (item.allowableClasses) {
    if (!_.includes(item.allowableClasses, specInfo.class.id)) {
      return "class_cannot_use";
    }
  }

  // check spec override first
  if (checkSpec && item.specs) {
    if (!_.includes(item.specs, specInfo.id)) {
      return "spec_cannot_use";
    }
  }

  ///////////////////////////////////////////////////
  // Now check various attributes of the armor itself

  let wrongMainStat = false;

  // check for non-matching main stat on an item
  if (
    item.stats &&
    itemHasAnyMainStat(item) &&
    !itemHasMainStat(item, specInfo.mainStat)
  ) {
    wrongMainStat = true;
  }

  // jewelry is usable by anyone assuming no class/spec constraints
  if (_.includes(["finger", "neck"], getItemSlotName(item))) {
    // if jewelry has a main stat, make sure it's the right one.
    // some very old jewelry showing up in refactored M+ dungeons have main stat
    // These will hopefully go away completely when Blizz updates the dungeon journal
    if (wrongMainStat) {
      return "wrong_main_stat";
    }
    return null;
  }

  // check armor class
  if (item.itemClass === 4) {
    // skip cloaks, anyone can use
    if (item.inventoryType !== parseInt(invertedSlotMap.back, 10)) {
      const armorSubClass = _.find(armorSubClasses, {
        itemSubClass: item.itemSubClass,
      });
      if (armorSubClass) {
        if (!_.includes(specInfo.class.armorTypes, armorSubClass.key)) {
          return "wrong_armor_type";
        }
      }
    }
  }

  // check weapon/spec table
  if (_.includes(["main_hand", "off_hand"], getItemSlotName(item))) {
    const weaponInfo = _.find(weaponClassDetails, {
      itemClass: item.itemClass,
      itemSubClass: item.itemSubClass,
    });
    if (weaponInfo) {
      if (onlyDrop) {
        if (!_.includes(weaponInfo.specsCanDrop, specInfo.id)) {
          return "item_does_not_drop";
        }
      } else if (!_.includes(weaponInfo.specsCanUse, specInfo.id)) {
        return "spec_cannot_use";
      }
    }
  }

  // if there is no main stat at all, probably anyone can use the item.
  // This was initially an issue with Azshara's Font of Power but several SL items appear to use the asme
  // item categories that mess up the old analysis
  if (item.stats && !itemHasAnyMainStat(item)) {
    return null;
  }

  if (wrongMainStat) {
    return "wrong_main_stat";
  }

  return null;
};

export const isItemUsable = (item, classSearch, specSearch) => {
  return !itemNotUsableReason(item, classSearch, specSearch, false, false);
};

export const isItemIntended = (item, classSearch, specSearch) => {
  return !itemNotUsableReason(item, classSearch, specSearch, false);
};

export const doesItemDrop = (item, classSearch, specSearch) => {
  return !itemNotUsableReason(item, classSearch, specSearch, true);
};

const getUpgradeSetArray = _.memoize((BonusUpgradeSets) => {
  return _.map(_.flatten(_.values(BonusUpgradeSets)), (set) => ({
    ...set,
    fullName: `${set.name} ${set.level}/${set.max}`,
  }));
});

let seasonBonusLevelLookup;
export const getSeasonUpgradeSetsArray = _.memoize(
  (seasonId, BonusUpgradeSets) => {
    return _.filter(getUpgradeSetArray(BonusUpgradeSets), (upgradeSet) => {
      return (
        upgradeSet.seasonId === seasonId &&
        seasonUpgradeNames.has(upgradeSet.name)
      );
    });
  }
);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// Bonus ID Helpers
//
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const getBonusIds = (item) => {
  if (item.bonus_id) {
    return _.map(_.filter(_.split(item.bonus_id, "/")), (bid) =>
      parseInt(bid, 10)
    );
  }

  if (item.bonusLists) {
    return item.bonusLists;
  }

  return [];
};

export const hasBonusId = (item, bonusId) => {
  return _.includes(getBonusIds(item), bonusId);
};

const getSocketTypeInfo = (socketInfo, type) => {
  return socketInfo ? socketInfo[type] : null;
};

export const getBonusIdForSocketNum = (socketNum) => {
  return parseInt(
    _.findKey(GameData.BonusSockets, (num) => num === socketNum),
    10
  );
};

export const isUngatedSocketSlot = _.memoize((slot) =>
  _.includes(SLOT_SOCKETS_UNGATED, slot)
);

export const numStaticSockets = (item, type) => {
  if (!type) {
    throw new Error("numStaticSockets called without a socket type");
  }
  const socketInfo = getSocketTypeInfo(item?.socketInfo, type);
  if (socketInfo) {
    return socketInfo.staticSlots;
  }
  if (item?.socketInfo?.sockets) {
    return _.size(_.filter(item.socketInfo.sockets, { type }));
  }
  return 0;
};

export const numDynamicSockets = (item, type) => {
  if (!type) {
    throw new Error("numDynamicSockets called without a socket type");
  }
  if (_.includes(ROLLABLE_SOCKET_TYPES, type)) {
    if (item && item.bonus_id) {
      const bonusIds = _.map(_.filter(_.split(item.bonus_id, "/")), (b) =>
        parseInt(b, 10)
      );
      const socketBonusIds = _.intersection(getSocketBonuses(), bonusIds);
      if (_.size(socketBonusIds) > 0) {
        return GameData.BonusSockets[_.first(socketBonusIds)];
      }
    }
  }
  return 0;
};

export const canAddSocket = (item, type) => {
  if (!type) {
    throw new Error("canAddSocket called without a socket type");
  }

  if (!_.includes(ROLLABLE_SOCKET_TYPES, type)) {
    return false;
  }

  if (!item) {
    return false;
  }

  const socketInfo = getSocketTypeInfo(item.socketInfo, type);
  const slot = getItemSlotName(item);

  // already has a socket
  if (socketInfo?.staticSlots > 0 || socketInfo?.dynamicSlots > 0) {
    return socketInfo.dynamicSlots < SLOT_SOCKETS[slot];
  }

  const totalSockets = _.reduce(
    item.socketInfo,
    (acc, info) => acc + info.total,
    0
  );
  if (totalSockets >= MAX_ITEM_SOCKETS) {
    return false;
  }

  // primordial gear can't roll prismatic sockets
  if (type === SOCKET_TYPES.PRISMATIC) {
    let hasOtherSocket = false;
    // full socket info data structure
    if (
      item.socketInfo &&
      item.socketInfo[SOCKET_TYPES.PRIMORDIAL]?.total > 0
    ) {
      hasOtherSocket = true;
    }
    // client-side data structure, shows in Droptimizer, probably should figure out how to get rid of this structure
    if (item.socketInfo?.sockets) {
      hasOtherSocket = _.find(item.socketInfo.sockets, {
        type: SOCKET_TYPES.PRIMORDIAL,
      });
    }
    if (hasOtherSocket) {
      return false;
    }
  }

  // artifact
  if (item.quality === 6) {
    return false;
  }

  // legendary
  if (item.quality === 5) {
    // Old legendaries cannot be socketed, but shadowlands can be
    if (item.expansion < 8) {
      return false;
    }
  }

  // deny list of items that cannot be socketed even if they fulfill other constraints
  if (_.includes(ITEMS_NO_DYNAMIC_SOCKET, item.id)) {
    return false;
  }

  if (!SLOT_SOCKETS[slot]) {
    return false;
  }

  // Check for any bonus IDs that should deny a socket
  // Can be used to prevent socketing thigns like timewalking gear
  if (_.some(SOCKET_DISABLE_BONUSES, (bonusId) => hasBonusId(item, bonusId))) {
    return false;
  }

  return true;
};

export const getUpgradeSet1 = (upgradeSetId) =>
  _.filter(getUpgradeSetArray(), { group: upgradeSetId });
