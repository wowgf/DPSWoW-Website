<template>
  <a-tooltip>
    <template #content>
      <div class="py-2">
        <img
          src="~/assets/images/group-rank-qrcode.png"
          class="h-[200px] w-[200px] object-cover rounded"
        />
      </div>
    </template>
    <a-button type="primary" :style="{ background: '#AA2409' }">
      <template #icon>
        <SvgIcon name="wechat-mp" class="text-[#07C060] bg-white rounded-full text-[18px]"></SvgIcon>
        <!-- <img src="~/assets/icons/imgs/wechat.png" class="bg-white rounded-full h-[18px] w-[18px]"/> -->
      </template>
      转发到微信群，查看我的群排名
    </a-button>
  </a-tooltip>
</template>

<script setup lang="ts"></script>

<style></style>
