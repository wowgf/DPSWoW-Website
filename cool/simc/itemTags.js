import _ from 'lodash';
import colors from './colors';

const tags = [{
  key: 'weekly_reward',
  addonCategory: 'Weekly Reward Choices',
  shortName: 'GV',
  name: 'Great Vault Item',
  color: colors.purple,
  badge: true,
}, {
  key: 'catalyst',
  shortName: 'CAT',
  name: 'Catalyst',
  color: colors.darkgreen,
  badge: true,
}, {
  key: 'item-upgrade',
  shortName: 'UPG',
  name: 'Upgraded Item',
  color: colors.darkgreen,
  badge: true,
}, {
  key: 'recraft',
  shortName: 'REC',
  name: 'Recraft',
  color: colors.darkgreen,
  badge: true,
}, {
  key: 'token',
  shortName: 'TOK',
  name: 'Token',
  color: colors.midgray,
  badge: true,
}, {
  key: 'runecarver-legendary',
  shortName: 'RL',
  name: 'Runecarver Legendary',
  color: colors.items[5],
  badge: true,
}, {
  key: 'remove-enchant',
  shortName: 'MOD',
  name: 'Removed Enchant',
  color: colors.darkblue,
  badge: true,
}, {
  key: 'remove-gem',
  shortName: 'MOD',
  name: 'Removed Gems',
  color: colors.darkblue,
  badge: true,
}, {
  key: 'add-socket',
  shortName: 'MOD',
  name: 'Added Socket',
  color: colors.darkblue,
  badge: true,
}, {
  key: 'add-gv-socket',
  shortName: 'GV',
  name: 'Added Socket from Great Vault',
  color: colors.darkblue,
  badge: true,
}, {
  key: 'custom-item',
  shortName: 'MOD',
  name: 'Modified Item',
  color: colors.darkblue,
  badge: true,
}, {
  key: 'item-search',
  shortName: 'TGS',
  name: 'Top Gear Search',
  color: colors.corruption,
  badge: true,
}, {
  key: 'bag',
  addonCategory: 'Gear from Bags',
}, {
  key: 'item_link',
  addonCategory: 'Linked gear',
}];

export const addTag = (item, tag) => {
  if (!item) {
    return null;
  }

  const newItem = {
    ...item,
    tags: item.tags ? [...item.tags] : [],
  };

  newItem.tags.push(tag);

  return newItem;
};

export const tagByAddonCategory = _.keyBy(tags, 'addonCategory');
export const tagByKey = _.keyBy(tags, 'key');

export default tags;

