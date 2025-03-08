<template>
  <div class="default-layout h-[100vh] dark flex flex-col overflow-hidden">
    <Header
      v-if="app.config.showHeade"
      :menu-list="menuList"
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
        class="container flex flex-col flex-1 pb-3 m-auto"
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
      :class="['flex-1 overflow-auto bg-image']"
      :style="{ backgroundImage: hasBgImage ? `url(${bgImageUrl})` : '' }"
    >
      <slot></slot>
      <a-back-top
        target-container="#main"
        :style="{ position: 'absolute', bottom: '60px', right: '10px' }"
      />
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
import { useNewUse } from "~/cool";

const { mitt } = useCool();
const { info, isArtisan, isLogin } = storeToRefs(useUserStore());
const app = useAppStore();
const login = useLoginStore();
const { isMobile } = storeToRefs(app);
const hideHeaderTop = ref(false);
let scrollTop = ref(0);
let clientHeight = ref(0);
let isToBottom = ref(false);
const route = useRoute();
const scrollRef = ref();
const mainRef = ref();
const { useMap, useNew } = useNewUse();

const menuList = computed(() => {
  return [
    {
      label: "找工匠",
      link: "/artisan",
      name: "artisan",
      badge: { count: 0 },
    },
    {
      label: "发需求",
      link: "/requirement",
      name: "requirement",
      badge: {
        text: useMap.requirement ? "" : "新",
        count: 0,
        key: "requirement",
      },
    },
    {
      label: "找服务",
      link: "/service",
      name: "service",
      badge: { text: useMap.service ? "" : "新", count: 0, key: "service" },
    },
    // {
    //   label: "吐个槽",
    //   link: "https://txc.qq.com/products/670109",
    //   outLink: true,
    //   fun: () => {
    //     tucao();
    //   },
    // },
  ];
});

const showFooter = ref(false);
const hasBgImage = ref(false); // 是否有背景图片
const bgImageUrl = ref(
  "/CUSTOM_OSS_PATH/785c52486e414b02a4ef66c6b290c5a9_bg11.webp"
); // 背景图片地址

watch(
  () => route.path,
  (val) => {
    checkRoute();
  }
);

const checkRoute = () => {
  const showBg1Routes = [
    "/artisan",
    "/requirement",
    "/service",
    "/chat",
    "/dashboard/requirement/publish",
    "/downloadPlugin",
    "/user/settings/order",
  ];
  const showBg2Routes = [
    "/welfare",
    "/user/settings/export",
    "/user/settings/profile",
    // "/user/settings/order",
    // "/artisanAbility/23617"
    // "/dashboard/artisanAbility",
    // "/dashboard/order"
  ];
  // 检查当前路由并设置背景图片
  if (showBg1Routes.includes(route.path)) {
    hasBgImage.value = true;
    bgImageUrl.value =
      "/CUSTOM_OSS_PATH/785c52486e414b02a4ef66c6b290c5a9_bg11.webp";
  } else if (showBg2Routes.includes(route.path)) {
    hasBgImage.value = true;
    bgImageUrl.value =
      "/CUSTOM_OSS_PATH/aea01dcfb91c4a2f824be3fe69132f58_bg9.jpeg";
  } else {
    hasBgImage.value = false;
  }
};

onMounted(checkRoute);

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
      "/artisan",
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
.bg-image {
  background-size: cover;
  background-position: center;
}
</style>
