<template>
  <div class="login-wechat">
    <div class="login-type-title">微信扫码登录</div>
    <div class="code-wrap">
      <div class="tip1">未注册的微信号将自动创建账号</div>
      <div class="img-box">
        <div v-if="isError" class="error-mask">
          <div class="icon-wrap" @click="getCode()">
            <icon-refresh :size="40" />
          </div>
          <div class="error-msg" @click="getCode()">
            {{ errorMsg }}
          </div>
        </div>
        <img v-if="codeImg" :src="codeImg" class="code-img" />
      </div>
      <div v-if="platform == 'wechat'" class="tip2">
        <span class="mb-2 tip2-text">长按识别二维码</span>
        <div>
          <strong class="tip2-text-strong">关注公众号</strong>
          <span class="tip2-text">后即可登录/注册</span>
        </div>
      </div>
      <div v-else class="tip2">
        <span class="tip2-text">打开</span>
        <SvgIcon name="wechat2" class="tip2-icon"></SvgIcon>
        <span class="tip2-text">扫一扫,</span>
        <div>
          <strong class="tip2-text-strong">关注公众号</strong>
          <span class="tip2-text">后即可登录/注册</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="login-wechat">
import QRCode from "qrcode";
import { onMounted, onUnmounted, ref } from "vue";
import service from "~/service";
import { useAppStore } from "~/store/app";
import { useUserStore } from "~/store/user";
const app = useAppStore();
const { platform, FROM_REF, isMobile, clientId } = storeToRefs(app);
const user = storeToRefs(useUserStore());
let codeImg = ref("");
let codeId = "";
let timer: any = null;
let isError = ref(false);
let errorMsg = ref("重新获取");
const emits = defineEmits(["success"]);
let checkLoginTimes = 0; // 检测登录次数
onMounted(() => {
  getCode();
});

onUnmounted(() => {
  clearTimer();
});

// 获取微信登录二维码
function getCode() {
  isError.value = false;
  service.login
    .qrcode({
      loginChannel: isMobile.value ? "mobile" : "PC",
      registerChannel: isMobile.value ? "mobile" : "PC",
      ref: FROM_REF.value,
      clientId: clientId.value,
      inviteCode: user.registerInviteCode.value || undefined,
      friendCode: user.friendInviteCode.value || undefined,
    })
    .then((res: any) => {
      if (res.url) {
        createCode(res.url);
        codeId = res._id;
        // 检查登录状态
        checkLogin(true);
      } else {
        isError.value = true;
      }
    })
    .catch((err) => {
      isError.value = true;
    });
}

// 生成二维码
function createCode(data: string) {
  // 边距调整为3px
  QRCode.toDataURL(data, { margin: 3 })
    .then((url: string) => {
      codeImg.value = url;
    })
    .catch((err: any) => {
      console.error(err);
    });
}

/**
 * 检查登录状态
 * 每秒检测一次
 */
function checkLogin(isInit?: boolean) {
  if (isInit) checkLoginTimes = 0;
  service.login
    .qrcodeStatus({ uuid: codeId })
    .then((res) => {
      checkLoginTimes++;
      // 设置两分钟过期
      if (checkLoginTimes >= 60 * 2) {
        checkLoginTimes = 0;
        isError.value = true;
        return;
      }
      if (res.token) {
        emits("success", res);
      } else {
        timer = setTimeout(() => {
          checkLogin();
        }, 1000);
      }
    })
    .catch(() => {
      timer = setTimeout(() => {
        checkLogin();
      }, 1000);
    });
}

// 清除定时器
function clearTimer() {
  console.log("清除定时器");
  clearTimeout(timer);
}
</script>

<style lang="scss" scoped>
.login-wechat {
  width: 100%;

  .login-type-title {
    font-size: 28px;
    font-weight: bold;
    margin-bottom: 15px;
    text-align: center;
  }

  .code-wrap {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .tip1 {
      color: $mz-text-color-grey;
    }

    .tip2 {
      font-size: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;

      .tip2-icon {
        font-size: 18px;
      }

      .tip2-text {
        margin-left: 5px;
        margin-right: 5px;
      }

      .tip2-text-strong {
        font-weight: bold;
      }
    }

    .img-box {
      margin: 15px 0;
      width: 200px;
      height: 200px;
      margin: 15px 0;
      border: 1px #eee solid;
      border-radius: 10px;
      position: relative;
      overflow: hidden;

      .code-img {
        width: 100%;
        height: 100%;
      }

      .error-mask {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: rgba(0, 0, 0, 0.2);
        border-radius: 10px;
        z-index: 100;
        color: #fff;

        .icon-wrap {
          cursor: pointer;
        }

        .error-msg {
          cursor: pointer;
        }
      }
    }
  }
}
</style>
