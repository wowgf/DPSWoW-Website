<template>
  <div class="dungeon-select">
    <a-row :gutter="[16, 10]">
      <a-col v-for="(item, index) in data" :key="index" :lg="6" :xs="12">
        <div
          :class="{
            'border-themeGreen text-themeGreen': modelValue === item.id,
          }"
          class="flex flex-col w-full py-3 border-2 rounded cursor-pointer bg-[#3C3D3E] border-[#3C3D3E] items-center text-gray-400"
          @click="emit('update:modelValue', item.id)"
        >
          <div>{{ getLocalValue("Dungeon", item.name) }}</div>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { getLocalValue } from "~/cool/utils/language";
import type { Encounter } from "~/types/instance";

const props = defineProps<{
  data: Encounter[];
  modelValue: any;
}>();

const emit = defineEmits(["update:modelValue"]);
</script>

<style></style>
