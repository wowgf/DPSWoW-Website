import { QualityColorMap } from "~/consts/quality";
import { useDict } from "~/cool";
import { useAppStore } from "~/store/app";
import { useWowDataStore } from "~/store/wowData";
import { storeToRefs } from "pinia";
import { computed, onBeforeUnmount, reactive, ref } from "vue";
import type { GearData } from "~/types/gear";
import { getTalentsInfoByValue } from "~/cool/utils/wow";
import axios from "axios";
import type { ResultRecord } from "~/types/result";
import { getItemProfilesetName, getItemProfilesetNameStat } from "~/cool/simc";

export function useResult() {
  const { getNameByValue } = useDict(["fightStyleOptions", "desiredTargetOptions", "maxTimeOptions"]);
  const options: any[] = [
    ["head", "neck", "shoulder", "back", "chest", "wrist"],
    ["hands", "waist", "legs", "feet", "finger1", "finger2", "trinket1", "trinket2"],
    ["main_hand", "off_hand"],
  ];
  const loading = ref(true);
  let timer: any = undefined;
  const { refreshSpellList, getSpellById } = useWowDataStore();
  const qualityColor: any = QualityColorMap;

  const { isMobile } = storeToRefs(useAppStore());

  const selectCombIndex = ref(0);

  // 表格配置
  const tableHeadOptions = [
    "head",
    "neck",
    "shoulder",
    "back",
    "chest",
    "wrist",
    "hands",
    "waist",
    "legs",
    "feet",
    "finger1",
    "finger2",
    "trinket1",
    "trinket2",
    "main_hand",
    "off_hand",
  ];

  const record = ref<ResultRecord>({
    id: "",
    userId: 0,
    originSimcStrUrl: "",
    rawSimcStrUrl: "",
    rawResultUrl: "",
    cost: 0,
    bestCombo: undefined,
    combinationsUrl: "",
    combinations: [],
    playerInfo: {
      race: "",
      role: "",
      spec: "",
      level: "",
      metier: "",
      region: "",
      server: "",
      talents: "",
      playerName: "",
      deathknight: "",
      professions: "",
      talentsList: []
    },
    simcConfig: {
      buffs: [],
      max_time: 0,
      consumables: {
        food: 0,
        flask: 0,
        potion: 0,
        weapon: 0,
        augmentation: 0
      },
      fight_style: "",
      desired_targets: 0
    },
    params: {},
    bestDps: 0,
    itemLevel: 0,
    type: 0,
    status: 1, // 状态 1-排队中 2-运行中 3-运行完成 9-失败
    jobId: "",
    isRank: 0,
    createTime: "",
    updateTime: ""
  });

  const combinations = ref<any>([]);

  const pawnState = reactive({
    name: true,
    spec: true,
    fightStyle: true,
    date: false,
    format: true,
  });

  const errorMessage = ref("");

  const queue = ref<any>({
    position: 0,
    total: 0,
  });

  let rawResultUrl = "";

  let combinationsUrl = ''

  let rawSimcStrUrl = ''

  const rawResult = ref<any>({});

  const rawResultLoading = ref(true);
  const combinationsLoading = ref(true);

  // 伤害来源
  const scaleFactors = computed(() => {
    return rawResult.value?.sim?.players[0]?.scale_factors || {};
  });

  const statKeyNameMap: any = {
    Str: "力量",
    Agi: "敏捷",
    Int: "智力",
    Crit: "暴击",
    Mastery: "精通",
    Haste: "急速",
    Vers: "全能",
    // Wdps: "武器伤害",
  };

  const statWeights = computed(() => {
    let arr = [];
    for (let key in scaleFactors.value) {
      arr.push({
        key: key,
        name: statKeyNameMap[key],
        value: scaleFactors.value[key],
      });
    }
    return arr
      .sort((a, b) => b.value - a.value)
      .filter((v) => Object.keys(statKeyNameMap).includes(v.key));
  });

  // pawn字符
  const pawnStr = computed(() => {
    let gameUserInfo = [];
    if (pawnState.name) {
      gameUserInfo.push(record.value.playerInfo?.playerName);
    }
    if (pawnState.spec) {
      gameUserInfo.push(playerInfo.value.spec);
    }
    if (pawnState.fightStyle) {
      gameUserInfo.push(record.value.simcConfig.fight_style);
    }
    if (pawnState.date) {
      gameUserInfo.push(new Date().toLocaleDateString());
    }

    let statWeights = [
      `CritRating=${scaleFactors.value?.Crit?.toFixed(2)}`,
      `HasteRating=${scaleFactors.value?.Haste?.toFixed(2)}`,
      `MasteryRating=${scaleFactors.value?.Mastery?.toFixed(2)}`,
      `Versatility=${scaleFactors.value?.Vers?.toFixed(2)}`,
    ];

    if (scaleFactors.value?.Wdps) {
      statWeights.push(`Dps=${scaleFactors.value?.Wdps?.toFixed(2)}`);
    }

    if (scaleFactors.value?.Str) {
      statWeights.unshift(`Str=${scaleFactors.value?.Str?.toFixed(2)}`);
    }
    if (scaleFactors.value?.Agi) {
      statWeights.unshift(`Agi=${scaleFactors.value?.Agi?.toFixed(2)}`);
    }
    if (scaleFactors.value?.Int) {
      statWeights.unshift(`Int=${scaleFactors.value?.Int?.toFixed(2)}`);
    }

    let str = `Pawn: v1: "${gameUserInfo.join(" - ")}": ${pawnState.format
      ? `Class=${playerInfo.value.metier}, Spec=${playerInfo.value.spec},`
      : ""
      } ${statWeights.join(", ")}`;

    return `(${str})`;
  });


  const playerInfo = computed(() => {
    return record.value.playerInfo;
  });

  const talentsList = computed(() => {
    return record.value.playerInfo?.talentsList || [];
  });


  // 伤害列表
  const damageList = computed(() => {
    return (rawResult.value?.sim?.players[0]?.stats || [])
      .filter((stat: any) => stat.compound_amount > 0 && stat.id && stat.spell_name)
      .sort((a: any, b: any) => b.compound_amount - a.compound_amount)
      .map((v: any) => ({ ...v, spellInfo: getSpellById(v.id) || {} }));
  });
  // BUFF列表
  const buffList = computed(() => {
    return (rawResult.value?.sim?.players[0]?.buffs || [])
      .filter((buff: any) => buff.uptime > 0)
      .sort((a: any, b: any) => b.uptime - a.uptime)
      .map((v: any) => ({ ...v, spellInfo: getSpellById(v.spell) || {} }));
  });

  // 常驻BUFF列表
  const buffsConstantList = computed(() => {
    return (rawResult.value?.sim?.players[0]?.buffs_constant || []).map((v: any) => ({
      ...v,
      spellInfo: getSpellById(v.spell) || {},
    }));
  });

  // 预备动作
  const prePullActions = computed(() => {
    return (rawResult.value?.sim?.players[0]?.collected_data.action_sequence_precombat || [])
      .filter((v: any) => v.id)
      .map((v: any) => ({ ...v, spellInfo: getSpellById(v.id) || {} }));
  });

  // 开始动作
  const pullActions = computed(() => {
    return (rawResult.value?.sim?.players[0]?.collected_data.action_sequence || [])
      .filter((action: any) => action.id)
      .map((v: any) => ({ ...v, spellInfo: getSpellById(v.id) || {} }));
  });

  // 输出结果
  const dpsResultList = computed(() => {
    if (record.value.status != 3) return [];
    let list = [
      { ...rawResult.value?.sim?.statistics?.raid_dps, name: "Combo 1" }, // 当前装备的组合的dps
      ...(rawResult.value?.sim?.profilesets?.results || []), // 其他组合的dps
    ]
      .map((item) => ({
        ...item,
        comboOption: combinations.value[item.name.split(" ")[1] - 1] || {},
        comboIndex: item.name.split(" ")[1] - 1,
      }))
      .sort((a, b) => b.mean - a.mean);
    return list;
  });


  // 最佳组合
  const bestComb = computed(() => {
    const comboIndex = dpsResultList.value[0]?.comboIndex || 0;
    return combinations.value[comboIndex] || {};
  });


  // 最佳装备
  const bestGearList = computed(() => {
    let list: any[] = [];
    Object.keys(bestComb.value).forEach((key) => {
      if (bestComb.value[key].isSelected) {
        list.push(bestComb.value[key]);
      }
    });
    return list;
  });

  const bestTalents = computed(() => {
    return bestComb.value.talents || playerInfo.value.talents || "";
  });

  const bestDps = computed(() => {
    return dpsResultList.value[0] || {};
  });

  // 计算伤害提升
  const dpsIncrease = computed(() => {
    if (dpsResultList.value.length < 2) return 0;
    return dpsResultList.value[0].mean - dpsResultList.value[1].mean;
  });

  // 计算自身dps
  const currentDps = computed(() => {
    return dpsResultList.value.find((item) => isCurrentComb(item.comboOption))?.mean || 0;
  });

  // 计算最佳组合的和自身装备的差值
  const bestDpsIncrease = computed(() => {
    if (dpsResultList.value.length < 1) return 0;
    const currentCombDps = currentDps.value;
    return bestDps.value.mean - currentCombDps;
  });

  const type = computed(() => {
    return record.value?.type
  })

  const miniPage = computed(() => {
    const route = useRoute();
    let miniPath = "/pages/result/quick";
  
    if (route.path === "/gear/result") {
      miniPath = "/pages/result/best";
    }
  
    if (route.path === "/gear/result/quick") {
      miniPath = "/pages/result/quick";
    }
  
    if (route.path === "/gear/result/drop") {
      miniPath = "/pages/result/drop";
    }
  
    if (route.path === "/gear/result/weekly") {
      miniPath = "/pages/result/weekly";
    }
  
    if (route.path === "/gear/result/weight") {
      miniPath = "/pages/result/weight";
    }
  
    return miniPath + "?id=" + record.value.id;
  });

  provide("type", type);
  provide("record", record);
  provide("damageList", damageList);
  provide("miniPage", miniPage);

  onBeforeUnmount(() => {
    clearTimeout(timer);
  });

  async function getRecord(id?: any, from?: string) {
    try {
      if (!id) {
        service.userSimcRecord.lastRecord().then((res) => {
          id = res?.id;
        });
      }

      if (!id) {
        return;
      }

      const { result, queue: queueData } = await service.userSimcRecord
        .info(id)
        .catch((err) => {
          errorMessage.value = err?.message || "获取数据失败";
        });

      record.value = result;
      queue.value = queueData;

      rawResultUrl = result.rawResultUrl;
      combinationsUrl = result.combinationsUrl;
      rawSimcStrUrl = result.rawSimcStrUrl;

      if (combinationsUrl && result.status === 3) {
        axios.get(combinationsUrl).then((res) => {
          combinations.value = res.data;

          record.value.combinations = res.data;

          // 默认选择当前组合
          const currentIndex = dpsResultList.value.findIndex((item) =>
            isCurrentComb(item.comboOption),
          );

          if (currentIndex > -1) selectComb({}, currentIndex);
        }).finally(() => {
          combinationsLoading.value = false
        });
      }


      if (rawResultUrl) {
        axios.get(rawResultUrl).then((res) => {
          rawResult.value = res.data;
          let damageListIds: any[] = []; // 所有伤害技能的id
          let actionBuffIds: any[] = []; // 所有buff的id
          // 获取damageList和children的id和children的children的id
          const getIds = (list: any) => {
            list.forEach((item: any) => {
              damageListIds.push(item.id);
              if (item.children) {
                getIds(item.children);
              }
            });
          };

          for (let i = 0; i < pullActions.value.length; i++) {
            let buffs = pullActions.value[i].buffs || []; // [{id}]
            for (let j = 0; j < buffs.length; j++) {
              actionBuffIds.push(buffs[j].id);
            }
          }

          getIds(damageList.value);

          // 初始化预备动作
          const ids = [
            ...new Set([
              ...damageListIds,
              ...(buffList.value.map((v: any) => v.spell) || []),
              ...(buffsConstantList.value.map((v: any) => v.spell) || []),
              ...(prePullActions.value.map((v: any) => v.id) || []),
              ...(pullActions.value.map((v: any) => v.id) || []),
              ...actionBuffIds,
            ]),
          ].filter((v) => v);

          refreshSpellList(ids);
        }).finally(() => {
          rawResultLoading.value = false
        });

        // if (from == 'rank') {
        //   service.rank
        //     .uploadDps({ recordId: id })
        //     .then(() => {
        //       Message.success("已上传至排行榜");
        //     })
        // }
      }



      if (result.status === 1 || result.status === 2) {
        timer = setTimeout(() => {
          getRecord(id);
        }, 1000 * 3);
      }
    } catch (error) { }

    loading.value = false;
  }

  /**
   * 检查是否是当前组合
   * @param comb
   */
  function isCurrentComb(comb: any) {
    let isCurrentGear = Object.keys(comb)
      .filter((key) => comb[key] && typeof comb[key] != "string")
      .every((key) => comb[key]?.isCurrent);

    return (
      isCurrentGear &&
      (comb["talents"]
        ? getTalentsInfoByValue(talentsList.value, comb["talents"])?.isDefault
        : true)
    );
  }

  function selectComb(comb: any, index: number) {
    selectCombIndex.value = index;
  }

  // 获取装备数据
  function getGearData(combName: string) {
    const nameArr = combName.split("/"); // ["finger2",629,228843,"stats-vers:haste"] 
    const itemStat = nameArr[3]

    return combinations.value.find((item: any) => item.id == nameArr[2] && (!!itemStat ? getItemProfilesetNameStat(item.crafted_stats) == nameArr[3] : true));
    // return combinations.value?.find(
    //   (item: GearData) => item.id == itemId
    // );
  }

  return {
    getRecord,
    isCurrentComb,
    selectComb,
    loading,
    record,
    playerInfo,
    talentsList,
    errorMessage,
    queue,
    rawResult,
    damageList,
    buffList,
    buffsConstantList,
    prePullActions,
    pullActions,
    dpsResultList,
    bestComb,
    bestTalents,
    bestDps,
    dpsIncrease,
    currentDps,
    bestDpsIncrease,
    selectCombIndex,
    qualityColor,
    tableHeadOptions,
    options,
    getNameByValue,
    bestGearList,
    statWeights,
    scaleFactors,
    pawnState,
    pawnStr,
    getGearData,
    isMobile,
    combinations,
    combinationsLoading,
    rawResultLoading,
    type
  }
}