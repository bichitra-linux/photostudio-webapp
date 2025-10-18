<template>
  <div>
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
// Auth is initialized in the plugin (02.auth-init.client.ts)

// SEO
useHead({
  titleTemplate: '%s | Premium Photo Studio',
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'description', content: 'Professional photography services for all occasions' }
  ],
  link: [
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@400;600;700&display=swap' }
  ]
})
</script>
