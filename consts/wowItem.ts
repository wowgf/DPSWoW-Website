export { QualityColorMap } from './quality'

// 部位名称
export const GearNameMap: any = {
  head: "头部",
  neck: "项链",
  shoulder: "肩部",
  back: "背部",
  chest: "胸部",
  wrist: "腕部",
  main_hand: "主手",
  off_hand: "副手",
  hands: "手部",
  waist: "腰部",
  legs: "腿部",
  feet: "脚部",
  finger: "戒指",
  finger1: "戒指1",
  finger2: "戒指2",
  trinket: "饰品",
  trinket1: "饰品1",
  trinket2: "饰品2",
  ring: "戒指",
};

// 部位名称
export const GearSlotTypeId: any = {
  head: 1,
  neck: 2,
  shoulder: 3,
  back: 16,
  chest: 5,
  wrist: 9,
  main_hand: [17],
  off_hand: 23,
  hands: 10,
  waist: 6,
  legs: 7,
  feet: 8,
  finger: 11,
  trinket: 12,
  ring: 11,
};

export const itemSubClassList = [
  {
    "name": "副手",
    "id": 23,
    "slotKey": "offHand"
  },
  {
    "name": "头部",
    "id": 1,
    "slotKey": "head"
  },
  {
    "name": "战袍",
    "id": 19,
    "slotKey": "tabard"
  },
  {
    "name": "手指",
    "id": 11,
    "slotKey": "finger"
  },
  {
    "name": "手部",
    "id": 10,
    "slotKey": "hands"
  },
  {
    "name": "盾牌",
    "id": 14,
    "slotKey": "shield"
  },
  {
    "name": "肩部",
    "id": 3,
    "slotKey": "shoulder"
  },
  {
    "name": "背部",
    "id": 16,
    "slotKey": "back"
  },
  {
    "name": "胸部",
    "id": 5,
    "slotKey": "chest"
  },
  {
    "name": "脚部",
    "id": 8,
    "slotKey": "feet"
  },
  {
    "name": "腕部",
    "id": 9,
    "slotKey": "wrist"
  },
  {
    "name": "腰部",
    "id": 6,
    "slotKey": "waist"
  },
  {
    "name": "腿部",
    "id": 7,
    "slotKey": "legs"
  },
  {
    "name": "衬衣",
    "id": 4,
    "slotKey": "shirt"
  },
  {
    "name": "颈部",
    "id": 2,
    "slotKey": "neck"
  },
  {
    "name": "饰品",
    "id": 12,
    "slotKey": "trinket"
  },
  {
    "name": "主手",
    "id": 17,
    "slotKey": "main_hand"
  }
]

// 武器装备类型对应的职业专精掉落
export const weaponClassDetailsRaw = [{
  // 1h axe
  itemClass: 2,
  itemSubClass: 0,
  specsCanDrop: [
    // str
    ['paladin', 'protection'],
    ['warrior', 'protection'],
    ['warrior', 'fury'],
    ['deathknight', 'frost'],

    // int
    ['paladin', 'holy'],
    ['shaman', 'elemental'],
    ['shaman', 'restoration'],
    ['monk', 'mistweaver'],
    ['evoker', 'augmentation'],
    ['evoker', 'devastation'],
    ['evoker', 'preservation'],

    // agi
    ['demon_hunter', 'havoc'],
    ['demon_hunter', 'vengeance'],
    ['rogue', 'outlaw'],
    ['shaman', 'enhancement'],
    ['monk', 'windwalker'],
    ['monk', 'brewmaster'],
  ],
  specsAlsoCanUse: [
    ['rogue', 'assassination'],
  ],
}, {
  // 2h axe
  itemClass: 2,
  itemSubClass: 1,
  specsCanDrop: [
    ['paladin', 'retribution'],
    ['warrior', 'fury'],
    ['warrior', 'arms'],
    ['deathknight', 'blood'],
    ['deathknight', 'unholy'],
    ['deathknight', 'frost'],
    ['hunter', 'survival'],
    ['evoker', 'augmentation'],
    ['evoker', 'devastation'],
    ['evoker', 'preservation'],
  ],
}, {
  // gun
  itemClass: 2,
  itemSubClass: 2,
  hand: '2h',
  specsCanDrop: [
    ['hunter', 'beast_mastery'],
    ['hunter', 'marksmanship'],
  ],
}, {
  // gun
  itemClass: 2,
  itemSubClass: 3,
  hand: '2h',
  specsCanDrop: [
    ['hunter', 'beast_mastery'],
    ['hunter', 'marksmanship'],
  ],
}, {
  // 1h mace
  itemClass: 2,
  itemSubClass: 4,
  specsCanDrop: [
    // tanks
    ['paladin', 'protection'],
    ['warrior', 'fury'],
    ['warrior', 'protection'],
    ['deathknight', 'frost'],

    // casters/healers
    ['paladin', 'holy'],
    ['druid', 'balance'],
    ['druid', 'restoration'],
    ['priest', 'discipline'],
    ['priest', 'holy'],
    ['priest', 'shadow'],
    ['shaman', 'elemental'],
    ['shaman', 'restoration'],
    ['monk', 'mistweaver'],
    ['evoker', 'devastation'],
    ['evoker', 'augmentation'],
    ['evoker', 'preservation'],

    // agi
    ['rogue', 'outlaw'],
    ['shaman', 'enhancement'],
    ['monk', 'windwalker'],
    ['monk', 'brewmaster'],
  ],
}, {
  // 2h mace
  itemClass: 2,
  itemSubClass: 5,
  specsCanDrop: [
    ['paladin', 'retribution'],
    ['warrior', 'fury'],
    ['warrior', 'arms'],
    ['deathknight', 'blood'],
    ['deathknight', 'unholy'],
    ['deathknight', 'frost'],
    ['shaman', 'elemental'],
    ['druid', 'balance'],
    ['druid', 'restoration'],
    ['evoker', 'preservation'],
    ['evoker', 'devastation'],
    ['evoker', 'augmentation'],
  ],
}, {
  // polearm
  itemClass: 2,
  itemSubClass: 6,
  specsCanDrop: [
    // agi
    ['druid', 'feral'],
    ['druid', 'guardian'],
    ['hunter', 'survival'],
    ['monk', 'windwalker'],
    ['monk', 'brewmaster'],

    // str
    ['paladin', 'retribution'],
    ['warrior', 'arms'],
    ['warrior', 'fury'],
    ['deathknight', 'blood'],
    ['deathknight', 'unholy'],
    ['deathknight', 'frost'],
  ],
  specsAlsoCanUse: [
    ['druid', 'balance'],
  ],
}, {
  // 1h sword
  itemClass: 2,
  itemSubClass: 7,
  specsCanDrop: [
    // tank
    ['paladin', 'protection'],
    ['warrior', 'fury'],
    ['warrior', 'protection'],
    ['deathknight', 'frost'],

    // agi sword
    ['rogue', 'outlaw'],
    ['monk', 'windwalker'],
    ['monk', 'brewmaster'],
    ['demon_hunter', 'havoc'],
    ['demon_hunter', 'vengeance'],
    ['evoker', 'devastation'],
    ['evoker', 'augmentation'],
    ['evoker', 'preservation'],

    // int sword
    ['mage', 'arcane'],
    ['mage', 'fire'],
    ['mage', 'frost'],
    ['paladin', 'holy'],
    ['warlock', 'affliction'],
    ['warlock', 'demonology'],
    ['warlock', 'destruction'],
    ['monk', 'mistweaver'],
  ],
  specsAlsoCanUse: [
    ['rogue', 'assassination'],
  ],
}, {
  // 2h sword
  itemClass: 2,
  itemSubClass: 8,
  specsCanDrop: [
    ['paladin', 'retribution'],
    ['warrior', 'fury'],
    ['warrior', 'arms'],
    ['deathknight', 'blood'],
    ['deathknight', 'unholy'],
    ['deathknight', 'frost'],
    ['hunter', 'survival'],
    ['evoker', 'devastation'],
    ['evoker', 'augmentation'],
    ['evoker', 'preservation'],
  ],
}, {
  // warglaive
  itemClass: 2,
  itemSubClass: 9,
  specsCanDrop: [
    ['demon_hunter', 'havoc'],
    ['demon_hunter', 'vengeance'],
  ],
}, {
  // staff
  itemClass: 2,
  itemSubClass: 10,
  specsCanDrop: [
    // int
    ['mage', 'arcane'],
    ['mage', 'fire'],
    ['mage', 'frost'],
    ['druid', 'balance'],
    ['druid', 'restoration'],
    ['priest', 'discipline'],
    ['priest', 'holy'],
    ['priest', 'shadow'],
    ['shaman', 'elemental'],
    ['shaman', 'restoration'],
    ['warlock', 'affliction'],
    ['warlock', 'demonology'],
    ['warlock', 'destruction'],
    ['monk', 'mistweaver'],
    ['evoker', 'devastation'],
    ['evoker', 'augmentation'],
    ['evoker', 'preservation'],

    // agi
    ['druid', 'feral'],
    ['druid', 'guardian'],
    ['hunter', 'survival'],
    ['monk', 'windwalker'],
    ['monk', 'brewmaster'],
  ],
  specsAlsoCanUse: [
    ['warrior', 'arms'],
    ['warrior', 'fury'],
  ],
}, {
  // fist
  itemClass: 2,
  itemSubClass: 13,
  specsCanDrop: [
    // agi
    ['rogue', 'outlaw'],
    ['shaman', 'enhancement'],
    ['monk', 'windwalker'],
    ['monk', 'brewmaster'],
    ['demon_hunter', 'havoc'],
    ['demon_hunter', 'vengeance'],

    ['evoker', 'devastation'],
    ['evoker', 'augmentation'],
    ['evoker', 'preservation'],

    ['druid', 'balance'],
    ['druid', 'feral'],
    ['druid', 'guardian'],
    ['druid', 'restoration'],
  ],
  specsAlsoCanUse: [
    ['shaman', 'elemental'],
  ],
}, {
  // dagger
  itemClass: 2,
  itemSubClass: 15,
  specsCanDrop: [
    // int
    ['mage', 'arcane'],
    ['mage', 'fire'],
    ['mage', 'frost'],
    ['druid', 'balance'],
    ['druid', 'restoration'],
    ['priest', 'discipline'],
    ['priest', 'holy'],
    ['priest', 'shadow'],
    ['shaman', 'elemental'],
    ['shaman', 'restoration'],
    ['warlock', 'affliction'],
    ['warlock', 'demonology'],
    ['warlock', 'destruction'],
    ['evoker', 'devastation'],
    ['evoker', 'augmentation'],
    ['evoker', 'preservation'],

    // agi
    ['rogue', 'assassination'],
    ['rogue', 'subtlety'],
  ],
  specsAlsoCanUse: [
    ['rogue', 'outlaw'],
  ],
}, {
  // bow/crossbow
  itemClass: 2,
  itemSubClass: 18,
  hand: '2h',
  specsCanDrop: [
    ['hunter', 'beast_mastery'],
    ['hunter', 'marksmanship'],
  ],
}, {
  // wand
  itemClass: 2,
  itemSubClass: 19,
  hand: 'mh',
  specsCanDrop: [
    ['mage', 'arcane'],
    ['mage', 'fire'],
    ['mage', 'frost'],
    ['priest', 'discipline'],
    ['priest', 'holy'],
    ['priest', 'shadow'],
    ['warlock', 'affliction'],
    ['warlock', 'demonology'],
    ['warlock', 'destruction'],
  ],
}, {
  // misc (off hands, tomes)
  itemClass: 4,
  itemSubClass: 0,
  hand: 'oh',
  noEnchant: true,
  specsCanDrop: [
    ['mage', 'arcane'],
    ['mage', 'fire'],
    ['mage', 'frost'],
    ['paladin', 'holy'],
    ['druid', 'balance'],
    ['druid', 'restoration'],
    ['priest', 'discipline'],
    ['priest', 'holy'],
    ['priest', 'shadow'],
    ['warlock', 'affliction'],
    ['warlock', 'demonology'],
    ['warlock', 'destruction'],
    ['monk', 'mistweaver'],
    ['evoker', 'devastation'],
    ['evoker', 'augmentation'],
    ['evoker', 'preservation'],
  ],
  specsAlsoCanUse: [
    ['shaman', 'elemental'],
  ],
}, {
  // shield
  itemClass: 4,
  itemSubClass: 6,
  hand: 'oh',
  noEnchant: true,
  specsCanDrop: [
    ['paladin', 'holy'],
    ['paladin', 'protection'],
    ['warrior', 'protection'],
    ['shaman', 'elemental'],
    ['shaman', 'restoration'],
  ],
}];
