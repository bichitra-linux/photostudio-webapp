<template>
  <MainLayout>
    <!-- Booking Section -->
    <section class="pt-32 pb-12 bg-gradient-to-br from-premium-light-gray to-white">
      <div class="section-container max-w-4xl">
        <h1 class="text-5xl font-serif font-bold text-premium-black mb-4 text-center">Book Your Session</h1>
        <p class="text-xl text-gray-600 mb-12 text-center">Fill out the form below to schedule your photography session</p>
        
        <div class="bg-white rounded-lg shadow-xl p-8 md:p-12">
          <form @submit.prevent="handleSubmit" class="space-y-6">
            <!-- Personal Information -->
            <div class="grid md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-semibold text-premium-black mb-2">Full Name *</label>
                <input
                  v-model="formData.clientName"
                  type="text"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-premium-gold focus:border-transparent"
                  placeholder="John Doe"
                />
              </div>
              
              <div>
                <label class="block text-sm font-semibold text-premium-black mb-2">Email *</label>
                <input
                  v-model="formData.clientEmail"
                  type="email"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-premium-gold focus:border-transparent"
                  placeholder="john@example.com"
                />
              </div>
            </div>
            
            <div class="grid md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-semibold text-premium-black mb-2">Phone Number *</label>
                <input
                  v-model="formData.clientPhone"
                  type="tel"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-premium-gold focus:border-transparent"
                  placeholder="+1 234 567 8900"
                />
              </div>
              
              <div>
                <label class="block text-sm font-semibold text-premium-black mb-2">Service Type *</label>
                <select
                  v-model="formData.serviceType"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-premium-gold focus:border-transparent"
                >
                  <option value="">Select a service</option>
                  <option value="wedding">Wedding Photography</option>
                  <option value="portrait">Portrait Session</option>
                  <option value="commercial">Commercial Photography</option>
                  <option value="event">Event Photography</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            
            <div class="grid md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-semibold text-premium-black mb-2">Preferred Date *</label>
                <input
                  v-model="formData.bookingDate"
                  type="date"
                  required
                  :min="minDate"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-premium-gold focus:border-transparent"
                />
              </div>
              
              <div>
                <label class="block text-sm font-semibold text-premium-black mb-2">Preferred Time *</label>
                <select
                  v-model="formData.timeSlot"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-premium-gold focus:border-transparent"
                >
                  <option value="">Select a time</option>
                  <option value="09:00-11:00">9:00 AM - 11:00 AM</option>
                  <option value="11:00-13:00">11:00 AM - 1:00 PM</option>
                  <option value="13:00-15:00">1:00 PM - 3:00 PM</option>
                  <option value="15:00-17:00">3:00 PM - 5:00 PM</option>
                  <option value="17:00-19:00">5:00 PM - 7:00 PM</option>
                </select>
              </div>
            </div>
            
            <div>
              <label class="block text-sm font-semibold text-premium-black mb-2">Additional Details</label>
              <textarea
                v-model="formData.notes"
                rows="4"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-premium-gold focus:border-transparent"
                placeholder="Tell us more about your photography needs..."
              ></textarea>
            </div>
            
            <!-- Success/Error Messages -->
            <div v-if="successMessage" class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg">
              {{ successMessage }}
            </div>
            
            <div v-if="errorMessage" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
              {{ errorMessage }}
            </div>
            
            <!-- Submit Button -->
            <div class="text-center">
              <button
                type="submit"
                :disabled="submitting"
                class="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {{ submitting ? 'Submitting...' : 'Submit Booking Request' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  </MainLayout>
</template>

<script setup lang="ts">
const { saveBooking } = useFirestore()

const formData = reactive({
  clientName: '',
  clientEmail: '',
  clientPhone: '',
  serviceType: '',
  bookingDate: '',
  timeSlot: '',
  notes: ''
})

const submitting = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

const minDate = computed(() => {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  return tomorrow.toISOString().split('T')[0]
})

const handleSubmit = async () => {
  submitting.value = true
  successMessage.value = ''
  errorMessage.value = ''
  
  try {
    await saveBooking({
      ...formData,
      bookingDate: new Date(formData.bookingDate)
    })
    
    successMessage.value = 'Your booking request has been submitted successfully! We will contact you shortly.'
    
    // Reset form
    Object.keys(formData).forEach(key => {
      formData[key as keyof typeof formData] = ''
    })
  } catch (error) {
    console.error('Error submitting booking:', error)
    errorMessage.value = 'There was an error submitting your booking. Please try again.'
  } finally {
    submitting.value = false
  }
}

useHead({
  title: 'Book Now',
  meta: [
    { name: 'description', content: 'Book your photography session with our professional team' }
  ]
})
</script>
