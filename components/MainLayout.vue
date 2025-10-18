<template>
  <div class="min-h-screen flex flex-col">
    <!-- Navigation -->
    <nav class="bg-white shadow-sm fixed w-full z-50">
      <div class="section-container py-4">
        <div class="flex justify-between items-center">
          <NuxtLink to="/" class="text-2xl font-serif font-bold text-premium-black">
            PhotoStudio
          </NuxtLink>
          
          <!-- Desktop Navigation -->
          <div class="hidden md:flex space-x-8">
            <NuxtLink to="/" class="text-premium-gray hover:text-premium-gold transition">Home</NuxtLink>
            <NuxtLink to="/gallery" class="text-premium-gray hover:text-premium-gold transition">Gallery</NuxtLink>
            <NuxtLink to="/services" class="text-premium-gray hover:text-premium-gold transition">Services</NuxtLink>
            <NuxtLink to="/booking" class="text-premium-gray hover:text-premium-gold transition">Book Now</NuxtLink>
            <NuxtLink to="/about" class="text-premium-gray hover:text-premium-gold transition">About</NuxtLink>
            <NuxtLink to="/contact" class="text-premium-gray hover:text-premium-gold transition">Contact</NuxtLink>
          </div>
          
          <!-- Auth Buttons -->
          <div class="flex items-center space-x-4">
            <ClientOnly>
              <template v-if="user">
                <NuxtLink to="/admin" v-if="isAdminUser" class="text-premium-gray hover:text-premium-gold transition">
                  Admin
                </NuxtLink>
                <button @click="handleLogout" class="text-premium-gray hover:text-premium-gold transition">
                  Logout
                </button>
              </template>
              <NuxtLink v-else to="/auth/login" class="btn-primary">
                Login
              </NuxtLink>
            </ClientOnly>
          </div>
        </div>
      </div>
    </nav>
    
    <!-- Page Content -->
    <main class="flex-1">
      <slot />
    </main>
    
    <!-- Footer -->
    <footer class="bg-premium-black text-white py-12">
      <div class="section-container">
        <div class="grid md:grid-cols-4 gap-8">
          <div>
            <h3 class="text-2xl font-serif font-bold mb-4">PhotoStudio</h3>
            <p class="text-gray-400">Professional photography services</p>
          </div>
          
          <div>
            <h4 class="font-bold mb-4">Quick Links</h4>
            <ul class="space-y-2">
              <li><NuxtLink to="/gallery" class="text-gray-400 hover:text-premium-gold transition">Gallery</NuxtLink></li>
              <li><NuxtLink to="/services" class="text-gray-400 hover:text-premium-gold transition">Services</NuxtLink></li>
              <li><NuxtLink to="/booking" class="text-gray-400 hover:text-premium-gold transition">Booking</NuxtLink></li>
              <li><NuxtLink to="/about" class="text-gray-400 hover:text-premium-gold transition">About</NuxtLink></li>
              <li><NuxtLink to="/contact" class="text-gray-400 hover:text-premium-gold transition">Contact</NuxtLink></li>
            </ul>
          </div>
          
          <div>
            <h4 class="font-bold mb-4">Contact</h4>
            <ul class="space-y-2 text-gray-400">
              <li>Email: info@photostudio.com</li>
              <li>Phone: +1 234 567 8900</li>
              <li>Address: 123 Photo St, City</li>
            </ul>
          </div>
          
          <div>
            <h4 class="font-bold mb-4">Follow Us</h4>
            <div class="flex space-x-4">
              <a href="#" class="text-gray-400 hover:text-premium-gold transition text-2xl">📘</a>
              <a href="#" class="text-gray-400 hover:text-premium-gold transition text-2xl">📷</a>
              <a href="#" class="text-gray-400 hover:text-premium-gold transition text-2xl">🐦</a>
            </div>
          </div>
        </div>
        
        <div class="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 PhotoStudio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
const { user, logout } = useFirebaseAuth()
const isAdminUser = ref(false)

// Check if user is admin
watch(user, async (newUser) => {
  if (newUser) {
    const { isAdmin } = useFirebaseAuth()
    isAdminUser.value = await isAdmin()
  } else {
    isAdminUser.value = false
  }
}, { immediate: true })

const handleLogout = async () => {
  try {
    await logout()
    navigateTo('/')
  } catch (error) {
    console.error('Logout error:', error)
  }
}
</script>
