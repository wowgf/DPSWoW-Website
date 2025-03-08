import axios from "axios";
import { metierMap, raceMap, roleMap, specrMap, metierColorMap } from "~/consts/wowData";
import type { Gear, GearData, TalentsData } from "~/types/gear";
import { itemUpgradeSets } from "~/consts/wowItemUpgradeSets";
import { levelMap } from "~/consts/levelData";
import { cloneDeep } from "lodash";
import { weaponClassDetailsRaw } from "~/consts/wowItem";
import { inputInfo } from "../simc/addonInput";

export const wowContent = `# 火灬炎龙 - Arms - 2025-03-03 16:38 - CN/格瑞姆巴托
# SimC Addon 11.0.5-01
# WoW 11.1.0.59466, TOC 110100
# Requires SimulationCraft 1000-01 or newer

warrior="火灬炎龙"
level=80
race=orc
region=cn
server=格瑞姆巴托
role=attack
professions=engineering=71/skinning=100
spec=arms

talents=CcEAO9DBjZzKcjSu6RJDto0RCCGmZGzYmZmZxyyyYGAAAAeAMNMzsMzMMWGYwMPwYmhZ2mBAAAAAAgZMLjxAsFGLbDsAGwMMhMwG

# Saved Loadout: pvp
# talents=CcEAO9DBjZzKcjSu6RJDto0RCCmZbmZMjZmZmNLLLjBAAAAPAGDjZZmZYmlBGMzDMMXAzYGAAAAAAAmhlBDwCGAAAAAAA
# Saved Loadout: pve-屠戮者
# talents=CcEAO9DBjZzKcjSu6RJDto0RCCGmZGzYmZmZxyyyYGAAAAeAMGmZWGzwYZMzMYmHYMzwMMAAAAAAAMjZZMGgNYssNwCYAzwAMwG
# Saved Loadout: 1232
# talents=CcEAO9DBjZzKcjSu6RJDto0RCCGmZGzYmZmZxyyyYGAAAAeAMGmZWGzwYZgBz8AjZGmhBAAAAAAgZMLjxAsBjltBWADYGGgB2A

# 塑战者的开面盔 (593)
head=,id=211984,bonus_id=10876/10371/10278/1494/10255
# 曙光之宝石镶嵌项坠 (590)
neck=,id=224665,gem_id=213486,bonus_id=10279/6652/10395/10878/1772/1662/10255
# 土渣护肩 (597)
shoulder=,id=231395,bonus_id=10376/6652/10273/12093/10383/1485/10255
# 菌愈裹布 (616)
back=,id=219186,bonus_id=10263/6652/10377/3195/10255
# 迷星圣服 (603)
chest=,id=219158,bonus_id=10271/6652/10377/3182/10255
# 小宝的丝带 (1)
shirt=,id=52019
# 搜寻者的腕甲 (606)
wrist=,id=150473,bonus_id=10377/7756/10270/10041/10255
# 燎火之沉积岩护手 (584)
hands=,id=224692,bonus_id=10281/6652/1696/10377/1656/10255
# 掘秘者的腰铠 (610)
waist=,id=211035,gem_id=213462,bonus_id=10265/6652/10397/10377/3189/10255
# 塑战者的腿甲 (616)
legs=,id=211983,bonus_id=10263/6652/10370/1517
# 暗色壁垒之靴 (584)
feet=,id=225590,bonus_id=6652/10378/10353/10281/1485/10255
# 心灵之泪 (606)
finger1=,id=150392,enchant_id=7337,bonus_id=10393/10394/10383/10274/10044/10255
# 无尽盘蛇之戒 (610)
finger2=,id=171478,enchant_id=7340,bonus_id=10265/7756/8902/10017/10255
# 迅芯烛台 (616)
trinket1=,id=225649,bonus_id=6652/10263/3145/10255
# 可拆卸的獠牙 (603)
trinket2=,id=225657,bonus_id=6652/10271/3132/10255
# 阿努巴拉什的硕大颌骨 (606)
main_hand=,id=212407,bonus_id=6652/10354/10270/1507/10255

### Gear from Bags
#
# 适时访客的护肩 (584)
# shoulder=,id=226081,bonus_id=10281/40/11311/10378/1656/10255
#
# 塑战者的利角护甲 (584)
# shoulder=,id=211982,bonus_id=10281/10369/1485
#
# 火灵斗篷 (593)
# back=,id=231415,enchant_id=7415,bonus_id=6652/10378/12092/10383/10278/1481/10255
#
# 协同披风 (29)
# back=,id=65274
#
# 探宝者的披巾 (603)
# back=,id=211062,bonus_id=10271/6652/10377/1508/10255
#
# 冥海披肩 (603)
# back=,id=219185,bonus_id=10271/6652/10377/3182/10255
#
# 恶毒角斗士的残酷披风 (590)
# back=,id=227641,bonus_id=10279/10376/10383/10018/10255
#
# 迷星护手 (584)
# wrist=,id=219151,bonus_id=10281/6652/10876/11215/10377/3163/10255
#
# 英雄的无畏护手 (590)
# hands=,id=227249,bonus_id=10279/10376/10383/10022/10255
#
# 燎火之宝石镶嵌玺戒 (584)
# finger1=,id=224661,bonus_id=10281/6652/10394/10392/1762/1656/10255
#
# 阿加竞争者的纹章  (558)
# trinket1=,id=219933,bonus_id=11318/9627/10840,crafting_quality=5
#
# 阿加竞争者的勋章  (558)
# trinket1=,id=219931,bonus_id=11318/9627/10840,crafting_quality=5
#
# 统群者的权威 (593)
# trinket1=,id=212450,bonus_id=6652/10353/10278/1494/10255
#
# 烈焰淬火剥皮斧 (600)
# main_hand=,id=231464,bonus_id=6652/10272/12093/10384/1488/10255
#
# 塑山者的巨斧 (603)
# main_hand=,id=219354,bonus_id=10271/6652/1508/10255
#
# 无双之古铸长矛 (590)
# main_hand=,id=224708,bonus_id=10279/6652/1687/1662/10255
#
# 炉铸好战者的刺戟 (574)
# main_hand=,id=223860,bonus_id=10296/11140/3153/10254
#
# 乌格拉克斯的小食捣碎器 (584)
# main_hand=,id=212388,bonus_id=6652/10353/10281/1485/10255
#
# 反应式缠网纹章盾 (597)
# off_hand=,id=218125,bonus_id=10273/42/3176/10255

### Weekly Reward Choices
#
# finger1=,id=162541,bonus_id=10278/10388/6652/10394/10392/10383/10001/10255
#
### End of Weekly Reward Choices

### Additional Character Info
#
# upgrade_currencies=c:1792:5424/i:211296:6/i:210221:9/i:224072:1/i:228338:2/i:211516:7/i:228339:2/i:198048:1
#
# slot_high_watermarks=0:593:606/1:590:590/2:597:597/3:603:603/4:610:610/5:616:616/6:590:590/7:606:606/8:590:603/9:606:606/10:603:603/11:616:616/12:606:606/13:156:480/14:600:600/15:571:571/16:597:597
#
# upgrade_achievements=

# Checksum: 91cac7a6`
export function parseDocument(content: string, slots: string[] = ['bag', 'weekly', 'current']) {

  // 角色信息
  let info: any = {
    playerName: '', // 角色名
    metier: '' // 职业
  }

  // 当前装备信息
  let current: any = {} // {hands:{bonus_id:[1,2,3],id:234,enchant_id:3232},finger2:{bonus_id:[1,2,3],id:234,enchant_id:3232}}

  // 背包中的装备信息
  let bag: any = {} // {hands:[{bonus_id:[1,2,3],id:234,enchant_id:3232},{bonus_id:[1,2,3],id:234,enchant_id:3232}],finger2:[{bonus_id:[1,2,3],id:234,enchant_id:3232},{bonus_id:[1,2,3],id:234,enchant_id:3232}]}

  // 每周奖励
  let weekly: any = {} // {hands:[{bonus_id:[1,2,3],id:234,enchant_id:3232},{bonus_id:[1,2,3],id:234,enchant_id:3232}],finger2:[{bonus_id:[1,2,3],id:234,enchant_id:3232},{bonus_id:[1,2,3],id:234,enchant_id:3232}]}

  const lines = content.split("\n");

  info.playerName = getNameFromLines(lines);

  const result = splitArrByStr(lines, "");


  // 解析角色信息
  result[1].forEach(item => {
    const [key, value] = item.split("=");
    info[key] = value
    // 获取当前角色的职业
    if (value.includes(info.playerName)) {
      info.metier = key
    }
  })

  // 解析天赋信息
  result[2].forEach(item => {
    const [key, value] = item.split("=");
    info[key] = value
  })

  const currentLines = result.find(items => items.find(item => item.includes('head=,'))) || []
  // 解析当前装备信息
  currentLines.forEach((item: string, index) => {
    if (item.includes('=')) {
      const nameAndLevel = currentLines[index - 1]?.match(/^#\s*(.*?)\s*\((\d+)\)/);
      current = { ...current, ...formatLine2(item, { isCurrent: true, slot: 'current', gearName: nameAndLevel && nameAndLevel[1], gearLevel: nameAndLevel && nameAndLevel[2] || 0 }), }
    }
  })


  let bagLines: any = result.find(items => items.includes('### Gear from Bags')) || []
  if (slots.includes('bag')) {
    // 解析背包中的装备信息
    bagLines.forEach((item: string, index: number) => {
      if (item.includes('=')) {
        const nameAndLevel = bagLines[index - 1]?.match(/^#\s*(.*?)\s*\((\d+)\)/);
        bag = addItemToObj(bag, formatLine2(item, { slot: 'bag', gearName: nameAndLevel && nameAndLevel[1], gearLevel: nameAndLevel && nameAndLevel[2] || 0 }))
      }
    })
  }

  let weekLines: any = result.find(items => items.includes('### Weekly Reward Choices')) || []
  if (slots.includes('weekly')) {
    // 解析每周奖励的装备信息
    weekLines.forEach((item: string, index: number) => {
      if (item.includes('=')) {
        const nameAndLevel = weekLines[index - 1]?.match(/^#\s*(.*?)\s*\((\d+)\)/);
        weekly = addItemToObj(weekly, formatLine2(item, { slot: 'weekly', gearName: nameAndLevel && nameAndLevel[1], gearLevel: nameAndLevel && nameAndLevel[2] || 0 }))
      }
    })
  }

  let ChecksumLine: any = lines.find(items => items.includes('# Checksum:'))
  let Checksum = ''
  if (ChecksumLine) {
    Checksum = ChecksumLine.split(':')[1].trim()
  }

  // console.log('weekly', weekly);
  const gear: Gear = {
    head: [current.head, ...bag?.head || [], ...weekly?.head || []],
    neck: [current.neck, ...bag?.neck || [], ...weekly?.neck || []],
    shoulder: [current.shoulder, ...bag?.shoulder || [], ...weekly?.shoulder || []],
    back: [current.back, ...bag?.back || [], ...weekly?.back || []],
    chest: [current.chest, ...bag?.chest || [], ...weekly?.chest || []],
    wrist: [current.wrist, ...bag?.wrist || [], ...weekly?.wrist || []],
    hands: [current.hands, ...bag?.hands || [], ...weekly?.hands || []],
    waist: [current.waist, ...bag?.waist || [], ...weekly?.waist || []],
    legs: [current.legs, ...bag?.legs || [], ...weekly?.legs || []],
    feet: [current.feet, ...bag?.feet || [], ...weekly?.feet || []],
    main_hand: [current.main_hand, ...bag?.main_hand || [], ...weekly?.main_hand || []],
    off_hand: [current.off_hand, ...bag?.off_hand || [], ...weekly?.off_hand || []].filter(item => item),
    finger1: [current.finger1],
    finger2: [current.finger2],
    rings: [...bag?.finger1 || [], ...weekly?.finger1 || []],
    trinket1: [current.trinket1],
    trinket2: [current.trinket2],
    trinkets: [...bag?.trinket1 || [], ...weekly?.trinket1 || []],
  };

  // 过滤掉不需要的装备
  Object.keys(gear).forEach(key => {
    gear[key] = gear[key].filter(item => slots.includes(item.slot))
  })

  const talentsList = extractTalents(content)
  info = {
    ...info,
    talentsList: talentsList
  }

  return { gear, info, baseStrs: result[1], current, bag, weekly, talents: talentsList, Checksum, inputInfo: inputInfo(content) }
}

export function formatLine(line: string) {
  let data: any = {};
  let parentKey = "";
  let arr = line.split(",");
  // if (arr.length > 1) {
  //   let [key] = arr[0].split("=");
  //   data[key] = {};
  //   parentKey = key;
  // }
  arr.forEach(item => {
    let [key, value] = item.split("=");
    data[key] = value || {}
  });

  // if (arr.length > 1) {
  //   let [key] = arr[0].split("=");
  //   data[key] = {};
  //   parentKey = key;
  // }

  // arr.forEach((item, index) => {
  //   if (index > 0) {
  //     let [key, value] = item.split("=");
  //     data[parentKey][key] = value || {};
  //   }
  // });

  return data;
}

export function formatLine2(line: string, options: any = {}) {
  let data: any = {};
  let parentKey = "";
  let arr = line.split(",");
  if (arr.length > 1) {
    let [key] = arr[0].split("=");
    data[formatKey(key)] = { ...options };
    parentKey = formatKey(key);
  }

  arr.forEach((item, index) => {
    let [key, value] = item.split("=");
    key = formatKey(key)
    if (index == 0) {
      data[key] = formatValue(data[key] || value || {})
      parentKey = key
    } else {
      data[parentKey][key] = formatValue(value)
    }
  });

  return data;
}

/**
 * 解析值
 * @param value 
 * @returns 
 */
export function formatValue(value: string) {
  if (typeof value !== 'string') {
    return value
  }
  // return value.includes('/') ? value.split('/') : value
  return value
}

/**
 * 解析key值
 * 将#和空格删除
 * @param key 
 * @returns 
 */
function formatKey(key: string) {
  return key.replace(/#|\s/g, '')
}
function extractTalents(text: string): TalentsData[] {
  const result = [];

  // 正则表达式匹配天赋块
  const talentRegex = /#\s*Saved Loadout:\s*(.+)\n#\s*talents=([^\n]+)/g;
  const defaultTalentRegex = /talents=([^\n]+)/;

  let match;

  // 提取命名天赋
  while ((match = talentRegex.exec(text)) !== null) {
    const name = match[1].trim();
    const talents = match[2].trim();
    result.push({ name, value: talents });
  }

  // 提取默认天赋
  const defaultMatch = defaultTalentRegex.exec(text);
  if (defaultMatch) {
    const talents = defaultMatch[1].trim();
    result.unshift({ name: "当前天赋", value: talents, isDefault: true });
  }

  return result;
}
/**
 * 获取游戏角色名
 * @param lines 
 * @returns 
 */
function getNameFromLines(lines: string[]) {
  // 获取第一行包含#的行
  let firstContentLine = lines.find(line => line.includes('# ')) || ''
  const regex = /#\s([^ -]+)\s-/;
  const match = firstContentLine.match(regex);

  if (match && match[1]) {
    const result = match[1]; // 提取的值
    return result;
  } else {
    return ''
  }
}

/**
 * 分割数组
 */
export function splitArrByStr(arr: any[], str: string) {
  const result = [];
  let temp = [];
  for (const item of arr) {
    if (item === str) {
      if (temp.length > 0) {
        result.push(temp);
        temp = [];
      }
    } else {
      temp.push(item);
    }
  }
  if (temp.length > 0) {
    result.push(temp);
  }
  return result;
}

/**
 * 添加数据到对象中
 * @param data 元数据
 * @param item 待添加的数据
 * @returns 
 */
function addItemToObj(data: any, item: any) {
  for (let key in item) {
    if (data[key]) {
      data[key] = [...data[key], item[key]]
    } else {
      data[key] = [item[key]]
    }
  }
  return data
}

export async function getWowData(id: any) {
  let res = await axios.get(`https://db.newbeebox.com/wow/tooltip2/item/${id}?dataEnv=1&locale=4`)
  return res.data
}

export function generalSimcStr(arr: any[], playerInfo: any) {
  let simcStr = `# Base Actor`
  let name = playerInfo.playerName
  for (let key in playerInfo) {
    if (!['playerName'].includes(key)) simcStr = simcStr + '\n' + `${key}=${playerInfo[key]}`
  }

  arr.forEach((item, index) => {
    if (index == 1) {
      simcStr = simcStr + `\n# Actors`
    }
    let copyStr = index < 0 ? `copy="Combo ${index + 1},${name}"` : ''
    let startStr = index > 0 ? `profileset."Combo ${index + 1}"+=` : ''
    simcStr = simcStr + '\n' + copyStr + '\n' + generalComboSimc(item, index) + '\n' + `${startStr}talents=${playerInfo.talents}`
  })

  return simcStr
}

/**
 * 生成单个的ComboSimc字符
 * @param params 
 */
export function generalComboSimc(params: any, comboIndex: number, config?: any) {
  const OBJ_KEYS = ['id', 'bonus_id', 'enchant_id', 'gem_id']
  let simcStr = `### Combo ${comboIndex + 1}`
  let startStr = comboIndex > 0 ? `profileset."Combo ${comboIndex + 1}"+=` : ''
  for (let key in params) {
    let item = params[key]
    let line = `${startStr}${key}=`
    for (let objKey in item) {
      if (OBJ_KEYS.includes(objKey)) {
        line += `,${objKey}=${item[objKey]}`
      }
    }
    simcStr = simcStr + '\n' + line
  }
  if (config) simcStr = simcStr + generalSimulationOptionsString(params)
  return simcStr
}

/**
 * 格式化天赋字符串
 * @param talentString 
 * @returns 
 */
export function decodeTalentString(talentString: string) {
  // 去掉前缀 "talents="
  talentString = talentString.replace("talents=", "");

  // Base64 解码
  const binaryString = atob(talentString);
  const bytes = Array.from(binaryString, char => char.charCodeAt(0));

  // 假设每棵树有 5 层，每层最多有 4 个天赋点数
  const tiers = 5;
  const talentsPerTier = 4;
  const treesCount = 3;

  let index = 0;
  const talentTrees = [];

  for (let treeIndex = 0; treeIndex < treesCount; treeIndex++) {
    const tree = [];
    for (let tier = 0; tier < tiers; tier++) {
      const tierPoints = [];
      for (let talent = 0; talent < talentsPerTier; talent++) {
        // 从解码后的字节中获取每个天赋点数
        tierPoints.push(bytes[index] || 0);
        index++;
      }
      tree.push(tierPoints);
    }
    talentTrees.push(tree);
  }

  return talentTrees;
}

export function generalSimulationOptionsString(params: { fight_style: any; desired_targets: any; max_time: any }) {
  return `
# Simulation Options
fight_style=${params.fight_style}
iterations=5000
desired_targets=${params.desired_targets}
max_time=${params.max_time}
calculate_scale_factors=0
scale_only=strength,intellect,agility,crit,mastery,vers,haste,weapon_dps,weapon_offhand_dps
override.bloodlust=1
override.arcane_intellect=1
override.power_word_fortitude=1
override.battle_shout=1
override.mystic_touch=1
override.chaos_brand=1
override.skyfury=1
override.mark_of_the_wild=1
override.hunters_mark=1
override.bleeding=1
report_details=1
single_actor_batch=1
optimize_expressions=1`
}

export function getMetierNameByInfo(info: { [key: string]: any }) {
  let metierName = ''
  for (let key in info) {
    if (info[key].includes(info.playerName) && key !== 'playerName') {
      metierName = key
    }
  }
  return metierName
}

export function getRoleFieldNameByKey(key: string, map: { [key: string]: any }) {
  // 将key转化为小写
  return map[key.toLowerCase()] || key;
}

/**
 * 获取职业
 * @param name 
 * @returns 
 */
export function getMetier(name: string) {
  const map: any = {}
  for (let key in metierColorMap) {
    map[key] = metierColorMap[key].name
  }
  return getRoleFieldNameByKey(name, map)
}

/**
 * 获取种族
 * 
 * 此函数通过调用`getRoleFieldNameByKey`来获取与给定名称对应的种族信息
 * 它使用了一个名为`raceMap`的映射表，该表存储了名称与种族信息之间的映射关系
 * 
 * @param name - 需要查询种族信息的名称
 * @returns 返回与名称对应的种族信息
 */
export function getRace(name: string) {
  return getRoleFieldNameByKey(name, raceMap)
}

/**
 * 根据名称获取角色
 * 
 * 此函数通过调用`getRoleFieldNameByKey`方法来获取与给定名称对应的角色
 * 主要用于根据特定的名称键获取角色信息，这里的`roleMap`是一个映射表，
 * 用于存储名称键与角色信息之间的映射关系
 * 
 * @param name 角色的名称键，用于在`roleMap`中查找对应的角色信息
 * @returns 返回通过`getRoleFieldNameByKey`方法获取的角色信息
 */
export function getRole(name: string) {
  return getRoleFieldNameByKey(name, roleMap)
}

/**
 * 获取专精
 * 
 * 此函数通过调用`getRoleFieldNameByKey`来获取与给定名称相对应的规格字段名称
 * 它使用了一个名为`specrMap`的映射表，该表存储了名称与规格字段之间的映射关系
 * 
 * @param name - 需要查询的名称
 * @returns 返回对应的规格字段名称
 */
export function getSpec(name: string) {
  return getRoleFieldNameByKey(name, specrMap)
}

/**
 * 通过bonus id组获取装备升级信息
 * @param bonus_ids 1123/2342/423234
 */
export function getUpgradeInfoByBonusId(bonus_ids: string | number[] = '') {

  let bonusIds = (Array.isArray(bonus_ids) ? bonus_ids : bonus_ids.split('/')).map(v => Number(v))

  let groupIds = Object.keys(itemUpgradeSets).map(v => Number(v))

  // 当前等级相关的bonusId
  let levelBonusId: any = null

  let groupId = groupIds.find(groupId => itemUpgradeSets[groupId].map((v: { bonusId: number }) => v.bonusId).some((v: number) => {
    if (bonusIds.includes(v)) {
      levelBonusId = v
      return true
    } else {
      return false
    }
  }))

  return groupId ? {
    list: itemUpgradeSets[groupId], // 当前等级的所有升级信息
    levelBonusId, // 当前等级的bonusId
    leveIndex: itemUpgradeSets[groupId].findIndex(v => v.bonusId == levelBonusId) // 当前等级的索引
  } : undefined;
}

/**
 * 从levelMap中找到bonus_id中的等级相关的id
 * @param bonus_ids
 */
export function getLevelIdFromBonusId(bonus_ids: string | number[] = '') {
  let levelBonusIds = Object.keys(levelMap).map(v => Number(v))
  let bonusIds = (Array.isArray(bonus_ids) ? bonus_ids : bonus_ids.split('/')).map(v => Number(v))
  return bonusIds.find(v => levelBonusIds.includes(v)) || undefined
}

/**
 * 查找相关数值的levelId
 */
export function getLevelIdFromValue(value: number) {
  let levelId = undefined
  for (let key in levelMap) {
    if (levelMap[key] == value) {
      levelId = Number(key)
      break
    }
  }
  return levelId
}

/**
 * 获取levelid对应的数值
 */
export function getValueFromLevelId(levelId: number) {
  return levelMap[levelId] || 0
}

interface UpgradeAmount {
  currencyId: number;
  amount: number;
}

interface UpgradeInfo {
  amounts: UpgradeAmount[];
}

interface UpgradeData {
  upgrades: UpgradeInfo[];
}

/**
 * 计算升级花费
 * @param startLevel 
 * @param endLevel 
 * @param data 
 * @returns 
 */
export function calculateUpgradeCost(startLevel: number, endLevel: number, data: any): Record<number, number> {
  let totalCost: Record<number, number> = {};

  for (let i = startLevel; i < endLevel; i++) {
    const upgradeInfo = data[i];
    if (upgradeInfo && upgradeInfo.amounts) {
      upgradeInfo.amounts.forEach((amount: UpgradeAmount) => {
        if (!totalCost[amount.currencyId]) {
          totalCost[amount.currencyId] = 0;
        }
        totalCost[amount.currencyId] += amount.amount;
      });
    }
  }

  return totalCost;
}

/**
 * 通过天赋值获取天赋详情
 * @param list 
 * @param value 
 * @returns 
 */
export function getTalentsInfoByValue(list: TalentsData[], value: string): TalentsData | null {
  return list.find(item => item.value == value) ?? null
}

/**
 * 判断是否为默认天赋
 * @param list 
 * @param value 
 * @returns 
 */
export function checkDefaultTalents(list: TalentsData[], value: string) {
  return list.find(item => item.value == value && item.isDefault) ? true : false
}

/**
 * 查询升级信息
 * @param startLevel 
 * @returns 
 */
export function getUpgradeSetsByStartLevel(startLevel: number,) {
  let sets = []
  for (let key in itemUpgradeSets) {
    const eleData = itemUpgradeSets[key]
    if (eleData[0].itemLevel == startLevel) {
      sets = eleData
      break
    }
  }
  return sets
}

/**
 * 给基础装备升级到目标等级
 */
export function upgradeGearToTargetLevel(gearData: GearData, targetLevel: number): GearData {
  const data = cloneDeep(gearData)

  if (!targetLevel) return data

  let diffLevelValue = targetLevel - data.gearLevel;

  let levelBonusId = getLevelIdFromValue(diffLevelValue) || '';

  // 查找当前level的bonusId
  let oldLevelBonusId = getLevelIdFromBonusId(data.bonus_id)

  let bonus_id = data.bonus_id ? (oldLevelBonusId ? `${data.bonus_id}`.replace(`${oldLevelBonusId}`, `${levelBonusId}`) : `${data.bonus_id}/${levelBonusId}`) : `${levelBonusId}`

  // 如果有oldLevelBonusId，那么就替换
  if (oldLevelBonusId) {
    bonus_id = `${bonus_id}`.replace(`${oldLevelBonusId}`, `${levelBonusId}`)
  }

  data.gearLevel = targetLevel
  data.bonus_id = bonus_id
  return data
}

/**
 * 检查当前角色是否可以装备该装备
 */
export function checkCanEquipGear(gearData: { itemClass: number; itemSubClass: number }, playerInfo: [string | undefined, string | undefined]) {
  const { itemClass, itemSubClass } = gearData;

  const weaponDetails = weaponClassDetailsRaw.find(
    (weapon) => weapon.itemClass === itemClass && weapon.itemSubClass === itemSubClass
  );

  if (!weaponDetails) {
    return false;
  }

  const [playerClass, playerSpec] = playerInfo;

  const canDrop = weaponDetails.specsCanDrop.some(
    ([specClass, spec]) => specClass === playerClass && spec === playerSpec
  );

  // const canUse = weaponDetails.specsAlsoCanUse?.some(
  //   ([specClass, spec]) => specClass === playerClass && spec === playerSpec
  // );

  return canDrop || false;
}

/**
 * 计算装备等级
 */
export function calculateGearLevel(gear: Gear) {
  Object.keys(gear).forEach(key => {
    gear[key].forEach((item: GearData) => {
      if (item.gearLevel == 0 && item.level) {
        let level = getItemOverrideLevel(item.bonus_id.split('/').map(v => Number(v)))
        item.gearLevel = Number(item.level) + Number(level)
      }
    })
  })
}

export function getItemOverrideLevel(bonusIds: number[]) {
  return bonusIds.reduce((prev, curr) => prev + getValueFromLevelId(curr), 0)
}