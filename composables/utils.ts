import { useClipboard } from "@vueuse/core";
import { useUserStore } from "~/store/user";

export const filterPhone = (phone: any) => {
  return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
}

export const copy = useClipboard({ legacy: true }).copy

export const checkLogin = () => useUserStore().checkLogin()

