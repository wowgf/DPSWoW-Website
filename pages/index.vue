<template>
  <Container>
    <div class="pb-20 page--home">
      <div
        class="flex justify-between lg:mt-[100px] max-sm:mt-10 top-wrap overflow-hidden"
      >
        <div class="flex flex-col w-[400px] flex-wrap">
          <div class="text-5xl font-semibold max-lg:text-3xl">
            <h3>
              <span class="text-[#FC4F4F]">魔兽</span>
              <span>DPS模拟</span>
            </h3>
            <h3 class="mt-[25px] max-lg:mt-1">
              <span class="text-[#23D3A4]">小白玩家</span>
              <span>都会用的</span>
            </h3>
            <h3 class="mt-[25px] max-lg:mt-1">
              <span>配装</span>
              <span class="text-[#FC4F4F]">输出模拟器</span>
            </h3>
          </div>
          <section class="mt-7 text-base font-normal leading-[26px] text-[#B2B2B2]">
            <p>低保纠结症？不会配装？输出打不高？</p>
            <p>我们要做一款让小白都会用的魔兽DPS模拟器</p>
            <p class="text-[#FFE927]">Tips：产品目前处于Beta测试阶段</p>
          </section>
          <div v-if="isMobile" class="mt-5">
            <video
              src="/video/fe7596ceb8a749df89623948cef72892_魔兽DPS模拟演示.mp4"
              autoplay
              muted
              loop
              playsinline
              class="w-full"
            ></video>
          </div>
          <div class="flex mt-[28px]">
            <nuxt-link to="/home">
              <button class="action-btn action-btn-1 text-black w-[151px] mr-[40px]">
                在线使用
              </button>
            </nuxt-link>
            <!-- <a :href="websiteConfig.common.inviteGetLink" target="_blank"> -->
            <!-- <button
              class="action-btn w-[185px] border-[1px] border-[#CBCBCB] text-[#CBCBCB] border-solid"
              @click="getInviteCodeModal()"
            >
              <span>获取邀请码</span>
            </button> -->
            <!-- </a> -->
            <a>
              <button
                class="action-btn w-[185px] border-[1px] border-[#CBCBCB] text-[#CBCBCB] border-solid"
                @click="onInstallClick()"
              >
                <!-- <span @click="onInstallClick">安装模拟器</span> -->
                <span>安装模拟器</span>
              </button>
            </a>
          </div>
        </div>
        <div v-if="!isMobile" class="flex-1 ml-[100px]">
          <video
            src="/video/fe7596ceb8a749df89623948cef72892_魔兽DPS模拟演示.mp4"
            autoplay
            muted
            loop
            playsinline
            class="w-full"
          ></video>
        </div>
      </div>

      <div id="mediaBox" class="mt-[102px]">
        <div class="text-2xl font-semibold text-center">
          <span>关注我们的</span>
          <span class="text-[#FC4F4F]">社交媒体</span>
        </div>
        <ul class="flex flex-wrap justify-around mt-16">
          <li v-for="(item, index) in mediaList" :key="index">
            <a
              :href="item.link"
              target="_blank"
              class="flex flex-col items-center cursor-pointer"
              @click="onClickMediaItem(item)"
            >
              <div class="flex flex-col items-center mt-4 code-wrap">
                <img
                  v-if="item.qrcode"
                  :src="item.qrcode"
                  alt=""
                  class="w-[150px] h-[150px] rounded"
                />
                <div v-if="item.desc" class="mt-3 text-center">
                  {{ item.desc }}
                </div>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </Container>
  <a-modal
    v-model:visible="showFollowModel"
    :width="330"
    :footer="false"
    hide-cancel
    simple
  >
    <template #title> {{ followTitle }} </template>
    <div v-if="followQrCode" class="flex justify-center mb-4">
      <img :src="followQrCode" class="w-[200px] h-[200px]" />
    </div>
    <div class="text-center">{{ followDesc }}</div>
  </a-modal>
</template>
<script setup lang="ts">
import mediaImg1 from "~/assets/images/home/vector.png";
import bilibiliImg from "~/assets/images/home/bilibili.png";
import douyinImg from "~/assets/images/home/douyin.png";
import wechatImg from "~/assets/images/home/wechat.png";
import bilibiliQrCode from "~/assets/images/qrcode/bilibili.png";
import douyinQrCode from "~/assets/images/qrcode/douyin.png";
import wechatQrCode from "~/assets/images/wechat-mp-qrcode.jpg";
import wechatVideoQrCode from "~/assets/images/wechat-video-qrcode.png";
import { getInviteCodeModal } from "~/cool/utils/invite";
import { useAppStore } from "~/store/app";
import { CLICK_INSTALL_PWA_MENU } from "~/consts/trackEvent";
import { usePwaStore } from "~/store/pwa";
const { installPwa, isInstallPwa } = usePwaStore();

const { websiteConfig, isMobile } = useAppStore();
const route = useRoute();
const showFollowModel = ref(false);
const followQrCode = ref("");
const followTitle = ref("");
const followDesc = ref("");
const mediaList = [
  {
    // name: "B站",
    img: bilibiliImg,
    qrcode:
      "/CUSTOM_OSS_PATH/2dedb66be4c6439e9298afca5b68de33_bilibili.png",
    link: "https://space.bilibili.com/3546791958022519",
    desc: "魔兽工坊B站账号",
  },
  {
    // name: "公众号",
    img: wechatImg,
    qrcode:
      "/CUSTOM_OSS_PATH/4d2d8c65a5da42e4ac20ad01303cdf1e_wechat-mp-qrcode.jpg",
    // desc: "关注魔兽工坊公众号，获取更多内容",
    desc: "魔兽工坊公众号",
  },
  {
    // name: "视频号",
    img: mediaImg1,
    qrcode:
      "/CUSTOM_OSS_PATH/4643c0adb8ac4941b1cd70b525bbf77b_wechat-video-qrcode.png",
    desc: "魔兽工坊视频号",
  },
  {
    // name: "抖音",
    img: douyinImg,
    qrcode:
      "/CUSTOM_OSS_PATH/359ad167e1354e1181c707086c457de1_douyin.png",
    desc: "魔兽工坊抖音",
  },
];

watchEffect(() => {
  if (route.query.to === "media") {
    nextTick(() => {
      scrollTo("mediaBox");
    });
  }
});

function onClickMediaItem(item: any) {
  // if (item.desc) {
  //   // window.open(item.qrcode);
  //   showFollowModel.value = true;
  //   followTitle.value = item.name;
  //   followQrCode.value = item.qrcode;
  //   followDesc.value = item.desc;
  // }
}

/**
 * 移动到指定元素
 * @param id
 */
function scrollTo(id: string) {
  const target: any = document.getElementById(id);
  const rootDocument = document.getElementById("app");
  const targetPosition =
    target.getBoundingClientRect().top + rootDocument?.scrollTop - 70; // 减去60px
  document.getElementById("app")?.scrollTo({
    top: targetPosition,
    behavior: "smooth", // 平滑滚动
  });
}


function onInstallClick() {
  installPwa();
  recordLog({ event: CLICK_INSTALL_PWA_MENU, params: { from: "home" } });
}
</script>
<style lang="scss" scoped>
.page--home {
  .action-btn {
    border-radius: 10px;
    height: 45px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 16px;
  }
  .action-btn-1 {
    background: linear-gradient(
      187.52deg,
      rgb(253, 174, 143) 15.436%,
      rgb(253, 28, 104) 85.655%
    );
  }

  .media-box {
    height: 66px;
    width: 66px;
    border-radius: 10px;
    background: rgb(252, 79, 79);
    display: flex;
    align-items: center;
    justify-content: center;

    .media-img {
      width: 30px;
      height: 30px;
    }
  }
}
</style>

<style></style>
