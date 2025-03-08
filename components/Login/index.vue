<template>
  <!-- 登录弹窗 -->
  <teleport to="body">
    <div v-if="show">
      <div class="login-bg" @click="onClickBg()">
        <div :class="{ dark: dark }" class="login-dialog-body" @click.stop>
          <!-- <div
            v-if="showLogin"
            class="cursor-pointer back-invite"
            @click="showLogin = false"
          >
            &larr;填写邀请码
          </div> -->
          <div class="close-btn">
            <SvgIcon name="icon-close" @click="close()"></SvgIcon>
          </div>
          <Invite v-if="!showLogin" @success="showLogin = true"></Invite>
          <Main v-if="showLogin" :dark="dark"></Main>
          <div v-if="!showLogin" class="mt-5 text-center">
            <NeedInvite></NeedInvite>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts" name="login">
import Main from "./Main.vue";
import Invite from "./Invite.vue";
import { useLoginStore } from "~/store/login";
import { storeToRefs } from "pinia";
import NeedInvite from "./needInvite.vue";
import { useUserStore } from "~/store/user";

const props = defineProps({
  dark: {
    type: Boolean,
    default: false,
  },
});
const user = useUserStore();
const { friendInviteCode } = storeToRefs(user);
const showLogin = ref(true);
const store = useLoginStore();
const { close, onClickBg } = store;
const { show } = storeToRefs(store);

watch(
  () => show.value,
  () => {
    // showLogin.value = !!friendInviteCode.value;
  },
  {
    immediate: true,
  }
);
</script>

<style lang="scss" scoped>
@media screen and (max-width: $mb-width) {
  .login-body {
    // width: 90%;
    padding-left: 15px !important;
    padding-right: 15px !important;
  }
}

.login-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.5);
}

.login-dialog-body {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 500px;
  // height: 500px;
  max-width: 90%;
  transform: translate(-50%, -50%);
  background-color: #fff;

  border-radius: 12px;
  padding: 30px 15px;
  display: flex;
  flex-direction: column;

  &.dark {
    background-color: #1a1c23 !important;
  }

  .close-btn {
    position: absolute;
    top: 20px;
    right: 20px;
    cursor: pointer;
    font-size: 20px;
    color: $mz-text-color-grey;
  }

  .back-invite {
    position: absolute;
    top: 20px;
    left: 20px;
    cursor: pointer;
    color: $mz-text-color-grey;
  }
}
</style>
