import { useLoginStore } from "~/store/login";
import { useUserStore } from "~/store/user"

export default defineNuxtRouteMiddleware(async (to, from) => {
  const { checkLogin } = useUserStore()
  const login = useLoginStore()
  const router = useRouter()
  if (!checkLogin()) {
    login.open(() => router.push(to.fullPath))
    if (from && from.path != to.path) {
      return navigateTo(from.path)
    } else {
      return navigateTo('/')
    }
  }
})
