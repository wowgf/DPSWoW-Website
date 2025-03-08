
export default defineNuxtRouteMiddleware((to, from) => {
  if (to.path === '/') {
    if (getRefreshToken() && from.path === '/') {
      return navigateTo('/home')
    }
  }

  // if (to.path == '/ad') {
  //   const { jumpUrl } = to.query
  //   location.replace(jumpUrl || '/')
  // }

})