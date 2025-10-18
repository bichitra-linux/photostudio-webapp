<template>
  <div class="min-h-screen bg-gradient-to-br from-premium-light-gray to-white flex items-center justify-center p-4">
    <div class="bg-white rounded-lg shadow-2xl p-8 md:p-12 max-w-md w-full">
      <div class="text-center mb-8">
        <NuxtLink to="/" class="text-3xl font-serif font-bold text-premium-black">
          PhotoStudio
        </NuxtLink>
        <p class="text-premium-gray mt-2">{{ isLogin ? 'Welcome back!' : 'Create your account' }}</p>
      </div>
      
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div v-if="!isLogin">
          <label class="block text-sm font-semibold text-premium-black mb-2">Full Name</label>
          <input
            v-model="formData.displayName"
            type="text"
            required
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-premium-gold focus:border-transparent"
            placeholder="John Doe"
          />
        </div>
        
        <div>
          <label class="block text-sm font-semibold text-premium-black mb-2">Email</label>
          <input
            v-model="formData.email"
            type="email"
            required
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-premium-gold focus:border-transparent"
            placeholder="john@example.com"
          />
        </div>
        
        <div>
          <label class="block text-sm font-semibold text-premium-black mb-2">Password</label>
          <input
            v-model="formData.password"
            type="password"
            required
            minlength="6"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-premium-gold focus:border-transparent"
            placeholder="••••••••"
          />
        </div>
        
        <div v-if="errorMessage" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg text-sm">
          {{ errorMessage }}
        </div>
        
        <button
          type="submit"
          :disabled="loading"
          class="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ loading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Sign Up') }}
        </button>
      </form>
      
      <div class="mt-6 text-center">
        <button
          @click="isLogin = !isLogin"
          class="text-premium-gold hover:underline"
        >
          {{ isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in' }}
        </button>
      </div>
      
      <div class="mt-6 text-center">
        <NuxtLink to="/" class="text-premium-gray hover:text-premium-gold transition">
          ← Back to Home
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { signIn, signUp } = useFirebaseAuth()

const isLogin = ref(true)
const loading = ref(false)
const errorMessage = ref('')

const formData = reactive({
  email: '',
  password: '',
  displayName: ''
})

const handleSubmit = async () => {
  loading.value = true
  errorMessage.value = ''
  
  try {
    if (isLogin.value) {
      await signIn(formData.email, formData.password)
    } else {
      await signUp(formData.email, formData.password, formData.displayName)
    }
    
    // Redirect to home or previous page
    navigateTo('/')
  } catch (error: any) {
    console.error('Auth error:', error)
    errorMessage.value = error.message || 'An error occurred. Please try again.'
  } finally {
    loading.value = false
  }
}

useHead({
  title: 'Login',
  meta: [
    { name: 'robots', content: 'noindex, nofollow' }
  ]
})
</script>
