<template>
  <client-only>
    <Layout label="设置账号" class="setting">
      <div class="phone-box">
        <span class="phone-label">手机</span>
        <div class="phone-input">
          <span class="phone-value">{{ userInfo?.phone || "未绑定" }}</span>
          <el-button
            type="text"
            size="small"
            v-if="!userInfo?.phone"
            class="bind-btn"
            @click="toBindPhone"
            >绑定</el-button
          >
          <el-button
            type="text"
            size="small"
            v-else
            class="bind-btn"
            @click="toBindPhone"
            >换绑</el-button
          >
        </div>
      </div>
      <div class="phone-box">
        <span class="phone-label">微信</span>
        <div class="phone-input">
          <span class="phone-value">{{
            !userInfo?.unionid ? "未绑定" : "已绑定"
          }}</span>
          <el-button
            type="text"
            size="small"
            v-if="!userInfo?.unionid"
            class="bind-btn"
            @click="toBindWx"
            >绑定</el-button
          >
          <el-button
            type="text"
            size="small"
            v-if="userInfo?.phone && userInfo?.unionid"
            class="bind-btn"
            @click="cancelBindWx"
            >解绑</el-button
          >
        </div>
      </div>
    </Layout>
    <el-dialog
      v-model="dialogVisible"
      title="手机号绑定"
      width="320px"
      top="30vh"
      destroy-on-close
    >
      <BindPhone @success="getPhone" @error="closeDialog"></BindPhone>
    </el-dialog>
    <el-dialog
      v-model="dialogWxVisible"
      title="绑定微信"
      width="320px"
      top="30vh"
      @close="handleClose"
    >
      <div class="bind-wx">
        <div class="img-box">
          <img v-if="codeImg" :src="codeImg" class="code-img" />
        </div>
        <div class="wx-tips">
          请使用微信扫描二维码登录
          <div class="tip-text">"AI综合网"</div>
        </div>
      </div>
    </el-dialog>
  </client-only>
</template>

<script setup lang="ts">
import Layout from "@/components/user/Layout.vue";
import BindPhone from "@/components/user/BindPhone.vue";
import { useUserStore } from "@/store/user";
import { useLoginStore } from "@/store/login";
import { ElMessage, ElMessageBox } from "element-plus";
import QRCode from "qrcode";
import service from "~/service";
import { storeToRefs } from "pinia";
const user = useUserStore();
const store = useLoginStore();
const { info: userInfo } = storeToRefs(user);
const { loginType } = storeToRefs(store);
let dialogVisible = ref(false);
let dialogWxVisible = ref(false);
let codeImg = ref("");
let timer2: any = null;
let checkLoginTimes = 0; // 检测登录次数

function toBindPhone() {
  dialogVisible.value = true;
}
function closeDialog() {
  dialogVisible.value = false;
}
function getPhone(phone: any) {
  user.get();
  dialogVisible.value = false;
}
function toBindWx() {
  dialogWxVisible.value = true;
  getCode();
  timer2 = setInterval(() => {
    checkLogin();
  }, 1000);
}
// 获取微信二维码
function getCode() {
  // isError.value = false;
  service.user.info.wxQrcode().then((res) => {
    console.log("1111222", res);
    if (res.url) {
      createCode(res.url);
      // codeId = res._id;
      // 检查登录状态
      checkLogin(true);
    }
  });
}
// 生成二维码
function createCode(data: string) {
  QRCode.toDataURL(data, { margin: 2 })
    .then((url: string) => {
      codeImg.value = url;
    })
    .catch((err: any) => {
      console.error(err);
    });
}
function checkLogin(isInit?: boolean) {
  // if (isInit) checkLoginTimes = 0;
  if (isInit) return;
  service.user.info
    .wxQrcodeStatus()
    .then((res) => {
      // checkLoginTimes++;
      console.log("1111", res);
      // 设置两分钟过期
      // if (checkLoginTimes >= 60 * 2) {
      //   checkLoginTimes = 0;
      //   return;
      // }
      if (res == "绑定成功") {
        clearInterval(timer2);
        ElMessage({
          type: "success",
          message: "绑定成功",
        });
        dialogWxVisible.value = false;
        user.get();
      }
    })
    .catch((e) => {
      if (e.message !== "未绑定") {
        ElMessage.error(e.message);
        clearInterval(timer2);
        dialogWxVisible.value = false;
      }
    });
}
function handleClose() {
  clearInterval(timer2);
  dialogWxVisible.value = false;
}
// 解绑微信
function cancelBindWx() {
  ElMessageBox.confirm(
    "解绑后将无法使用该微信号登录此账号，您确定解绑吗？",
    "解除微信绑定",
    {
      cancelButtonText: "暂不解绑",
      confirmButtonText: "确认解绑",
    }
  )
    .then(() => {
      service.user.info.unbindWx().then((res) => {
        user.get();
        ElMessage({
          type: "success",
          message: "解绑成功",
        });
      });
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "暂不解绑",
      });
    });
}
</script>

<style lang="scss" scoped>
.setting {
  .phone-box {
    padding: 32px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid #e4e6eb;
    font-size: 15px;

    .phone-label {
      flex: 20%;
      color: #515767;
    }

    .phone-input {
      width: 80%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #8a919f;

      .bind-btn {
        color: #1e80ff;
        cursor: pointer;
        font-size: 15px;
      }
    }
  }
}
.bind-wx {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: #222;
  .img-box {
    width: 200px;
    height: 200px;
    margin: 0 0 10px 0;
    border: 1px #eee solid;
    border-radius: 10px;
    position: relative;
    overflow: hidden;

    .code-img {
      width: 100%;
      height: 100%;
    }
  }
  .wx-tips {
    .tip-text {
      margin-top: 5px;
    }
  }
}
</style>
