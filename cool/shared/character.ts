import _ from 'lodash';
import { CLASSES, CLASS_ID_MAP } from './classes';
export const classes = CLASSES;

export const specInfo = {
  [CLASS_ID_MAP['Death Knight']]: {
    blood: {
      id: 250,
      name: 'Blood',
      role: 'tank',
      mainStat: 'str',
      icon: 'spell_deathknight_bloodpresence',
      passiveSpellId: 137008,
    },
    frost: {
      id: 251,
      name: 'Frost',
      dualWield: true,
      role: 'melee',
      mainStat: 'str',
      icon: 'spell_deathknight_frostpresence',
      passiveSpellId: 137006,
    },
    unholy: {
      id: 252,
      name: 'Unholy',
      role: 'melee',
      mainStat: 'str',
      icon: 'spell_deathknight_unholypresence',
      passiveSpellId: 137007,
    },
  },
  [CLASS_ID_MAP['Demon Hunter']]: {
    havoc: {
      id: 577,
      name: 'Havoc',
      role: 'melee',
      dualWield: true,
      mainStat: 'agi',
      icon: 'ability_demonhunter_specdps',
      passiveSpellId: 212612,
    },
    vengeance: {
      id: 581,
      name: 'Vengeance',
      role: 'tank',
      dualWield: true,
      mainStat: 'agi',
      icon: 'ability_demonhunter_spectank',
      passiveSpellId: 212613,
    },
  },
  [CLASS_ID_MAP.Druid]: {
    balance: {
      id: 102,
      name: 'Balance',
      role: 'caster',
      mainStat: 'int',
      icon: 'spell_nature_starfall',
      passiveSpellId: 137013,
    },
    feral: {
      id: 103,
      name: 'Feral',
      role: 'melee',
      mainStat: 'agi',
      icon: 'ability_druid_catform',
      passiveSpellId: 137011,
    },
    guardian: {
      id: 104,
      name: 'Guardian',
      role: 'tank',
      mainStat: 'agi',
      icon: 'ability_racial_bearform',
      passiveSpellId: 137010,
    },
    restoration: {
      id: 105,
      name: 'Restoration',
      role: 'healer',
      mainStat: 'int',
      icon: 'spell_nature_healingtouch',
      passiveSpellId: 137012,
    },
  },
  [CLASS_ID_MAP.Evoker]: {
    augmentation: {
      id: 1473,
      name: 'Augmentation',
      role: 'caster',
      mainStat: 'int',
      icon: 'classicon_evoker_augmentation',
      passiveSpellId: 396186,
    },
    devastation: {
      id: 1467,
      name: 'Devastation',
      role: 'caster',
      mainStat: 'int',
      icon: 'classicon_evoker_devastation',
      passiveSpellId: 356809,
    },
    preservation: {
      id: 1468,
      name: 'Preservation',
      role: 'healer',
      mainStat: 'int',
      icon: 'classicon_evoker_preservation',
      passiveSpellId: 356810,
    },
  },
  [CLASS_ID_MAP.Hunter]: {
    beast_mastery: {
      id: 253,
      name: 'Beast Mastery',
      role: 'ranged',
      mainHandOnly: true,
      mainStat: 'agi',
      icon: 'ability_hunter_bestialdiscipline',
      passiveSpellId: 137015,
    },
    marksmanship: {
      id: 254,
      name: 'Marksmanship',
      role: 'ranged',
      mainHandOnly: true,
      mainStat: 'agi',
      icon: 'ability_hunter_focusedaim',
      passiveSpellId: 137016,
    },
    survival: {
      id: 255,
      name: 'Survival',
      role: 'melee',
      mainStat: 'agi',
      icon: 'ability_hunter_camouflage',
      passiveSpellId: 137017,
    },
  },
  [CLASS_ID_MAP.Mage]: {
    arcane: {
      id: 62,
      name: 'Arcane',
      role: 'caster',
      mainStat: 'int',
      icon: 'spell_holy_magicalsentry',
      passiveSpellId: 137021,
    },
    fire: {
      id: 63,
      name: 'Fire',
      role: 'caster',
      mainStat: 'int',
      icon: 'spell_fire_firebolt02',
      passiveSpellId: 137019,
    },
    frost: {
      id: 64,
      name: 'Frost',
      role: 'caster',
      mainStat: 'int',
      icon: 'spell_frost_frostbolt02',
      passiveSpellId: 137020,
    },
  },
  [CLASS_ID_MAP.Monk]: {
    brewmaster: {
      id: 268,
      name: 'Brewmaster',
      role: 'tank',
      dualWield: true,
      mainStat: 'agi',
      icon: 'spell_monk_brewmaster_spec',
      extraStatScales: ['stamina'],
      passiveSpellId: 137023,
    },
    mistweaver: {
      id: 270,
      name: 'Mistweaver',
      role: 'healer',
      mainStat: 'int',
      icon: 'spell_monk_mistweaver_spec',
      passiveSpellId: 137024,
    },
    windwalker: {
      id: 269,
      name: 'Windwalker',
      role: 'melee',
      dualWield: true,
      mainStat: 'agi',
      icon: 'spell_monk_windwalker_spec',
      extraStatScales: ['stamina'],
      passiveSpellId: 137025,
    },
  },
  [CLASS_ID_MAP.Paladin]: {
    holy: {
      id: 65,
      name: 'Holy',
      role: 'healer',
      mainStat: 'int',
      icon: 'spell_holy_holybolt',
      passiveSpellId: 137029,
    },
    protection: {
      id: 66,
      name: 'Protection',
      role: 'tank',
      mainStat: 'str',
      icon: 'ability_paladin_shieldofthetemplar',
      passiveSpellId: 137028,
    },
    retribution: {
      id: 70,
      name: 'Retribution',
      role: 'melee',
      mainStat: 'str',
      icon: 'spell_holy_auraoflight',
      passiveSpellId: 137027,
    },
  },
  [CLASS_ID_MAP.Priest]: {
    discipline: {
      id: 256,
      name: 'Discipline',
      role: 'healer',
      mainStat: 'int',
      icon: 'spell_holy_powerwordshield',
      passiveSpellId: 137032,
    },
    holy: {
      id: 257,
      name: 'Holy',
      role: 'healer',
      mainStat: 'int',
      icon: 'spell_holy_guardianspirit',
      passiveSpellId: 137031,
    },
    shadow: {
      id: 258,
      name: 'Shadow',
      role: 'caster',
      mainStat: 'int',
      icon: 'spell_shadow_shadowwordpain',
      passiveSpellId: 137033,
    },
  },
  [CLASS_ID_MAP.Rogue]: {
    assassination: {
      id: 259,
      name: 'Assassination',
      role: 'melee',
      dualWield: true,
      mainStat: 'agi',
      icon: 'ability_rogue_deadlybrew',
      passiveSpellId: 137037,
    },
    outlaw: {
      id: 260,
      name: 'Outlaw',
      role: 'melee',
      dualWield: true,
      mainStat: 'agi',
      icon: 'ability_rogue_waylay',
      passiveSpellId: 137036,
    },
    subtlety: {
      id: 261,
      name: 'Subtlety',
      role: 'melee',
      dualWield: true,
      mainStat: 'agi',
      icon: 'ability_stealth',
      passiveSpellId: 137035,
    },
  },
  [CLASS_ID_MAP.Shaman]: {
    elemental: {
      id: 262,
      name: 'Elemental',
      role: 'caster',
      mainStat: 'int',
      icon: 'spell_nature_lightning',
      passiveSpellId: 137040,
    },
    enhancement: {
      id: 263,
      name: 'Enhancement',
      role: 'melee',
      dualWield: true,
      mainStat: 'agi',
      icon: 'spell_shaman_improvedstormstrike',
      passiveSpellId: 137041,
    },
    restoration: {
      id: 264,
      name: 'Restoration',
      role: 'healer',
      mainStat: 'int',
      icon: 'spell_nature_magicimmunity',
      passiveSpellId: 137039,
    },
  },
  [CLASS_ID_MAP.Warlock]: {
    affliction: {
      id: 265,
      name: 'Affliction',
      role: 'caster',
      mainStat: 'int',
      icon: 'spell_shadow_deathcoil',
      passiveSpellId: 137043,
    },
    demonology: {
      id: 266,
      name: 'Demonology',
      role: 'caster',
      mainStat: 'int',
      icon: 'spell_shadow_metamorphosis',
      extraStatScales: ['stamina'],
      passiveSpellId: 137044,
    },
    destruction: {
      id: 267,
      name: 'Destruction',
      role: 'caster',
      mainStat: 'int',
      icon: 'spell_shadow_rainoffire',
      passiveSpellId: 137046,
    },
  },
  [CLASS_ID_MAP.Warrior]: {
    arms: {
      id: 71,
      name: 'Arms',
      role: 'melee',
      mainStat: 'str',
      icon: 'ability_warrior_savageblow',
      passiveSpellId: 137049,
    },
    fury: {
      id: 72,
      name: 'Fury',
      role: 'melee',
      dualWield: true,
      dualWield2h: true,
      mainStat: 'str',
      icon: 'ability_warrior_innerrage',
      passiveSpellId: 137050,
    },
    protection: {
      id: 73,
      name: 'Protection',
      role: 'tank',
      mainStat: 'str',
      icon: 'ability_warrior_defensivestance',
      passiveSpellId: 137048,
    },
  },
};

export const specs = [];
_.each(specInfo, (classSpec, classId) => {
  _.each(classSpec, (spec, key) => {
    specs.push({
      ...spec,
      class: _.find(classes, { id: parseInt(classId, 10) }),
      key,
    });
  });
});

export const getClassInfo = (classSearch) => {
  if (_.isNumber(classSearch)) {
    return _.find(classes, { id: classSearch });
  }
  return _.find(classes, c => {
    return _.toLower(_.camelCase(c.name)) === _.toLower(_.camelCase(classSearch));
  });
};

export const getSpecInfoById = specId => _.find(specs, { id: specId });

export const getSpecInfo = _.memoize((classSearch, specSearch) => {
  const classInfo = getClassInfo(classSearch);
  if (classInfo) {
    let info;
    if (_.isNumber(specSearch)) {
      info = _.find(specInfo[String(classInfo.id)], { id: specSearch });
    } else {
      info = specInfo[String(classInfo.id)][_.snakeCase(specSearch)];
    }
    if (info) {
      return getSpecInfoById(info.id);
    }
  }
  return null;
}, (...args) => args.join('::'));