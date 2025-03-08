// 掉落配置
export const drop = {
  // 可转化的套装来源id
  catalyst: {
    instanceId: -70,
    encounter: -70
  },
  // 暂时不用了，改用下面的instanceNames
  instanceIds: [
    1296, // 解放安德玛 - Liberation of Undermine
    -1, // 大秘境 - Mythic+ Dungeons
    -71, // 第二赛季 - Catalyst - Season 2
    -66, // 专业制作 - Professions - Epic
    1278, // 阿兹卡加 - Khaz Algar
    -32, // 普通地下城 - Normal Dungeons
    1273, // 尼鲁巴尔王宫 - Nerub-ar Palace
  ], //
  instanceNames: [
    'Khaz Algar',  // 1278 - 阿兹卡加
    'Liberation of Undermine', // 1296 - 解放安德玛
    'Mythic+ Dungeons', // -1 - 大秘境 
    'Normal Dungeons', // -32 - 普通地下城
    'Professions - Epic', // -66 - 专业制作
    'Catalyst - Season 2', // -71 - 第二赛季
    'Nerub-ar Palace', // 1273 - 尼鲁巴尔王宫
  ],
  itemClassIds: [
    23, // 副手 - offHand
    1, // 头部 - head
    19, // 战袍 - tabard
    11, // 手指 - finger
    10, // 手部 - hands
    14, // 盾牌 - shield
    3, // 肩部 - shoulder
    16, // 背部 - back
    5, // 胸部 - chest
    8, // 脚部 - feet
    9, // 腕部 - wrist
    6, // 腰部 - waist
    7, // 腿部 - legs
    4, // 衬衣 - shirt
    2, // 颈部 - neck
    12, // 饰品 - trinket
  ]
}