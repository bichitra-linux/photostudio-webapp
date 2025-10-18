<template>
  <div class="min-h-screen">
    <!-- Navigation -->
    <nav class="bg-white shadow-sm fixed w-full z-50">
      <div class="section-container py-4">
        <div class="flex justify-between items-center">
          <NuxtLink to="/" class="text-2xl font-serif font-bold text-premium-black">
            PhotoStudio
          </NuxtLink>
          
          <div class="hidden md:flex space-x-8">
            <NuxtLink to="/" class="text-premium-gray hover:text-premium-gold transition">Home</NuxtLink>
            <NuxtLink to="/gallery" class="text-premium-gray hover:text-premium-gold transition">Gallery</NuxtLink>
            <NuxtLink to="/services" class="text-premium-gray hover:text-premium-gold transition">Services</NuxtLink>
            <NuxtLink to="/booking" class="text-premium-gray hover:text-premium-gold transition">Book Now</NuxtLink>
            <NuxtLink to="/about" class="text-premium-gray hover:text-premium-gold transition">About</NuxtLink>
            <NuxtLink to="/contact" class="text-premium-gray hover:text-premium-gold transition">Contact</NuxtLink>
          </div>
          
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
    
    <!-- Hero Section -->
    <section class="pt-24 min-h-screen flex items-center bg-gradient-to-br from-premium-light-gray to-white">
      <div class="section-container">
        <div class="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 class="text-5xl md:text-6xl font-serif font-bold text-premium-black mb-6">
              Capturing Life's
              <span class="text-premium-gold">Beautiful Moments</span>
            </h1>
            <p class="text-xl text-premium-gray mb-8">
              Professional photography services for weddings, portraits, events, and commercial projects.
            </p>
            <div class="flex flex-wrap gap-4">
              <NuxtLink to="/gallery" class="btn-primary">
                View Gallery
              </NuxtLink>
              <NuxtLink to="/booking" class="btn-secondary">
                Book a Session
              </NuxtLink>
            </div>
          </div>
          
          <div class="relative">
            <div class="bg-premium-gold w-full h-96 rounded-lg shadow-2xl">
              <!-- Placeholder for hero image -->
              <div class="w-full h-full flex items-center justify-center text-white text-2xl">
                Hero Image
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Services Preview -->
    <section class="section-container">
      <div class="text-center mb-12">
        <h2 class="text-4xl font-serif font-bold text-premium-black mb-4">Our Services</h2>
        <p class="text-xl text-premium-gray">Professional photography for every occasion</p>
      </div>
      
      <div class="grid md:grid-cols-3 gap-8">
        <div v-for="service in services" :key="service.title" class="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition">
          <div class="w-16 h-16 bg-premium-gold rounded-full flex items-center justify-center mb-4">
            <span class="text-white text-2xl">{{ service.icon }}</span>
          </div>
          <h3 class="text-2xl font-serif font-bold mb-3">{{ service.title }}</h3>
          <p class="text-premium-gray mb-4">{{ service.description }}</p>
          <p class="text-premium-gold font-bold text-xl">{{ service.price }}</p>
        </div>
      </div>
    </section>
    
    <!-- Gallery Preview -->
    <section class="section-container bg-premium-light-gray">
      <div class="text-center mb-12">
        <h2 class="text-4xl font-serif font-bold text-premium-black mb-4">Recent Work</h2>
        <p class="text-xl text-premium-gray">Explore our latest photography projects</p>
      </div>
      
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div v-for="i in 8" :key="i" class="aspect-square bg-premium-gray rounded-lg overflow-hidden hover:scale-105 transition cursor-pointer">
          <div class="w-full h-full flex items-center justify-center text-white">
            Photo {{ i }}
          </div>
        </div>
      </div>
      
      <div class="text-center mt-12">
        <NuxtLink to="/gallery" class="btn-primary">
          View Full Gallery
        </NuxtLink>
      </div>
    </section>
    
    <!-- Testimonials -->
    <section class="section-container">
      <div class="text-center mb-12">
        <h2 class="text-4xl font-serif font-bold text-premium-black mb-4">What Our Clients Say</h2>
        <p class="text-xl text-premium-gray">Real stories from satisfied customers</p>
      </div>
      
      <div class="grid md:grid-cols-3 gap-8">
        <div v-for="testimonial in testimonials" :key="testimonial.name" class="bg-white p-8 rounded-lg shadow-lg">
          <div class="flex items-center mb-4">
            <div class="w-12 h-12 bg-premium-gold rounded-full flex items-center justify-center text-white font-bold">
              {{ testimonial.name[0] }}
            </div>
            <div class="ml-4">
              <h4 class="font-bold">{{ testimonial.name }}</h4>
              <div class="text-premium-gold">★★★★★</div>
            </div>
          </div>
          <p class="text-premium-gray italic">"{{ testimonial.text }}"</p>
        </div>
      </div>
    </section>
    
    <!-- CTA Section -->
    <section class="section-container bg-premium-black text-white">
      <div class="text-center max-w-3xl mx-auto">
        <h2 class="text-4xl font-serif font-bold mb-6">Ready to Capture Your Moments?</h2>
        <p class="text-xl mb-8">Book your session today and let us create memories that last forever.</p>
        <NuxtLink to="/booking" class="btn-primary inline-block">
          Book Now
        </NuxtLink>
      </div>
    </section>
    
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
              <a href="#" class="text-gray-400 hover:text-premium-gold transition">FB</a>
              <a href="#" class="text-gray-400 hover:text-premium-gold transition">IG</a>
              <a href="#" class="text-gray-400 hover:text-premium-gold transition">TW</a>
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

const services = [
  {
    title: 'Wedding Photography',
    description: 'Capture your special day with stunning wedding photography',
    price: 'From $2,000',
    icon: '💍'
  },
  {
    title: 'Portrait Sessions',
    description: 'Professional portraits for individuals and families',
    price: 'From $250',
    icon: '📸'
  },
  {
    title: 'Commercial Photography',
    description: 'High-quality images for your business needs',
    price: 'From $500',
    icon: '🏢'
  }
]

const testimonials = [
  {
    name: 'Sarah Johnson',
    text: 'Amazing work! The photos from our wedding were absolutely stunning. Highly recommended!'
  },
  {
    name: 'Michael Chen',
    text: 'Professional service and incredible attention to detail. Our family portraits turned out perfect.'
  },
  {
    name: 'Emily Davis',
    text: 'Best photography experience ever! The team was friendly and the results exceeded our expectations.'
  }
]

const handleLogout = async () => {
  try {
    await logout()
    navigateTo('/')
  } catch (error) {
    console.error('Logout error:', error)
  }
}

useHead({
  title: 'Home',
  meta: [
    { name: 'description', content: 'Professional photography services for weddings, portraits, and commercial projects' }
  ]
})
</script>
