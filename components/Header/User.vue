<template>
  <client-only>
    <a-dropdown position="br" hide-on-click>
      <div class="flex items-center cursor-pointer">
        <!-- <a-badge :count="(isMobile && state.unreadCount) || 0" :offset="[0, 0]">
          <div
            class="header-user h-[35px] w-[35px] max-sm:h-[30px] max-sm:w-[30px] rounded-full overflow-hidden bg-slate-600 cursor-pointer flex justify-center items-center"
          >
            <img v-if="info?.avatarUrl" :src="info.avatarUrl" />
          </div>
        </a-badge> -->

        <div
          class="header-user h-[35px] w-[35px] max-sm:h-[30px] max-sm:w-[30px] rounded-full overflow-hidden bg-slate-600 cursor-pointer flex justify-center items-center"
        >
          <img v-if="info?.avatarUrl" :src="info.avatarUrl" />
        </div>

        <!-- <el-badge
          :value="(isMobile && state.unreadCount) || 0"
          :offset="[-1, 5]"
        >
          <div
            class="header-user h-[35px] w-[35px] max-sm:h-[30px] max-sm:w-[30px] rounded-full overflow-hidden bg-slate-600 cursor-pointer flex justify-center items-center"
          >
            <img v-if="info?.avatarUrl" :src="info.avatarUrl" />
          </div>
        </el-badge> -->
        <span
          v-if="!isMobile"
          class="ml-1 max-w-[120px] overflow-hidden text-nowrap text-ellipsis"
        >
          {{ info?.nickName }}
        </span>
      </div>
      <template #content>
        <nuxtLink to="/user/settings/profile">
          <a-doption> 个人设置 </a-doption>
        </nuxtLink>
        <nuxtLink to="/user/settings/record">
          <a-doption> 模拟记录 </a-doption>
        </nuxtLink>
        <!-- <nuxtLink :to="`/user/${info?.id}`">
          <a-doption> 我的主页 </a-doption>
        </nuxtLink> -->
        <!-- pc端 -->
        <!-- <nuxtLink v-if="!isMobile" to="/chat" target="_blank">
          <a-doption> 消息通知 </a-doption>
        </nuxtLink> -->
        <!-- <nuxtLink v-if="isMobile" to="/chat/friend">
          <a-doption> 消息中心 </a-doption>
        </nuxtLink> -->
        <!-- <nuxtLink to="/user/settings/order">
          <a-doption> 我的订单 </a-doption>
        </nuxtLink> -->
        <!-- <a-doption v-if="isMobile" @click="onFeedback">意见反馈</a-doption> -->
        <!-- <a-doption v-if="isMobile" @click="onDonate">支持作者</a-doption> -->
        <a-doption @click="user.logout()">退出登录</a-doption>
      </template>
    </a-dropdown>
  </client-only>
</template>

<script setup lang="ts">
import { useAppStore } from "~/store/app";
import { useUserStore } from "~/store/user";
// import { useChat } from "../Chat/store";
const user = useUserStore();
const { isMobile } = storeToRefs(useAppStore());
const { info } = storeToRefs(useUserStore());
// const { state } = useChat();
const emits = defineEmits(["feedback", "donate"]);
function onFeedback() {
  emits("feedback");
}
function onDonate() {
  emits("donate");
}
</script>

<style lang="scss" scoped>
.header-user {
}
</style>
