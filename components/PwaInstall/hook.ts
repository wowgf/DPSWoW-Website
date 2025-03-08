import { usePwaStore } from "~/store/pwa";
import dayjs from "dayjs";

export function usePwaInstall() {
  const { isInstallPwa, deferredPrompt, showInstall } = storeToRefs(usePwaStore())
  const { installPwa, close } = usePwaStore()
  const LOCAL_KEY = "lastInstallPwaPromptDate";
  let lastPromptDate = localStorage.getItem(LOCAL_KEY);
  const today = new Date().toISOString().split("T")[0];


  function showInstallPwa() {
    showInstall.value = true;
    lastPromptDate = today;
    localStorage.setItem(LOCAL_KEY, lastPromptDate);
  }

  // 检查最后一次弹窗时间距离今天的天数
  function checkLastPromptDate() {
    if (lastPromptDate) {
      const lastPrompt = dayjs(lastPromptDate);
      const today = dayjs(new Date().toISOString().split("T")[0]);
      return today.diff(lastPrompt, "day");
    }
    return 0;
  }

  return {
    isInstallPwa,
    deferredPrompt,
    showInstall,
    lastPromptDate,
    today,
    installPwa,
    close,
    showInstallPwa,
    checkLastPromptDate
  }

}