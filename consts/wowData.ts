// import _ from 'lodash';

// 种族
export const raceMap = {
  "human": "人类",
  "orc": "兽人",
  "dwarf": "矮人",
  "dark_iron_dwarf": "黑铁矮人",
  "nightelf": "暗夜精灵",
  "undead": "亡灵",
  "tauren": "牛头人",
  "gnome": "侏儒",
  "troll": "巨魔",
  "bloodelf": "血精灵",
  "blood_elf": "血精灵",
  "draenei": "德莱尼",
  "worgen": "狼人",
  "goblin": "地精",
  "pandaren": "熊猫人",
  "nightborne": "夜之子",
  "highmountain_tauren": "至高岭牛头人",
  "voidelf": "虚空精灵",
  "lightforged_draenei": "光铸德莱尼",
  "zandalari_troll": "赞达拉巨魔",
  "kul_tiran": "库尔提拉斯人",
  "mechagnome": "机械侏儒",
  "vulpera": "狐人"
}

// 职业
export const metierMap: any = {
  "warrior": "战士",
  "mage": "法师",
  "priest": "牧师",
  "rogue": "潜行者",
  "hunter": "猎人",
  "shaman": "萨满祭司",
  "warlock": "术士",
  "paladin": "圣骑士",
  "druid": "德鲁伊",
  "monk": "武僧",
  "demonhunter": "恶魔猎手",
  "evoker": "唤魔师"
}

// 专精
export const specrMap: any = {
  "arms": "武器",
  "fury": "狂怒",
  "protection": "防护",
  "arcane": "奥术",
  "fire": "火焰",
  "frost": "冰霜",
  "discipline": "戒律",
  "holy": "神圣",
  "shadow": "暗影",
  "assassination": "刺杀",
  "combat": "战斗",
  "subtlety": "敏锐",
  "beast_mastery": "野兽控制",
  "marksmanship": "射击",
  "survival": "生存",
  "elemental": "元素",
  "enhancement": "增强",
  "restoration": "恢复",
  "demonology": "恶魔学识",
  "affliction": "痛苦",
  "destruction": "毁灭",
  "retribution": "惩戒",
  "balance": "平衡",
  "feral": "野性",
  "guardian": "守护",
  "blood": "鲜血",
  "unholy": "邪恶",
  "mistweaver": "织雾",
  "brewmaster": "酒仙",
  "windwalker": "踏风",
  "havoc": "浩劫",
  "vengeance": "复仇",
  "preservation": "恩护",
  "devastation": "湮灭",
  "augmentation": "增辉"
}

// 角色
export const roleMap = {
  // attack: '输出'
}

export const specColorMap: any = {
  "arms": {
    // 主属性
    "main": "#C79C6E",
  },
  "fury": "狂怒",
  "protection": "防护",
  "arcane": "奥术",
  "fire": "火焰",
  "frost": "冰霜",
  "discipline": "戒律",
  "holy": "神圣",
  "shadow": "暗影",
  "assassination": "刺杀",
  "combat": "战斗",
  "subtlety": "敏锐",
  "beast_mastery": "野兽控制",
  "marksmanship": "射击",
  "survival": "生存",
  "elemental": "元素",
  "enhancement": "增强",
  "restoration": "恢复",
  "demonology": "恶魔学识",
  "affliction": "痛苦",
  "destruction": "毁灭",
  "retribution": "惩戒",
  "balance": "平衡",
  "feral": "野性",
  "guardian": "守护",
  "blood": "鲜血",
  "unholy": "邪恶",
  "mistweaver": "织雾",
  "brewmaster": "酒仙",
  "windwalker": "踏风",
  "havoc": "浩劫",
  "vengeance": "复仇",
  "preservation": "恩护",
  "devastation": "湮灭",
  "augmentation": "增辉"
}

export const metierColorMap: { [key: string]: { name: string; color: string; mainHand: any; armors: any[]; classId: number } } = {
  "warrior": {
    "name": "战士",
    "color": "#C79C6E",
    mainHand: [1], // 武器类型
    armors: [1], // 护甲类型
    classId: 1 // 职业id
  },
  "mage": {
    "name": "法师",
    "color": "#69CCF0",
    mainHand: [1], // 武器类型
    armors: [1], // 护甲类型
    classId: 8 // 职业id
  },
  "priest": {
    "name": "牧师",
    "color": "#FFFFFF",
    mainHand: [1], // 武器类型
    armors: [1], // 护甲类型
    classId: 5 // 职业id
  },
  "rogue": {
    "name": "潜行者",
    "color": "#FFF569",
    mainHand: [1], // 武器类型
    armors: [1], // 护甲类型
    classId: 4 // 职业id
  },
  "hunter": {
    "name": "猎人",
    "color": "#ABD473",
    mainHand: [1], // 武器类型
    armors: [1], // 护甲类型
    classId: 3 // 职业id
  },
  "shaman": {
    "name": "萨满祭司",
    "color": "#0070DE",
    mainHand: [1], // 武器类型
    armors: [1], // 护甲类型
    classId: 7 // 职业id
  },
  "warlock": {
    "name": "术士",
    "color": "#9482C9",
    mainHand: [1], // 武器类型
    armors: [1], // 护甲类型
    classId: 9 // 职业id
  },
  "paladin": {
    "name": "圣骑士",
    "color": "#F58CBA",
    mainHand: [4], // 武器类型
    armors: [1, 4], // 护甲类型
    classId: 2 // 职业id
  },
  "druid": {
    "name": "德鲁伊",
    "color": "#FF7D0A",
    mainHand: [1], // 武器类型
    armors: [1], // 护甲类型
    classId: 11 // 职业id
  },
  "monk": {
    "name": "武僧",
    "color": "#00FF96",
    mainHand: [1], // 武器类型
    armors: [1], // 护甲类型
    classId: 10 // 职业id
  },
  "demonhunter": {
    "name": "恶魔猎手",
    "color": "#A330C9",
    mainHand: [1], // 武器类型
    armors: [1], // 护甲类型
    classId: 12 // 职业id
  },
  "evoker": {
    "name": "唤魔师",
    "color": "#3FC7EB",
    mainHand: [1], // 武器类型
    armors: [1], // 护甲类型
    classId: 13 // 职业id
  },
  "deathknight": {
    "name": "死亡骑士",
    "color": "#C41F3B",
    mainHand: [1], // 武器类型
    armors: [1], // 护甲类型
    classId: 6 // 职业id
  }
}

export const statIdMap = {
  'crit': 32,
}