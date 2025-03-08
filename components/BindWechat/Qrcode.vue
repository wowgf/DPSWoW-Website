<template>
  <div class="login-wechat">
    <div class="code-wrap">
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
    </div>
  </div>
</template>

<script setup lang="ts" name="login-wechat">
import { Message } from "@arco-design/web-vue";
import QRCode from "qrcode";
import { onMounted, onUnmounted, ref } from "vue";
import service from "~/service";
import { useAppStore } from "~/store/app";
const app = useAppStore();
const { platform, FROM_REF, isMobile } = storeToRefs(app);
let codeImg = ref("");
let codeId = "";
let timer: any = null;
let isError = ref(false);
let errorMsg = ref("重新获取");
const emits = defineEmits(["success", "error"]);
let checkStatusTimes = 0; // 检测登录次数
onMounted(() => {
  getCode();
});

onUnmounted(() => {
  clearTimer();
});

// 获取微信登录二维码
function getCode() {
  isError.value = false;
  service.user
    .getBindQrcode()
    .then((res: any) => {
      if (res.url) {
        createCode(res.url);
        codeId = res._id;
        // 检查登录状态
        checkStatus(true);
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
function checkStatus(isInit?: boolean) {
  if (isInit) checkStatusTimes = 0;
  service.user
    .getWxBindStatus()
    .then((res) => {
      checkStatusTimes++;
      // 设置两分钟过期
      if (checkStatusTimes >= 60 * 2) {
        checkStatusTimes = 0;
        isError.value = true;
        return;
      }

      if (res == "ok") {
        clearInterval(timer);
        Message.success("绑定成功");
        emits("success");
      } else {
        timer = setTimeout(() => {
          checkStatus();
        }, 1000);
      }
    })
    .catch((e) => {
      clearInterval(timer);
      emits("error");
      checkStatusTimes = 0;
      isError.value = true;
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
