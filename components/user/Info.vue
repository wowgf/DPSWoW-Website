<template>
  <Layout label="个人资料" class="user-info">
    <el-form size="large" label-width="80">
      <el-form-item label="头像">
        <el-image :src="userInfo.avatarUrl" :preview-src-list="[userInfo.avatarUrl]"
          style="height: 100px;width: 100px;object-fit: cover;border-radius: 10px;background-color: #ccc;">
          <template #error>
            <div class="error-img-wrap">
              请上传头像
            </div>
          </template>
        </el-image>
      </el-form-item>
      <el-form-item>
        <client-only>
          <Upload v-model="userInfo.avatarUrl" text="上传头像"></Upload>
        </client-only>
      </el-form-item>
      <el-form-item label="昵称">
        <el-input v-model="userInfo.nickName" clearable></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-select v-model="userInfo.gender">
          <el-option :value="0" label="保密"></el-option>
          <el-option :value="1" label="男"></el-option>
          <el-option :value="2" label="女"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button :loading="loading" type="primary" @click="submit()">保存</el-button>
      </el-form-item>
    </el-form>
  </Layout>
</template>

<script setup lang='ts'>
import Layout from './Layout.vue'
import { useUserStore } from '@/store/user'
import service from "~/service";
const user = useUserStore()
let userInfo = reactive({ ...user.info })
let loading = ref(false)
function submit () {
  // user.updateInfo(userInfo)
  user.update(userInfo).then(() => {
    ElMessage.success('保存成功')
  })
}
</script>

<style lang="scss" scoped>
.user-info {
  .error-img-wrap {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
