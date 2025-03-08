<template>
  <div :class="{ dark: dark }" class="login-body">
    <div class="login-main-box">
      <!-- 手机号登录 -->
      <Phone
        v-if="loginType == 'phone'"
        @success="(data) => onLoginSuccess(data, route, router)"
      />
      <!-- 微信登录 -->
      <Wechat
        v-if="loginType == 'wechat'"
        @success="(data) => onLoginSuccess(data, route, router)"
      />
      <!-- 微信登录 -->
      <a-button
        v-if="loginType == 'wechat_wechat'"
        type="primary"
        @click="selectLoginType('wechat_wechat')"
        >微信登录</a-button
      >
    </div>
    <div class="login-type-box">
      <TypeBtn
        v-for="(item, index) in loginTypeBtnList"
        :key="index"
        :label="item.label"
        :icon="item.icon"
        :dark="dark"
        @click="selectLoginType(item.type)"
      />
    </div>
    <!-- 协议box -->
    <!-- <div class="login-protocol-box">
      <span>登录即代表同意</span>
      <a
        :href="websiteConfig.website.userAgreementUrl"
        :target="'_blank'"
        class="link-text"
        @click="show = false"
        >《用户协议》</a
      >和
      <a
        :href="websiteConfig.website.privacyPolicyUrl"
        :target="'_blank'"
        class="link-text"
        @click="show = false"
        >《隐私政策》</a
      >
    </div> -->
  </div>
</template>

<script setup lang="ts" name="login-main">
import TypeBtn from "./TypeBtn.vue";
import Phone from "./Phone.vue";
import Wechat from "./Wechat.vue";
import { useLoginStore } from "~/store/login";
import { storeToRefs } from "pinia";
import { useAppStore } from "~/store/app";
import { useRoute, useRouter } from "vue-router";
import type { darkMode } from "~/tailwind.config";
const props = defineProps({
  dark: {
    type: Boolean,
    default: false,
  },
});
const store = useLoginStore();
const { websiteConfig } = storeToRefs(useAppStore());
const { open, close, onClickBg, selectLoginType, onLoginSuccess } = store;

const { show, loginTypeBtnList, loginType } = storeToRefs(store);

const route = useRoute();
const router = useRouter();
</script>

<style lang="scss" scoped>
@media screen and (max-width: $mb-width) {
  .login-body {
    padding-left: 15px !important;
    padding-right: 15px !important;
  }
}

.login-body {
  // background-color: #2A2A2B;
  border-radius: 12px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  color: #333;

  &.dark {
    background-color: #1a1c23 !important;
    color: #fff;
  }

  .close-btn {
    position: absolute;
    top: 20px;
    right: 20px;
    cursor: pointer;
    font-size: 20px;
    color: $mz-text-color-grey;
  }

  .login-main-box {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .login-type-box {
    display: flex;
    justify-content: center;
    margin-top: 10px;
  }

  .login-protocol-box {
    margin-top: 10px;
    font-size: 13px;
    color: #999;
    text-align: center;
  }

  .link-text {
    color: $mz-color-primary;
    margin: 0;
  }
}
</style>
