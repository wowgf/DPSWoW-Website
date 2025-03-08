<template>
  <div class="default-layout h-[100vh] dark flex flex-col overflow-hidden">
    <Header
      v-if="app.config.showHeade"
      :menu-list="menuList"
      :showRegister="!info?.artisanInfoId"
      :showAbilityBtn="isArtisan"
    ></Header>
    <main
      id="main"
      ref="mainRef"
      class="flex flex-col flex-1 overflow-auto"
      @scroll="onScrollChange"
    >
      <div
        :class="{ 'px-2': isMobile }"
        class="container flex flex-col flex-1 pt-3 pb-3 m-auto"
      >
        <slot></slot>
      </div>
      <a-back-top target-container="#main" />
    </main>

    <!-- <footer
      v-if="!isMobile"
      :class="{ '!h-0': isHideFooter }"
      class="bg-[#111218] transition-all h-10 overflow-hidden z-30"
    >
      <div
        class="container flex items-center justify-between mx-auto text-[12px] h-full"
      >
        <div class="flex items-center h-full">
          <span>CopyRight © 2024 魔兽工坊 </span>
          <div class="h-[15px] w-[1px] bg-slate-100 mx-2"></div>
          <div>
            <span>友情链接:</span>
            <a
              href="https://www.aizonghe.com?ref=wowgf"
              target="_blank"
              class="ml-3 text-blue-600"
              >AI综合网</a
            >
            <a
              href="https://www.miaoyanai.com?ref=wowgf"
              target="_blank"
              class="ml-3 text-blue-600"
              >妙言AI</a
            >
          </div>
        </div>
      </div>
    </footer> -->
  </div>
</template>
<script setup lang="ts">
import * as consts from "@/enums/consts";
import { useAppStore } from "~/store/app";
import { useUserStore } from "~/store/user";
import Footer from "~/components/Footer/index.vue";

const { mitt } = useCool();
const { info, isArtisan } = storeToRefs(useUserStore());
const app = useAppStore();
const { isMobile } = storeToRefs(app);
const hideHeaderTop = ref(false);
let scrollTop = ref(0);
let clientHeight = ref(0);
let isToBottom = ref(false);
const route = useRoute();
const scrollRef = ref();
const mainRef = ref();
const menuList = computed(() => {
  return [
    {
      label: "找工匠",
      link: "/",
      name: "index",
    },
    {
      label: "发需求",
      link: "/requirement",
      name: "requirement",
      // disabled: true,
      // tip: "加班开发中，打赏作者一朵小红花吧",
    },
    {
      label: "吐个槽",
      link: "https://txc.qq.com/products/670109",
      outLink: true,
      fun: () => {
        tucao();
      },
    },
  ];
});

const showFooter = ref(false);

// 是否显示底部
const isHideFooter = computed(() => {
  if (isMobile.value) return true;
  if (showFooter.value) return false;
  // 首页逻辑
  if (route.name == "index") {
    return scrollTop.value < 800;
  }
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
.default-layout {
}
</style>
