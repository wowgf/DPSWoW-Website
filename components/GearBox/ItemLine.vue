<template>
  <swiper
    :controller="{ control: swiperRef }"
    :modules="modules"
    :space-between="10"
    slidesPerView="auto"
    free-mode
    class="relative w-full mySwiper"
    :navigation="{
      nextEl: '.button-next',
      prevEl: '.button-prev',
    }"
    @swiper="setControlledSwiper"
  >
    <swiper-slide
      v-for="(item2, index) in list"
      :key="index"
      style="width: 40px"
    >
      <div class="flex flex-col justify-between mr-2 w-[40px] gear-item">
        <div class="h-[20px]">
          <!-- <span
            v-if="item2.slot == 'weekly'"
            :style="{ color: slotColorMap[item2.slot] }"
            class="text-[10px] text-themeGreen font-semibold"
          >
            {{ slotMap[item2.slot] || "" }}
          </span> -->
        </div>
        <div
          class="h-[40px] w-[40px] relative"
          @click="onSelect(gearKey, item2)"
        >
          <GearImg
            :src="item2.iconUrl || item2.icon_url"
            :data="item2"
            :quality="item2.quality"
            :level="item2.gearLevel"
            :selected="checkIsSelected(gearKey, item2)"
            :show-border="true"
            :showQuilityBorderColor="false"
            borderStyle="dashed"
            hideLevel
            full-mask
          ></GearImg>
        </div>
        <div class="mt-2 h-[10px] flex justify-between items-center">
          <UpgradeTooltip
            v-if="item2.upgradeSets"
            :data="item2"
            :slotKey="gearKey"
          >
            <div
              class="upgrade-btn text-[12px] border border-solid w-[18px] h-[14px] flex justify-center items-center cursor-pointer"
            >
              +
            </div>
          </UpgradeTooltip>
          <div></div>
          <div class="text-[10px] text-gray-100 opacity-[0.8]">
            {{ item2.gearLevel }}
          </div>
        </div>
      </div>
    </swiper-slide>
    <div
      class="absolute top-1 pl-1 right-0 z-10 flex h-[42px] cursor-pointer button-next bg-[rgba(0,0,0,0.5)] items-center text-gray-300"
      @click="slideNext"
    >
      <icon-right-circle :size="20" class="hover:text-white" />
    </div>
    <div
      class="button-prev absolute top-1 pr-1 left-0 z-10 flex h-[42px] cursor-pointer bg-[rgba(0,0,0,0.5)] items-center text-gray-300"
      @click="slidePrev"
    >
      <icon-left-circle :size="20" class="hover:text-white" />
    </div>
  </swiper>
</template>

<script setup lang="ts">
import { ref, defineProps } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Controller } from "swiper/modules";
import "swiper/scss/navigation";
import "swiper/css/free-mode";
import "swiper/css";
import { useAppStore } from "~/store/app";
import type { GearData } from "~/types/gear";
import { getUpgradeInfoByBonusId } from "~/cool/utils/wow";

const { isMobile } = storeToRefs(useAppStore());
const modules = [Navigation, Controller];
const props = defineProps<{
  onSelect: any;
  checkIsSelected: any;
  currentGear: any;
  options: any;
  gearKey: string;
  list: GearData[];
}>();

const swiperRef = ref<any>(null);

const slotMap: any = {
  bag: "背包",
  weekly: "低保",
};

const slotColorMap: any = {
  // bag: "#fff",
  // weekly: "#fff",
};

function setControlledSwiper(swiper: any) {
  swiperRef.value = swiper;
}

function slideNext() {
  console.log(swiperRef.value);

  if (swiperRef.value) {
    const swiper = swiperRef.value;
    const slidesPerGroup = isMobile.value ? 1 : 6; // 每次滚动的幻灯片数量
    const newIndex = Math.min(
      swiper.activeIndex + slidesPerGroup,
      swiper.slides.length - 1
    );
    swiper.slideTo(newIndex);
  }
}

function slidePrev() {
  if (swiperRef.value) {
    const swiper = swiperRef.value;
    const slidesPerGroup = isMobile.value ? 1 : 6; // 每次滚动的幻灯片数量
    const newIndex = Math.max(swiper.activeIndex - slidesPerGroup, 0);
    swiper.slideTo(newIndex);
  }
}

function onUpgrade(item: GearData) {
  let a = getUpgradeInfoByBonusId(item.bonus_id || "");
  console.log(a);
}
</script>

<style lang="scss" scoped>
.swiper-button-disabled {
  display: none;
}
</style>
