<template>
  <MainLayout>
    <!-- Hero Section -->
    <section class="pt-32 pb-16 bg-gradient-to-br from-premium-light-gray to-white">
      <div class="container mx-auto px-6 text-center">
        <h1 class="text-5xl font-serif font-bold text-premium-black mb-4">Our Services</h1>
        <p class="text-xl text-gray-600">Professional photography for every occasion</p>
      </div>
    </section>

    <!-- Services Grid -->
    <section class="container mx-auto px-6 py-16 bg-gray-50">
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- Wedding Photography -->
        <div class="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl hover:transform hover:scale-105 transition-all duration-300">
          <div class="h-64 bg-gradient-to-br from-premium-gold/20 to-premium-light-gray"></div>
          <div class="p-6">
            <h3 class="text-2xl font-serif font-bold text-premium-gold mb-3">Wedding Photography</h3>
            <p class="text-gray-600 mb-4">
              Capture your special day with elegance and style. Full-day coverage with professional editing.
            </p>
            <ul class="text-gray-500 space-y-2 mb-6">
              <li>✓ 8-12 hours coverage</li>
              <li>✓ 500+ edited photos</li>
              <li>✓ Online gallery</li>
              <li>✓ Print rights included</li>
            </ul>
            <NuxtLink to="/booking" class="inline-block px-6 py-3 bg-premium-gold text-white font-semibold rounded-lg hover:bg-premium-gold/90 transition-colors shadow-sm">
              Book Now
            </NuxtLink>
          </div>
        </div>

        <!-- Portrait Sessions -->
        <div class="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl hover:transform hover:scale-105 transition-all duration-300">
          <div class="h-64 bg-gradient-to-br from-premium-gold/20 to-premium-light-gray"></div>
          <div class="p-6">
            <h3 class="text-2xl font-serif font-bold text-premium-gold mb-3">Portrait Sessions</h3>
            <p class="text-gray-600 mb-4">
              Professional headshots, family portraits, and personal branding photography.
            </p>
            <ul class="text-gray-500 space-y-2 mb-6">
              <li>✓ 1-2 hours session</li>
              <li>✓ 30+ edited photos</li>
              <li>✓ Multiple outfits</li>
              <li>✓ Studio or outdoor</li>
            </ul>
            <NuxtLink to="/booking" class="inline-block px-6 py-3 bg-premium-gold text-white font-semibold rounded-lg hover:bg-premium-gold/90 transition-colors shadow-sm">
              Book Now
            </NuxtLink>
          </div>
        </div>

        <!-- Commercial Photography -->
        <div class="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl hover:transform hover:scale-105 transition-all duration-300">
          <div class="h-64 bg-gradient-to-br from-premium-gold/20 to-premium-light-gray"></div>
          <div class="p-6">
            <h3 class="text-2xl font-serif font-bold text-premium-gold mb-3">Commercial Photography</h3>
            <p class="text-gray-600 mb-4">
              Product photography, corporate events, and brand marketing imagery.
            </p>
            <ul class="text-gray-500 space-y-2 mb-6">
              <li>✓ Custom packages</li>
              <li>✓ Commercial licensing</li>
              <li>✓ Fast turnaround</li>
              <li>✓ On-location shoots</li>
            </ul>
            <NuxtLink to="/booking" class="inline-block px-6 py-3 bg-premium-gold text-white font-semibold rounded-lg hover:bg-premium-gold/90 transition-colors shadow-sm">
              Book Now
            </NuxtLink>
          </div>
        </div>

        <!-- Event Photography -->
        <div class="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl hover:transform hover:scale-105 transition-all duration-300">
          <div class="h-64 bg-gradient-to-br from-premium-gold/20 to-premium-light-gray"></div>
          <div class="p-6">
            <h3 class="text-2xl font-serif font-bold text-premium-gold mb-3">Event Photography</h3>
            <p class="text-gray-600 mb-4">
              Corporate events, parties, conferences, and special celebrations.
            </p>
            <ul class="text-gray-500 space-y-2 mb-6">
              <li>✓ 4-8 hours coverage</li>
              <li>✓ 200+ edited photos</li>
              <li>✓ Same-day highlights</li>
              <li>✓ Event albums</li>
            </ul>
            <NuxtLink to="/booking" class="inline-block px-6 py-3 bg-premium-gold text-white font-semibold rounded-lg hover:bg-premium-gold/90 transition-colors shadow-sm">
              Book Now
            </NuxtLink>
          </div>
        </div>

        <!-- Real Estate Photography -->
        <div class="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl hover:transform hover:scale-105 transition-all duration-300">
          <div class="h-64 bg-gradient-to-br from-premium-gold/20 to-premium-light-gray"></div>
          <div class="p-6">
            <h3 class="text-2xl font-serif font-bold text-premium-gold mb-3">Real Estate Photography</h3>
            <p class="text-gray-600 mb-4">
              Professional property photography for listings and marketing materials.
            </p>
            <ul class="text-gray-500 space-y-2 mb-6">
              <li>✓ HDR photography</li>
              <li>✓ Drone shots available</li>
              <li>✓ Virtual tours</li>
              <li>✓ 24-hour delivery</li>
            </ul>
            <NuxtLink to="/booking" class="inline-block px-6 py-3 bg-premium-gold text-white font-semibold rounded-lg hover:bg-premium-gold/90 transition-colors shadow-sm">
              Book Now
            </NuxtLink>
          </div>
        </div>

        <!-- Custom Packages -->
        <div class="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl hover:transform hover:scale-105 transition-all duration-300">
          <div class="h-64 bg-gradient-to-br from-premium-gold/20 to-premium-light-gray"></div>
          <div class="p-6">
            <h3 class="text-2xl font-serif font-bold text-premium-gold mb-3">Custom Packages</h3>
            <p class="text-gray-600 mb-4">
              Need something specific? We'll create a custom package tailored to your needs.
            </p>
            <ul class="text-gray-500 space-y-2 mb-6">
              <li>✓ Flexible scheduling</li>
              <li>✓ Custom deliverables</li>
              <li>✓ Multiple locations</li>
              <li>✓ Competitive pricing</li>
            </ul>
            <NuxtLink to="/contact" class="inline-block px-6 py-3 bg-premium-gold text-white font-semibold rounded-lg hover:bg-premium-gold/90 transition-colors shadow-sm">
              Contact Us
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="bg-gradient-to-br from-premium-gold/10 to-premium-light-gray py-16">
      <div class="container mx-auto px-6 text-center">
        <h2 class="text-3xl font-serif font-bold text-premium-gold mb-4">Ready to Book Your Session?</h2>
        <p class="text-xl text-gray-600 mb-8">Let's create something amazing together</p>
        <NuxtLink to="/booking" class="inline-block px-8 py-4 bg-premium-gold text-white font-bold text-lg rounded-lg hover:bg-premium-gold/90 transition-colors shadow-lg">
          Schedule Your Shoot
        </NuxtLink>
      </div>
    </section>
  </MainLayout>
</template>

<script setup lang="ts">
useHead({
  title: 'Our Services - Premium Photography Services',
  meta: [
    { name: 'description', content: 'Professional photography services including weddings, portraits, commercial, events, and more.' }
  ]
})
</script>
