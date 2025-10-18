<template>
  <div style="padding: 40px; background: white; min-height: 100vh;">
    <h1 style="font-size: 48px; color: #d4af37; margin-bottom: 20px;">🧪 Test Page Works!</h1>
    
    <div style="background: #f0f0f0; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
      <h2 style="font-size: 24px; margin-bottom: 10px;">Route Info:</h2>
      <p><strong>Current Route:</strong> {{ route.path }}</p>
      <p><strong>Current Route Name:</strong> {{ route.name }}</p>
    </div>
    
    <div style="background: #e8f4f8; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
      <h2 style="font-size: 24px; margin-bottom: 10px;">Auth Status:</h2>
      <p><strong>Loading:</strong> {{ loading }}</p>
      <p><strong>User:</strong> {{ user ? user.email : 'Not logged in' }}</p>
      <p><strong>User UID:</strong> {{ user?.uid || 'N/A' }}</p>
    </div>
    
    <div style="margin-top: 30px;">
      <h2 style="font-size: 24px; margin-bottom: 15px;">Navigation Test:</h2>
      <div style="display: flex; gap: 10px; flex-wrap: wrap;">
        <NuxtLink to="/" style="padding: 10px 20px; background: #1a1a1a; color: white; text-decoration: none; border-radius: 4px;">Home</NuxtLink>
        <NuxtLink to="/test-route" style="padding: 10px 20px; background: #1a1a1a; color: white; text-decoration: none; border-radius: 4px;">This Test Page</NuxtLink>
        <NuxtLink to="/gallery" style="padding: 10px 20px; background: #1a1a1a; color: white; text-decoration: none; border-radius: 4px;">Gallery</NuxtLink>
        <NuxtLink to="/status" style="padding: 10px 20px; background: #1a1a1a; color: white; text-decoration: none; border-radius: 4px;">Status</NuxtLink>
        <NuxtLink to="/admin" style="padding: 10px 20px; background: #1a1a1a; color: white; text-decoration: none; border-radius: 4px;">Admin</NuxtLink>
      </div>
    </div>
    
    <div style="margin-top: 30px; background: #fff3cd; padding: 20px; border-radius: 8px;">
      <h2 style="font-size: 24px; margin-bottom: 10px;">✅ If you see this page:</h2>
      <p style="font-size: 18px;">Routing IS working! The problem might be with specific pages.</p>
      <p style="font-size: 18px; margin-top: 10px;">Try clicking the links above to test navigation.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const { user, loading } = useFirebaseAuth()
const route = useRoute()

useHead({
  title: 'Test Route'
})
</script>
