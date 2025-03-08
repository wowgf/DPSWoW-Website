<template>
  <ul class="menu-list">
    <li
      ref="menuItem"
      v-for="(item, index) in menuList.filter((v) => !v.hide)"
      :key="index"
      :class="{ active: activeIndex === index }"
      class="menu-item"
      @click="onClickItem(item)"
    >
      <a-badge
        v-bind="item.badge || {}"
        :offset="[5, 0]"
        :dot-style="{
          fontSize: '10px',
          height: '15px',
          minWidth: '15px',
          lineHeight: '15px',
          padding: '0 2px',
        }"
      >
        <span v-if="item.disabled || item.fun">{{ item.label }}</span>
        <NuxtLink
          v-else
          :to="item.link"
          :target="item.outLink ? '_blank' : '_self'"
        >
          {{ item.label }}
        </NuxtLink>
      </a-badge>
    </li>
    <slot name="right"></slot>
    <!-- 根据当前路由移动到对应的菜单下 -->
    <div
      v-show="activeIndex > -1"
      :class="{ 'transition-active': isCurrentHaveActive }"
      :style="{
        transform: `translateX(${0}px)`,
        width: '52px',
      }"
      class="active-line-wrap"
    >
      <div class="active-line-bar"></div>
    </div>
  </ul>
</template>

<script setup lang="ts">
import { Message } from "@arco-design/web-vue";
import { isNull, isNumber } from "lodash";
import { CLICK_INSTALL_PWA_MENU } from "~/consts/trackEvent";
import { useNewUse } from "~/cool";
import { usePwaStore } from "~/store/pwa";
const { installPwa } = usePwaStore();
const { isInstallPwa } = storeToRefs(usePwaStore());
const { useMap, useNew } = useNewUse();
interface MenuItem {
  label: string;
  link: string;
  name: string;
  tip?: string;
  disabled?: boolean;
  outLink?: boolean;
  fun?: () => void;
  badge: any;
  hide?: boolean;
}

const route = useRoute();
const menuList = computed<MenuItem[]>(() => {
  const list = [
    {
      label: "首页",
      link: "/home",
      name: "home",
      badge: { count: 0 },
    },
    {
      label: "快速模拟",
      link: "/gear/quick",
      name: "gear",
      badge: { count: 0 },
    },
    {
      label: "安装模拟器",
      link: "/downloadPwa",
      name: "downloadPwa",
      target: "_blank",
      badge: {
        count: 0,
      },
      fun: () => {
        installPwa();
        recordLog({ event: CLICK_INSTALL_PWA_MENU });
      },
      hide: isInstallPwa.value,
    },
    {
      label: "使用指南",
      link: "https://maizikeji.feishu.cn/docx/G2ckdRyvNoHkuLx5iJGcLXYynkc",
      target: "_blank",
      outLink: true,
      name: "guide",
      badge: { count: 0 },
    },
  ];

  return list;
});

const menuItem = ref(null); // 菜单项

// 当前路由在菜单中的索引
const activeIndex = computed(() => {
  return menuList.value.findIndex((item) => checkActive(item));
});

// 当前是否有激活的菜单
const isCurrentHaveActive = ref(false);

watch(
  () => activeIndex.value,
  (value, oldVal) => {
    isCurrentHaveActive.value = (isNumber(oldVal) && oldVal > -1) || false;
  },
  {
    immediate: true,
  }
);

watch(
  () => route.path,
  (path) => {
    // 判断是否为客户端
    if (process.client) {
      nextTick(() => {
        moveActiveLine();
      });
    }
  },
  { immediate: true }
);

// 点击菜单后光标移动到对应的菜单下
function moveActiveLine() {
  const activeLine: HTMLElement | null =
    document.querySelector(".active-line-wrap"); // 获取光标
  const activeItem: HTMLElement | null =
    document.querySelector(".menu-item.active"); // 获取当前激活的菜单

  let lineWidth = activeItem?.offsetWidth || 52;
  let lineTransform = activeItem?.offsetLeft || 0;
  // console.log("moveActiveLine", { activeItem, activeLine });

  // console.log("moveActiveLine", lineWidth, lineTransform);

  // activeLine.style.width = (lineWidth || 52) + "px";
  // activeLine.style.transform = `translateX(${lineTransform || 0}px)`;

  if (activeItem && activeLine) {
    activeLine.style.width = (lineWidth || 52) + "px";
    activeLine.style.transform = `translateX(${lineTransform || 0}px)`;
  }
}

function checkActive(item: MenuItem) {
  // return item.name == route.name
  // return route.name?.toString().startsWith(item.name);
  return route.path == item.link || route.name == item.name;
  // return item.link.startsWith(route.name as string)
}

function onClickItem(item: MenuItem) {
  if (item.tip) {
    Message.normal(item.tip);
  }
  if (item.fun) {
    item.fun();
  }
  if (item.badge?.key) useNew(item.badge.key);
}
</script>

<style lang="scss" scoped>
.menu-list {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  flex-wrap: wrap;

  .menu-item {
    padding: 0 10px;
    cursor: pointer;
    color: #fff;
    font-size: 16px;
    font-weight: 600;
    font-family: PingFangSC-Regular, Arial, sans-serif, ui-sans-serif, system-ui,
      -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue",
      "Noto Sans", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
      "Noto Color Emoji", hs-emoji, Lato;

    &.active {
      // color: #1890ff;
      // fill: #1890ff;
    }
  }

  .active-line-wrap {
    position: absolute;
    bottom: -10px;
    left: 0;
    display: flex;
    justify-content: center;

    &.transition-active {
      transition: all 0.3s ease-in-out;
    }

    .active-line-bar {
      height: 3px;
      background-color: $mz-color-primary;
      width: 15px;
      border-radius: 3px;
      // width: 30%;
    }
  }
}
</style>
