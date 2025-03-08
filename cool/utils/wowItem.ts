import type { EncounterItem } from "~/types/instance";
import { getSpecInfo } from "../shared/character";
import _ from 'lodash';
import { STATS } from "../shared/stats";
import { weaponClassDetailsRaw } from "~/consts/wowItem";
import { SLOT_MAP } from "../simc/constants";

const mainStatMap = {
  agi: ['STAT_AGILITY', 'STAT_AGI_INT', 'STAT_STR_AGI', 'STAT_STR_AGI_INT'],
  int: ['STAT_INTELLECT', 'STAT_AGI_INT', 'STAT_STR_INT', 'STAT_STR_AGI_INT'],
  str: ['STAT_STRENGTH', 'STAT_STR_AGI', 'STAT_STR_INT', 'STAT_STR_AGI_INT'],
};

export const slotMap = SLOT_MAP;

export const armorSubClasses = [{
  itemSubClass: 0,
  key: 'misc',
  name: 'Misc',
}, {
  itemSubClass: 1,
  key: 'cloth',
  name: 'Cloth',
}, {
  itemSubClass: 2,
  key: 'leather',
  name: 'Leather',
}, {
  itemSubClass: 3,
  key: 'mail',
  name: 'Mail',
}, {
  itemSubClass: 4,
  key: 'plate',
  name: 'Plate',
}, {
  itemSubClass: 6,
  key: 'shield',
  name: 'Shield',
}];

const mainStatIdMap = _.mapValues(
  mainStatMap,
  statEnums => _.map(statEnums, enumName => _.get(_.find(STATS, { enum: enumName }), 'dataId')),
);

const allMainStats = _.flatten(_.values(mainStatIdMap));

export const invertedSlotMap = _.mapValues(_.invert(slotMap), slotId => parseInt(slotId, 10));

const itemHasAnyMainStat = item => {
  let hasStat = false;
  _.each(item.stats, stat => {
    hasStat = hasStat || _.includes(allMainStats, stat.id);
  });
  return hasStat;
};

const itemHasMainStat = (item, mainStatShortName) => {
  let hasStat = false;
  _.each(item.stats, stat => {
    hasStat = hasStat || _.includes(mainStatIdMap[mainStatShortName], stat.id);
  });
  return hasStat;
};

const weaponClassDetails = _.map(weaponClassDetailsRaw, details => {
  const specsCanDrop = _.map(details.specsCanDrop, spec => _.get(getSpecInfo(spec[0], spec[1]), 'id'));
  const specsCanUse = _.union(
    specsCanDrop,
    _.map(details.specsAlsoCanUse, spec => _.get(getSpecInfo(spec[0], spec[1]), 'id')),
  );
  return {
    ...details,
    specsCanDrop,
    specsCanUse,
  };
});

export const getItemSlotName = (item: EncounterItem) => SLOT_MAP[item.inventoryType];
export const itemNotUsableReason = (item: EncounterItem, classSearch: number, specSearch: number, onlyDrop = false, checkSpec = true) => {
  const specInfo = getSpecInfo(classSearch, specSearch);

  ///////////////////////////////////////////////////
  // check class/spec constraints first

  if (!specInfo) {
    return 'no_spec_info';
  }

  if (item.allowableClasses) {
    if (!_.includes(item.allowableClasses, specInfo.class.id)) {
      return 'class_cannot_use';
    }
  }

  // check spec override first
  if (checkSpec && item.specs) {
    if (_.includes(item.specs, specInfo.id)) {
      return null;
    }
    return 'spec_cannot_use';
  }

  ///////////////////////////////////////////////////
  // Now check various attributes of the armor itself

  let wrongMainStat = false;

  // check for non-matching main stat on an item
  if (item.stats && itemHasAnyMainStat(item) && !itemHasMainStat(item, specInfo.mainStat)) {
    wrongMainStat = true;
  }

  // jewelry is usable by anyone assuming no class/spec constraints
  if (_.includes(['finger', 'neck'], getItemSlotName(item))) {
    // if jewelry has a main stat, make sure it's the right one.
    // some very old jewelry showing up in refactored M+ dungeons have main stat
    // These will hopefully go away completely when Blizz updates the dungeon journal
    if (wrongMainStat) {
      return 'wrong_main_stat';
    }
    return null;
  }

  // check armor class
  if (item.itemClass === 4) {
    // skip cloaks, anyone can use
    if (item.inventoryType !== parseInt(invertedSlotMap.back, 10)) {
      const armorSubClass = _.find(armorSubClasses, { itemSubClass: item.itemSubClass });
      if (armorSubClass) {
        if (!_.includes(specInfo.class.armorTypes, armorSubClass.key)) {
          return 'wrong_armor_type';
        }
      }
    }
  }

  // check weapon/spec table
  if (_.includes(['main_hand', 'off_hand'], getItemSlotName(item))) {
    const weaponInfo = _.find(weaponClassDetails, { itemClass: item.itemClass, itemSubClass: item.itemSubClass });
    if (weaponInfo) {
      if (onlyDrop) {
        if (!_.includes(weaponInfo.specsCanDrop, specInfo.id)) {
          return 'item_does_not_drop';
        }
      } else if (!_.includes(weaponInfo.specsCanUse, specInfo.id)) {
        return 'spec_cannot_use';
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
    return 'wrong_main_stat';
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