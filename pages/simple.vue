<template>
  <div style="background: lime; color: black; padding: 100px; text-align: center; font-size: 48px; min-height: 100vh;">
    <h1>🟢 SIMPLE TEST PAGE</h1>
    <p style="font-size: 24px; margin-top: 20px;">If you see this GREEN page, routing works!</p>
    <p style="font-size: 18px; margin-top: 20px;">Current path: {{ route.path }}</p>
    <button @click="goHome" style="margin-top: 30px; padding: 20px 40px; font-size: 24px; cursor: pointer;">Go Home</button>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const router = useRouter()

console.log('🟢 SIMPLE page loaded! Path:', route.path)

const goHome = () => {
  console.log('🟢 Navigating to home')
  router.push('/')
}
</script>
