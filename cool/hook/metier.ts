import type { Metier, Specialization } from "~/types/wowdata";
import { useJson } from "./json";


export function useMetier() {
  const { json } = useJson(["metier"]);

  const metierList = computed<Metier[]>(() => {
    return json.metier || [];
  })

  // const metierMap = new Map<string, Metier>();

  const metierMap = computed(() => {
    let map = new Map<string, Metier>();
    metierList.value.forEach((item) => {
      map.set(item.namenick, item);
    });
    return map;
  });

  const specMap = computed(() => {
    let map = new Map<string, Specialization>();
    metierList.value.forEach((metier) => {
      metier.specializationList.forEach((spec) => {
        map.set(spec.namespec, spec);
      });
    });
    return map;
  })

  function getMetierByName(name: string) {
    return metierList.value.find((item) => item.name === name)
  }

  function getSpecByName(name: string) {
    let spec = null;
    for (let i = 0; i < metierList.value.length; i++) {
      let item = metierList.value[i];
      for (let index = 0; index < item.specializationList.length; index++) {
        const element = item.specializationList[index];
        if (element.name === name) {
          spec = element;
          break;
        }
      }
    }
    return spec;
  }

  return {
    metierList: metierList,
    metierMap,
    specMap,
    getMetierByName,
    getSpecByName,
  };
}
