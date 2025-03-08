import openGetInviteCodeModal from "@/components/GetInviteCodeModal/install";
import { useAppStore } from "~/store/app";
export function getInviteCodeModal() {
  const app = storeToRefs(useAppStore());
  if (app.isMobile.value) {
    openGetInviteCodeModal()
  } else {
    window.open(app.websiteConfig.value.common.inviteGetLink, '_blank')
  }
}