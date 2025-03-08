<template>
  <a-grid :cols="6" :row-gap="10" :col-gap="16">
    <a-grid-item v-for="(item, index) in list" :key="index">
      <div
        :class="{
          'border-themeGreen text-themeGreen': modelValue === item.value,
        }"
        class="flex flex-col w-full py-3 border-2 rounded cursor-pointer bg-[#3C3D3E] border-[#3C3D3E] items-center text-gray-400"
        @click="onSelect(item)"
      >
        <div>
          <span>{{ getLocalValue("Stat", item.names[0]) }}</span>
          <span class="mx-1">/</span>
          <span>{{ getLocalValue("Stat", item.names[1]) }}</span>
        </div>
      </div>
    </a-grid-item>
  </a-grid>
</template>

<script setup lang="ts">
import { getStatCombos } from "~/cool/simc/items";
import { getLocalValue } from "~/cool/utils/language";

const props = defineProps<{
  modelValue: any;
}>();

const list = ref(getStatCombos());

const emits = defineEmits(["select", "update:modelValue"]);

onMounted(() => {
  const stat = get("DROP_STAT");
  if (stat) {
    onSelect(stat);
  }
});

const onSelect = (item: any) => {
  set("DROP_STAT", item);
  emits("select", item);
  emits("update:modelValue", item.value);
};
</script>

<style></style>
