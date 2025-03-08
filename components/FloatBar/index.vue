<template>
  <div
    class="fixed transform -translate-y-1/2 float-bar right-0 bg-[#29292C] top-1/2 py-2 text-gray-300"
  >
    <a-popover position="left">
      <div class="cursor-pointer float-bar__item">
        <div class="menu-icon">
          <SvgIcon name="wechat-mini"></SvgIcon>
        </div>
        <div class="menu-label">小程序</div>
      </div>
      <template #content>
        <div class="flex flex-col items-center">
          <img
            src="@/assets/images/wechat-mini-qrcode.jpg"
            alt=""
            class="h-[100px] w-[100px]"
          />
          <div class="mt-2">魔兽工坊小程序</div>
        </div>
      </template>
    </a-popover>
    <a-popover position="left">
      <div class="cursor-pointer float-bar__item">
        <div class="menu-icon">
          <SvgIcon name="wechat-mp"></SvgIcon>
        </div>
        <div class="menu-label">公众号</div>
      </div>
      <template #content>
        <div class="flex flex-col items-center">
          <img
            src="@/assets/images/wechat-mp-qrcode.jpg"
            alt=""
            class="h-[100px] w-[100px]"
          />
          <div class="mt-2">扫码关注公众号，获取最新动态</div>
          <!-- <div class="mt-1">获取最新动态</div> -->
        </div>
      </template>
    </a-popover>
    <!-- <nuxtLink to="/downloadPlugin">
      <div class="cursor-pointer float-bar__item">
        <div class="menu-icon">
          <SvgIcon name="plugin"></SvgIcon>
        </div>
        <div class="menu-label">下载插件</div>
      </div>
    </nuxtLink> -->
    <a-popover position="left">
      <div class="cursor-pointer float-bar__item">
        <div class="menu-icon">
          <SvgIcon name="wechat"></SvgIcon>
        </div>
        <div class="menu-label">商务合作</div>
      </div>
      <template #content>
        <div class="flex flex-col items-center">
          <!-- <img
            src="@/assets/images/wechat-contect.jpg"
            alt=""
            class="h-[100px] w-[100px]"
          /> -->
          <img
            src="@/assets/images/wechat-contect-2.png"
            alt=""
            class="h-[100px] w-[100px]"
          />
          <div class="mt-2">添加作者微信，聊聊合作</div>
        </div>
      </template>
    </a-popover>
    <div class="cursor-pointer float-bar__item" @click="onOpenFeedBack()">
      <div class="menu-icon">
        <SvgIcon name="feedback"></SvgIcon>
      </div>
      <div class="menu-label">反馈建议</div>
    </div>
    <div class="cursor-pointer float-bar__item" @click="onOpenKefu()">
      <div class="menu-icon">
        <SvgIcon name="kefu"></SvgIcon>
      </div>
      <div class="menu-label">在线客服</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { MITT } from "~/enums/consts";
import { useLoginStore } from "~/store/login";
import { useUserStore } from "~/store/user";
// import { useChat } from "../Chat/store";
const { checkLogin } = useUserStore();
const { mitt } = useCool();
// const { openChat } = useChat();
function onOpenFeedBack() {
  mitt.emit(MITT.SHOW_FEEDBACK);
}

function onOpenKefu() {
  // if(checkLogin)
  // openChat({
  //   userId: 5,
  // });
}
</script>

<style lang="scss" scoped>
.float-bar {
  .float-bar__item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 10px 10px;
    .menu-icon {
      height: 20px;
      width: 20px;
      font-size: 20px;
      color: #e6e6e6;
      img {
        height: 100%;
        width: 100%;
      }
    }

    .menu-label {
      margin-top: 10px;
      font-size: 12px;
    }
  }
}
</style>
