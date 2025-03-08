<template>
  <a-tooltip
    v-model:popup-visible="showTooltip"
    mini
    :trigger="trigger"
    background-color="#ffffff"
  >
    <slot></slot>
    <template #content>
      <div class="py-1 bg-white">
        <div class="mb-2 text-base font-bold text-center text-green-600">
          扫一扫打开小程序
        </div>
        <div
          class="code-img h-[200px] w-[200px] flex justify-center items-center"
        >
          <img
            v-if="codeUrl"
            id="rankCodeImg"
            :src="codeUrl"
            class="w-full h-full"
            @click="onImageClick"
          />
          <a-spin v-else />
        </div>
        <div class="flex flex-col gap-1 mt-3">
          <div v-if="showMini" class="flex flex-col justify-center">
            <a-button
              :loading="miniUrlLoading"
              type="primary"
              status="success"
              class="w-full"
              @click="toMiniProgram"
            >
              <template #icon>
                <SvgIcon name="wechat-mini" class="text-white"></SvgIcon>
              </template>
              打开小程序
            </a-button>
          </div>
          <div class="flex justify-center">
            <a-button type="primary" class="w-full" @click="onCopy">{{
              copyBtnText
            }}</a-button>
          </div>
        </div>
      </div>
    </template>
  </a-tooltip>
</template>

<script setup lang="ts">
import { Message } from "@arco-design/web-vue";
import { useCopy } from "~/cool/hook/copy";

const props = withDefaults(
  defineProps<{
    miniPath: string;
    path?: string;
    trigger?: "hover" | "click";
    autoShow?: boolean;
    // 自动显示倒计时
    autoShowCountdown?: number;
    showMini?: boolean;
  }>(),
  {
    path: location.href,
    autoShow: false,
    trigger: "hover",
    autoShowCountdown: 0,
    showMini: true,
  }
);

const { copyBtnText, copyContent, copyImg } = useCopy("复制网站链接");

const showTooltip = ref(false);

const codeUrl = ref("");

const miniUrl = ref("");

const miniUrlLoading = ref(false);

watch(
  () => showTooltip.value,
  (val) => {
    if (val) {
      onClickShare();
    }
  }
);

onMounted(() => {
  if (props.autoShow) {
    setTimeout(() => {
      showTooltip.value = true;
    }, props.autoShowCountdown);
  }
});

async function toMiniProgram() {
  miniUrlLoading.value = true;
  if (!miniUrl.value) {
    await service.comm
      .getMiniURLScheme({
        path: props.miniPath.split("?")[0],
        query: props.miniPath.split("?")[1],
        env_version: import.meta.dev ? "develop" : "release",
      })
      .then(async (res) => {
        if (res.errcode === 0) {
          miniUrl.value = res.openlink;
        } else {
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }
  if (miniUrl.value) {
    window.location.href = miniUrl.value;
  }
  miniUrlLoading.value = false;
}

const onClickShare = () => {
  if (!codeUrl.value) {
    service.comm
      .getMiniQRCode({
        path: props.miniPath,
        env_version: import.meta.dev ? "develop" : "release",
      })
      .then((res) => {
        const uint8Array = new Uint8Array(res.data);
        const blob = new Blob([uint8Array], { type: "image/jpeg" });
        const url = URL.createObjectURL(blob);
        codeUrl.value = url;
      });
  }
};

function onCopy() {
  copyContent(props.path);
  Message.success("链接已复制！快去分享给更多朋友吧。");
}

const onImageClick = () => {
  if (codeUrl.value) {
    copyImg("rankCodeImg");
  }
};
</script>

<style></style>
