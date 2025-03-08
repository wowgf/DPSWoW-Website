<template>
  <div class="home-layout h-[100vh] dark flex flex-col overflow-hidden">
    <Header
      v-if="app.config.showHeade"
      :showRegister="!info?.artisanInfoId"
      :showAbilityBtn="isArtisan"
    ></Header>
    <main
      v-if="isMobile"
      id="main"
      ref="mainRef"
      class="flex flex-col flex-1 overflow-auto"
      @scroll="onScrollChange"
    >
      <div
        :class="{ 'px-2': isMobile }"
        class="container flex flex-col flex-1 pt-2 pb-3 m-auto"
      >
        <slot></slot>
      </div>
      <a-back-top
        target-container="#main"
        :style="{ position: 'absolute', bottom: '60px', right: '10px' }"
      />
    </main>
    <main
      v-else
      ref="mainRef"
      :class="['flex flex-col flex-1 overflow-auto bg-image relative']"
      :style="{ backgroundImage: hasBgImage ? `url(${bgImageUrl})` : '' }"
      @scroll="onScrollChange"
    >
      <div class="absolute top-0 left-0 w-full h-full main-mask"></div>
      <el-scrollbar
        ref="scrollRef"
        height="100%"
        view-class="h-full "
        noresize
        always
        :native="false"
        @scroll="onElScrollChange"
      >
        <div class="container pt-5 pb-3 m-auto">
          <slot></slot>
        </div>
        <Footer></Footer>
      </el-scrollbar>
    </main>

    <FooterMenu v-if="showFooterMenu"></FooterMenu>
  </div>
</template>
<script setup lang="ts">
import * as consts from "@/enums/consts";
import { useAppStore } from "~/store/app";
import { useLoginStore } from "~/store/login";
import { useUserStore } from "~/store/user";
import FooterMenu from "~/components/FooterMenu/index.vue";
const { mitt } = useCool();
const { info, isArtisan, isLogin } = storeToRefs(useUserStore());
const app = useAppStore();
const login = useLoginStore();
const { isMobile } = storeToRefs(app);
const hideHeaderTop = ref(false);
let scrollTop = ref(0);
let isToBottom = ref(false);
const route = useRoute();
const scrollRef = ref();
const mainRef = ref();

const showFooter = ref(false);
const hasBgImage = ref(true); // 是否有背景图片
// const hasBgImage = ref(false); // 是否有背景图片
const bgImageUrl = ref(
  "CUSTOM_OSS_PATH/bf8a599b089941a1a0ad9c87cc9cccd3_FJPT5455KR5K1589912863345.avif"
); // 背景图片地址

// 是否显示底部
const isHideFooter = computed(() => {
  if (isMobile.value) return true;
  if (showFooter.value) return false;
  // 首页逻辑
  if (route.name == "artisan") {
    return scrollTop.value < 800;
  }

  if (route.name == "index") {
    return true;
  }

  return false;
  // if (route.name == "index") {
  //   return scrollTop.value < 800;
  // }
});

const showFooterMenu = computed(() => {
  return (
    isMobile.value &&
    [
      "/",
      "/requirement",
      "/service",
      "/user/settings/profile",
      "/dashboard/artisanAbility",
      "/dashboard/requirement",
      "/dashboard/service",
      "/chat/friend",
    ].includes(route.path)
  );
});

watch(scrollTop, (val, oldVal) => {
  // 向下滚动隐藏头部
  if (val > oldVal) {
    hideHeaderTop.value = true;
    mitt.emit(consts.MITT.MOVE_DOWN); // 页面向下滚动
  } else {
    hideHeaderTop.value = false;
    mitt.emit(consts.MITT.MOVE_UP); // 页面向上滚动
  }
});

mitt.on(consts.MITT.UPDATE_PAGE_SCROLLBAR_STATUS, () => {
  nextTick(() => {
    scrollRef.value?.update();
  });
});

mitt.on(consts.MITT.UPDATE_PAGE_FOOTER, (isShow: boolean) => {
  showFooter.value = isShow;
});

mitt.on(consts.MITT.ON_SCROLL_TO_TOP, () => {
  if (isMobile.value) {
    mainRef.value?.scrollTo({ top: 0 });
  } else {
    scrollRef.value?.setScrollTop(0);
  }
});

// 页面滚动时向下滚动时隐藏头部
function onScrollChange(e: any) {
  // //滚动高度
  scrollTop.value = e.srcElement.scrollTop;
  // //窗口高度
  let windowHeight = e.srcElement.clientHeight;
  // //页面高度
  let documentHeight = e.srcElement.scrollHeight;
  if (windowHeight + scrollTop.value >= documentHeight - 100) {
    if (!isToBottom.value) {
      mitt.emit(consts.MITT.REACH_BOTTOM); // 页面滚动到底部
    }
    isToBottom.value = true;
  } else {
    isToBottom.value = false;
  }
}

/**
 * el-scrollbar滚动条滚动事件
 */
function onElScrollChange(e: any) {
  const wrapRef = scrollRef.value.wrapRef;
  // //滚动高度
  scrollTop.value = e.scrollTop;
  // //窗口高度
  let windowHeight = wrapRef.clientHeight;
  // //页面高度
  let documentHeight = wrapRef.scrollHeight;
  if (windowHeight + scrollTop.value >= documentHeight - 100) {
    if (!isToBottom.value) {
      mitt.emit(consts.MITT.REACH_BOTTOM); // 页面滚动到底部
    }
    isToBottom.value = true;
  } else {
    isToBottom.value = false;
  }
}
</script>
<style lang="scss">
.home-layout {
  .main-mask {
    // background-color: rgb(0, 0, 0, 0.5);
    background: linear-gradient(
      to right,
      rgba(#000, 0.1) 0%,
      rgba(#000, 0.8) 30%,
      rgba(#000, 0.8) 50%,
      rgba(#000, 0.8) 70%,
      rgba(#000, 0.1) 100%
    );
    z-index: 0;
  }
}
.bg-image {
  // background-image: url('~/assets/images/bg/bg8.png');
  // background-image: url('~/assets/images/bg/bg6.jpg');
  background-size: cover;
  background-position: center;
}
</style>
