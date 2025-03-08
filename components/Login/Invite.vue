<template>
  <div class="login-invite">
    <div class="login-type-title">邀请注册</div>
    <div class="text-center text-yellow-400">
      Tips：产品处于内测阶段，需要有邀请码才能注册使用~
    </div>
    <div class="flex flex-col mt-5 login-form px-[20px]">
      <!-- 登录表单 -->
      <a-form
        ref="loginFormRef"
        :label-col-props="{ span: 0 }"
        :wrapper-col-props="{ span: 24 }"
        :model="loginForm"
        :rules="loginFormRules"
      >
        <a-form-item field="inviteCode">
          <a-input
            v-model="loginForm.inviteCode"
            placeholder="请输入邀请码"
            clearable
            size="large"
            class="login-input"
          />
        </a-form-item>
      </a-form>
      <div>
        <a-button
          :loading="loading"
          type="primary"
          size="large"
          long
          @click="onCheckInviteCode()"
          >{{ loading ? "验证中..." : "确定" }}</a-button
        >
        <div class="flex justify-between mt-5">
          <div class="text-gray-400 cursor-pointer" @click="toLogin">
            已有账号，去登录
          </div>
          <a :href="app.commonConfig.value.inviteGetLink" target="_blank">
            <div class="text-yellow-400 cursor-pointer">如何获得邀请码？</div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="login-invite">
import { throttle } from "lodash";
import { onUnmounted, reactive, ref } from "vue";
import service from "~/service";
import { Message, Modal } from "@arco-design/web-vue";
import { useAppStore } from "~/store/app";
import { useUserStore } from "~/store/user";
import { CONFIRM_VERIFICATION_CODE } from "~/consts/trackEvent";
const app = storeToRefs(useAppStore());
const user = storeToRefs(useUserStore());
let loginForm = reactive({
  inviteCode: "",
  clientId: app.clientId.value,
});

let loginFormRules = {
  inviteCode: [{ required: true, message: "请输入邀请码", trigger: "blur" }],
};

let loading = ref(false);

let loginFormRef = ref<any>();

let emits = defineEmits(["success"]);

function toLogin() {
  emits("success");
}

function onCheckInviteCode() {
  recordLog({ event: CONFIRM_VERIFICATION_CODE });
  loginFormRef.value?.validate((errors: any) => {
    if (!errors) {
      loading.value = true;
      // user.friendInviteCode.value = loginForm.inviteCode;
      user.registerInviteCode.value = loginForm.inviteCode;

      service.invite
        .checkInviteCode({
          inviteCode: loginForm.inviteCode,
          clientId: app.clientId.value,
        })
        .then(() => {
          setTimeout(() => {
            Modal.confirm({
              // title: "邀请码校验成功",
              content: "邀请码校验成功，可以进行注册了",
              okText: "立即注册",
              simple: true,
              escToClose: false,
              maskClosable: false,
              hideCancel: true,
              width: 300,
              // cancelText: "取消",
              onOk: () => {
                emits("success");
              },
            });
            // Message.success("邀请码校验成功，可以进行注册了");
            // emits("success");
            loading.value = false;
          }, 1000 * 1);
        })
        .catch(() => {
          loading.value = false;
        });
    } else {
      return false;
    }
  });
}
</script>

<style lang="scss">
.login-invite {
  width: 100%;
  // height: 100%;
  padding: 0 15px;
  .login-type-title {
    font-size: 28px;
    font-weight: bold;
    margin-bottom: 50px;
    text-align: center;
  }

  .login-form {
    // padding: 0 20px;

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
  }
}
</style>
