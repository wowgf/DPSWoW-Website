<template>
  <a-form ref="formRef" :model="formData" :rules="rules" auto-label-width>
    <a-form-item label="手机号" field="phone">
      <a-input v-model="formData.phone" placeholder="请输入手机号"></a-input>
    </a-form-item>
    <a-form-item label="验证码" field="code">
      <a-input
        v-model="formData.code"
        :maxlength="8"
        placeholder="短信验证码"
        clearable
        size="large"
        class="login-input"
      >
        <template #suffix>
          <template v-if="countDown == 0">
            <a-link
              v-if="!hadSendCode"
              :disabled="!formData.phone"
              :underline="false"
              size="small"
              type="primary"
              @click="getCode()"
              >发送验证码</a-link
            >
            <a-link
              v-if="hadSendCode"
              :disabled="!formData.phone"
              :underline="false"
              size="small"
              type="primary"
              @click="getCode()"
            >
              重新发送
            </a-link>
          </template>

          <template v-else>
            <a-link :disabled="!formData.phone" :underline="false" size="small">
              {{ countDown }}S后重新获取
            </a-link>
          </template>
        </template>
      </a-input>
    </a-form-item>
  </a-form>
</template>

<script setup lang="ts">
import { Message } from "@arco-design/web-vue";
import { throttle } from "lodash-es";
interface FormData {
  phone: string;
  code: string;
}
const formData = reactive<FormData>({
  phone: "",
  code: "",
});

const rules = {
  phone: [
    { required: true, message: "请输入手机号", trigger: "blur" },
    {
      validator: (value: string, cb: Function) => {
        if (/^1[3456789]\d{9}$/.test(value)) {
          cb();
        } else {
          cb("请输入正确的手机号");
        }
      },
      trigger: "blur",
    },
  ],
  code: [{ required: true, message: "请输入验证码", trigger: "blur" }],
};

let formRef = ref<any>();

let countDown = ref(0);

let hadSendCode = ref(false);

let countDownTimer: any = null;

let emits = defineEmits(["success"]);

const loading = ref(false);

// 获取验证码
const getCode = throttle(() => {
  formRef.value?.validateField("phone", (errors: any) => {
    if (!errors) {
      startCountDown();
      service.login
        .smsCode({ phone: formData.phone })
        .then(() => {
          hadSendCode.value = true;
          Message.success("验证码已发送");
        })
        .catch((e: any) => {
          Message.error(e.message);
          clearCountDown();
        });
    }
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

/**
 * 提交表单和验证
 */
function submit(): Promise<FormData> {
  return new Promise((resolve, reject) => {
    formRef.value?.validate((errors: any) => {
      if (!errors) {
        resolve(formData);
      } else {
        reject(errors);
      }
    });
  });
}

defineExpose({
  submit,
});
</script>

<style></style>
