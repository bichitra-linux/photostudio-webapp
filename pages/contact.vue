<template>
  <MainLayout>
    <!-- Hero Section -->
    <section class="pt-32 pb-16 bg-gradient-to-br from-premium-light-gray to-white">
      <div class="container mx-auto px-6 text-center">
        <h1 class="text-5xl font-serif font-bold text-premium-black mb-4">Contact Us</h1>
        <p class="text-xl text-gray-600">Let's discuss your photography needs</p>
      </div>
    </section>

    <!-- Contact Content -->
    <section class="bg-gray-50 py-16">
      <div class="container mx-auto px-6">
        <div class="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <!-- Contact Form -->
          <div class="bg-white p-8 rounded-lg shadow-lg">
            <h2 class="text-2xl font-serif font-bold text-premium-gold mb-6">Send Us a Message</h2>
            <form @submit.prevent="handleSubmit" class="space-y-6">
              <div>
                <label for="name" class="block text-gray-700 font-semibold mb-2">Full Name *</label>
                <input
                  id="name"
                  v-model="form.name"
                  type="text"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-premium-gold focus:border-transparent"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label for="email" class="block text-gray-700 font-semibold mb-2"
                  >Email Address *</label
                >
                <input
                  id="email"
                  v-model="form.email"
                  type="email"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-premium-gold focus:border-transparent"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label for="phone" class="block text-gray-700 font-semibold mb-2"
                  >Phone Number</label
                >
                <input
                  id="phone"
                  v-model="form.phone"
                  type="tel"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-premium-gold focus:border-transparent"
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <div>
                <label for="service" class="block text-gray-700 font-semibold mb-2"
                  >Service Interested In</label
                >
                <select
                  id="service"
                  v-model="form.service"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-premium-gold focus:border-transparent"
                >
                  <option value="">Select a service</option>
                  <option value="wedding">Wedding Photography</option>
                  <option value="portrait">Portrait Session</option>
                  <option value="commercial">Commercial Photography</option>
                  <option value="event">Event Photography</option>
                  <option value="real-estate">Real Estate Photography</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label for="message" class="block text-gray-700 font-semibold mb-2"
                  >Message *</label
                >
                <textarea
                  id="message"
                  v-model="form.message"
                  required
                  rows="5"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-premium-gold focus:border-transparent"
                  placeholder="Tell us about your project..."
                ></textarea>
              </div>

              <button
                type="submit"
                :disabled="loading"
                class="w-full px-6 py-4 bg-premium-gold text-white font-bold rounded-lg hover:bg-premium-gold/90 transition-colors disabled:opacity-50 shadow-lg"
              >
                {{ loading ? "Sending..." : "Send Message" }}
              </button>

              <p v-if="success" class="text-green-600 text-center font-semibold">
                ✓ Message sent successfully! We'll get back to you soon.
              </p>
              <p v-if="error" class="text-red-600 text-center font-semibold">
                {{ error }}
              </p>
            </form>
          </div>

          <!-- Contact Information -->
          <div class="space-y-8">
            <div>
              <h2 class="text-2xl font-serif font-bold text-premium-gold mb-6">Get in Touch</h2>
              <p class="text-gray-600 mb-8">
                Have a question or want to book a session? We'd love to hear from you. Fill out the
                form or reach us through any of the methods below.
              </p>
            </div>

            <!-- Contact Details -->
            <div class="bg-white p-6 rounded-lg shadow-lg space-y-6">
              <div class="flex items-start gap-4">
                <div
                  class="w-12 h-12 bg-premium-gold/20 rounded-lg flex items-center justify-center flex-shrink-0"
                >
                  <span class="text-premium-gold text-xl">📍</span>
                </div>
                <div>
                  <h3 class="text-lg font-serif font-bold text-premium-gold mb-2">
                    Studio Address
                  </h3>
                  <p class="text-gray-600">
                    123 Photography Lane<br />
                    Creative District<br />
                    New York, NY 10001
                  </p>
                </div>
              </div>

              <div class="flex items-start gap-4">
                <div
                  class="w-12 h-12 bg-premium-gold/20 rounded-lg flex items-center justify-center flex-shrink-0"
                >
                  <span class="text-premium-gold text-xl">📞</span>
                </div>
                <div>
                  <h3 class="text-lg font-serif font-bold text-premium-gold mb-2">Phone</h3>
                  <p class="text-gray-600">
                    +1 (555) 123-4567<br />
                    Mon-Fri: 9AM - 6PM<br />
                    Sat: 10AM - 4PM
                  </p>
                </div>
              </div>

              <div class="flex items-start gap-4">
                <div
                  class="w-12 h-12 bg-premium-gold/20 rounded-lg flex items-center justify-center flex-shrink-0"
                >
                  <span class="text-premium-gold text-xl">✉️</span>
                </div>
                <div>
                  <h3 class="text-lg font-serif font-bold text-premium-gold mb-2">Email</h3>
                  <p class="text-gray-600">
                    info@photostudio.com<br />
                    bookings@photostudio.com
                  </p>
                </div>
              </div>
            </div>

            <!-- Social Links -->
            <div class="bg-white p-6 rounded-lg shadow-lg">
              <h3 class="text-lg font-serif font-bold text-premium-gold mb-4">Follow Us</h3>
              <div class="flex gap-4">
                <a
                  href="#"
                  class="w-12 h-12 bg-premium-gold/20 rounded-lg flex items-center justify-center hover:bg-premium-gold/30 transition-colors"
                >
                  <span class="text-premium-gold">📷</span>
                </a>
                <a
                  href="#"
                  class="w-12 h-12 bg-premium-gold/20 rounded-lg flex items-center justify-center hover:bg-premium-gold/30 transition-colors"
                >
                  <span class="text-premium-gold">👍</span>
                </a>
                <a
                  href="#"
                  class="w-12 h-12 bg-premium-gold/20 rounded-lg flex items-center justify-center hover:bg-premium-gold/30 transition-colors"
                >
                  <span class="text-premium-gold">🐦</span>
                </a>
              </div>
            </div>

            <!-- Quick Link to Booking -->
            <div
              class="bg-gradient-to-br from-premium-gold/10 to-premium-light-gray p-6 rounded-lg text-center shadow-lg"
            >
              <h3 class="text-xl font-serif font-bold text-premium-gold mb-3">Ready to Book?</h3>
              <p class="text-gray-600 mb-4">Skip the form and schedule your session directly</p>
              <NuxtLink
                to="/booking"
                class="inline-block px-6 py-3 bg-premium-gold text-white font-bold rounded-lg hover:bg-premium-gold/90 transition-colors shadow-sm"
              >
                Book Now
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  </MainLayout>
</template>

<script setup lang="ts">
useHead({
  title: "Contact Us - Get in Touch",
  meta: [
    {
      name: "description",
      content:
        "Contact our photography studio for bookings, inquiries, or questions. We'd love to hear from you.",
    },
  ],
});

const form = ref({
  name: "",
  email: "",
  phone: "",
  service: "",
  message: "",
});

const loading = ref(false);
const success = ref(false);
const error = ref("");

const handleSubmit = async () => {
  loading.value = true;
  success.value = false;
  error.value = "";

  try {
    // In a real app, this would send to your backend/Firestore
    // For now, simulate an API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Reset form
    form.value = {
      name: "",
      email: "",
      phone: "",
      service: "",
      message: "",
    };

    success.value = true;

    // Clear success message after 5 seconds
    setTimeout(() => {
      success.value = false;
    }, 5000);
  } catch (err) {
    error.value = "Failed to send message. Please try again.";
  } finally {
    loading.value = false;
  }
};
</script>
