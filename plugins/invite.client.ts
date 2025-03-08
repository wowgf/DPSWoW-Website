import { useUserStore } from "~/store/user";

export default defineNuxtPlugin(async (_nuxtApp) => {
  const route = useRoute()
  const userStore = useUserStore()

  if (route.query.invite) {
    userStore.setFriendInviteCode(route.query.invite)
  }
});
