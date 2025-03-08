<template>
  <div class="flex flex-col items-center justify-center min-h-full page--guide">
    <InstallGuide :isLogin="true"></InstallGuide>
  </div>
</template>

<script setup lang="ts">
import { useTitle } from "@vueuse/core";
import { set } from "@/cool/utils/storage";
import { STORAGE_KEY } from "@/consts";
useTitle("安装指南");

set(STORAGE_KEY.IS_OPEN_GUIDE, true);
</script>

<style></style>
