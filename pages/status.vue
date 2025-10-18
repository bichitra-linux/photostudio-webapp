<template>
  <div style="padding: 40px; background: #1a1a1a; color: white; min-height: 100vh; font-family: Arial;">
    <h1 style="color: #d4af37; font-size: 36px; margin-bottom: 30px;">🔍 Status Check</h1>
    
    <!-- Auth Status -->
    <div style="background: #2a2a2a; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
      <h2 style="color: #d4af37; font-size: 24px; margin-bottom: 15px;">Authentication Status</h2>
      
      <div v-if="authLoading" style="color: #ffd93d;">
        ⏳ Loading authentication...
      </div>
      
      <div v-else-if="!currentUser" style="color: #ff6b6b; background: #3a1f1f; padding: 15px; border-radius: 4px;">
        <strong>❌ YOU ARE NOT LOGGED IN</strong>
        <br><br>
        This is why you can't access /admin!
        <br><br>
        <a href="/auth/login" style="display: inline-block; background: #d4af37; color: black; padding: 10px 20px; text-decoration: none; border-radius: 4px; font-weight: bold; margin-top: 10px;">
          Go to Login Page →
        </a>
      </div>
      
      <div v-else style="color: #51cf66; background: #1f3a1f; padding: 15px; border-radius: 4px;">
        <strong>✅ YOU ARE LOGGED IN</strong>
        <br><br>
        <strong>Email:</strong> {{ currentUser.email }}<br>
        <strong>User ID:</strong> <code style="background: black; padding: 2px 6px; border-radius: 3px;">{{ currentUser.uid }}</code>
      </div>
    </div>

    <!-- Profile Check (only if logged in) -->
    <div v-if="currentUser && !authLoading" style="background: #2a2a2a; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
      <h2 style="color: #d4af37; font-size: 24px; margin-bottom: 15px;">Firestore Profile Check</h2>
      
      <button 
        @click="checkProfile" 
        :disabled="checking"
        style="background: #d4af37; color: black; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer; font-size: 16px; font-weight: bold;"
      >
        {{ checking ? '⏳ Checking...' : '🔍 Check My Profile' }}
      </button>

      <div v-if="profileError" style="margin-top: 15px; color: #ff6b6b; background: #3a1f1f; padding: 15px; border-radius: 4px;">
        <strong>❌ ERROR:</strong><br>
        {{ profileError }}
      </div>

      <div v-if="profileData" style="margin-top: 15px;">
        <div style="background: #1f3a1f; padding: 15px; border-radius: 4px; color: #51cf66; margin-bottom: 15px;">
          <strong>✅ Profile Found!</strong>
        </div>
        
        <div style="background: black; padding: 15px; border-radius: 4px; font-family: monospace; font-size: 14px; overflow: auto;">
          <pre style="margin: 0;">{{ JSON.stringify(profileData, null, 2) }}</pre>
        </div>

        <div style="margin-top: 15px; padding: 15px; border-radius: 4px;" :style="isAdminRole ? 'background: #1f3a1f; color: #51cf66;' : 'background: #3a1f1f; color: #ff6b6b;'">
          <strong v-if="isAdminRole">
            ✅ Your role is "admin"
            <br><br>
            If /admin still redirects, check browser console (F12) for middleware logs
          </strong>
          <strong v-else>
            ❌ Your role is "{{ profileData.role || 'not set' }}"
            <br><br>
            You need to change it to "admin" in Firebase Console
          </strong>
        </div>
      </div>

      <div v-if="noProfile" style="margin-top: 15px; background: #3a1f1f; padding: 15px; border-radius: 4px; color: #ff6b6b;">
        <strong>❌ NO PROFILE DOCUMENT FOUND!</strong>
        <br><br>
        <p>Your user exists in Firebase Auth, but there's NO document in Firestore.</p>
        <br>
        <strong>Fix this now:</strong>
        <ol style="margin-left: 20px; margin-top: 10px; line-height: 1.8;">
          <li>Open <a href="https://console.firebase.google.com/project/photostudio-4e7db/firestore" target="_blank" style="color: #d4af37; text-decoration: underline;">Firebase Console</a></li>
          <li>Go to Firestore Database</li>
          <li>Create or open collection: <code style="background: black; padding: 2px 6px;">users</code></li>
          <li>Add document with ID: <code style="background: black; padding: 2px 6px;">{{ currentUser.uid }}</code></li>
          <li>Add field: <code style="background: black; padding: 2px 6px;">role</code> (string) = <code style="background: black; padding: 2px 6px;">"admin"</code></li>
          <li>Add field: <code style="background: black; padding: 2px 6px;">email</code> (string) = <code style="background: black; padding: 2px 6px;">{{ currentUser.email }}</code></li>
          <li>Save and come back here</li>
        </ol>
      </div>
    </div>

    <!-- Instructions -->
    <div style="background: #2a2a2a; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
      <h2 style="color: #d4af37; font-size: 24px; margin-bottom: 15px;">What to Do</h2>
      
      <div style="line-height: 1.8; color: #ccc;">
        <strong style="color: white;">Step 1:</strong> Make sure you're logged in (see above)<br>
        <strong style="color: white;">Step 2:</strong> Click "Check My Profile" button<br>
        <strong style="color: white;">Step 3:</strong> Make sure your role is "admin" in Firestore<br>
        <strong style="color: white;">Step 4:</strong> <button @click="handleLogout" style="background: #666; color: white; padding: 5px 10px; border: none; border-radius: 3px; cursor: pointer;">Logout</button> and login again<br>
        <strong style="color: white;">Step 5:</strong> Try accessing <a href="/admin" style="color: #d4af37;">/admin</a> again
      </div>
    </div>

    <!-- Debug Console -->
    <div style="background: #2a2a2a; padding: 20px; border-radius: 8px;">
      <h2 style="color: #d4af37; font-size: 24px; margin-bottom: 15px;">Debug Console</h2>
      <p style="color: #999; margin-bottom: 10px;">Press F12 and look at Console tab for detailed logs</p>
      <button 
        @click="printDebug"
        style="background: #4a90e2; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer; font-size: 16px;"
      >
        Print Debug Info to Console
      </button>
    </div>
  </div>
</template>

<script setup>
const { user: currentUser, loading: authLoading, logout, getUserProfile } = useFirebaseAuth()

const profileData = ref(null)
const profileError = ref('')
const checking = ref(false)
const noProfile = ref(false)

const isAdminRole = computed(() => {
  return profileData.value && profileData.value.role === 'admin'
})

const checkProfile = async () => {
  if (!currentUser.value) return
  
  checking.value = true
  profileError.value = ''
  profileData.value = null
  noProfile.value = false
  
  console.log('=== CHECKING FIRESTORE PROFILE ===')
  console.log('User UID:', currentUser.value.uid)
  console.log('User Email:', currentUser.value.email)
  
  try {
    const result = await getUserProfile(currentUser.value.uid)
    console.log('Profile result:', result)
    
    if (result) {
      profileData.value = result
      console.log('✅ Profile found!')
      console.log('Role:', result.role)
    } else {
      noProfile.value = true
      console.log('❌ No profile document found!')
    }
  } catch (err) {
    console.error('❌ Error fetching profile:', err)
    profileError.value = err.message || 'Unknown error'
  } finally {
    checking.value = false
    console.log('==================================')
  }
}

const printDebug = () => {
  console.log('=== DEBUG INFO ===')
  console.log('Logged in?', !!currentUser.value)
  console.log('Loading?', authLoading.value)
  console.log('User:', currentUser.value)
  console.log('Profile:', profileData.value)
  console.log('==================')
}

const handleLogout = async () => {
  try {
    await logout()
    alert('Logged out! Now login again and check.')
  } catch (err) {
    console.error('Logout error:', err)
  }
}

useHead({
  title: 'Status Check - Photo Studio'
})
</script>
