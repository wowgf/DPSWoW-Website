<template>
  <Layout label="设置账号" class="setting">
    <div class="phone-box">
      <span class="phone-label">手机</span>
      <div class="phone-input">
        <span class="phone-value">{{ userInfo.phone || "未绑定" }}</span>
        <el-button
          type="text"
          size="small"
          v-if="!userInfo.phone"
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
          userInfo.unionid ? "已绑定" : "未绑定"
        }}</span>
        <el-button
          type="text"
          size="small"
          v-if="!userInfo.unionid"
          class="bind-btn"
          >绑定</el-button
        >
        <el-button type="text" size="small" v-else class="bind-btn"
          >换绑</el-button
        >
      </div>
    </div>
  </Layout>
  <el-dialog
    v-model="dialogVisible"
    title="手机号绑定"
    width="320px"
    top="30vh"
  >
    <BindPhone @success="getPhone"></BindPhone>
  </el-dialog>
</template>

<script setup lang="ts">
import Layout from "./Layout.vue";
import BindPhone from "./BindPhone.vue";
import { useUserStore } from "@/store/user";
import service from "~/service";
const user = useUserStore();
let userInfo = reactive({ ...user.info });
let dialogVisible = ref(false);

function toBindPhone() {
  dialogVisible.value = true;
}
function getPhone(phone: any) {
  user.get();
  dialogVisible.value = false;
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
</style>
