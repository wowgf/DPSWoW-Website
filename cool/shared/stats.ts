export const STATS = [
  {
    enum: 'STAT_NONE',
    shortName: '',
  },
  {
    enum: 'STAT_STRENGTH',
    dataId: 4,
    shortName: 'Str',
  },
  {
    enum: 'STAT_AGILITY',
    dataId: 3,
    shortName: 'Agi',
  },
  {
    enum: 'STAT_STAMINA',
    dataId: 7,
    shortName: 'Sta',
  },
  {
    enum: 'STAT_INTELLECT',
    dataId: 5,
    shortName: 'Int',
  },
  {
    enum: 'STAT_SPIRIT',
    dataId: 6,
    shortName: 'Spi',
  },
  {
    enum: 'STAT_AGI_INT',
    dataId: 73,
    shortName: 'AgiInt',
  },
  {
    enum: 'STAT_STR_AGI',
    dataId: 72,
    shortName: 'StrAgi',
  },
  {
    enum: 'STAT_STR_INT',
    dataId: 74,
    shortName: 'StrInt',
  },
  {
    enum: 'STAT_STR_AGI_INT',
    dataId: 71,
    shortName: 'StrAgiInt',
  },
  {
    enum: 'STAT_HEALTH',
    dataId: 1,
    shortName: 'Health',
  },
  {
    enum: 'STAT_MANA',
    dataId: 0,
    shortName: 'Mana',
  },
  {
    enum: 'STAT_RAGE',
    // no dataId
    shortName: 'Rage',
  },
  {
    enum: 'STAT_ENERGY',
    // no dataId
    shortName: 'Energy',
  },
  {
    enum: 'STAT_FOCUS',
    // no dataId
    shortName: 'Focus',
  },
  {
    enum: 'STAT_RUNIC',
    // no dataId
    shortName: 'Runic',
  },
  {
    enum: 'STAT_MAX_HEALTH',
    // no dataId
    shortName: 'MaxHealth',
  },
  {
    enum: 'STAT_MAX_MANA',
    // no dataId
    shortName: 'MaxMana',
  },
  {
    enum: 'STAT_MAX_RAGE',
    // no dataId
    shortName: 'MaxRage',
  },
  {
    enum: 'STAT_MAX_ENERGY',
    // no dataId
    shortName: 'MaxEnergy',
  },
  {
    enum: 'STAT_MAX_FOCUS',
    // no dataId
    shortName: 'MaxFocus',
  },
  {
    enum: 'STAT_MAX_RUNIC',
    // no dataId
    shortName: 'MaxRunic',
  },
  {
    enum: 'STAT_SPELL_POWER',
    dataId: 45,
    shortName: 'SP',
  },
  {
    enum: 'STAT_ATTACK_POWER',
    dataId: 38,
    shortName: 'AP',
  },
  {
    enum: 'STAT_EXPERTISE_RATING',
    dataId: 37,
    shortName: 'Exp',
  },
  {
    enum: 'STAT_EXPERTISE_RATING2',
    // no dataId
    shortName: 'InvExp',
  },
  {
    enum: 'STAT_HIT_RATING',
    dataId: 31,
    shortName: 'Hit',
  },
  {
    enum: 'STAT_HIT_RATING2',
    // no dataId
    shortName: 'InvHit',
  },
  {
    enum: 'STAT_CRIT_RATING',
    dataId: 32,
    shortName: 'Crit',
  },
  {
    enum: 'STAT_HASTE_RATING',
    dataId: 36,
    shortName: 'Haste',
  },
  {
    enum: 'STAT_MASTERY_RATING',
    dataId: 49,
    shortName: 'Mastery',
  },
  {
    enum: 'STAT_VERSATILITY_RATING',
    dataId: 40,
    shortName: 'Vers',
  },
  {
    enum: 'STAT_LEECH_RATING',
    dataId: 62,
    shortName: 'Leech',
  },
  {
    enum: 'STAT_SPEED_RATING',
    dataId: 61,
    shortName: 'RunSpeed',
  },
  {
    enum: 'STAT_AVOIDANCE_RATING',
    dataId: 63,
    shortName: 'Avoidance',
  },
  {
    enum: 'STAT_ARMOR',
    shortName: 'Armor',
  },
  {
    enum: 'STAT_BONUS_ARMOR',
    dataId: 50,
    shortName: 'BonusArmor',
  },
  {
    enum: 'STAT_RESILIENCE_RATING',
    dataId: 35,
    shortName: 'Resilt',
  },
  {
    enum: 'STAT_DODGE_RATING',
    dataId: 13,
    shortName: 'Dodge',
  },
  {
    enum: 'STAT_PARRY_RATING',
    dataId: 14,
    shortName: 'Parry',
  },
  {
    enum: 'STAT_BLOCK_RATING',
    dataId: 15,
    shortName: 'BlockR',
  },
  {
    enum: 'STAT_PVP_POWER',
    dataId: 57,
    shortName: 'PvPP',
  },
  {
    enum: 'STAT_WEAPON_DPS',
    shortName: 'Wdps',
  },
  {
    enum: 'STAT_WEAPON_OFFHAND_DPS',
    shortName: 'WOHdps',
  },
  {
    enum: 'STAT_ALL',
    shortName: 'All',
  },
  {
    dataId: 64,
    shortName: 'Indestructible',
  },
  {
    enum: 'STAT_CORRUPTION',
    dataId: 22,
    shortName: 'Cor',
  },
  {
    enum: 'STAT_CORRUPTION_RESISTANCE',
    dataId: 23,
    shortName: 'Rcor',
  },
  {
    enum: 'STAT_CRAFT_MOD_1',
    dataId: 24,
    shortName: 'Craft1',
  },
  {
    enum: 'STAT_CRAFT_MOD_2',
    dataId: 25,
    shortName: 'Craft2',
  },
  {
    enum: 'STAT_HEALTH_REGEN',
    dataId: 46,
    shortName: 'HealthRegen',
  },
];

export const COMBAT_RATINGS = {
  0: 'Unused 0',
  1: 'Defense Skill',
  2: 'Dodge',
  3: 'Parry',
  4: 'Block',
  5: 'Hit - Melee',
  6: 'Hit - Ranged',
  7: 'Hit - Spell',
  8: 'Crit - Melee',
  9: 'Crit - Ranged',
  10: 'Crit - Spell',
  11: 'Corruption', // formerly Multistrike
  12: 'Corruption Resistance',
  13: 'Speed',
  14: 'Resilience - Crit Taken',
  15: 'Resilience - Player Damage',
  16: 'Leech', // Lifesteal
  17: 'Haste - Melee',
  18: 'Haste - Ranged',
  19: 'Haste - Spell',
  20: 'Avoidance',
  21: 'Indestructible', // Sturdiness
  22: 'Unused 7',
  23: 'Expertise',
  24: 'Armor Penetration',
  25: 'Mastery',
  26: 'PvP Power',
  27: 'Unused 27',
  28: 'Versatility - Damage Done',
  29: 'Versatility - Healing Done',
  30: 'Versatility - Damage Taken',
  31: 'Unused 12',
};
