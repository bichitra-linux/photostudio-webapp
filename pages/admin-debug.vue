<template>
  <div class="min-h-screen bg-gray-900 text-white p-8">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-4xl font-bold text-yellow-400 mb-8">🔍 Admin Debug Page</h1>
      
      <div class="space-y-6">
        <!-- User Status -->
        <div class="bg-gray-900 p-6 rounded-lg">
          <h2 class="text-2xl font-bold text-gold mb-4">User Status</h2>
          <div v-if="loading" class="text-gray-400">Loading...</div>
          <div v-else-if="!user" class="text-red-500">
            ❌ Not logged in
            <NuxtLink to="/auth/login" class="text-gold underline ml-2">Go to Login</NuxtLink>
          </div>
          <div v-else class="space-y-2">
            <p class="text-green-500">✅ Logged in</p>
            <p><strong>Email:</strong> {{ user.email }}</p>
            <p><strong>UID:</strong> <code class="bg-black px-2 py-1 rounded">{{ user.uid }}</code></p>
          </div>
        </div>

        <!-- Firestore Profile -->
        <div class="bg-gray-900 p-6 rounded-lg">
          <h2 class="text-2xl font-bold text-gold mb-4">Firestore Profile</h2>
          <button 
            @click="checkProfile" 
            :disabled="!user || checkingProfile"
            class="px-4 py-2 bg-gold text-black rounded hover:bg-gold/90 disabled:opacity-50 mb-4"
          >
            {{ checkingProfile ? 'Checking...' : 'Check My Profile' }}
          </button>
          
          <div v-if="profileError" class="bg-red-900/30 border border-red-500 p-4 rounded mb-4">
            <p class="text-red-400">❌ Error: {{ profileError }}</p>
          </div>
          
          <div v-if="profile" class="space-y-2">
            <p class="text-green-500">✅ Profile found in Firestore</p>
            <div class="bg-black p-4 rounded">
              <pre class="text-sm">{{ JSON.stringify(profile, null, 2) }}</pre>
            </div>
            
            <div class="mt-4 space-y-2">
              <p class="font-bold">Admin Check:</p>
              <p v-if="profile.role === 'admin'" class="text-green-500">
                ✅ Role is "admin" - You should have access!
              </p>
              <p v-else class="text-red-500">
                ❌ Role is "{{ profile.role }}" (not "admin")
              </p>
            </div>
          </div>
          
          <div v-else-if="!checkingProfile && user && profileChecked" class="text-red-500">
            ❌ No profile found in Firestore!
            <div class="mt-4 p-4 bg-yellow-900/30 border border-yellow-500 rounded">
              <p class="text-yellow-400">You need to create a user document in Firestore:</p>
              <ol class="list-decimal list-inside mt-2 space-y-1 text-sm">
                <li>Go to Firebase Console → Firestore</li>
                <li>Create collection: <code class="bg-black px-1">users</code></li>
                <li>Create document with ID: <code class="bg-black px-1">{{ user.uid }}</code></li>
                <li>Add field: <code class="bg-black px-1">role</code> = <code class="bg-black px-1">"admin"</code></li>
              </ol>
            </div>
          </div>
        </div>

        <!-- Admin Access Test -->
        <div class="bg-gray-900 p-6 rounded-lg">
          <h2 class="text-2xl font-bold text-gold mb-4">Admin Access Test</h2>
          <div class="space-y-4">
            <p class="text-gray-400">Try accessing the admin panel:</p>
            <NuxtLink 
              to="/admin" 
              class="inline-block px-6 py-3 bg-gold text-black font-bold rounded hover:bg-gold/90"
            >
              Go to Admin Panel
            </NuxtLink>
            <p class="text-sm text-gray-500">
              If you get redirected back here, check the console logs (F12)
            </p>
          </div>
        </div>

        <!-- Quick Fix Guide -->
        <div class="bg-gray-900 p-6 rounded-lg">
          <h2 class="text-2xl font-bold text-gold mb-4">Quick Fix Steps</h2>
          <ol class="list-decimal list-inside space-y-3 text-gray-300">
            <li>
              <strong>Check Firestore:</strong>
              <a href="https://console.firebase.google.com/project/photostudio-4e7db/firestore" 
                 target="_blank" 
                 class="text-gold underline ml-2">
                Open Firebase Console
              </a>
            </li>
            <li>
              <strong>Find your user:</strong> Look in <code class="bg-black px-1">users</code> collection for document ID: 
              <code v-if="user" class="bg-black px-1">{{ user.uid }}</code>
            </li>
            <li>
              <strong>Set role:</strong> Make sure field <code class="bg-black px-1">role</code> = 
              <code class="bg-black px-1">"admin"</code> (lowercase string)
            </li>
            <li>
              <strong>Logout & Login:</strong> 
              <button @click="handleLogout" class="text-gold underline ml-2">Logout Now</button>
            </li>
            <li>
              <strong>Try again:</strong> Login and test admin access
            </li>
          </ol>
        </div>

        <!-- Console Logs -->
        <div class="bg-gray-900 p-6 rounded-lg">
          <h2 class="text-2xl font-bold text-gold mb-4">Console Logs</h2>
          <p class="text-gray-400 mb-2">Open browser console (F12) to see detailed logs</p>
          <button 
            @click="testMiddleware" 
            class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Test Admin Middleware (Check Console)
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { user, loading, logout, getUserProfile } = useFirebaseAuth()

const profile = ref<any>(null)
const profileError = ref('')
const checkingProfile = ref(false)
const profileChecked = ref(false)

const checkProfile = async () => {
  if (!user.value) return
  
  checkingProfile.value = true
  profileError.value = ''
  profile.value = null
  profileChecked.value = false
  
  try {
    console.log('Checking profile for UID:', user.value.uid)
    const userProfile = await getUserProfile(user.value.uid)
    console.log('Profile result:', userProfile)
    profile.value = userProfile
    profileChecked.value = true
  } catch (error: any) {
    console.error('Profile check error:', error)
    profileError.value = error.message || 'Unknown error'
    profileChecked.value = true
  } finally {
    checkingProfile.value = false
  }
}

const testMiddleware = async () => {
  console.log('=== MANUAL MIDDLEWARE TEST ===')
  console.log('User:', user.value)
  console.log('Loading:', loading.value)
  
  if (user.value) {
    try {
      const userProfile = await getUserProfile(user.value.uid)
      console.log('Profile:', userProfile)
      console.log('Role:', userProfile?.role)
      console.log('Is Admin?', userProfile?.role === 'admin')
    } catch (error) {
      console.error('Error:', error)
    }
  }
  console.log('==============================')
}

const handleLogout = async () => {
  try {
    await logout()
    navigateTo('/auth/login')
  } catch (error) {
    console.error('Logout error:', error)
  }
}

// Auto-check profile on mount if user is logged in
onMounted(() => {
  if (user.value) {
    checkProfile()
  }
})

useHead({
  title: 'Admin Debug - Photo Studio',
  meta: [
    { name: 'robots', content: 'noindex, nofollow' }
  ]
})
</script>
