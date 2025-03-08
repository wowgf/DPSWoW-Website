<template>
  <div class="p-4 text-gray-300 bg-gray-900">
    <!-- Warning Banner -->
    <div class="p-4 mb-6 text-black rounded-md bg-amber-500/90">
      <p class="font-medium">
        这是一次模拟的战斗日志，不是角色玩法指南，数据仅供参考。
      </p>
    </div>

    <!-- Description -->
    <!-- <p class="mb-6 text-gray-400">
      此日志提供了一次模拟的技能释放时间线，每次触发/增益在模拟之间有所不同
    </p> -->

    <div class="max-h-[500px] overflow-auto">
      <!-- Pre-Pull Section -->
      <div class="mb-8">
        <h2 class="mb-4 text-xl font-bold tracking-wider text-slate-300">
          预备
        </h2>
        <div class="space-y-2">
          <div
            v-for="action in prePullActions"
            :key="action.id"
            class="flex items-center"
          >
            <span class="w-20 font-mono text-gray-500">{{
              formatTime(action.time)
            }}</span>
            <div class="flex items-center">
              <SpellTooltip :id="action.id">
                <img
                  v-if="action.spellInfo?.icon_url"
                  :src="action.spellInfo?.icon_url"
                  class="w-5 h-5 mr-3 overflow-hidden cursor-pointer"
                />
              </SpellTooltip>
              <span class="text-gray-200">{{
                action.spellInfo.name || action.spell_name || action.name
              }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Pull Section -->
      <div>
        <h2 class="mb-4 text-xl font-bold tracking-wider text-slate-300">
          开始
        </h2>
        <div class="space-y-2">
          <div
            v-for="action in pullActions"
            :key="action.id"
            class="flex items-center overflow-hidden"
          >
            <span class="w-20 font-mono text-gray-500">
              {{ formatTime(action.time) }}
            </span>
            <div class="flex items-center w-[170px]">
              <span v-if="action.wait">等待资源</span>

              <SpellTooltip :id="action.id">
                <img
                  v-if="action.spellInfo?.icon_url"
                  :src="action.spellInfo?.icon_url"
                  class="w-5 h-5 mr-3 overflow-hidden rounded cursor-pointer"
                />
              </SpellTooltip>
              <span class="text-gray-200">{{
                action.spellInfo.name || action.spell_name || action.name
              }}</span>
            </div>
            <span class="text-gray-400 w-[100px]">{{
              formatTarget(action.target)
            }}</span>
            <div
              class="flex flex-wrap items-center justify-start flex-1 gap-2 overflow-hidden"
            >
              <div
                v-for="effect in action.buffs"
                :key="effect.id"
                :src="effect.icon"
                :alt="effect.name"
                class="w-5 h-5 overflow-hidden bg-white rounded"
              >
                <SpellTooltip :id="effect.id">
                  <img
                    :src="getSpellById(effect.id)?.icon_url"
                    :alt="effect.name"
                    class="object-cover w-full h-full cursor-pointer"
                  />
                </SpellTooltip>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useWowDataStore } from "~/store/wowData";

const props = defineProps<{
  prePullActions: any[];
  pullActions: any[];
}>();

const { getSpellById } = useWowDataStore();
/**
 * 将时间转换为0:02:798格式
 */
const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  const milliseconds = Math.floor((time % 1) * 1000);
  return `${minutes}:${String(seconds).padStart(2, "0")}:${String(
    milliseconds
  ).padStart(3, "0")}`;
};

function formatTarget(str: string) {
  if (str == "none") {
    return "";
  }
  if (str == "Fluffy_Pillow") {
    return "木桩";
  }
  if (str == "Fluffy Pillow") {
    return "木桩";
  }
  return str;
}
</script>

<style scoped>
/* Add any additional custom styles here */
</style>
