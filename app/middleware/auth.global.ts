export default defineNuxtRouteMiddleware((to) => {
  const publicPages = ['/auth/sign-in', '/auth/sign-up', '/', '/blogs']

  const isBlogPage = to.path.startsWith('/blogs/blog/')

  const isPublicPage = publicPages.includes(to.path) || isBlogPage

  const { loggedIn } = useUserSession()

  if (!isPublicPage && !loggedIn) {
    return navigateTo('/auth/sign-in')
  }
})