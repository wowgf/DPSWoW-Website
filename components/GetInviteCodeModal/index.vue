<template>
  <a-modal v-model:visible="visible" hide-cancel width="90vw">
    <template #title> 扫码进群获取 </template>
    <div>
      <img :src="commonConfig.wechatGroupQrcode" />
    </div>
  </a-modal>
</template>

<script setup lang="ts">
import { useAppStore } from "~/store/app";

const visible = ref(true);
const { commonConfig } = storeToRefs(useAppStore());
</script>

<style></style>
