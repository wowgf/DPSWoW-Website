<template>
  <div class="flex flex-wrap gap-3">
    <div
      v-for="(item, index) in [...list]"
      :key="index"
      :style="{
        color: metierMap.get(item.className)?.namecolor,
        borderColor: isSelected(item)
          ? metierMap.get(item.className)?.namecolor
          : '',
      }"
      class="bg-[#3C3D3E] cursor-pointer gap-1 flex py-1 px-2 box-border border-2 font-semibold border-[#3C3D3E] rounded relative overflow-hidden select-none text-sm"
      @click="onSelect(item)"
    >
      <span>{{ item.characterName }}</span>
      <span>-</span>
      <span>{{ metierMap.get(item.className)?.name }}</span>
      <span>-</span>
      <span>{{ specMap.get(item.specName)?.specializationname }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMetier } from "~/cool/hook/metier";
import type { UserCharacter } from "~/types/user";

const { metierMap, specMap } = useMetier();

const props = defineProps<{
  modelValue: string;
}>();

const list = ref<UserCharacter[]>([]);

const emits = defineEmits(["update:modelValue", "change"]);

if (checkLogin()) refresh();

function refresh() {
  service.user.myCharacterList().then((res) => {
    list.value = res.sort((a, b) =>
      a.updateTime > b.updateTime ? -1 : 1
    );
  });
}

const isSelected = (item: UserCharacter) => {
  return item.simcStr == props.modelValue;
};

function onSelect(item: UserCharacter) {
  emits("update:modelValue", item.simcStr);
  emits("change", item.simcStr);
}
</script>

<style></style>
