export default defineNuxtRouteMiddleware((to, from) => {
  // Skip middleware on server-side rendering
  if (process.server) {
    return
  }
  
  const { user, loading } = useFirebaseAuth()
  
  // Wait for auth to initialize
  if (loading.value) {
    return
  }
  
  // Redirect to login if not authenticated
  if (!user.value) {
    return navigateTo('/auth/login')
  }
})
