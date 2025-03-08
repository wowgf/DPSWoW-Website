<template>
  <div class="login-phone">
    <div class="login-type-title">手机号登录</div>
    <div class="login-form">
      <!-- 登录表单 -->
      <a-form ref="loginFormRef" :label-col-props="{ span: 0 }" :wrapper-col-props="{ span: 24 }" :model="loginForm"
        :rules="loginFormRules">
        <a-form-item field="phone">
          <a-input v-model="loginForm.phone" placeholder="手机号" clearable size="large" class="login-input"
            @keyup.enter="login()" />
        </a-form-item>
        <a-form-item field="smsCode">
          <a-input v-model="loginForm.smsCode" :maxlength="8" placeholder="短信验证码" clearable size="large"
            class="login-input" @keyup.enter="login()">
            <template #suffix>
              <template v-if="countDown == 0">
                <!-- <el-button v-if="!hadSendCode" :disabled="!loginForm.phone" size="small" type="text"
                  @click="getCode()">发送验证码</el-button>
                <el-button v-if="hadSendCode" :disabled="!loginForm.phone" size="small" type="text"
                  @click="getCode()">重新发送</el-button> -->
                <a-link v-if="!hadSendCode" :disabled="!loginForm.phone" :underline="false" size="small" type="primary"
                  @click="getCode()">发送验证码</a-link>
                <a-link v-if="hadSendCode" :disabled="!loginForm.phone" :underline="false" size="small" type="primary"
                  @click="getCode()">重新发送</a-link>
              </template>

              <template v-else>
                <a-link :disabled="!loginForm.phone" :underline="false" size="small">{{ countDown }}S后重新获取</a-link>
              </template>
            </template>
          </a-input>
        </a-form-item>
      </a-form>
      <div>
        <a-button :loading="loading" type="primary" size="large" class="login-btn" @click="login()">{{ loading ?
          "登录中..." :
          "登录" }}</a-button>
        <div class="tip-text">未注册的手机号登录后将自动注册</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="login-phone">
import { throttle } from "lodash";
import { onUnmounted, reactive, ref } from "vue";
import service from "~/service";
import { Message } from "@arco-design/web-vue";
import { useAppStore } from "~/store/app";
import { useUserStore } from "~/store/user";
const app = storeToRefs(useAppStore());
const user = storeToRefs(useUserStore());

let loginForm = reactive({
  phone: "",
  smsCode: "",
  registerChannel: app.isMobile.value ? "mobile" : "PC",
  loginChannel: app.isMobile.value ? "mobile" : "PC",
  ref: app.FROM_REF.value,
});

let loginFormRules = {
  phone: [{ required: true, message: "请输入手机号", trigger: "blur" }],
  smsCode: [{ required: true, message: "请输入验证码", trigger: "blur" }],
};

let loading = ref(false);

let captchaImg = ref("");

let loginFormRef = ref<any>();

let countDown = ref(0);

let hadSendCode = ref(false);

let countDownTimer: any = null;

let emits = defineEmits(["success"]);

onUnmounted(() => {
  clearCountDown();
});

// 获取验证码
const getCode = throttle(() => {
  startCountDown();
  loginFormRef.value
    ?.validateField("phone")
    .then(() => {
      service.login
        .smsCode({ phone: loginForm.phone })
        .then((res) => {
          hadSendCode.value = true;
          Message.success("验证码已发送");
        })
        .catch((e: any) => {
          // Message.error(e.message);
          clearCountDown();
        });
    })
    .catch(() => {
      return false;
    });
}, 1000);

// 开始倒计时
const startCountDown = () => {
  countDown.value = 60;
  countDownTimer = setInterval(() => {
    countDown.value--;
    if (countDown.value <= 0) {
      clearCountDown();
    }
  }, 1000);
};

// 清除定时器
const clearCountDown = () => {
  clearInterval(countDownTimer);
  countDown.value = 0;
};

function login() {
  loginFormRef.value?.validate((errors: any) => {
    if (!errors) {
      loading.value = true;
      service.login
        .phone({
          ...loginForm,
          clientId: app.clientId.value,
          inviteCode: user.registerInviteCode.value || undefined,
          friendCode: user.friendInviteCode.value || undefined,
        })
        .then((res) => {
          emits("success", res);
        })
        .finally(() => {
          loading.value = false;
        });
    } else {
      return false;
    }
  });
}
</script>

<style lang="scss">
.login-phone {
  width: 100%;
  // height: 100%;

  .login-type-title {
    font-size: 28px;
    font-weight: bold;
    margin-bottom: 50px;
    text-align: center;
  }

  .login-form {
    display: flex;
    flex-direction: column;
    // justify-content: center;
    // align-items: center;
    padding: 0 20px;

    .el-input__inner {
      color: #333 !important;
    }

    .login-form-item {
      margin-bottom: 18px;
      color: #1e80ff;

      &:last-child {
        margin-bottom: 0;
      }
    }

    .login-btn {
      width: 100%;
    }

    .tip-text {
      text-align: center;
      width: 100%;
      margin-top: 10px;
      color: #4e5969;
    }
  }

  .captcha-dialog {
    width: 300px;
    height: 300px;
    background-color: #fff;
    border-radius: 12px;
    padding: 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 999;
    background-color: rgba(0, 0, 0, 0.5);
  }

  .captcha-img {
    height: 34px;
  }
}
</style>
