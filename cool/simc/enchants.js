import _ from 'lodash';
import GameData from './gameData';

import {
  CURRENT_EXPANSION,
  EXPANSIONS,
  SLOT_MAP,
} from './constants';
import prefGroup from './itemPrefGroup';
import {
  classIdMap,
} from './character';

const invertedSlotMap = _.mapValues(_.invert(SLOT_MAP), slotId => parseInt(slotId, 10));
const MAIN_HAND_SLOT = invertedSlotMap.main_hand;

const TOOLTIP_COLOR_REGEX = /\|C[0-9a-f]{8}/;

export const enchantInfo = (id, customDisplayName) => {
  const enchant = _.find(GameData.Enchantments, { id });
  if (!enchant) {
    return null;
  }
  let name = enchant.displayName;
  if (customDisplayName) {
    name = customDisplayName;
  } else {
    // clean up any color codes
    name = name.replace(TOOLTIP_COLOR_REGEX, '');
  }
  return {
    ...enchant,
    key: enchant.tokenizedName,
    displayName: name,
    name,
    type: enchant.socketType,
  };
};

export const enchantInfoWithCraftingQualties = ({
  slot,
  shortName,
  startEnchantId,
  group,
  preferred,
  maxQuality = 3,
  reverseQualityOrder = false,
  enchantIds = null,
  ...rest
}) => {
  const result = [];

  let ranks = _.range(1, maxQuality + 1);
  if (reverseQualityOrder) {
    ranks = _.reverse(ranks);
  }

  let idList;
  if (startEnchantId) {
    idList = _.range(startEnchantId, startEnchantId + maxQuality);
  } else if (enchantIds) {
    idList = enchantIds;
  }

  if (reverseQualityOrder) {
    idList = _.reverse(idList);
  }

  for (let i = 0; i < idList.length; i += 1) {
    const enchantId = idList[i];
    const enchant = enchantInfo(enchantId);
    const rank = ranks[i];
    let pref;
    if (rank === maxQuality) {
      pref = preferred;
    }
    let slotDerived = slot;
    if (!slot) {
      if (enchant.socketType) {
        slotDerived = 'socket';
      }
    }
    result.push({
      slot: slotDerived,
      shortName: `${shortName}${rank}`,
      group: `${group}_${rank}`,
      preferred: pref,
      ...enchant,
      ...rest,
    });
  }

  return result;
};

export const getEnchants = _.memoize(() => [{
  ////////////////////////////////////////////////
  //
  // DEATH KNIGHT
  //
  ////////////////////////////////////////////////

  // mark all DK enchants as current

  // Rune of the Apocalypse
  slot: MAIN_HAND_SLOT,
  ...enchantInfo(6245),
  shortName: 'Apoc',
  requirement: prefGroup.deathknight,
  preferred: prefGroup.meleeRange,
  group: 'death_knight',
  expansion: CURRENT_EXPANSION.id,
}, {
  // Rune of Sanguination
  slot: MAIN_HAND_SLOT,
  ...enchantInfo(6241),
  shortName: 'Sang',
  requirement: prefGroup.deathknight,
  preferred: prefGroup.meleeRange,
  group: 'death_knight',
  expansion: CURRENT_EXPANSION.id,
}, {
  // Rune of Spellwarding
  slot: MAIN_HAND_SLOT,
  ...enchantInfo(6242),
  shortName: 'Ward',
  requirement: prefGroup.deathknight,
  preferred: prefGroup.tank,
  group: 'death_knight',
  expansion: CURRENT_EXPANSION.id,
}, {
  // Rune of Unending Thirst
  slot: MAIN_HAND_SLOT,
  ...enchantInfo(6244),
  shortName: 'Thirst',
  requirement: prefGroup.deathknight,
  preferred: prefGroup.meleeRange,
  group: 'death_knight',
  expansion: CURRENT_EXPANSION.id,
}, {
  // Rune of Razorice
  slot: MAIN_HAND_SLOT,
  ...enchantInfo(3370),
  shortName: 'Razor',
  requirement: prefGroup.deathknight,
  preferred: prefGroup.melee,
  group: 'death_knight',
  expansion: CURRENT_EXPANSION.id,
}, {
  // Rune of the Fallen Crusader
  slot: MAIN_HAND_SLOT,
  ...enchantInfo(3368),
  shortName: 'Fallen',
  requirement: prefGroup.deathknight,
  preferred: prefGroup.meleeRange,
  group: 'death_knight',
  expansion: CURRENT_EXPANSION.id,
}, {
  // Rune of the Stoneskin Gargoyle
  slot: MAIN_HAND_SLOT,
  ...enchantInfo(3847),
  shortName: 'Stone',
  requirement: prefGroup.deathknight,
  preferred: prefGroup.meleeRange,
  group: 'death_knight',
  expansion: CURRENT_EXPANSION.id,
},

////////////////////////////////////////////////
//
// THE WAR WITHIN
//
////////////////////////////////////////////////

//
// WEAPON -----------
//

// Authority of Air
...enchantInfoWithCraftingQualties({
  slot: MAIN_HAND_SLOT,
  shortName: 'Air',
  startEnchantId: 7449,
  group: 'authority',
  preferred: prefGroup.tank,
}),
// Authority of Fiery Resolve
...enchantInfoWithCraftingQualties({
  slot: MAIN_HAND_SLOT,
  shortName: 'Fiery',
  startEnchantId: 7452,
  group: 'authority',
  preferred: prefGroup.healer,
}),
// Authority of Radiant Power
...enchantInfoWithCraftingQualties({
  slot: MAIN_HAND_SLOT,
  shortName: 'Radiant',
  startEnchantId: 7461,
  group: 'authority',
  preferred: prefGroup.all,
}),
// Authority of Storms
...enchantInfoWithCraftingQualties({
  slot: MAIN_HAND_SLOT,
  shortName: 'Storms',
  startEnchantId: 7455,
  group: 'authority',
  preferred: prefGroup.all,
}),
// Authority of the Depths
...enchantInfoWithCraftingQualties({
  slot: MAIN_HAND_SLOT,
  shortName: 'Depths',
  startEnchantId: 7458,
  group: 'authority',
  preferred: prefGroup.all,
}),
// Council's Guile
...enchantInfoWithCraftingQualties({
  slot: MAIN_HAND_SLOT,
  shortName: 'Crit',
  startEnchantId: 7437,
  group: 'stat',
  preferred: prefGroup.all,
}),
// Oathsworn's Tenacity
...enchantInfoWithCraftingQualties({
  slot: MAIN_HAND_SLOT,
  shortName: 'Vers',
  startEnchantId: 7446,
  group: 'stat',
  preferred: prefGroup.all,
}),
// Stonebound Artistry
...enchantInfoWithCraftingQualties({
  slot: MAIN_HAND_SLOT,
  shortName: 'Mast',
  startEnchantId: 7443,
  group: 'stat',
  preferred: prefGroup.all,
}),
// Stormrider's Fury
...enchantInfoWithCraftingQualties({
  slot: MAIN_HAND_SLOT,
  shortName: 'Haste',
  startEnchantId: 7440,
  group: 'stat',
  preferred: prefGroup.all,
}),

// SCOPES

//
// RING -----------
//

// Glimmering Critical Strike
...enchantInfoWithCraftingQualties({
  slot: invertedSlotMap.finger,
  shortName: 'Crit',
  startEnchantId: 7329,
  group: 'stat_low',
}),
// Radiant Critical Strike
...enchantInfoWithCraftingQualties({
  slot: invertedSlotMap.finger,
  shortName: 'Crit',
  startEnchantId: 7332,
  group: 'stat_high',
  preferred: prefGroup.all,
}),
// Cursed Critical Strike
...enchantInfoWithCraftingQualties({
  slot: invertedSlotMap.finger,
  shortName: 'CritX',
  startEnchantId: 7468,
  group: 'stat_curse',
  preferred: prefGroup.all,
}),
// Glimmering Haste
...enchantInfoWithCraftingQualties({
  slot: invertedSlotMap.finger,
  shortName: 'Haste',
  startEnchantId: 7335,
  group: 'stat_low',
}),
// Radiant Haste
...enchantInfoWithCraftingQualties({
  slot: invertedSlotMap.finger,
  shortName: 'Haste',
  startEnchantId: 7338,
  group: 'stat_high',
  preferred: prefGroup.all,
}),
// Cursed Haste
...enchantInfoWithCraftingQualties({
  slot: invertedSlotMap.finger,
  shortName: 'HasteX',
  startEnchantId: 7471,
  group: 'stat_curse',
  preferred: prefGroup.all,
}),
// Glimmering Mastery
...enchantInfoWithCraftingQualties({
  slot: invertedSlotMap.finger,
  shortName: 'Mast',
  startEnchantId: 7341,
  group: 'stat_low',
}),
// Radiant Mastery
...enchantInfoWithCraftingQualties({
  slot: invertedSlotMap.finger,
  shortName: 'Mast',
  startEnchantId: 7344,
  group: 'stat_high',
  preferred: prefGroup.all,
}),
// Cursed Mastery
...enchantInfoWithCraftingQualties({
  slot: invertedSlotMap.finger,
  shortName: 'MastX',
  startEnchantId: 7477,
  group: 'stat_curse',
  preferred: prefGroup.all,
}),
// Glimmering Vers
...enchantInfoWithCraftingQualties({
  slot: invertedSlotMap.finger,
  shortName: 'Vers',
  startEnchantId: 7347,
  group: 'stat_low',
}),
// Radiant Vers
...enchantInfoWithCraftingQualties({
  slot: invertedSlotMap.finger,
  shortName: 'Vers',
  startEnchantId: 7350,
  group: 'stat_high',
  preferred: prefGroup.all,
}),
// Cursed Vers
...enchantInfoWithCraftingQualties({
  slot: invertedSlotMap.finger,
  shortName: 'VersX',
  startEnchantId: 7474,
  group: 'stat_curse',
  preferred: prefGroup.all,
}),

//
// CLOAK ENCHANTS ------
//

// Avoidance
...enchantInfoWithCraftingQualties({
  slot: invertedSlotMap.back,
  shortName: 'Avoid',
  startEnchantId: 7398,
  group: 'tertiary_cheap',
}),
// Leech
...enchantInfoWithCraftingQualties({
  slot: invertedSlotMap.back,
  shortName: 'Leech',
  startEnchantId: 7404,
  group: 'tertiary_cheap',
}),
// Speed
...enchantInfoWithCraftingQualties({
  slot: invertedSlotMap.back,
  shortName: 'Speed',
  startEnchantId: 7410,
  group: 'tertiary_cheap',
}),
// Winged Grace
...enchantInfoWithCraftingQualties({
  slot: invertedSlotMap.back,
  shortName: 'Grace',
  startEnchantId: 7401,
  group: 'tertiary_nice',
  preferred: prefGroup.all,
}),
// Leeching Fangs
...enchantInfoWithCraftingQualties({
  slot: invertedSlotMap.back,
  shortName: 'Fangs',
  startEnchantId: 7407,
  group: 'tertiary_nice',
  preferred: prefGroup.all,
}),
// Burrowing Rapidity
...enchantInfoWithCraftingQualties({
  slot: invertedSlotMap.back,
  shortName: 'Burrow',
  startEnchantId: 7413,
  group: 'tertiary_nice',
  preferred: prefGroup.all,
}),

//
// BRACER ENCHANTS ------
//

// Avoidance
...enchantInfoWithCraftingQualties({
  slot: invertedSlotMap.wrist,
  shortName: 'Avoid',
  startEnchantId: 7380,
  group: 'tertiary',
}),
...enchantInfoWithCraftingQualties({
  slot: invertedSlotMap.wrist,
  shortName: 'Avoid',
  startEnchantId: 7383,
  group: 'tertiary',
  preferred: prefGroup.all,
}),
// Leech
...enchantInfoWithCraftingQualties({
  slot: invertedSlotMap.wrist,
  shortName: 'Leech',
  startEnchantId: 7386,
  group: 'tertiary',
}),
...enchantInfoWithCraftingQualties({
  slot: invertedSlotMap.wrist,
  shortName: 'Leech',
  startEnchantId: 7389,
  group: 'tertiary',
  preferred: prefGroup.all,
}),
// Speed
...enchantInfoWithCraftingQualties({
  slot: invertedSlotMap.wrist,
  shortName: 'Speed',
  startEnchantId: 7392,
  group: 'tertiary',
}),
...enchantInfoWithCraftingQualties({
  slot: invertedSlotMap.wrist,
  shortName: 'Speed',
  startEnchantId: 7395,
  group: 'tertiary',
  preferred: prefGroup.all,
}),

//
// CHEST ENCHANTS --------
//

// Stormrider's Agility
...enchantInfoWithCraftingQualties({
  slot: invertedSlotMap.chest,
  shortName: 'Agi',
  startEnchantId: 7353,
  group: 'stats',
  preferred: prefGroup.agi,
}),
// Council's Intellect
...enchantInfoWithCraftingQualties({
  slot: invertedSlotMap.chest,
  shortName: 'Int',
  startEnchantId: 7356,
  group: 'stats',
  preferred: prefGroup.int,
}),
// Oathsworn's Strength
...enchantInfoWithCraftingQualties({
  slot: invertedSlotMap.chest,
  shortName: 'Str',
  startEnchantId: 7359,
  group: 'stats',
  preferred: prefGroup.str,
}),
// Crystalline Radiance
...enchantInfoWithCraftingQualties({
  slot: invertedSlotMap.chest,
  shortName: 'Proc',
  startEnchantId: 7362,
  group: 'stats',
  preferred: prefGroup.all,
}),

//
// BOOT ENCHANTS --------
//

// Scout's March
...enchantInfoWithCraftingQualties({
  slot: invertedSlotMap.feet,
  shortName: 'Speed',
  startEnchantId: 7416,
  group: 'stats',
  preferred: prefGroup.all,
}),
// Cavalry's March
...enchantInfoWithCraftingQualties({
  slot: invertedSlotMap.feet,
  shortName: 'Mount',
  startEnchantId: 7419,
  group: 'stats',
  preferred: prefGroup.all,
}),
// Defender's March
...enchantInfoWithCraftingQualties({
  slot: invertedSlotMap.feet,
  shortName: 'Stam',
  startEnchantId: 7422,
  group: 'stats',
  preferred: prefGroup.all,
}),

//
// LEG ENCHANTS --------
//

// Daybreak Spellthread
...enchantInfoWithCraftingQualties({
  slot: invertedSlotMap.legs,
  shortName: 'Int/Mana',
  startEnchantId: 7529,
  group: 'spellthread',
  preferred: prefGroup.int,
}),
// Sunset Spellthread
...enchantInfoWithCraftingQualties({
  slot: invertedSlotMap.legs,
  shortName: 'Int/Sta',
  startEnchantId: 7532,
  group: 'spellthread',
  preferred: prefGroup.int,
}),
// Weavercloth Spellthread
...enchantInfoWithCraftingQualties({
  slot: invertedSlotMap.legs,
  shortName: 'Int',
  startEnchantId: 7535,
  group: 'spellthread',
}),
// Defender's Armor Kit
...enchantInfoWithCraftingQualties({
  slot: invertedSlotMap.legs,
  shortName: 'Def',
  startEnchantId: 7593,
  group: 'armorkit',
  preferred: prefGroup.agistr,
}),
// Dual Layered Armor Kit
...enchantInfoWithCraftingQualties({
  slot: invertedSlotMap.legs,
  shortName: 'Dual',
  startEnchantId: 7596,
  group: 'armorkit',
  preferred: prefGroup.agistr,
}),
// Stormbound Armor Kit
...enchantInfoWithCraftingQualties({
  slot: invertedSlotMap.legs,
  shortName: 'Storm',
  startEnchantId: 7599,
  group: 'armorkit',
  preferred: prefGroup.agistr,
}),


////////////////////////////////////////////////
//
// DRAGONFLIGHT
//
////////////////////////////////////////////////

//
// WEAPON -----------
//

// Dreaming Devotion
...enchantInfoWithCraftingQualties({
  slot: MAIN_HAND_SLOT,
  shortName: 'Dream',
  startEnchantId: 7001,
  group: 'devotion',
}),

// Shadowflame Wreathe
...enchantInfoWithCraftingQualties({
  slot: MAIN_HAND_SLOT,
  shortName: 'SWre',
  startEnchantId: 6825,
  group: 'devotion',
}),

// Burning Devotion
...enchantInfoWithCraftingQualties({
  slot: MAIN_HAND_SLOT,
  shortName: 'BDev',
  startEnchantId: 6629,
  group: 'devotion',
}),
// Burning Writ
...enchantInfoWithCraftingQualties({
  slot: MAIN_HAND_SLOT,
  shortName: 'BWrit',
  startEnchantId: 6626,
  group: 'writ',
}),
// Earten Devotion
...enchantInfoWithCraftingQualties({
  slot: MAIN_HAND_SLOT,
  shortName: 'EDev',
  startEnchantId: 6635,
  group: 'devotion',
}),
// Earthen Writ
...enchantInfoWithCraftingQualties({
  slot: MAIN_HAND_SLOT,
  shortName: 'EWrit',
  startEnchantId: 6632,
  group: 'writ',
}),
// Sophic Devotion
...enchantInfoWithCraftingQualties({
  slot: MAIN_HAND_SLOT,
  shortName: 'SDev',
  startEnchantId: 6641,
  group: 'devotion',
}),
// Sophic Writ
...enchantInfoWithCraftingQualties({
  slot: MAIN_HAND_SLOT,
  shortName: 'SWrit',
  startEnchantId: 6638,
  group: 'writ',
}),
// Frozen Devotion
...enchantInfoWithCraftingQualties({
  slot: MAIN_HAND_SLOT,
  shortName: 'FDev',
  startEnchantId: 6647,
  group: 'devotion',
}),
// Frozen Writ
...enchantInfoWithCraftingQualties({
  slot: MAIN_HAND_SLOT,
  shortName: 'FWrit',
  startEnchantId: 6644,
  group: 'writ',
}),
// Wafting Devotion
...enchantInfoWithCraftingQualties({
  slot: MAIN_HAND_SLOT,
  shortName: 'WDev',
  startEnchantId: 6653,
  group: 'devotion',
}),
// Wafting Writ
...enchantInfoWithCraftingQualties({
  slot: MAIN_HAND_SLOT,
  shortName: 'WWrit',
  startEnchantId: 6650,
  group: 'writ',
}),

// SCOPES

// High Intensity Thermal Scanner
...enchantInfoWithCraftingQualties({
  slot: MAIN_HAND_SLOT,
  shortName: 'HITS',
  startEnchantId: 6526,
  group: 'df-engineering',
  requirement: prefGroup.hunter,
}),
// Projectile Propulsion Pinion
...enchantInfoWithCraftingQualties({
  slot: MAIN_HAND_SLOT,
  shortName: 'PPP',
  startEnchantId: 6523,
  group: 'df-engineering',
  requirement: prefGroup.hunter,
}),
// Gyroscopic Kaleidoscope
...enchantInfoWithCraftingQualties({
  slot: MAIN_HAND_SLOT,
  shortName: 'GK',
  startEnchantId: 6520,
  group: 'df-engineering',
  requirement: prefGroup.hunter,
}),

//
// RING -----------
//

// Devotion of Crit
...enchantInfoWithCraftingQualties({
  slot: invertedSlotMap.finger,
  shortName: 'Crit',
  startEnchantId: 6548,
  group: 'devotion',
}),
// Devotion of Haste
...enchantInfoWithCraftingQualties({
  slot: invertedSlotMap.finger,
  shortName: 'Haste',
  startEnchantId: 6554,
  group: 'devotion',
}),
// Devotion of Mastery
...enchantInfoWithCraftingQualties({
  slot: invertedSlotMap.finger,
  shortName: 'Mast',
  startEnchantId: 6560,
  group: 'devotion',
}),
// Devotion of Vers
...enchantInfoWithCraftingQualties({
  slot: invertedSlotMap.finger,
  shortName: 'Vers',
  startEnchantId: 6566,
  group: 'devotion',
}),
// Writ of Crit
...enchantInfoWithCraftingQualties({
  slot: invertedSlotMap.finger,
  shortName: 'Crit',
  startEnchantId: 6545,
  group: 'writ',
}),
// Writ of Haste
...enchantInfoWithCraftingQualties({
  slot: invertedSlotMap.finger,
  shortName: 'Haste',
  startEnchantId: 6551,
  group: 'writ',
}),
// Writ of Mastery
...enchantInfoWithCraftingQualties({
  slot: invertedSlotMap.finger,
  shortName: 'Mast',
  startEnchantId: 6557,
  group: 'writ',
}),
// Writ of Vers
...enchantInfoWithCraftingQualties({
  slot: invertedSlotMap.finger,
  shortName: 'Vers',
  startEnchantId: 6563,
  group: 'writ',
}),

//
// CLOAK ENCHANTS ------
//

// Graceful avoidance
...enchantInfoWithCraftingQualties({
  slot: invertedSlotMap.back,
  shortName: 'Avoid',
  startEnchantId: 6590,
  group: 'tertiary',
  zeroDps: true,
}),
// Homebound Speed
...enchantInfoWithCraftingQualties({
  slot: invertedSlotMap.back,
  shortName: 'Speed',
  startEnchantId: 6602,
  group: 'tertiary',
  zeroDps: true,
}),
// Regenerative Leech
...enchantInfoWithCraftingQualties({
  slot: invertedSlotMap.back,
  shortName: 'Leech',
  startEnchantId: 6596,
  group: 'tertiary',
  zeroDps: true,
}),
// writ of avoidance
...enchantInfoWithCraftingQualties({
  slot: invertedSlotMap.back,
  shortName: 'Avoid',
  startEnchantId: 6587,
  group: 'writ',
  zeroDps: true,
}),
// writ of leech
...enchantInfoWithCraftingQualties({
  slot: invertedSlotMap.back,
  shortName: 'Leech',
  startEnchantId: 6593,
  group: 'writ',
  zeroDps: true,
}),
// writ of speed
...enchantInfoWithCraftingQualties({
  slot: invertedSlotMap.back,
  shortName: 'Speed',
  startEnchantId: 6599,
  group: 'writ',
  zeroDps: true,
}),

//
// CHEST ENCHANTS ---------
//

// Accelerated Agility
...enchantInfoWithCraftingQualties({
  slot: invertedSlotMap.chest,
  shortName: 'Agi',
  startEnchantId: 6614,
  group: 'stats',
}),
// Reserve of Intellect
...enchantInfoWithCraftingQualties({
  slot: invertedSlotMap.chest,
  shortName: 'Int',
  startEnchantId: 6617,
  group: 'stats',
}),
// Sustained Strength
...enchantInfoWithCraftingQualties({
  slot: invertedSlotMap.chest,
  shortName: 'Str',
  startEnchantId: 6620,
  group: 'stats',
}),
// Waking Stats
...enchantInfoWithCraftingQualties({
  slot: invertedSlotMap.chest,
  shortName: 'Stats',
  startEnchantId: 6623,
  group: 'stats',
}),

//
// BRACER ENCHANTS ------
//

// Devotion of Avoidance
...enchantInfoWithCraftingQualties({
  slot: invertedSlotMap.wrist,
  shortName: 'Avoid',
  startEnchantId: 6572,
  group: 'devotion',
  zeroDps: true,
}),
// Devotion of Leech
...enchantInfoWithCraftingQualties({
  slot: invertedSlotMap.wrist,
  shortName: 'Leech',
  startEnchantId: 6578,
  group: 'devotion',
  zeroDps: true,
}),
// Devotion of Speed
...enchantInfoWithCraftingQualties({
  slot: invertedSlotMap.wrist,
  shortName: 'Speed',
  startEnchantId: 6584,
  group: 'devotion',
  zeroDps: true,
}),
// Writ of Avoidance
...enchantInfoWithCraftingQualties({
  slot: invertedSlotMap.wrist,
  shortName: 'Avoid',
  startEnchantId: 6569,
  group: 'writ',
  zeroDps: true,
}),
// Writ of Leech
...enchantInfoWithCraftingQualties({
  slot: invertedSlotMap.wrist,
  shortName: 'Leech',
  startEnchantId: 6575,
  group: 'writ',
  zeroDps: true,
}),
// Writ of Speed
...enchantInfoWithCraftingQualties({
  slot: invertedSlotMap.wrist,
  shortName: 'Speed',
  startEnchantId: 6581,
  group: 'writ',
  zeroDps: true,
}),


//
// BOOT ENCHANTS --------
//

// Plainsrunner's Breeze
...enchantInfoWithCraftingQualties({
  slot: invertedSlotMap.feet,
  shortName: 'Move',
  startEnchantId: 6605,
  group: 'speed',
  zeroDps: true,
}),
// Rider's Reassurance
...enchantInfoWithCraftingQualties({
  slot: invertedSlotMap.feet,
  shortName: 'Mount',
  startEnchantId: 6608,
  group: 'speed',
  zeroDps: true,
}),
// Watcher's Loam
...enchantInfoWithCraftingQualties({
  slot: invertedSlotMap.feet,
  shortName: 'Stam',
  startEnchantId: 6611,
  group: 'stam',
  zeroDps: true,
}),

//
// LEG ENCHANTS --------
//

// Lambent Armor Kit
...enchantInfoWithCraftingQualties({
  slot: invertedSlotMap.legs,
  shortName: 'Lamb',
  startEnchantId: 6828,
  group: 'armorkit',
}),
// Fierce Armor Kit
...enchantInfoWithCraftingQualties({
  slot: invertedSlotMap.legs,
  shortName: 'Fierce',
  startEnchantId: 6488,
  group: 'armorkit',
}),
// Frosted Armor Kit
...enchantInfoWithCraftingQualties({
  slot: invertedSlotMap.legs,
  shortName: 'Frstd',
  startEnchantId: 6494,
  group: 'armorkit',
}),
// Reinforced Armor Kit
...enchantInfoWithCraftingQualties({
  slot: invertedSlotMap.legs,
  shortName: 'Reinf',
  startEnchantId: 6491,
  group: 'armorkit',
}),

// Frozen Spellthread
...enchantInfoWithCraftingQualties({
  slot: invertedSlotMap.legs,
  shortName: 'Frzn',
  startEnchantId: 6539,
  group: 'spellthread',
}),
// Temporal Spellthread
...enchantInfoWithCraftingQualties({
  slot: invertedSlotMap.legs,
  shortName: 'Tmprl',
  startEnchantId: 6542,
  group: 'spellthread',
}),
// Vibrant Spellthread
...enchantInfoWithCraftingQualties({
  slot: invertedSlotMap.legs,
  shortName: 'Vbrnt',
  startEnchantId: 6536,
  group: 'spellthread',
}),

//
// BELT ENCHANTS --------
//

// 10.1
// Shadowed Belt Clasp
...enchantInfoWithCraftingQualties({
  slot: invertedSlotMap.waist,
  shortName: 'Shdw',
  startEnchantId: 6904,
  reverseQualityOrder: true, // in game data it's 3 2 1, not 1 2 3
  group: 'waist',
}),

//
// HELM ENCHANTS --------
//

// 10.2
{
  // Incandescent Essence
  ...enchantInfo(7052, 'Incandescent Essence'),
  slot: invertedSlotMap.head,
  shortName: 'InEs',
  group: 'head',
},

//
// SHADOWLANDS STUFF
//

// Shadowlands Weapon Enchants
{
  slot: MAIN_HAND_SLOT,
  name: 'Ascended Vigor',
  shortName: 'Vigor',
  key: 'ascended_vigor',
  id: 6227,
  itemId: 172365,
  group: 'shadowlands',
  expansion: EXPANSIONS.SHADOWLANDS.id,
}, {
  slot: MAIN_HAND_SLOT,
  name: 'Celestial Guidance',
  shortName: 'Celest',
  key: 'celestial_guidance',
  id: 6229,
  itemId: 172366,
  group: 'shadowlands',
  expansion: EXPANSIONS.SHADOWLANDS.id,
}, {
  slot: MAIN_HAND_SLOT,
  name: 'Eternal Grace',
  shortName: 'Grace',
  key: 'eternal_grace',
  id: 6226,
  itemId: 172367,
  group: 'shadowlands',
  expansion: EXPANSIONS.SHADOWLANDS.id,
}, {
  slot: MAIN_HAND_SLOT,
  name: 'Lightless Force',
  shortName: 'Force',
  key: 'lightless_force',
  id: 6223,
  itemId: 172370,
  group: 'shadowlands',
  expansion: EXPANSIONS.SHADOWLANDS.id,
}, {
  slot: MAIN_HAND_SLOT,
  name: 'Sinful Revelation',
  shortName: 'Sin',
  key: 'sinful_revelation',
  id: 6228,
  itemId: 172368,
  group: 'shadowlands',
  expansion: EXPANSIONS.SHADOWLANDS.id,
}, {
  slot: MAIN_HAND_SLOT,
  name: 'Optical Target Embiggener',
  shortName: 'Optic',
  key: 'optical_target_embiggener',
  id: 6196,
  icon: 'inv_engineering_90_scope_blue',
  itemId: 172920,
  requirement: {
    classes: [
      classIdMap.Hunter,
    ],
  },
  group: 'engineering',
  expansion: EXPANSIONS.SHADOWLANDS.id,
}, {
  slot: MAIN_HAND_SLOT,
  name: 'Infra-green Reflex Sight',
  shortName: 'Infra',
  key: 'infragreen_reflex_sight',
  id: 6195,
  icon: 'inv_engineering_90_scope_green',
  itemId: 172921,
  requirement: {
    classes: [
      classIdMap.Hunter,
    ],
  },
  group: 'engineering',
  expansion: EXPANSIONS.SHADOWLANDS.id,
}, {

  // RING

  // Shadowlands Ring Enchants

  slot: 11,
  name: '16 Critical Strike',
  shortName: 'Crit',
  key: '16crit',
  id: 6164,
  itemId: 172361,
  group: 'tenet',
  stat: {
    type: 'crit',
    amount: 16,
  },
  expansion: EXPANSIONS.SHADOWLANDS.id,
}, {
  slot: 11,
  name: '16 Haste',
  shortName: 'Haste',
  key: '16haste',
  id: 6166,
  itemId: 172362,
  group: 'tenet',
  stat: {
    type: 'haste',
    amount: 16,
  },
  expansion: EXPANSIONS.SHADOWLANDS.id,
}, {
  slot: 11,
  name: '16 Mastery',
  shortName: 'Mast',
  key: '16mastery',
  id: 6168,
  itemId: 172363,
  group: 'tenet',
  stat: {
    type: 'mastery',
    amount: 16,
  },
  expansion: EXPANSIONS.SHADOWLANDS.id,
}, {
  slot: 11,
  name: '16 Versatility',
  shortName: 'Vers',
  key: '16vers',
  id: 6170,
  itemId: 172364,
  group: 'tenet',
  stat: {
    type: 'vers',
    amount: 16,
  },
  expansion: EXPANSIONS.SHADOWLANDS.id,
}, {
  slot: 11,
  name: '12 Critical Strike',
  shortName: 'Crit',
  key: '12crit',
  id: 6163,
  itemId: 172357,
  group: 'bargain',
  stat: {
    type: 'crit',
    amount: 12,
  },
  expansion: EXPANSIONS.SHADOWLANDS.id,
}, {
  slot: 11,
  name: '12 Haste',
  shortName: 'Haste',
  key: '12haste',
  id: 6165,
  itemId: 172358,
  group: 'bargain',
  stat: {
    type: 'haste',
    amount: 12,
  },
  expansion: EXPANSIONS.SHADOWLANDS.id,
}, {
  slot: 11,
  name: '12 Mastery',
  shortName: 'Mastery',
  key: '12mastery',
  id: 6167,
  itemId: 172359,
  group: 'bargain',
  stat: {
    type: 'mastery',
    amount: 12,
  },
  expansion: EXPANSIONS.SHADOWLANDS.id,
}, {
  slot: 11,
  name: '12 Versatility',
  shortName: 'Vers',
  key: '12vers',
  id: 6169,
  itemId: 172360,
  group: 'bargain',
  stat: {
    type: 'vers',
    amount: 12,
  },
  expansion: EXPANSIONS.SHADOWLANDS.id,
}, {


  // CLOAK ENCHANTS

  slot: invertedSlotMap.back,
  name: 'Fortified Avoidance',
  shortName: 'Avoid',
  key: 'fortified_avoidance',
  id: 6203,
  itemId: 172411,
  group: 'stam',
  expansion: EXPANSIONS.SHADOWLANDS.id,
}, {
  slot: invertedSlotMap.back,
  name: 'Fortified Leech',
  shortName: 'Leech',
  key: 'fortified_leech',
  id: 6204,
  itemId: 172412,
  group: 'stam',
  expansion: EXPANSIONS.SHADOWLANDS.id,
}, {
  slot: invertedSlotMap.back,
  name: 'Fortified Speed',
  key: 'fortified_speed',
  shortName: 'Speed',
  id: 6202,
  itemId: 172410,
  group: 'stam',
  expansion: EXPANSIONS.SHADOWLANDS.id,
}, {
  slot: invertedSlotMap.back,
  name: 'Soul Vitality',
  shortName: 'Stam',
  key: 'soul_vitality',
  id: 6208,
  itemId: 177660,
  group: 'stam',
  expansion: EXPANSIONS.SHADOWLANDS.id,
}, {

  // CHEST ENCHANTS

  slot: invertedSlotMap.chest,
  name: 'Eternal Bounds',
  shortName: 'Int',
  key: 'eternal_bounds',
  id: 6217,
  itemId: 177715,
  group: 'stats',
  expansion: EXPANSIONS.SHADOWLANDS.id,
}, {
  slot: invertedSlotMap.chest,
  name: 'Eternal Bulwark',
  shortName: 'Bulw',
  key: 'eternal_bulwark',
  id: 6213,
  itemId: 172418,
  group: 'stats',
  expansion: EXPANSIONS.SHADOWLANDS.id,
}, {
  slot: invertedSlotMap.chest,
  name: 'Eternal Skirmish',
  shortName: 'Skir',
  key: 'eternal_skirmish',
  id: 6214,
  itemId: 177659,
  group: 'stats',
  expansion: EXPANSIONS.SHADOWLANDS.id,
}, {
  slot: invertedSlotMap.chest,
  name: 'Eternal Stats',
  shortName: 'Stats',
  key: 'eternal_stats',
  id: 6230,
  itemId: 177962,
  group: 'stats',
  expansion: EXPANSIONS.SHADOWLANDS.id,
}, {
  slot: invertedSlotMap.chest,
  name: 'Sacred Stats',
  shortName: 'Stats',
  key: 'sacred_stats',
  id: 6216,
  itemId: 177716,
  group: 'stats',
  expansion: EXPANSIONS.SHADOWLANDS.id,
}, {
  slot: invertedSlotMap.chest,
  name: 'Eternal Insight',
  shortName: 'Ins',
  key: 'eternal_insight',
  id: 6265,
  itemId: 183738,
  group: 'stats',
  expansion: EXPANSIONS.SHADOWLANDS.id,

  // BRACER ENCHANTS

}, {
  slot: invertedSlotMap.wrist,
  name: 'Eternal Intellect',
  shortName: 'Int',
  key: 'eternal_intellect',
  id: 6220,
  itemId: 172415,
  group: 'stats',
  expansion: EXPANSIONS.SHADOWLANDS.id,
}, {
  slot: invertedSlotMap.wrist,
  name: 'Illuminated Soul',
  shortName: 'Int',
  key: 'illuminated_soul',
  id: 6219,
  itemId: 172414,
  group: 'stats',
  expansion: EXPANSIONS.SHADOWLANDS.id,
}, {
  slot: invertedSlotMap.wrist,
  name: 'Shaded Hearthing',
  shortName: 'Hrth',
  key: 'shaded_hearthing',
  id: 6222,
  itemId: 172416,
  group: 'stats',
  zeroDps: true,
  expansion: EXPANSIONS.SHADOWLANDS.id,

  // GLOVE ENCHANTS

}, {
  slot: invertedSlotMap.hands,
  name: 'Eternal Strength',
  shortName: 'Str',
  key: 'eternal_strength',
  id: 6210,
  itemId: 172408,
  group: 'stats',
  expansion: EXPANSIONS.SHADOWLANDS.id,
}, {
  slot: invertedSlotMap.hands,
  name: 'Strength of Soul',
  shortName: 'Str',
  key: 'strength_of_soul',
  id: 6209,
  itemId: 172407,
  group: 'stats',
  expansion: EXPANSIONS.SHADOWLANDS.id,
}, {
  slot: invertedSlotMap.hands,
  name: 'Shadowlands Gathering',
  shortName: 'Gthr',
  key: 'shadowlands_gathering',
  id: 6205,
  itemId: 172406,
  group: 'stats',
  zeroDps: true,
  expansion: EXPANSIONS.SHADOWLANDS.id,

  // BOOT ENCHANTS

}, {
  slot: invertedSlotMap.feet,
  name: 'Eternal Agility',
  shortName: 'Agi',
  key: 'eternal_agility',
  id: 6211,
  itemId: 172419,
  group: 'stats',
  expansion: EXPANSIONS.SHADOWLANDS.id,
}, {
  slot: invertedSlotMap.feet,
  name: 'Agile Soulwalker',
  shortName: 'Agi',
  key: 'agile_soulwalker',
  id: 6212,
  itemId: 172413,
  group: 'stats',
  expansion: EXPANSIONS.SHADOWLANDS.id,
}, {
  slot: invertedSlotMap.feet,
  name: 'Soul Treads',
  shortName: 'Fall',
  key: 'soul_treads',
  id: 6207,
  itemId: 177661,
  group: 'stats',
  zeroDps: true,
  expansion: EXPANSIONS.SHADOWLANDS.id,
}]);

export const getEnchantableSlots = _.memoize(() => _.union(
  // need to look up all the inventor types that this slot _could_ use
  // This is the ol' chestnut of multiple inv types used for chest slot
  _.flatten(_.map(getEnchants(), e => {
    return _.map(_.keys(_.pickBy(SLOT_MAP, v => v === SLOT_MAP[e.slot])), k => parseInt(k, 10));
  })),
  _.map(
    _.keys(_.pickBy(SLOT_MAP, s => _.includes(['main_hand', 'off_hand'], s))),
    s => parseInt(s, 10),
  ),
));

// aliases
export const getEnchant = id => _.find(getEnchants(), { id });
export const getEnchantByTokenizedName = tokenizedName => _.find(getEnchants(), { tokenizedName });


