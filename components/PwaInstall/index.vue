<template>
  <div class="fixed top-[60px] z-50 flex justify-center w-full">
    <transition name="fade">
      <div v-if="showInstall" class="relative pwa-install-box">
        <icon-close class="close-btn" @click="close()" />
        <div class="card__top">
          <div class="card__top-left">
            <img src="/icons/icon_64x64.png" alt="" class="icon-img" />
          </div>
          <div class="card__top-right">
            <div class="name-wrap">魔兽DPS模拟</div>
            <div class="href-wrap">www.dpswow.com</div>
          </div>
        </div>
        <div class="card__tip">小白都会用的魔兽DPS模拟器</div>
        <div class="card__desc">
          <p>
            此网站具备APP功能特性。在您的设备上安装，以享受更丰富的体验并便于访问。
          </p>
          <div class="action-wrap">
            <button class="install-btn" @click="installPwa()">安装</button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { usePwaInstall } from "./hook";
const props = withDefaults(
  defineProps<{
    showPath?: string;
  }>(),
  {
    showPath: "/gear",
  }
);
const {
  isInstallPwa,
  deferredPrompt,
  showInstall,
  installPwa,
  close,
  showInstallPwa,
  lastPromptDate,
  today,
  checkLastPromptDate,
} = usePwaInstall();

const maxDate = 7;

const route = useRoute();

watch(
  () => route.path,
  (path) => {
    if (
      checkLastPromptDate() >= maxDate &&
      deferredPrompt.value &&
      path === props.showPath
    ) {
      if (
        checkLastPromptDate() >= maxDate &&
        deferredPrompt.value &&
        route.path === props.showPath
      ) {
        setTimeout(() => {
          showInstallPwa();
        }, 1000 * 5);
      }
    }
  }
);

onMounted(() => {
  isInstallPwa.value = true;
  window.addEventListener("beforeinstallprompt", (e: Event) => {
    e.preventDefault();
    deferredPrompt.value = e;
    isInstallPwa.value = false;
    if (
      checkLastPromptDate() >= maxDate &&
      e &&
      route.path === props.showPath
    ) {
      setTimeout(() => {
        showInstallPwa();
      }, 1000 * 5);
    }
  });
});

onBeforeUnmount(() => {
  window.removeEventListener("beforeinstallprompt", (e: Event) => {
    e.preventDefault();
    deferredPrompt.value = e;
  });
});
</script>

<style lang="scss" scoped>
.pwa-install-box {
  background-color: white;
  color: #212121;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);
  width: 400px;

  .close-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
  }

  .card__top {
    display: flex;
    padding: 10px;

    .icon-img {
      width: 64px;
      height: 64px;
      object-fit: cover;
    }

    .card__top-right {
      padding: 0 10px;
      display: flex;
      flex-direction: column;

      .name-wrap {
        font-size: 18px;
        font-weight: bold;
      }

      .href-wrap {
        margin-top: 10px;
        font-size: 14px;
        color: #666;
      }
    }
  }

  .card__tip {
    margin-top: 10px;
    font-size: 14px;
    padding: 0 10px;
  }

  .card__desc {
    border-top: 1px solid #999;
    margin-top: 15px;
    padding: 10px;

    .action-wrap {
      display: flex;
      justify-content: flex-end;
      margin-top: 10px;

      .install-btn {
        background-color: $themeColor;
        color: white;
        padding: 8px 50px;
        border-radius: 4px;
        font-size: 16px;
      }
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: transform 0.2s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  transform: translateY(-100%);
}
</style>
