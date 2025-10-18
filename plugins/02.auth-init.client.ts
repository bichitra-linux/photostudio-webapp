export default defineNuxtPlugin(() => {
  // Auto-initialize Firebase Auth on app start (client-side only)
  // This plugin runs AFTER 01.firebase.client.ts due to alphabetical ordering
  if (process.client) {
    try {
      const { initAuth } = useFirebaseAuth()
      initAuth()
    } catch (error) {
      console.error('❌ Auth Init Error:', error)
    }
  }
})
