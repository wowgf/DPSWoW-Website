export function useDpsRecord() {
  function getDpsInfo(record: any) {
    // 输出结果
    const dpsResultList = [
      { ...record.result?.statistics?.raid_dps, name: "Combo 1" }, // 当前装备的组合的dps
      ...(record.result?.profilesets?.results || []), // 其他组合的dps
    ]
      .map((item) => ({
        ...item,
        comboOption: record.combinations[item.name.split(" ")[1] - 1] || {},
        comboIndex: item.name.split(" ")[1] - 1,
      }))
      .sort((a, b) => b.mean - a.mean);

    // 最佳组合
    const bestComb = () => {
      const comboIndex = dpsResultList[0]?.comboIndex || 0;
      return record.combinations[comboIndex] || {};
    }

    const bestDps = (() => {
      return dpsResultList[0] || {};
    });

    return {
      dpsResultList,
      bestComb,
      bestDps
    }
  }

  return {
    getDpsInfo
  }
}