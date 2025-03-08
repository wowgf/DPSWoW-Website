<template>
  <a-row :gutter="[15, 15]" class="source-select">
    <a-col v-for="(item, index) in instanceList" :key="index" :lg="4" :xs="12">
      <div
        :style="{
          backgroundImage: `url(${`/images/wow/${item.image_button}.png`})`,
          cursor: 'pointer',
          backgroundPosition: 'left -10px top -10px',
          backgroundSize: '200% 200%',
        }"
        :class="{
          '!border-themeGreen text-yellow-400 hover:!border-themeGreen':
            item.id === instanceId,
        }"
        class="box-border h-24 text-base font-bold text-yellow-400 border-2 rounded shadow-sm cursor-pointer text-card-foreground bg-slate-900 border-slate-900/50 border-zinc-700"
        @click="selectInstance(item.id)"
      >
        <div
          :class="{ 'bg-slate-900/50': item.id !== instanceId }"
          class="w-full h-full p-3"
        >
          {{ getAllLocalValue(item.name) }}
        </div>
      </div>
    </a-col>
  </a-row>
</template>

<script setup lang="ts">
import { getAllLocalValue } from "~/cool/utils/language";
import type { Instance } from "~/types/instance";
// getAllLocalValue();

const instanceList = inject("instanceList") as Ref<Instance[]>;
const instanceId = inject("instanceId") as Ref<number>;

const emits = defineEmits(["select"]);

const selectInstance = (id: number) => {
  instanceId.value = id;
  emits("select", id);
};
</script>

<style></style>
