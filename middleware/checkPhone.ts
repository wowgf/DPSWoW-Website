import { useLoginStore } from "~/store/login";
import { useUserStore } from "~/store/user"

export default defineNuxtRouteMiddleware(async (to, from) => {
  const { info } = storeToRefs(useUserStore())
  const login = useLoginStore()
  const router = useRouter()
  if (!info.value?.phone) {
    login.open(() => router.push(to.fullPath))

    if (from && from.path != to.path) {
      return navigateTo(from.path)
    } else {
      return navigateTo('/')
    }
  }
})
