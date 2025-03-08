<template>
  <div
    class="p-5 rounded-lg my-rank bg-[#201713] border border-[#404040] overflow-hidden text-themeYellow"
  >
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-2 text-lg font-semibold">
        <span>你的角色排名</span>
        <span>-</span>
        <div
          v-if="currentRank.totalRank > 0"
          :style="{ color: metierMap.get(currentRank.className)?.namecolor }"
          class="flex gap-1"
        >
          <span>{{ currentRank.characterName }}</span>
          <span>-</span>
          <span>{{ metierMap.get(currentRank.className)?.name }}</span>
          <span>-</span>
          <span>{{ specMap.get(currentRank.spec)?.specializationname }}</span>
        </div>
        <div v-else class="flex gap-1">
          <!-- <span>暂无数据</span> -->
          <nuxt-link
            :to="{ path: '/gear/rank', query: { rankType: rankType } }"
          >
            <span class="cursor-pointer text-themeRed"
              >去跑分并上传</span
            ></nuxt-link
          >
        </div>
        <a-tooltip
          v-if="otherList.length > 1"
          v-model:popup-visible="showToolTip"
          mini
          position="right"
          trigger="click"
        >
          <template #content>
            <div
              v-for="(item, index) in otherList.filter(
                (v) => v.className != currentRank?.className
              )"
              :key="index"
              :style="{ color: metierMap.get(item.className)?.namecolor }"
              class="flex gap-1 py-1 cursor-pointer !hover:bg-red-500"
              @click="onSelect(item.characterName)"
            >
              <span>{{ item.characterName }}</span>
              <span>-</span>
              <span>{{ metierMap.get(item.className)?.name }}</span>
              <span>-</span>
              <span>{{ specMap.get(item.spec)?.specializationname }}</span>
            </div>
          </template>
          <icon-swap class="text-sm cursor-pointer" />
        </a-tooltip>
        <div class="ml-10">
          <GroupRankButton></GroupRankButton>
        </div>
      </div>
      <div>
        <!-- <GroupRankButton></GroupRankButton> -->
      </div>
    </div>

    <div v-if="currentRank?.totalRank" class="flex flex-wrap gap-3 mt-3">
      <RankItem label="DPS">{{
        formatDpsValue(currentRank.dps, 2, true)
      }}</RankItem>
      <RankItem label="总体排名">#{{ currentRank?.totalRank }} </RankItem>
      <RankItem label="职业排名">#{{ currentRank?.classRank }}</RankItem>
      <RankItem label="专精排名">#{{ currentRank?.specRank }}</RankItem>
    </div>

    <div v-else class="flex flex-wrap gap-3 mt-3">
      <RankItem label="DPS">-</RankItem>
      <RankItem label="总体排名"> - </RankItem>
      <RankItem label="职业排名"> - </RankItem>
      <RankItem label="专精排名"> - </RankItem>
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatDpsValue } from "~/cool/utils/dps";
import RankItem from "./RankItem.vue";
import type { myRank } from "~/types/rank";
import { useMetier } from "~/cool/hook/metier";
import { useUserStore } from "~/store/user";

const props = defineProps<{
  rankType?: any;
}>();

const { metierMap, specMap } = useMetier();
const myRankList = ref<myRank[]>([]);
const { checkLogin } = useUserStore();

const currentCharactername = ref("");

const showToolTip = ref(false);

const rankList = computed(() => {
  return myRankList.value.filter((v) =>
    props.rankType ? v.rankType == props.rankType : true
  );
});

const currentRank = computed(() => {
  return (
    rankList.value.find(
      (v) => v.characterName == currentCharactername.value
    ) || {
      characterName: "",
      className: "",
      dps: 0,
      totalRank: 0,
      classRank: 0,
      specRank: 0,
      rankType: 0,
    }
  );
});

const otherList = computed(() => {
  return rankList.value.filter(
    (v) => v.className != currentRank.value?.className
  );
});

const typeMap = new Map([
  [0, "其他"],
  [1, "单体"],
  [2, "AOE"],
]);

if (checkLogin()) {
  getMyRank();
}

function getMyRank() {
  service.rank.getMyRank().then((res) => {
    myRankList.value = res;
    currentCharactername.value = res[0]?.characterName;
  });
}

function onSelect(name: string) {
  currentCharactername.value = name;
  showToolTip.value = false;
}
</script>

<style></style>
