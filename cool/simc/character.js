import _ from 'lodash';

import { MAX_LEVEL as CONSTANT_MAX_LEVEL } from './constants';
import { find as findRealm } from './realms';
import { CLASSES, CLASS_ID_MAP } from './classes';

export const MAX_LEVEL = CONSTANT_MAX_LEVEL;

export const classes = CLASSES;
export const classIdMap = CLASS_ID_MAP;

export const races = [{
  id: 1,
  mask: 1,
  side: 'alliance',
  name: 'Human',
  simcName: 'human',
}, {
  id: 2,
  mask: 2,
  side: 'horde',
  name: 'Orc',
  simcName: 'orc',
}, {
  id: 3,
  mask: 4,
  side: 'alliance',
  name: 'Dwarf',
  simcName: 'dwarf',
}, {
  id: 4,
  mask: 8,
  side: 'alliance',
  name: 'Night Elf',
  simcName: 'night_elf',
}, {
  id: 5,
  mask: 16,
  side: 'horde',
  name: 'Undead',
  simcName: 'undead',
}, {
  id: 6,
  mask: 32,
  side: 'horde',
  name: 'Tauren',
  simcName: 'tauren',
}, {
  id: 7,
  mask: 64,
  side: 'alliance',
  name: 'Gnome',
  simcName: 'gnome',
}, {
  id: 8,
  mask: 128,
  side: 'horde',
  name: 'Troll',
  simcName: 'troll',
}, {
  id: 9,
  mask: 256,
  side: 'horde',
  name: 'Goblin',
  simcName: 'goblin',
}, {
  id: 10,
  mask: 512,
  side: 'horde',
  name: 'Blood Elf',
  simcName: 'blood_elf',
}, {
  id: 11,
  mask: 1024,
  side: 'alliance',
  name: 'Draenei',
  simcName: 'draenei',
}, {
  id: 22,
  mask: 2097152,
  side: 'alliance',
  name: 'Worgen',
  simcName: 'worgen',
}, {
  id: 24,
  mask: 8388608,
  side: 'neutral',
  name: 'Pandaren',
  simcName: 'pandaren',
}, {
  id: 25,
  mask: 16777216,
  side: 'alliance',
  name: 'Pandaren',
  simcName: 'pandaren_alliance',
}, {
  id: 26,
  mask: 33554432,
  side: 'horde',
  name: 'Pandaren',
  simcName: 'pandaren_horde',
}, {
  id: 27,
  mask: 0,
  side: 'horde',
  name: 'Nightborne',
  simcName: 'nightborne',
}, {
  id: 28,
  mask: 0,
  side: 'horde',
  name: 'Highmountain Tauren',
  simcName: 'highmountaintauren',
}, {
  id: 29,
  mask: 0,
  side: 'alliance',
  name: 'Void Elf',
  simcName: 'voidelf',
}, {
  id: 30,
  mask: 0,
  side: 'alliance',
  name: 'Lightforged Draenei',
  simcName: 'lightforgeddraenei',
}, {
  id: 31,
  mask: 0,
  side: 'horde',
  name: 'Zandalari Troll',
  simcName: 'zandalari_troll',
}, {
  id: 32,
  mask: 0,
  side: 'alliance',
  name: 'Kul Tiran',
  simcName: 'kul_tiran',
}, {
  id: 34,
  mask: 0,
  side: 'alliance',
  name: 'Dark Iron Dwarf',
  simcName: 'dark_iron_dwarf',
}, {
  id: 36,
  mask: 0,
  side: 'horde',
  name: 'Mag\'har Orc',
  simcName: 'magharorc',
}, {
  id: 35,
  mask: 0,
  side: 'horde',
  name: 'Vulpera',
  simcName: 'vulpera',
}, {
  id: 37,
  mask: 0,
  side: 'alliance',
  name: 'Mechagnome',
  simcName: 'mechagnome',
}, {
  id: 52,
  mask: 0,
  side: 'alliance',
  name: 'Dracthyr',
  simcName: 'drakthyr',
}, {
  id: 70,
  mask: 0,
  side: 'horde',
  name: 'Dracthyr',
  simcName: 'drakthyr',
}, {
  id: 84,
  mask: 0,
  side: 'horde',
  name: 'Earthen',
  simcName: 'earthen_dwarf',
}, {
  id: 85,
  mask: 0,
  side: 'alliance',
  name: 'Earthen',
  simcName: 'earthen_dwarf',
}];

// simc role to wow API role
export const roleMap = {
  attack: 'DPS',
  healer: 'HEALING',
  tank: 'TANK',
};

// map spec to role
export const specMap = {
  // shared
  holy: roleMap.healer,
  protection: roleMap.tank,
  frost: roleMap.attack,
  restoration: roleMap.healer,

  blood: roleMap.tank,
  unholy: roleMap.attack,

  havoc: roleMap.attack,
  vengeance: roleMap.tank,

  balance: roleMap.attack,
  feral: roleMap.attack,
  guardian: roleMap.tank,

  augmentation: roleMap.attack,
  devastation: roleMap.attack,
  preservation: roleMap.healer,

  beast_mastery: roleMap.attack,
  marksmanship: roleMap.attack,
  survival: roleMap.attack,

  arcane: roleMap.attack,
  fire: roleMap.attack,

  brewmaster: roleMap.tank,
  mistweaver: roleMap.healer,
  windwalker: roleMap.attack,

  retribution: roleMap.attack,

  discipline: roleMap.healer,
  shadow: roleMap.attack,

  assassination: roleMap.attack,
  outlaw: roleMap.attack,
  combat: roleMap.attack,
  subtlety: roleMap.attack,

  elemental: roleMap.attack,
  enhancement: roleMap.attack,

  affliction: roleMap.attack,
  demonology: roleMap.attack,
  destruction: roleMap.attack,

  arms: roleMap.attack,
  fury: roleMap.attack,
};

// passiveSpellId can be found in simc/engine/dbc/sc_const_data.cpp

export const specInfo = {
  [classIdMap['Death Knight']]: {
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
  [classIdMap['Demon Hunter']]: {
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
  [classIdMap.Druid]: {
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
  [classIdMap.Evoker]: {
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
  [classIdMap.Hunter]: {
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
  [classIdMap.Mage]: {
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
  [classIdMap.Monk]: {
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
  [classIdMap.Paladin]: {
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
  [classIdMap.Priest]: {
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
  [classIdMap.Rogue]: {
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
  [classIdMap.Shaman]: {
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
  [classIdMap.Warlock]: {
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
  [classIdMap.Warrior]: {
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

export const specIdLookup = _.fromPairs(_.map(specs, spec => ([
  _.join([
    _.replace(_.toLower(spec.class.name), ' ', ''),
    _.replace(_.toLower(spec.name), ' ', ''),
  ], '_'),
  spec.id,
])));

export const getClassInfo = (classSearch) => {
  if (_.isNumber(classSearch)) {
    return _.find(classes, { id: classSearch });
  }
  return _.find(classes, c => {
    return _.toLower(_.camelCase(c.name)) === _.toLower(_.camelCase(classSearch));
  });
};

export const getSpecsForClass = classSearch => {
  const classInfo = getClassInfo(classSearch);
  return _.filter(specs, { class: { id: classInfo.id } });
};

export const getSpecInfoById = specId => _.find(specs, { id: specId });

// Finite cache set, should be fine for lodash memoize
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

export const getSpecsByMainStat = mainStat => _.filter(specs, { mainStat });

export const activeLoadout = (character) => {
  if (character) {
    return _.find(character.talentLoadouts, { active: true });
  }

  return null;
};

export const normalizeRegion = _.toLower;
export const normalizeRealm = realm => _.toLower(
  _.replace(
    _.replace(realm, /[ -]/g, '-'),
    /'/g,
    '',
  ),
);
export const normalizeName = _.toLower;

export const getCharacterSpecInfo = character => {
  const loadout = activeLoadout(character);
  const classId = _.get(character, 'class');
  const classInfo = _.find(classes, { id: classId });
  if (loadout && classInfo) {
    return getSpecInfo(classInfo.name, _.get(loadout, 'talents.specName'));
  }
  return null;
};

export const factions = [{
  id: 0,
  name: 'alliance',
}, {
  id: 1,
  name: 'horde',
}];

export const getFaction = character => {
  if (!character) {
    return 'horde';
  }

  const faction = _.find(factions, { id: character.faction });
  if (faction) {
    return faction.name;
  }

  return 'horde';
};

export const getSpecId = character => _.get(getCharacterSpecInfo(character), 'id');

export const className = (character) => {
  if (character) {
    const classId = _.get(character, 'class');
    return _.get(_.find(classes, { id: classId }), 'name', null);
  }

  return null;
};

export const getRole = character => {
  const loadout = activeLoadout(character);
  if (loadout) {
    const specId = loadout.talents?.specId;

    if (specId) {
      return getSpecInfoById(specId).role;
    }
  }

  return false;
};

export const isTank = (character) => {
  return roleMap[getRole(character)] === 'TANK';
};

export const isHealer = (character) => {
  return roleMap[getRole(character)] === 'HEALING';
};

export const isUnsupportedHealer = (character) => {
  if (character) {
    const specId = _.get(activeLoadout(character), 'talents.specId');
    if (specId) {
      const supported = [{
        // resto druid
        classId: 11,
        specName: 'Restoration',
      }];
      /*
      const unsupported = [{
        // MW Monk
        classId: 10,
        specName: 'Mistweaver',
      }, {
        // holy priest
        classId: 5,
        specName: 'Holy',
      }, {
        // disc priest
        classId: 5,
        specName: 'Discipline',
      }, {
        // resto sham
        classId: 7,
        specName: 'Restoration',
      }, {
        // Holy pally
        classId: 2,
        specName: 'Holy',
      }];
      */
      const sInfo = getSpecInfoById(specId);
      const isSupported = _.find(supported, { classId: sInfo.class.id, specName: sInfo.name });
      return (sInfo.role === 'healer' && !isSupported);
    }
  }
  return false;
};

export const isUnsupportedSpec = (character) => {
  if (character) {
    // all healers unsupported except DPS for disc
    if (isUnsupportedHealer(character)) {
      return true;
    }
    const specId = _.get(activeLoadout(character), 'talents.specId');
    if (specId) {
      const unsupported = [
      ];

      return _.includes(unsupported, specId);
    }

    return false;
  }

  return false;
};

export const characterImage = (region, character, size = 'avatar') => {
  if (!region || !character) {
    return null;
  }
  if (!_.includes(['us', 'eu', 'tw', 'kr'], _.toLower(region))) {
    return null;
  }

  const realm = findRealm(region, character.realm);

  return `/wowapi/character/${region}/${realm.slug}/${_.toLower(character.name)}/image/${size}`;
  // return `//render-${region}.worldofwarcraft.com/character/${character.thumbnail.replace('avatar', size)}`;
};
export const avatar = (region, character) => characterImage(region, character, 'inset');

export const armoryRegionLocaleMap = {
  us: 'en_US',
  eu: 'en_GB',
  kr: 'en_US',
  tw: 'en_US',
};

export const getArmoryLink = (region, realm, name) => {
  // https://worldofwarcraft.com/en-us/character/malganis/seriallos
  const locale = armoryRegionLocaleMap[region];
  const [locRegion, locLang] = _.split(locale, '_');
  const localeSlug = `${locRegion}-${_.toLower(locLang)}`;
  return `https://worldofwarcraft.com/${localeSlug}/character/${realm}/${name}`;
};
export const getWarcraftLogsLink = (region, realm, name) => {
  // https://www.warcraftlogs.com/character/us/malganis/seriallos
  return `https://www.warcraftlogs.com/character/${region}/${realm}/${name}`;
};
export const getRaiderIoLink = (region, realm, name) => {
  // https://raider.io/characters/us/malganis/Seriallos
  return `https://raider.io/characters/${region}/${realm}/${name}`;
};

export const getCharacterLinks = (region, character) => {
  if (!region || !character) {
    return null;
  }
  const regionNormalized = normalizeRegion(region);
  const realm = _.get(findRealm(region, character.realm), 'slug');
  const name = normalizeName(character.name);
  return {
    armory: getArmoryLink(regionNormalized, realm, name),
    warcraftlogs: getWarcraftLogsLink(regionNormalized, realm, name),
    raiderio: getRaiderIoLink(regionNormalized, realm, name),
  };
};

const ARMOR_SUBCLASSES = {
  misc: 0,
  cloth: 1,
  leather: 2,
  mail: 3,
  plate: 4,
};

export const getIncorrectArmorPieces = character => {
  if (!character) {
    return null;
  }

  // determine correct armor type
  const classInfo = getClassInfo(character.class);
  if (!classInfo) {
    return null;
  }

  const armorSubclassId = ARMOR_SUBCLASSES[classInfo.armorType];

  const armorSlots = [
    'head', 'shoulder', 'chest', 'waist', 'legs', 'feet', 'wrist', 'hands',
  ];

  const invalidGear = _.filter(
    _.pick(character.items, armorSlots),
    item => item?.itemSubClass && item?.itemSubClass !== armorSubclassId,
  );

  return invalidGear;
};

export const hasDoubleOnUseEquipped = character => {
  const items = character?.items;
  if (items) {
    return items.trinket1?.onUseTrinket && items.trinket2?.onUseTrinket;
  }

  return false;
};
