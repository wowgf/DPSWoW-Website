<template>
  <div class="inline-block get-points" @click="openModal">
    <slot></slot>
  </div>
  <a-modal
    v-model:visible="visible"
    title="获取积分"
    hide-cancel
    :footer="false"
    width="350px"
  >
    <div class="flex flex-col items-center">
      <div class="mb-4">
        <a-button
          :disabled="adState.viewCount >= adState.viewLimit"
          type="primary"
          @click="onOpenAdModal()"
          style="font-size: 15px; width: 300px"
          size="large"
        >
          看广告积分+1000
          <span class="ml-2 text-[13px]"
            >({{ adState.viewCount }}/{{ adState.viewLimit }})</span
          >
        </a-button>
      </div>
      <nuxt-link to="/user/settings/invite">
        <a-button
          class="mt-2"
          style="font-size: 15px; width: 300px"
          size="large"
          @click="
            recordLog({
              event: CLICK_GET_POINTS_BY_INVITE,
            })
          "
          >邀好友积分+2000</a-button
        >
      </nuxt-link>
    </div>
  </a-modal>

  <a-modal
    v-model:visible="adState.adVisible"
    title="微信扫码看广告"
    hide-cancel
    :footer="false"
    width="450px"
  >
    <div class="flex flex-col items-center">
      <div
        class="w-[260px] h-[260px] flex justify-center items-center border-gray-300 border rounded-lg overflow-hidden relative"
      >
        <img
          v-if="adState.wechatQrCode"
          :src="adState.wechatQrCode"
          class="w-full h-full"
        />
        <a-spin v-else-if="!adState.qrCodeError" :size="32" />
        <div
          v-else-if="adState.qrCodeError"
          :size="32"
          class="flex flex-col items-center justify-center w-full h-full"
        >
          <div class="text-yellow-500">二维码生成失败</div>
          <div class="text-yellow-500">请稍后再试</div>
        </div>
        <div
          v-if="adState.advertStatus !== 0"
          class="absolute top-0 left-0 z-10 flex items-center justify-center w-full h-full bg-black bg-opacity-50"
        >
          <div
            v-if="adState.advertStatus == 1"
            class="px-1 overflow-hidden bg-gray-200 rounded text-slate-900"
          >
            正在观看
          </div>
          <div
            v-if="adState.advertStatus == 2"
            class="px-1 overflow-hidden bg-gray-200 rounded text-slate-900"
          >
            奖励已发放
          </div>
        </div>
      </div>
    </div>
    <ul class="mt-5 text-gray-300">
      <li>1. 完整观看广告视频即可获得积分，播放时间由微信控制。</li>
      <li>2. 观看完视频后，请手动关闭广告以完成验证。</li>
      <li>
        3.
        广告内容由微信提供，频繁观看可能导致无广告，请稍后再试或使用其他微信扫码。
      </li>
    </ul>
  </a-modal>
</template>

<script setup lang="ts">
import { Message, Modal } from "@arco-design/web-vue";
import QRCode from "qrcode";
import {
  CLICK_GET_MORE_POINTS,
  CLICK_GET_POINTS_BY_AD,
  CLICK_GET_POINTS_BY_INVITE,
} from "~/consts/trackEvent";
import { uuid } from "~/cool/utils";
import { useAppStore } from "~/store/app";
import { useUserStore } from "~/store/user";
const userStore = useUserStore();
const { isMobile } = storeToRefs(useAppStore());
const visible = ref(false);
const isDev = (import.meta as any).env.DEV;

// 广告相关
const adState = reactive({
  adVisible: false,
  advertId: <string>uuid(),
  wechatQrCode: <string>"",
  advertStatus: <number>0,
  viewCount: 0,
  viewLimit: 0,
  qrCodeError: false,
});

let adTimer: any = null;

watch(
  () => adState.adVisible,
  (val) => {
    if (!val) {
      adState.wechatQrCode = "";
      adState.advertStatus = 0;
      clearInterval(adTimer);
    }
  }
);

getTodayCount();

/**
 * 打开获取积分弹窗
 */
function openModal() {
  visible.value = true;
  recordLog({
    event: CLICK_GET_MORE_POINTS,
  });
}

function getTodayCount() {
  service.adverts.getTodayCount().then((res) => {
    adState.viewCount = res.viewCount;
    adState.viewLimit = res.viewLimit;
  });
}

/**
 * 检查状态
 */
function checkAdStatus() {
  clearInterval(adTimer);
  adTimer = setInterval(() => {
    service.adverts
      .getAdvertStatus({ advertId: adState.advertId })
      .then((res) => {
        adState.advertStatus = res.status;
        if (res.status == 2) {
          adState.viewCount += 1;
          clearInterval(adTimer);
          userStore.get();
          adState.adVisible = false;

          Modal.success({
            title: "提示",
            content: "已成功获得+1000积分",
            hideCancel: true,
            bodyStyle: {
              textAlign: "center",
            },
          });
        }
      });
  }, 1000 * 2);
}

/**
 * 打开广告弹窗
 */
function onOpenAdModal() {
  recordLog({
    event: CLICK_GET_POINTS_BY_AD,
  });
  // visible.value = false;
  adState.adVisible = true;
  adState.advertId = uuid();
  const queryUrl =
    // getWechatQrCode();
    getWechatQrUrl();
}

// 生成二维码
function createCode(data: string) {
  // 边距调整为3px
  QRCode.toDataURL(data, { margin: 1, width: 300 })
    .then((url: string) => {
      adState.wechatQrCode = url;
    })
    .catch((err: any) => {
      console.error(err);
    });
}

/**
 * 获取微信小程序二维码
 */
function getWechatQrCode() {
  const host = location.origin;
  service.comm
    .getMiniQRCode({
      path: `/pages/ad/dps?advertId=${
        adState.advertId
      }&token=${getToken()}&host=${
        (import.meta as any).env.VITE_HOST
      }&pageTitle=看广告得积分`,
      env_version: isDev ? "develop" : "release",
      codeType: 0,
    })
    .then(async (res) => {
      // 将数据转换为 Uint8Array
      const uint8Array = new Uint8Array(res.data);
      const blob = new Blob([uint8Array], { type: "image/jpeg" });
      const url = URL.createObjectURL(blob);
      adState.wechatQrCode = url;
      checkAdStatus();
    })
    .catch((err) => {
      console.error(err);
    });
}

/**
 * 获取微信小程序链接
 */
function getWechatQrUrl() {
  // const host = location.origin;
  const host = isDev ? location.origin : "https://dps.wowgf.com";
  const query: any = {
    advertId: encodeURIComponent(adState.advertId),
    token: encodeURIComponent(getToken()),
    host: encodeURIComponent((import.meta as any).env.VITE_HOST),
    // pageTitle: encodeURIComponent("看广告得积分"),
  };
  const queryStr = Object.keys(query)
    .map((key) => `${key}=${query[key]}`)
    .join("&");

  service.comm
    .getMiniURLScheme({
      path: `/pages/ad/dps`,
      env_version: isDev ? "trial" : "release",
      query: queryStr,
    })
    .then(async (res) => {
      if (res.errcode === 0) {
        // let qrcodeData = `${host}/ad?jumpUrl=${encodeURIComponent(
        //   res.openlink
        // )}`;

        const miniId = new URL(res.openlink).searchParams.get("t");
        // let qrcodeData = `${host}/ad?miniId=${miniId}`;
        let qrcodeData = `${host}/ad/${miniId}`;

        // 将数据转换为 Uint8Array
        createCode(qrcodeData);
        checkAdStatus();
      } else {
        // adState.qrCodeError = true;
        getWechatQrCode();
      }
    })
    .catch((err) => {
      console.error(err);
    });
}
</script>

<style></style>
