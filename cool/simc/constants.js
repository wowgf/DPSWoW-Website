import _ from 'lodash';

export const MAX_LEVEL = 80;

// https://trinitycore.atlassian.net/wiki/display/tc/item_template
export const SLOT_MAP = {
  1: 'head',
  2: 'neck',
  3: 'shoulder',
  4: 'shirt',
  5: 'chest',
  6: 'waist',
  7: 'legs',
  8: 'feet',
  9: 'wrist',
  10: 'hands',
  11: 'finger',
  12: 'trinket',
  13: 'main_hand', // weapon
  14: 'off_hand', // shield
  15: 'main_hand',
  16: 'back',
  17: 'main_hand', // two-hand
  // 18 is bags
  19: 'tabard',
  20: 'chest',
  21: 'main_hand',
  22: 'off_hand',
  23: 'off_hand',
  // 24 is ammo
  // 25 is thrown
  26: 'main_hand', // some ranged weapons
  // 27 is quiver
  28: 'off_hand', // relic
};

export const SCALING_MAP = {
  '-1': 'Item',
  '-2': 'Consumable',
  '-3': 'Gem1',
  '-4': 'Gem2',
  '-5': 'Gem3',
  '-6': 'Health',
  '-7': 'Item',
  '-8': 'DamageReplaceStat',
  '-9': 'DamageReplaceStat',
};

export const SOCKET_TYPES = {
  PRISMATIC: 'PRISMATIC',
  DOMINATION: 'DOMINATION',
  PRIMORDIAL: 'PRIMORDIAL',
  TINKER: 'TINKER',
  CITRINE_THUNDER: 'CITRINE_THUNDER',
  CITRINE_SEA: 'CITRINE_SEA',
  CITRINE_WIND: 'CITRINE_WIND',
};

const EXPANSION_DATA = [{
  id: -3,
  name: 'Event / Trading Post',
  enumName: 'EVENT',
}, {
  id: 0,
  name: 'Vanilla',
  enumName: 'VANILLA',
}, {
  id: 1,
  name: 'The Burning Crusade',
  enumName: 'BURNING_CRUSADE',
}, {
  id: 2,
  name: 'Wrath of the Lich King',
  enumName: 'WRATH',
}, {
  id: 3,
  name: 'Cataclysm',
  enumName: 'CATACLYSM',
}, {
  id: 4,
  name: 'Mists of Pandaria',
  enumName: 'MISTS',
}, {
  id: 5,
  name: 'Warlords of Draenor',
  enumName: 'WARLORDS',
}, {
  id: 6,
  name: 'Legion',
  enumName: 'LEGION',
}, {
  id: 7,
  name: 'Battle for Azeroth',
  enumName: 'BFA',
}, {
  id: 8,
  name: 'Shadowlands',
  enumName: 'SHADOWLANDS',
}, {
  id: 9,
  name: 'Dragonflight',
  enumName: 'DRAGONFLIGHT',
}, {
  id: 10,
  name: 'The War Within',
  enumName: 'WAR_WITHIN',
}, {
  id: 11,
  name: 'Midnight',
  enumName: 'MIDNIGHT',
}, {
  id: 12,
  name: 'The Last Titan',
  enumName: 'LAST_TITAN',
}];

export const EXPANSIONS = new Proxy(
  EXPANSION_DATA,
  {
    // lookups can use expansion ID or enum name
    get(target, prop) {
      return _.find(target, { id: parseInt(prop, 10) })
        || _.find(target, { enumName: prop });
    },
  },
);

export const CURRENT_EXPANSION = EXPANSIONS.WAR_WITHIN;


// Try to have no overlap here since it can get messy
export const FAKE_INSTANCE_IDS = {
  mplus: -1,
  azeriteVendor: -2,
  benthicItems: -3,
  mechagonJunkyard: -14,
  mechagonWorkshop: -15,
  pvpHonorShadowlandsSeason1: -16,
  pvpConquestShadowlandsSeason1: -17,
  korthiaItems: -18,
  legionTimewalking: -19,
  tazaveshStreets: -20,
  tazaveshSoleah: -21,
  creationCatalyst: -22,
  sandwornRelic: -25,
  karazhanLower: -26,
  karazhanUpper: -27,
  season4RaidVendor: -28,
  shadowlandsPvpSeason3: -29,
  pvpHonorDragonflightSeason1: -30,
  pvpConquestDragonflightSeason1: -31,
  expansionDungeons: -32,

  dragonflightBlacksmithing: -33,
  dragonflightEnchanting: -34,
  dragonflightEngineering: -35,
  dragonflightInscription: -36,
  dragonflightJewelcrafting: -37,
  dragonflightLeatherworking: -38,
  dragonflightTailoring: -39,

  dragonflightProfessions333: -41,
  dragonflightProfessions382: -42,

  dragonflightAlchemy: -43,

  boeVaultTrash: -44, // placeholder

  primalStorms: -45,

  catalystDragonflight1: -46,

  pvpHonorDragonflightSeason2: -47,
  pvpConquestDragonflightSeason2: -48,
  boeAberrusTrash: -49,

  // 10.1.5 solo content
  timeRifts: -50,

  // 10.1.7 solo content
  dreamsurges: -51,

  // 10.2 PVP
  pvpHonorDragonflightSeason3: -52,
  pvpConquestDragonflightSeason3: -53,
  boeAmirdrassilTrash: -54,

  dawnFall: -55,
  dawnRise: -56,

  pvpWorldDragonflightSeason3: -57,

  dfSeason4RaidVendor: -58,

  pvpHonorDragonflightSeason4: -59,
  pvpConquestDragonflightSeason4: -60,
  pvpWorldDragonflightSeason4: -61,

  pvpHonorWarWithinSeason1: -62,
  pvpConquestWarWithinSeason1: -63,
  pvpWorldWarWithinSeason1: -64,

  warWithinProfessionsRare: -65,
  warWithinProfessionsEpic: -66,

  boeNerubarTrash: -67,

  delveRaresWarWithinSeason1: -68,
  delveEpicsWarWithinSeason1: -69,

  catalystWarWithinSeason1: -70,
};

export const FAKE_ENCOUNTER_IDS = {
  relinquishedShoulders: -2,
  relinquishedHelms: -3,
  relinquishedChests: -4,
  benthicHelm: -5,
  benthicShoulders: -6,
  benthicChest: -7,
  benthicLegs: -8,
  benthicBelt: -9,
  benthicWrists: -10,
  benthicCloak: -11,
  benthicFeet: -12,
  benthicGloves: -13,
  pvpHonorShadowlandsSeason1: -14,
  pvpConquestShadowlandsSeason1: -15,
  boeSanctumTrash: -16,
  boeNathriaTrash: -17,
  korthiaItems: -18,
  legionTimewalking: -19,
  // 20 and 21 are tazavesh split
  creationCatalyst: -23,
  boeSepulcherTrash: -24,
  sandwornRelic: -25,
  karazhanLower: -26,
  karazhanUpper: -27,
  season4RaidVendor: -28,
  shadowlandsPvpSeason3: -29,
  pvpHonorDragonflightSeason1: -30,
  pvpConquestDragonflightSeason1: -31,
  expansionDungeonsNotUsed: -32,

  dragonflightBlacksmithing: -33,
  dragonflightEnchanting: -34,
  dragonflightEngineering: -35,
  dragonflightInscription: -36,
  dragonflightJewelcrafting: -37,
  dragonflightLeatherworking: -38,
  dragonflightTailoring: -39,

  dragonflightProfessions333: -41,
  dragonflightProfessions382: -42,

  dragonflightAlchemy: -43,

  boeVaultTrash: -44,
  primalStorms: -45,

  catalystDragonflight1: -46,

  pvpHonorDragonflightSeason2: -47,
  pvpConquestDragonflightSeason2: -48,
  boeAberrusTrash: -49,

  // 10.1.5 solo content
  timeRifts: -50,

  // 10.1.7 solo content
  dreamsurges: -51,

  // 10.2 PVP
  pvpHonorDragonflightSeason3: -52,
  pvpConquestDragonflightSeason3: -53,
  boeAmirdrassilTrash: -54,

  dawnFall: -55,
  dawnRise: -56,

  pvpWorldDragonflightSeason3: -57,

  dfSeason4RaidVendor: -58,

  pvpHonorDragonflightSeason4: -59,
  pvpConquestDragonflightSeason4: -60,
  pvpWorldDragonflightSeason4: -61,

  pvpHonorWarWithinSeason1: -62,
  pvpConquestWarWithinSeason1: -63,
  pvpWorldWarWithinSeason1: -64,

  warWithinProfessionsRare: -65,
  warWithinProfessionsEpic: -66,

  boeNerubarTrash: -67,

  delveRaresWarWithinSeason1: -68,
  delveEpicsWarWithinSeason1: -69,

  catalystWarWithinSeason1: -70,
};

