import { useParam } from "./param";

export function useRank() {
  const { param } = useParam(["fightPresets"]);

  // const fightPresets = computed<{ name: string; config: any; allowRank: boolean }[]>(() => {
  //   return param.fightPresets?.presets || [];
  // });

  const fightPresets = ref<{ name: string; config: any; allowRank: boolean }[]>([]);

  const rankPresets = computed(() => {
    return fightPresets.value.filter((item) => item.allowRank);
  })

  function canUploadToRank(config: any, isSourceSimcStr?: boolean, isDefaultStr?: number) {
    if (!config) return false;
    return rankPresets.value.find((item) => Object.keys(item.config).every((key) => item.config && item.config[key] === config[key])) && isSourceSimcStr && isDefaultStr != 1;
  }

  service.comm.getParam("fightPresets").then((res) => {
    fightPresets.value = res.presets || [];
  });

  return {
    canUploadToRank,
    fightPresets,
    rankPresets
  }
}