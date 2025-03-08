<template>
  <a-modal
    :visible="showModal"
    draggable
    unmount-on-close
    :width="isMobile ? '100%' : ''"
    :title="title"
    :footer="false"
  >
    <div>
      <div v-if="desc" class="mb-1 text-center text-green-500">{{ desc }}</div>
      <Qrcode @success="onSuccess" @error="onError"></Qrcode>

      <div class="flex items-center justify-center">
        <span class="tip2-text">打开</span>
        <SvgIcon name="wechat2" class="mx-2 text-[18px]"></SvgIcon>
        <span class="tip2-text">扫一扫,</span>
        <strong class="mx-2">关注公众号</strong>
        <span class="tip2-text">后即可绑定</span>
      </div>
    </div>
  </a-modal>
</template>

<script setup lang="ts">
import { Message } from "@arco-design/web-vue";
import Qrcode from "./Qrcode.vue";
import { useUserStore } from "~/store/user";
import { useAppStore } from "~/store/app";

const props = defineProps<{
  desc?: string;
}>();

const showModal = ref(true);
const title = ref("微信绑定");
const loading = ref(false);
const { get } = useUserStore();
const { isMobile } = storeToRefs(useAppStore());

/**
 * 绑定成功
 */
function onSuccess() {
  get();
  showModal.value = false;
}

// 绑定失败
function onError() {}
</script>

<style></style>
