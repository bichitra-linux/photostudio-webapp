<template>
  <MainLayout>
    <!-- Hero Section -->
    <section class="pt-32 pb-16 bg-gradient-to-br from-premium-light-gray to-white">
      <div class="container mx-auto px-6 text-center">
        <h1 class="text-5xl font-serif font-bold text-premium-black mb-4">About Us</h1>
        <p class="text-xl text-gray-600">Capturing moments, creating memories</p>
      </div>
    </section>

    <!-- Story Section -->
    <section class="bg-white py-16">
      <div class="container mx-auto px-6">
        <div class="max-w-4xl mx-auto">
          <h2 class="text-3xl font-serif font-bold text-premium-gold mb-6">Our Story</h2>
          <div class="space-y-4 text-gray-600 text-lg leading-relaxed">
            <p>
              Welcome to our premium photography studio, where passion meets professionalism. With over a decade of experience
              in the industry, we've dedicated ourselves to capturing life's most precious moments with artistry and excellence.
            </p>
            <p>
              What started as a passion project has evolved into a full-service photography studio, trusted by hundreds of
              clients for weddings, portraits, corporate events, and commercial photography. Our commitment to quality and
              attention to detail has made us one of the most sought-after studios in the region.
            </p>
            <p>
              We believe that every photograph tells a story, and we're honored to help you tell yours. Whether it's your
              wedding day, a family milestone, or a brand campaign, we approach every project with the same level of
              dedication and creativity.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Team Section -->
    <section class="bg-gray-50 py-16">
      <div class="container mx-auto px-6">
        <h2 class="text-3xl font-serif font-bold text-premium-gold mb-12 text-center">Meet Our Team</h2>
        <div class="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <!-- Lead Photographer -->
          <div class="text-center bg-white p-6 rounded-lg shadow-lg">
            <div class="w-48 h-48 rounded-full bg-gradient-to-br from-premium-gold/30 to-premium-light-gray mx-auto mb-4"></div>
            <h3 class="text-xl font-serif font-bold text-premium-gold mb-2">Alex Johnson</h3>
            <p class="text-gray-500 mb-3">Lead Photographer & Founder</p>
            <p class="text-gray-600 text-sm">
              Award-winning photographer with 15+ years of experience specializing in weddings and portraits.
            </p>
          </div>

          <!-- Senior Photographer -->
          <div class="text-center bg-white p-6 rounded-lg shadow-lg">
            <div class="w-48 h-48 rounded-full bg-gradient-to-br from-premium-gold/30 to-premium-light-gray mx-auto mb-4"></div>
            <h3 class="text-xl font-serif font-bold text-premium-gold mb-2">Sarah Mitchell</h3>
            <p class="text-gray-500 mb-3">Senior Photographer</p>
            <p class="text-gray-600 text-sm">
              Specializes in commercial and event photography with a creative eye for detail and composition.
            </p>
          </div>

          <!-- Creative Director -->
          <div class="text-center bg-white p-6 rounded-lg shadow-lg">
            <div class="w-48 h-48 rounded-full bg-gradient-to-br from-premium-gold/30 to-premium-light-gray mx-auto mb-4"></div>
            <h3 class="text-xl font-serif font-bold text-premium-gold mb-2">Michael Chen</h3>
            <p class="text-gray-500 mb-3">Creative Director</p>
            <p class="text-gray-600 text-sm">
              Expert in post-production and creative direction, bringing your vision to life through editing.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Values Section -->
    <section class="bg-white py-16">
      <div class="container mx-auto px-6">
        <div class="max-w-4xl mx-auto">
          <h2 class="text-3xl font-serif font-bold text-premium-gold mb-12 text-center">Our Values</h2>
          <div class="grid md:grid-cols-2 gap-8">
            <div class="bg-gradient-to-br from-premium-light-gray to-white p-6 rounded-lg shadow-lg">
              <h3 class="text-xl font-serif font-bold text-premium-gold mb-3">Quality First</h3>
              <p class="text-gray-600">
                We never compromise on quality. Every image is carefully edited and delivered to the highest standards.
              </p>
            </div>
            <div class="bg-gradient-to-br from-premium-light-gray to-white p-6 rounded-lg shadow-lg">
              <h3 class="text-xl font-serif font-bold text-premium-gold mb-3">Client Focused</h3>
              <p class="text-gray-600">
                Your satisfaction is our priority. We listen to your needs and exceed your expectations.
              </p>
            </div>
            <div class="bg-gradient-to-br from-premium-light-gray to-white p-6 rounded-lg shadow-lg">
              <h3 class="text-xl font-serif font-bold text-premium-gold mb-3">Creative Excellence</h3>
              <p class="text-gray-600">
                We bring artistic vision and technical expertise to every project, creating unique and memorable images.
              </p>
            </div>
            <div class="bg-gradient-to-br from-premium-light-gray to-white p-6 rounded-lg shadow-lg">
              <h3 class="text-xl font-serif font-bold text-premium-gold mb-3">Professionalism</h3>
              <p class="text-gray-600">
                From booking to delivery, we maintain the highest level of professionalism in every interaction.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="bg-gradient-to-br from-premium-gold/10 to-premium-light-gray py-16">
      <div class="container mx-auto px-6 text-center">
        <h2 class="text-3xl font-serif font-bold text-premium-gold mb-4">Let's Work Together</h2>
        <p class="text-xl text-gray-600 mb-8">Ready to create something amazing?</p>
        <div class="flex justify-center gap-4 flex-wrap">
          <NuxtLink to="/booking" class="inline-block px-8 py-4 bg-premium-gold text-white font-bold text-lg rounded-lg hover:bg-premium-gold/90 transition-colors shadow-lg">
            Book a Session
          </NuxtLink>
          <NuxtLink to="/contact" class="inline-block px-8 py-4 bg-white text-premium-gold font-bold text-lg rounded-lg hover:bg-gray-50 transition-colors shadow-lg">
            Contact Us
          </NuxtLink>
        </div>
      </div>
    </section>
  </MainLayout>
</template>

<script setup lang="ts">
useHead({
  title: 'About Us - Professional Photography Studio',
  meta: [
    { name: 'description', content: 'Learn about our award-winning photography team and our commitment to excellence.' }
  ]
})
</script>
