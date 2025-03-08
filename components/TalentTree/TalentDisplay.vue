<template>
  <div class="talent-display">
    <!-- <div class="px-[10px] mb-1">
      <slot name="name"></slot>
    </div> -->
    <div class="talent-container">
      <!-- 英雄天赋节点 -->
      <div>
        <div class="hero-entry-section">
          <SvgIcon
            name="fullscreen"
            fontSize="40"
            color="#f2b233"
            class="transition-transform duration-200 transform cursor-pointer hover:scale-125"
            @click="openTalentModal"
          />
          <div
            v-for="talent in heroEntryTalents"
            :key="talent.id"
            class="talent-item"
          >
            <div
              class="transition-transform duration-200 transform talent-icon hero-entry hover:scale-110"
            >
              <img :src="getTalentIcon(talent)" :alt="talent.name" />
            </div>
            <div class="talent-tooltip">
              <div class="talent-name">{{ talent.name }}</div>
              <div class="talent-description">{{ talent.description }}</div>
            </div>
          </div>
        </div>
      </div>
      <!-- 常规天赋网格 -->
      <div class="talent-grid">
        <div
          v-for="talent in regularTalents"
          :key="talent.id"
          class="talent-item"
        >
          <SpellTooltip :id="talent.nodeInfo?.entries[0]?.spellId">
            <div
              :class="{
                '!rounded-full': talent.nodeInfo?.entries[0]?.type == 'passive',
              }"
              class="transition-transform duration-200 transform talent-icon hover:scale-110"
            >
              <img :src="getTalentIcon(talent)" :alt="talent.name" />
              <span
                class="talent-rank"
                v-if="talent.maxRanks == 2 && talent.purchased"
                >{{ talent.rank }}/{{ talent.maxRanks }}</span
              >
            </div>
          </SpellTooltip>
          <!-- <div class="talent-tooltip">
            <div class="talent-name">{{ talent.name }}</div>
            <div class="talent-description">{{ talent.description }}</div>
          </div> -->
        </div>
      </div>
    </div>
    <!-- 天赋模态框 -->
    <TalentIframeModal
      v-if="showTalentModal"
      :talentStr="talentStr"
      :modelValue="showTalentModal"
      @close="showTalentModal = false"
      @update:modelValue="showTalentModal = $event"
    />
  </div>
</template>

<script setup lang="ts">
import { ICON_URL } from "~/consts/talent";
import TalentIframeModal from "./TalentIframeModal.vue";
import { parseTalentString } from "./js/talentHandler.js";
import { allTalents } from "./data/all_talent.js";

interface Talent {
  index: number;
  id: any;
  purchased: number;
  rank: any;
  maxRanks: any;
  choiceIndex?: number;
  isHeroEntryNode?: boolean;
  name: any;
  icon: any;
  nodeInfo: any;
}

const props = defineProps<{
  // talents: Talent[];
  talentStr: string;
}>();

const isFullscreen = ref(false);
const showTalentModal = ref(false);
const selectedTalent = ref<Talent | null>(null);

const getTalents = () => {
  if (!props.talentStr) return [];
  const result = parseTalentString(props.talentStr, allTalents);
  return result.nodes;
};

const getTalentIcon = (talent: Talent) => {
  if (talent.isHeroEntryNode) {
    return `${ICON_URL.HERO_ENTRY}/talents-heroclass-warrior-slayer.png`;
  }

  if (!talent.icon) {
    return `${ICON_URL.STANDARD}/inv_misc_questionmark.jpg`;
  }

  return `${ICON_URL.STANDARD}/${talent.icon}.jpg`;
};

const openTalentModal = () => {
  showTalentModal.value = true;
};

const talents = computed(() => getTalents());

const heroEntryTalents = computed(() => {
  return talents.value.filter((talent) => talent.isHeroEntryNode);
});

const regularTalents = computed(() => {
  return talents.value.filter((talent) => !talent.isHeroEntryNode);
});

const toggleFullscreen = () => {
  isFullscreen.value = !isFullscreen.value;
};
</script>

<style scoped>
.talent-display {
  width: 100%;
  padding: 5px 0px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 8px;
}

.talent-container {
  display: flex;
  gap: 12px;
  align-items: flex-start;
}

.hero-entry-section {
  flex: 0 0 auto;
  display: flex;
  gap: 10px;
}

.talent-grid {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(22px, 1fr));
  gap: 6px;
  justify-items: center;
}

.hero-entry-section .talent-icon {
  width: 46px;
  height: 46px;
  border-radius: 50%;
}

.hero-entry-section .talent-rank {
  padding: 2px 6px;
  font-size: 14px;
}

.talent-icon {
  width: 22px;
  height: 22px;
  border-radius: 4px;
  overflow: hidden;
  position: relative;
  opacity: 0.9;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.talent-icon img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.talent-icon.hero-entry {
  border-color: #ffb100;
  box-shadow: 0 0 8px rgba(255, 177, 0, 0.3);
}

.talent-rank {
  position: absolute;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 1);
  color: #fff;
  padding: 1px 0 0 1px;
  font-size: 8px;
  border-top-left-radius: 2px;
}

.talent-tooltip {
  display: none;
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.95);
  padding: 8px 12px;
  border-radius: 4px;
  min-width: 200px;
  z-index: 100;
  margin-bottom: 8px;
  border: 1px solid #ffb100;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

.talent-tooltip::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border-width: 8px;
  border-style: solid;
  border-color: #ffb100 transparent transparent transparent;
}

.talent-item {
  position: relative;
  cursor: pointer;
}

.talent-item:hover .talent-tooltip {
  display: block;
}

.talent-name {
  color: #ffb100;
  font-size: 14px;
  margin-bottom: 4px;
  font-weight: bold;
}

.talent-description {
  color: #fff;
  font-size: 12px;
  line-height: 1.4;
}
</style>
