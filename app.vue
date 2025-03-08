<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <Login :dark="true"></Login>
  <!-- <FloatBar v-if="!isMobile"></FloatBar> -->
  <PwaInstall></PwaInstall>
  <MiniTip v-if="isMobile"></MiniTip>
</template>

<script setup lang="ts">
// import zhCn from "element-plus/es/locale/lang/zh-cn";
import Login from "~/components/Login/index.vue";
import FloatBar from "~/components/FloatBar/index.vue";
import PwaInstall from "~/components/PwaInstall/index.vue";
import MiniTip from "~/components/MiniTip/index.vue";
import { useAppStore } from "./store/app";
// const locale = zhCn;
const { isMobile } = storeToRefs(useAppStore());
useHead({
  meta: [{ name: "viewport", content: "width=device-width, initial-scale=1" }],
  link: [{ rel: "manifest", href: "/manifest.webmanifest" }],
});
</script>

<style></style>
