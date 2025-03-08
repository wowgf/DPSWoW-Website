import { defineStore } from 'pinia'
import { ref } from 'vue'
import { CLICK_INSTALL_PWA } from '~/consts/trackEvent';

export const usePwaStore = defineStore('pwa', () => {
  const isInstallPwa = ref<boolean>(false)
  const deferredPrompt = ref<Event | null>(null);
  const showInstall = ref(false);
  const isInPwa = ref(false); // 是否在 PWA 中

  async function installPwa() {
    if (deferredPrompt.value) {
      close();
      recordLog({ event: CLICK_INSTALL_PWA });
      (deferredPrompt.value as any).prompt();
      const { outcome } = await (deferredPrompt.value as any).userChoice;
      if (outcome === "accepted") {
        console.log("用户接受了 PWA 安装");
        deferredPrompt.value = null;
        isInstallPwa.value = true;
      } else {
        console.log("用户拒绝了 PWA 安装");
        // isInstallPwa.value = false;
      }
    }
  }

  // 检测应用是否已经安装
  function checkIfPwaInstalled() {
    // 匹配条件:
    // 1. 是否在独立窗口中运行 (standalone 模式)
    // 2. 是否通过 display-mode: standalone 来显示
    const isInStandaloneMode = () => 
      window.matchMedia('(display-mode: standalone)').matches || 
      (window.navigator as any).standalone || 
      document.referrer.includes('android-app://');

    isInPwa.value = isInStandaloneMode();
    return isInPwa.value;
  }

  function close() {
    showInstall.value = false;
  }


  return {
    isInstallPwa,
    deferredPrompt,
    installPwa,
    showInstall,
    close,
    isInPwa,
    checkIfPwaInstalled
  }
})

