export default defineNuxtRouteMiddleware((to) => {
  const session = useUserSession()

  // Allow public pages
  const publicPages = ['/auth/sign-in', '/auth/sign-up', '/']
  if (publicPages.includes(to.path)) return

  // Redirect if not logged in
  if (!session.loggedIn.value) {
    return navigateTo('/auth/sign-in')
  }
})