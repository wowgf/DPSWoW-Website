<template>
  <div class="bind-phone">
    <!-- 登录表单 -->
    <el-form
      ref="loginFormRef"
      :model="loginForm"
      :rules="loginFormRules"
      size="large"
    >
      <el-form-item prop="phone">
        <el-input
          v-model="loginForm.phone"
          placeholder="手机号"
          clearable
          size="large"
          class="login-input"
        />
      </el-form-item>
      <el-form-item prop="code">
        <el-input
          v-model="loginForm.code"
          :maxlength="8"
          placeholder="短信验证码"
          clearable
          size="large"
          class="login-input"
        >
          <template #suffix>
            <template v-if="countDown == 0">
              <el-button
                v-if="!hadSendCode"
                size="large"
                type="text"
                class="code-text"
                @click="getCode()"
                >发送验证码</el-button
              >
              <el-button
                v-if="hadSendCode"
                size="large"
                type="text"
                class="code-text"
                @click="getCode()"
                >重新发送</el-button
              >
            </template>
            <template v-else>
              <el-button type="text" size="small" :disabled="hadSendCode"
                >{{ countDown }}S后重新获取</el-button
              >
            </template>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          color="#1e80ff"
          size="large"
          class="login-btn"
          @click="bindPhone"
          >绑定手机</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import {} from "element-plus";
import service from "~/service";
let loginForm = reactive({
  phone: "",
  code: "",
});

let loginFormRules = {
  phone: [{ required: true, message: "请输入手机号", trigger: "blur" }],
  code: [{ required: true, message: "请输入验证码", trigger: "blur" }],
};
let countDown = ref(0);
let hadSendCode = ref(false);
let countDownTimer: any = null;
let loginFormRef = ref<any | undefined>();
const emit = defineEmits(["success", "error"]);
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
// 获取验证码
const getCode = () => {
  loginFormRef.value
    ?.validateField("phone")
    .then(() => {
      service.comm.sms.sms
        .sendSms({ phone: loginForm.phone, type: "bindPhone" })
        .then((res) => {
          hadSendCode.value = true;
          startCountDown();
        })
        .catch((e: any) => {
          ElMessage.error(e.message);
          clearCountDown();
          emit("error");
        });
    })
    .catch(() => {
      return false;
    });
};
function bindPhone() {
  loginFormRef.value?.validate((valid) => {
    if (valid) {
      service.user.info
        .bindPhone(loginForm)
        .then((res) => {
          ElMessage({
            type: "success",
            message: "绑定成功",
          });
          emit("success", loginForm.phone);
          // console.log("resssss", res);
        })
        .catch((e: any) => {
          ElMessage.error(e.message);
        });
    } else {
      return false;
    }
  });
}
</script>

<style lang="scss" scoped>
.bind-phone {
  display: flex;
  flex-direction: column;
  .login-input {
    .code-text {
      // color: #1e80ff;
      // padding-left: 20px;
      font-size: 15px;
      padding: 0 !important;
    }
  }
  .login-btn {
    width: 100%;
  }
}
</style>
