<template>
  <div style="padding: 40px; background: #1a1a1a; color: white; min-height: 100vh;">
    <h1 style="color: #d4af37; font-size: 36px; margin-bottom: 30px;">🔍 Simple Admin Test</h1>
    
    <div style="background: #2a2a2a; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
      <h2 style="color: #d4af37; font-size: 24px; margin-bottom: 15px;">1. Are You Logged In?</h2>
      <div v-if="!user" style="color: #ff6b6b;">
        ❌ NOT LOGGED IN
        <br><br>
        <a href="/auth/login" style="color: #d4af37; text-decoration: underline;">Click here to login</a>
      </div>
      <div v-else style="color: #51cf66;">
        ✅ LOGGED IN
        <br><br>
        <strong>Email:</strong> {{ user.email }}<br>
        <strong>User ID:</strong> {{ user.uid }}
      </div>
    </div>

    <div v-if="user" style="background: #2a2a2a; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
      <h2 style="color: #d4af37; font-size: 24px; margin-bottom: 15px;">2. Check Your Firestore Profile</h2>
      
      <button 
        @click="checkNow" 
        style="background: #d4af37; color: black; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer; font-size: 16px;"
      >
        Check Profile Now
      </button>

      <div v-if="checking" style="margin-top: 15px; color: #ffd93d;">
        ⏳ Checking...
      </div>

      <div v-if="error" style="margin-top: 15px; color: #ff6b6b; background: #3a1f1f; padding: 15px; border-radius: 4px;">
        <strong>❌ ERROR:</strong><br>
        {{ error }}
      </div>

      <div v-if="profile" style="margin-top: 15px;">
        <div style="background: #1f3a1f; padding: 15px; border-radius: 4px; color: #51cf66; margin-bottom: 15px;">
          ✅ Profile Found!
        </div>
        
        <div style="background: black; padding: 15px; border-radius: 4px; font-family: monospace; font-size: 14px; overflow: auto;">
          {{ JSON.stringify(profile, null, 2) }}
        </div>

        <div style="margin-top: 15px; padding: 15px; border-radius: 4px;" :style="profile.role === 'admin' ? 'background: #1f3a1f; color: #51cf66;' : 'background: #3a1f1f; color: #ff6b6b;'">
          <strong v-if="profile.role === 'admin'">✅ Your role is "admin" - Access should work!</strong>
          <strong v-else>❌ Your role is "{{ profile.role }}" - Change it to "admin" in Firebase Console!</strong>
        </div>
      </div>

      <div v-if="noProfile" style="margin-top: 15px; background: #3a1f1f; padding: 15px; border-radius: 4px; color: #ff6b6b;">
        <strong>❌ NO PROFILE FOUND IN FIRESTORE!</strong>
        <br><br>
        You need to create a document in Firestore:
        <ul style="margin-top: 10px; margin-left: 20px;">
          <li>Collection: <code>users</code></li>
          <li>Document ID: <code>{{ user.uid }}</code></li>
          <li>Field: <code>role</code> = <code>"admin"</code></li>
        </ul>
        <br>
        <a href="https://console.firebase.google.com/project/photostudio-4e7db/firestore" target="_blank" style="color: #d4af37; text-decoration: underline;">
          Open Firebase Console →
        </a>
      </div>
    </div>

    <div v-if="user && profile && profile.role === 'admin'" style="background: #2a2a2a; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
      <h2 style="color: #d4af37; font-size: 24px; margin-bottom: 15px;">3. Test Admin Access</h2>
      <a href="/admin" style="display: inline-block; background: #d4af37; color: black; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold;">
        Go to Admin Panel →
      </a>
      <p style="margin-top: 10px; color: #999; font-size: 14px;">
        If you get redirected, check browser console (F12) for error messages
      </p>
    </div>

    <div style="background: #2a2a2a; padding: 20px; border-radius: 8px;">
      <h2 style="color: #d4af37; font-size: 24px; margin-bottom: 15px;">4. Quick Links</h2>
      <ul style="line-height: 2;">
        <li><a href="/auth/login" style="color: #d4af37;">Login Page</a></li>
        <li><a href="https://console.firebase.google.com/project/photostudio-4e7db/firestore" target="_blank" style="color: #d4af37;">Firebase Console</a></li>
        <li><a href="/" style="color: #d4af37;">Homepage</a></li>
      </ul>
    </div>
  </div>
</template>

<script setup>
const { user, getUserProfile } = useFirebaseAuth()

const profile = ref(null)
const error = ref('')
const checking = ref(false)
const noProfile = ref(false)

const checkNow = async () => {
  if (!user.value) return
  
  checking.value = true
  error.value = ''
  profile.value = null
  noProfile.value = false
  
  console.log('=== CHECKING PROFILE ===')
  console.log('User UID:', user.value.uid)
  
  try {
    const result = await getUserProfile(user.value.uid)
    console.log('Profile result:', result)
    
    if (result) {
      profile.value = result
      console.log('✅ Profile found!')
    } else {
      noProfile.value = true
      console.log('❌ No profile found!')
    }
  } catch (err) {
    console.error('Error:', err)
    error.value = err.message || 'Unknown error'
  } finally {
    checking.value = false
  }
}
</script>
