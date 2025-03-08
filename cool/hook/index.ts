import { reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useBrowser } from "./browser";
import { useMitt } from "./mitt";
import * as consts from '@/enums/consts'
import openBindPhone from '@/components/BindPhone/install'
import { useRequirementTags } from "./requirementTags";
export function useRefs() {
  const refs = reactive<{ [key: string]: any }>({});
  function setRefs(name: string) {
    return (el: any) => {
      refs[name] = el;
    };
  }

  return { refs, setRefs };
}


export function useCool() {
  return {
    route: useRoute(),
    router: useRouter(),
    mitt: useMitt(),
    consts: consts,
    ...useBrowser(),
    ...useRefs(),
    openBindPhone,
    requirementTags: useRequirementTags()
  };
}

export * from "./browser";
export * from './pager'
export * from './dict'
export * from './category'
export * from './newUse'
