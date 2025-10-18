export default defineNuxtRouteMiddleware(async (to, from) => {
  // Skip middleware on server-side rendering
  if (process.server) {
    return
  }
  
  const { user, loading, getUserProfile } = useFirebaseAuth()
  
  console.log('=== ADMIN MIDDLEWARE DEBUG ===')
  console.log('1. Loading:', loading.value)
  console.log('2. User:', user.value)
  
  // Wait for auth to initialize
  if (loading.value) {
    console.log('Still loading, waiting...')
    return
  }
  
  // Redirect to login if not authenticated
  if (!user.value) {
    console.log('No user found, redirecting to login')
    return navigateTo('/auth/login')
  }
  
  console.log('3. User UID:', user.value.uid)
  
  // Check if user is admin
  try {
    const profile = await getUserProfile(user.value.uid)
    console.log('4. User Profile:', profile)
    console.log('5. Role:', profile?.role)
    console.log('6. Is Admin?', profile?.role === 'admin')
    
    if (!profile) {
      console.log('❌ No profile found in Firestore!')
      return navigateTo('/')
    }
    
    if (profile.role !== 'admin') {
      console.log('❌ Access denied: User role is', profile.role, 'not admin')
      return navigateTo('/')
    }
    
    console.log('✅ Admin access granted!')
    console.log('==============================')
  } catch (error) {
    console.error('❌ Error checking admin status:', error)
    return navigateTo('/')
  }
})
