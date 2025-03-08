<template>
  <div
    :class="{ '!pb-4': isApple }"
    class="flex justify-around footer-menu text-base bg-[#111218] pb-2"
  >
    <div
      v-for="(item, index) in menuList"
      :key="index"
      :class="{ '!text-[#165dff]': route.path === item.path }"
      class="flex flex-col items-center justify-center py-2 text-gray-200 menu-item"
      @click="goto(item)"
    >
      <!-- <svgIcon :name="item.icon" class="text-[18px]"></svgIcon> -->
      <span class="mt-1">
        {{ item.title }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from "~/store/app";

const router = useRouter();
const route = useRoute();
const { isApple } = storeToRefs(useAppStore());
const menuList = [
  { title: "首页", path: "/", icon: "artisan2" },
  { title: "找工匠", path: "/artisan", icon: "artisan2" },
  { title: "找服务", path: "/service", icon: "service" },
  { title: "需求大厅", path: "/requirement", icon: "requirement" },
  { title: "我的", path: "/user/settings/profile", icon: "service" },
];

function goto(item: any) {
  router.push(item.path);
}
</script>

<style lang="scss" scoped>
.footer-menu {
  .menu-item {
    &.active {
      // color: blue;
    }
  }
}
</style>
