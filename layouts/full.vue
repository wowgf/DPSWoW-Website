<template>
  <div class="default-layout h-[100vh] dark flex flex-col overflow-hidden">
    <Header
      v-if="app.config.showHeade"
      :menu-list="menuList"
      :showRegister="!info?.artisanInfoId"
      :showAbilityBtn="isArtisan"
    ></Header>
    <main :class="{ 'px-2': isMobile }" class="flex-1 overflow-hidden">
      <div class="container h-full mx-auto"><slot></slot></div>
    </main>
    <!-- <Footer></Footer> -->
  </div>
</template>
<script setup lang="ts">
import * as consts from "@/enums/consts";
import { useAppStore } from "~/store/app";
import { useUserStore } from "~/store/user";
const { mitt } = useCool();
const { info, isArtisan } = storeToRefs(useUserStore());
const app = useAppStore();
const { isMobile } = storeToRefs(app);
const hideHeaderTop = ref(false);
let scrollTop = ref(0);
let isToBottom = ref(false);
const route = useRoute();
const scrollRef = ref();
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
      disabled: true,
      tip: "加班开发中，打赏作者一朵小红花吧",
    },
  ];
});

// 是否显示底部
const isHideFooter = computed(() => {
  if (isMobile.value) return true;
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
