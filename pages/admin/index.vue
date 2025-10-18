<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Navigation -->
    <nav class="bg-white shadow-sm fixed w-full z-50">
      <div class="section-container py-4">
        <div class="flex justify-between items-center">
          <NuxtLink to="/" class="text-2xl font-serif font-bold text-premium-black">
            PhotoStudio Admin
          </NuxtLink>
          
          <button @click="handleLogout" class="text-premium-gray hover:text-premium-gold transition">
            Logout
          </button>
        </div>
      </div>
    </nav>
    
    <!-- Admin Dashboard -->
    <section class="pt-24 section-container">
      <div v-if="!user" class="text-center py-12">
        <p class="text-premium-gray">Please <NuxtLink to="/auth/login" class="text-premium-gold">login</NuxtLink> to access admin panel</p>
      </div>
      
      <div v-else>
        <h1 class="text-4xl font-serif font-bold text-premium-black mb-8">Admin Dashboard</h1>
        
        <!-- Tabs -->
        <div class="flex space-x-4 mb-8 border-b">
          <button
            v-for="tab in tabs"
            :key="tab.value"
            @click="activeTab = tab.value"
            :class="[
              'px-6 py-3 font-semibold transition border-b-2',
              activeTab === tab.value
                ? 'text-premium-gold border-premium-gold'
                : 'text-premium-gray border-transparent hover:text-premium-gold'
            ]"
          >
            {{ tab.label }}
          </button>
        </div>
        
        <!-- Upload Images Tab -->
        <div v-if="activeTab === 'upload'" class="bg-white rounded-lg shadow-lg p-8">
          <h2 class="text-2xl font-bold mb-6">Upload New Images</h2>
          
          <form @submit.prevent="handleImageUpload" class="space-y-6">
            <div>
              <label class="block text-sm font-semibold mb-2">Image File *</label>
              <input
                type="file"
                accept="image/*"
                @change="handleFileChange"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg"
              />
            </div>
            
            <div class="grid md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-semibold mb-2">Title *</label>
                <input
                  v-model="uploadForm.title"
                  type="text"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-premium-gold"
                  placeholder="Image title"
                />
              </div>
              
              <div>
                <label class="block text-sm font-semibold mb-2">Category *</label>
                <select
                  v-model="uploadForm.category"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-premium-gold"
                >
                  <option value="">Select category</option>
                  <option value="wedding">Wedding</option>
                  <option value="portrait">Portrait</option>
                  <option value="commercial">Commercial</option>
                  <option value="event">Event</option>
                </select>
              </div>
            </div>
            
            <div>
              <label class="block text-sm font-semibold mb-2">Description</label>
              <textarea
                v-model="uploadForm.description"
                rows="3"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-premium-gold"
                placeholder="Image description"
              ></textarea>
            </div>
            
            <div>
              <label class="block text-sm font-semibold mb-2">Tags (comma separated)</label>
              <input
                v-model="uploadForm.tags"
                type="text"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-premium-gold"
                placeholder="wedding, outdoor, sunset"
              />
            </div>
            
            <div class="flex items-center space-x-4">
              <label class="flex items-center">
                <input
                  v-model="uploadForm.isPublic"
                  type="checkbox"
                  class="w-5 h-5 text-premium-gold rounded focus:ring-premium-gold"
                />
                <span class="ml-2 text-sm font-semibold">Make Public</span>
              </label>
              
              <label class="flex items-center">
                <input
                  v-model="uploadForm.downloadAllowed"
                  type="checkbox"
                  class="w-5 h-5 text-premium-gold rounded focus:ring-premium-gold"
                />
                <span class="ml-2 text-sm font-semibold">Allow Downloads</span>
              </label>
            </div>
            
            <div v-if="uploadMessage" :class="[
              'px-4 py-3 rounded-lg',
              uploadError ? 'bg-red-100 border border-red-400 text-red-700' : 'bg-green-100 border border-green-400 text-green-700'
            ]">
              {{ uploadMessage }}
            </div>
            
            <button
              type="submit"
              :disabled="uploading"
              class="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ uploading ? 'Uploading...' : 'Upload Image' }}
            </button>
          </form>
        </div>
        
        <!-- Manage Bookings Tab -->
        <div v-if="activeTab === 'bookings'" class="bg-white rounded-lg shadow-lg p-8">
          <h2 class="text-2xl font-bold mb-6">Manage Bookings</h2>
          
          <div v-if="loadingBookings" class="text-center py-12">
            <p class="text-premium-gray">Loading bookings...</p>
          </div>
          
          <div v-else-if="bookings.length === 0" class="text-center py-12">
            <p class="text-premium-gray">No bookings found.</p>
          </div>
          
          <div v-else class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="booking in bookings" :key="booking.id">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm font-medium text-gray-900">{{ booking.clientName }}</div>
                    <div class="text-sm text-gray-500">{{ booking.clientEmail }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {{ booking.serviceType }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {{ formatDate(booking.bookingDate) }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {{ booking.timeSlot }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span :class="[
                      'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
                      booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                      booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    ]">
                      {{ booking.status }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <select
                      @change="updateBookingStatus(booking.id, $event)"
                      class="rounded border-gray-300"
                    >
                      <option value="">Update Status</option>
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="cancelled">Cancelled</option>
                      <option value="completed">Completed</option>
                    </select>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <!-- Gallery Management Tab -->
        <div v-if="activeTab === 'gallery'" class="bg-white rounded-lg shadow-lg p-8">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-bold">Manage Gallery</h2>
            <div class="flex gap-4">
              <select 
                v-model="galleryFilter"
                @change="loadGalleryImages"
                class="px-4 py-2 border border-gray-300 rounded-lg"
              >
                <option value="">All Categories</option>
                <option value="wedding">Wedding</option>
                <option value="portrait">Portrait</option>
                <option value="commercial">Commercial</option>
                <option value="event">Event</option>
              </select>
              <button @click="loadGalleryImages" class="btn-secondary">
                Refresh
              </button>
            </div>
          </div>
          
          <div v-if="loadingGallery" class="text-center py-12">
            <p class="text-premium-gray">Loading gallery...</p>
          </div>
          
          <div v-else-if="galleryImages.length === 0" class="text-center py-12">
            <p class="text-premium-gray">No images in gallery.</p>
          </div>
          
          <div v-else class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <div 
              v-for="image in galleryImages" 
              :key="image.id"
              class="relative group bg-gray-100 rounded-lg overflow-hidden aspect-square"
            >
              <img 
                :src="image.url" 
                :alt="image.title"
                class="w-full h-full object-cover"
              />
              <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-75 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                <div class="text-white text-center p-4">
                  <h3 class="font-bold mb-2 text-sm">{{ image.title }}</h3>
                  <p class="text-xs mb-3">{{ image.category }}</p>
                  <div class="flex gap-2 justify-center">
                    <button 
                      @click="editImage(image)"
                      class="px-3 py-1 bg-premium-gold text-white rounded text-xs hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button 
                      @click="deleteImage(image.id)"
                      class="px-3 py-1 bg-red-600 text-white rounded text-xs hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
              <div class="absolute top-2 right-2 flex gap-1">
                <span 
                  v-if="image.isPublic"
                  class="px-2 py-1 bg-green-500 text-white text-xs rounded"
                >
                  Public
                </span>
                <span 
                  v-else
                  class="px-2 py-1 bg-gray-500 text-white text-xs rounded"
                >
                  Private
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Manage Services Tab -->
        <div v-if="activeTab === 'services'" class="bg-white rounded-lg shadow-lg p-8">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-bold">Manage Services</h2>
            <button 
              @click="openServiceForm()"
              class="btn-primary"
            >
              + Add New Service
            </button>
          </div>
          
          <!-- Services List -->
          <div v-if="loadingServices" class="text-center py-12">
            <p class="text-premium-gray">Loading services...</p>
          </div>
          
          <div v-else-if="services.length === 0" class="text-center py-12 bg-gray-50 rounded-lg">
            <p class="text-premium-gray mb-4">No services added yet.</p>
            <button @click="openServiceForm()" class="btn-primary">
              Add Your First Service
            </button>
          </div>
          
          <div v-else class="space-y-4">
            <div 
              v-for="service in services" 
              :key="service.id"
              class="border border-gray-200 rounded-lg p-6 hover:shadow-md transition"
            >
              <div class="flex justify-between items-start">
                <div class="flex-1">
                  <h3 class="text-xl font-bold text-premium-black mb-2">{{ service.name }}</h3>
                  <p class="text-premium-gray mb-4">{{ service.description }}</p>
                  
                  <div class="flex gap-6 text-sm">
                    <div>
                      <span class="text-premium-gray">Price:</span>
                      <span class="font-bold text-premium-gold ml-2">
                        {{ service.currency }} {{ service.price.toLocaleString() }}
                      </span>
                    </div>
                    <div v-if="service.duration">
                      <span class="text-premium-gray">Duration:</span>
                      <span class="font-semibold ml-2">{{ service.duration }}</span>
                    </div>
                    <div>
                      <span class="text-premium-gray">Status:</span>
                      <span 
                        :class="[
                          'ml-2 px-2 py-1 rounded text-xs font-semibold',
                          service.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        ]"
                      >
                        {{ service.isActive ? 'Active' : 'Inactive' }}
                      </span>
                    </div>
                  </div>
                  
                  <div v-if="service.features && service.features.length > 0" class="mt-4">
                    <p class="text-sm font-semibold text-premium-gray mb-2">Features:</p>
                    <ul class="list-disc list-inside text-sm text-premium-gray space-y-1">
                      <li v-for="(feature, idx) in service.features" :key="idx">{{ feature }}</li>
                    </ul>
                  </div>
                </div>
                
                <div class="flex gap-2 ml-4">
                  <button 
                    @click="openServiceForm(service)"
                    class="px-4 py-2 bg-premium-gold text-white rounded-lg hover:bg-yellow-600 transition text-sm"
                  >
                    Edit
                  </button>
                  <button 
                    @click="deleteService(service.id)"
                    class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Statistics Tab -->
        <div v-if="activeTab === 'stats'" class="space-y-6">
          <!-- Overview Cards -->
          <div class="grid md:grid-cols-4 gap-6">
            <div class="bg-white rounded-lg shadow-lg p-6">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-premium-gray text-sm font-semibold mb-1">Total Images</p>
                  <p class="text-3xl font-bold text-premium-black">{{ stats.totalImages }}</p>
                </div>
                <div class="w-12 h-12 bg-premium-gold rounded-full flex items-center justify-center text-white text-2xl">
                  📸
                </div>
              </div>
            </div>
            
            <div class="bg-white rounded-lg shadow-lg p-6">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-premium-gray text-sm font-semibold mb-1">Total Bookings</p>
                  <p class="text-3xl font-bold text-premium-black">{{ stats.totalBookings }}</p>
                </div>
                <div class="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl">
                  📅
                </div>
              </div>
            </div>
            
            <div class="bg-white rounded-lg shadow-lg p-6">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-premium-gray text-sm font-semibold mb-1">Pending Bookings</p>
                  <p class="text-3xl font-bold text-premium-black">{{ stats.pendingBookings }}</p>
                </div>
                <div class="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center text-white text-2xl">
                  ⏳
                </div>
              </div>
            </div>
            
            <div class="bg-white rounded-lg shadow-lg p-6">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-premium-gray text-sm font-semibold mb-1">Confirmed Today</p>
                  <p class="text-3xl font-bold text-premium-black">{{ stats.confirmedToday }}</p>
                </div>
                <div class="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white text-2xl">
                  ✅
                </div>
              </div>
            </div>
          </div>
          
          <!-- Recent Activity -->
          <div class="bg-white rounded-lg shadow-lg p-6">
            <h3 class="text-xl font-bold mb-4">Recent Activity</h3>
            <div v-if="recentActivity.length === 0" class="text-center py-8 text-premium-gray">
              No recent activity
            </div>
            <div v-else class="space-y-4">
              <div 
                v-for="(activity, index) in recentActivity" 
                :key="index"
                class="flex items-center gap-4 p-4 border-l-4 border-premium-gold bg-gray-50 rounded"
              >
                <div class="text-2xl">{{ activity.icon }}</div>
                <div class="flex-1">
                  <p class="font-semibold text-premium-black">{{ activity.title }}</p>
                  <p class="text-sm text-premium-gray">{{ activity.description }}</p>
                </div>
                <div class="text-xs text-premium-gray">
                  {{ formatRelativeTime(activity.timestamp) }}
                </div>
              </div>
            </div>
          </div>
          
          <!-- Category Breakdown -->
          <div class="bg-white rounded-lg shadow-lg p-6">
            <h3 class="text-xl font-bold mb-4">Images by Category</h3>
            <div class="space-y-3">
              <div v-for="cat in categoryStats" :key="cat.name" class="flex items-center gap-4">
                <div class="w-32 font-semibold text-sm">{{ cat.name }}</div>
                <div class="flex-1 bg-gray-200 rounded-full h-6 overflow-hidden">
                  <div 
                    class="bg-premium-gold h-full flex items-center justify-center text-white text-xs font-bold"
                    :style="{ width: `${(cat.count / stats.totalImages) * 100}%` }"
                  >
                    {{ cat.count }}
                  </div>
                </div>
                <div class="text-sm text-premium-gray">
                  {{ Math.round((cat.count / stats.totalImages) * 100) }}%
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Service Form Modal -->
    <Teleport to="body">
      <div 
        v-if="showServiceForm"
        class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
        @click.self="closeServiceForm"
      >
        <div class="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div class="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
            <h3 class="text-2xl font-bold">{{ editingService ? 'Edit Service' : 'Add New Service' }}</h3>
            <button @click="closeServiceForm" class="text-gray-500 hover:text-gray-700 text-2xl">
              ×
            </button>
          </div>
          
          <form @submit.prevent="saveService" class="p-6 space-y-6">
            <!-- Service Name -->
            <div>
              <label class="block text-sm font-semibold mb-2">Service Name *</label>
              <input
                v-model="serviceForm.name"
                type="text"
                required
                placeholder="e.g., Wedding Photography"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-premium-gold focus:border-transparent"
              />
            </div>
            
            <!-- Description -->
            <div>
              <label class="block text-sm font-semibold mb-2">Description *</label>
              <textarea
                v-model="serviceForm.description"
                required
                rows="4"
                placeholder="Describe your service in detail..."
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-premium-gold focus:border-transparent"
              ></textarea>
            </div>
            
            <!-- Price and Currency -->
            <div class="grid md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-semibold mb-2">Price *</label>
                <input
                  v-model.number="serviceForm.price"
                  type="number"
                  required
                  min="0"
                  step="0.01"
                  placeholder="e.g., 1500"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-premium-gold focus:border-transparent"
                />
              </div>
              
              <div>
                <label class="block text-sm font-semibold mb-2">Currency *</label>
                <select
                  v-model="serviceForm.currency"
                  required
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-premium-gold focus:border-transparent"
                >
                  <!-- ALL WORLD CURRENCIES - ALPHABETICALLY BY COUNTRY -->
                  <option value="؋">؋ - Afghan Afghani (AFN) - Afghanistan</option>
                  <option value="Lek">Lek - Albanian Lek (ALL) - Albania</option>
                  <option value="DA">DA - Algerian Dinar (DZD) - Algeria</option>
                  <option value="Kz">Kz - Angolan Kwanza (AOA) - Angola</option>
                  <option value="$">$ - Argentine Peso (ARS) - Argentina</option>
                  <option value="֏">֏ - Armenian Dram (AMD) - Armenia</option>
                  <option value="A$">A$ - Australian Dollar (AUD) - Australia</option>
                  <option value="€">€ - Euro (EUR) - Austria</option>
                  <option value="₼">₼ - Azerbaijani Manat (AZN) - Azerbaijan</option>
                  <option value="$">$ - Bahamian Dollar (BSD) - Bahamas</option>
                  <option value="د.ب">BHD - Bahraini Dinar (BHD) - Bahrain</option>
                  <option value="৳">৳ - Bangladeshi Taka (BDT) - Bangladesh</option>
                  <option value="BD$">BD$ - Barbadian Dollar (BBD) - Barbados</option>
                  <option value="Br">Br - Belarusian Ruble (BYN) - Belarus</option>
                  <option value="€">€ - Euro (EUR) - Belgium</option>
                  <option value="BZ$">BZ$ - Belize Dollar (BZD) - Belize</option>
                  <option value="CFA">CFA - West African CFA Franc (XOF) - Benin</option>
                  <option value="Nu.">Nu. - Bhutanese Ngultrum (BTN) - Bhutan</option>
                  <option value="Bs">Bs - Bolivian Boliviano (BOB) - Bolivia</option>
                  <option value="KM">KM - Bosnia-Herzegovina Mark (BAM) - Bosnia & Herzegovina</option>
                  <option value="P">P - Botswana Pula (BWP) - Botswana</option>
                  <option value="R$">R$ - Brazilian Real (BRL) - Brazil</option>
                  <option value="$">$ - Brunei Dollar (BND) - Brunei</option>
                  <option value="лв">лв - Bulgarian Lev (BGN) - Bulgaria</option>
                  <option value="CFA">CFA - West African CFA Franc (XOF) - Burkina Faso</option>
                  <option value="FBu">FBu - Burundian Franc (BIF) - Burundi</option>
                  <option value="៛">៛ - Cambodian Riel (KHR) - Cambodia</option>
                  <option value="CFA">CFA - Central African CFA Franc (XAF) - Cameroon</option>
                  <option value="CA$">CA$ - Canadian Dollar (CAD) - Canada</option>
                  <option value="CVE">CVE - Cape Verdean Escudo (CVE) - Cape Verde</option>
                  <option value="CFA">CFA - Central African CFA Franc (XAF) - Central African Republic</option>
                  <option value="CFA">CFA - Central African CFA Franc (XAF) - Chad</option>
                  <option value="$">$ - Chilean Peso (CLP) - Chile</option>
                  <option value="¥">¥ - Chinese Yuan (CNY) - China</option>
                  <option value="$">$ - Colombian Peso (COP) - Colombia</option>
                  <option value="KMF">KMF - Comorian Franc (KMF) - Comoros</option>
                  <option value="CFA">CFA - Central African CFA Franc (XAF) - Congo (Republic)</option>
                  <option value="FC">FC - Congolese Franc (CDF) - Congo (DR)</option>
                  <option value="₡">₡ - Costa Rican Colón (CRC) - Costa Rica</option>
                  <option value="CFA">CFA - West African CFA Franc (XOF) - Côte d'Ivoire</option>
                  <option value="kn">kn - Croatian Kuna (HRK) - Croatia</option>
                  <option value="$">$ - Cuban Peso (CUP) - Cuba</option>
                  <option value="€">€ - Euro (EUR) - Cyprus</option>
                  <option value="Kč">Kč - Czech Koruna (CZK) - Czech Republic</option>
                  <option value="kr">kr - Danish Krone (DKK) - Denmark</option>
                  <option value="Fdj">Fdj - Djiboutian Franc (DJF) - Djibouti</option>
                  <option value="RD$">RD$ - Dominican Peso (DOP) - Dominican Republic</option>
                  <option value="$">$ - US Dollar (USD) - Ecuador</option>
                  <option value="E£">E£ - Egyptian Pound (EGP) - Egypt</option>
                  <option value="$">$ - US Dollar (USD) - El Salvador</option>
                  <option value="CFA">CFA - Central African CFA Franc (XAF) - Equatorial Guinea</option>
                  <option value="Nfk">Nfk - Eritrean Nakfa (ERN) - Eritrea</option>
                  <option value="€">€ - Euro (EUR) - Estonia</option>
                  <option value="E">E - Swazi Lilangeni (SZL) - Eswatini</option>
                  <option value="Br">Br - Ethiopian Birr (ETB) - Ethiopia</option>
                  <option value="FJ$">FJ$ - Fijian Dollar (FJD) - Fiji</option>
                  <option value="€">€ - Euro (EUR) - Finland</option>
                  <option value="€">€ - Euro (EUR) - France</option>
                  <option value="CFA">CFA - Central African CFA Franc (XAF) - Gabon</option>
                  <option value="D">D - Gambian Dalasi (GMD) - Gambia</option>
                  <option value="₾">₾ - Georgian Lari (GEL) - Georgia</option>
                  <option value="€">€ - Euro (EUR) - Germany</option>
                  <option value="GH₵">GH₵ - Ghanaian Cedi (GHS) - Ghana</option>
                  <option value="€">€ - Euro (EUR) - Greece</option>
                  <option value="Q">Q - Guatemalan Quetzal (GTQ) - Guatemala</option>
                  <option value="FG">FG - Guinean Franc (GNF) - Guinea</option>
                  <option value="CFA">CFA - West African CFA Franc (XOF) - Guinea-Bissau</option>
                  <option value="$">$ - Guyanese Dollar (GYD) - Guyana</option>
                  <option value="G">G - Haitian Gourde (HTG) - Haiti</option>
                  <option value="L">L - Honduran Lempira (HNL) - Honduras</option>
                  <option value="HK$">HK$ - Hong Kong Dollar (HKD) - Hong Kong</option>
                  <option value="Ft">Ft - Hungarian Forint (HUF) - Hungary</option>
                  <option value="kr">kr - Icelandic Króna (ISK) - Iceland</option>
                  <option value="₹">₹ - Indian Rupee (INR) - India</option>
                  <option value="Rp">Rp - Indonesian Rupiah (IDR) - Indonesia</option>
                  <option value="﷼">﷼ - Iranian Rial (IRR) - Iran</option>
                  <option value="ع.د">IQD - Iraqi Dinar (IQD) - Iraq</option>
                  <option value="€">€ - Euro (EUR) - Ireland</option>
                  <option value="₪">₪ - Israeli Shekel (ILS) - Israel</option>
                  <option value="€">€ - Euro (EUR) - Italy</option>
                  <option value="J$">J$ - Jamaican Dollar (JMD) - Jamaica</option>
                  <option value="¥">¥ - Japanese Yen (JPY) - Japan</option>
                  <option value="د.ا">JOD - Jordanian Dinar (JOD) - Jordan</option>
                  <option value="₸">₸ - Kazakhstani Tenge (KZT) - Kazakhstan</option>
                  <option value="KSh">KSh - Kenyan Shilling (KES) - Kenya</option>
                  <option value="A$">A$ - Australian Dollar (AUD) - Kiribati</option>
                  <option value="₩">₩ - North Korean Won (KPW) - Korea (North)</option>
                  <option value="₩">₩ - South Korean Won (KRW) - Korea (South)</option>
                  <option value="د.ك">KWD - Kuwaiti Dinar (KWD) - Kuwait</option>
                  <option value="som">som - Kyrgyzstani Som (KGS) - Kyrgyzstan</option>
                  <option value="₭">₭ - Lao Kip (LAK) - Laos</option>
                  <option value="€">€ - Euro (EUR) - Latvia</option>
                  <option value="ل.ل">LBP - Lebanese Pound (LBP) - Lebanon</option>
                  <option value="L">L - Lesotho Loti (LSL) - Lesotho</option>
                  <option value="L$">L$ - Liberian Dollar (LRD) - Liberia</option>
                  <option value="LD">LD - Libyan Dinar (LYD) - Libya</option>
                  <option value="CHF">CHF - Swiss Franc (CHF) - Liechtenstein</option>
                  <option value="€">€ - Euro (EUR) - Lithuania</option>
                  <option value="€">€ - Euro (EUR) - Luxembourg</option>
                  <option value="MOP$">MOP$ - Macanese Pataca (MOP) - Macau</option>
                  <option value="Ar">Ar - Malagasy Ariary (MGA) - Madagascar</option>
                  <option value="MK">MK - Malawian Kwacha (MWK) - Malawi</option>
                  <option value="RM">RM - Malaysian Ringgit (MYR) - Malaysia</option>
                  <option value="Rf">Rf - Maldivian Rufiyaa (MVR) - Maldives</option>
                  <option value="CFA">CFA - West African CFA Franc (XOF) - Mali</option>
                  <option value="€">€ - Euro (EUR) - Malta</option>
                  <option value="UM">UM - Mauritanian Ouguiya (MRU) - Mauritania</option>
                  <option value="Rs">Rs - Mauritian Rupee (MUR) - Mauritius</option>
                  <option value="MX$">MX$ - Mexican Peso (MXN) - Mexico</option>
                  <option value="lei">lei - Moldovan Leu (MDL) - Moldova</option>
                  <option value="€">€ - Euro (EUR) - Monaco</option>
                  <option value="₮">₮ - Mongolian Tögrög (MNT) - Mongolia</option>
                  <option value="€">€ - Euro (EUR) - Montenegro</option>
                  <option value="MAD">MAD - Moroccan Dirham (MAD) - Morocco</option>
                  <option value="MT">MT - Mozambican Metical (MZN) - Mozambique</option>
                  <option value="K">K - Myanmar Kyat (MMK) - Myanmar</option>
                  <option value="N$">N$ - Namibian Dollar (NAD) - Namibia</option>
                  <option value="A$">A$ - Australian Dollar (AUD) - Nauru</option>
                  <option value="रु">रु - Nepalese Rupee (NPR) - Nepal</option>
                  <option value="€">€ - Euro (EUR) - Netherlands</option>
                  <option value="NZ$">NZ$ - New Zealand Dollar (NZD) - New Zealand</option>
                  <option value="C$">C$ - Nicaraguan Córdoba (NIO) - Nicaragua</option>
                  <option value="CFA">CFA - West African CFA Franc (XOF) - Niger</option>
                  <option value="₦">₦ - Nigerian Naira (NGN) - Nigeria</option>
                  <option value="den">den - Macedonian Denar (MKD) - North Macedonia</option>
                  <option value="kr">kr - Norwegian Krone (NOK) - Norway</option>
                  <option value="ر.ع.">OMR - Omani Rial (OMR) - Oman</option>
                  <option value="₨">₨ - Pakistani Rupee (PKR) - Pakistan</option>
                  <option value="B/.">B/. - Panamanian Balboa (PAB) - Panama</option>
                  <option value="K">K - Papua New Guinean Kina (PGK) - Papua New Guinea</option>
                  <option value="₲">₲ - Paraguayan Guarani (PYG) - Paraguay</option>
                  <option value="S/">S/ - Peruvian Sol (PEN) - Peru</option>
                  <option value="₱">₱ - Philippine Peso (PHP) - Philippines</option>
                  <option value="zł">zł - Polish Zloty (PLN) - Poland</option>
                  <option value="€">€ - Euro (EUR) - Portugal</option>
                  <option value="ر.ق">QAR - Qatari Riyal (QAR) - Qatar</option>
                  <option value="lei">lei - Romanian Leu (RON) - Romania</option>
                  <option value="₽">₽ - Russian Ruble (RUB) - Russia</option>
                  <option value="RWF">RWF - Rwandan Franc (RWF) - Rwanda</option>
                  <option value="WS$">WS$ - Samoan Tālā (WST) - Samoa</option>
                  <option value="€">€ - Euro (EUR) - San Marino</option>
                  <option value="Db">Db - São Tomé & Príncipe Dobra (STN) - São Tomé and Príncipe</option>
                  <option value="﷼">﷼ - Saudi Riyal (SAR) - Saudi Arabia</option>
                  <option value="CFA">CFA - West African CFA Franc (XOF) - Senegal</option>
                  <option value="din">din - Serbian Dinar (RSD) - Serbia</option>
                  <option value="Rs">Rs - Seychellois Rupee (SCR) - Seychelles</option>
                  <option value="Le">Le - Sierra Leonean Leone (SLL) - Sierra Leone</option>
                  <option value="S$">S$ - Singapore Dollar (SGD) - Singapore</option>
                  <option value="€">€ - Euro (EUR) - Slovakia</option>
                  <option value="€">€ - Euro (EUR) - Slovenia</option>
                  <option value="$">$ - Solomon Islands Dollar (SBD) - Solomon Islands</option>
                  <option value="Sh">Sh - Somali Shilling (SOS) - Somalia</option>
                  <option value="R">R - South African Rand (ZAR) - South Africa</option>
                  <option value="SSP">SSP - South Sudanese Pound (SSP) - South Sudan</option>
                  <option value="€">€ - Euro (EUR) - Spain</option>
                  <option value="Rs">Rs - Sri Lankan Rupee (LKR) - Sri Lanka</option>
                  <option value="SDG">SDG - Sudanese Pound (SDG) - Sudan</option>
                  <option value="$">$ - Surinamese Dollar (SRD) - Suriname</option>
                  <option value="kr">kr - Swedish Krona (SEK) - Sweden</option>
                  <option value="CHF">CHF - Swiss Franc (CHF) - Switzerland</option>
                  <option value="ل.س">SYP - Syrian Pound (SYP) - Syria</option>
                  <option value="NT$">NT$ - Taiwan Dollar (TWD) - Taiwan</option>
                  <option value="смн">смн - Tajikistani Somoni (TJS) - Tajikistan</option>
                  <option value="TSh">TSh - Tanzanian Shilling (TZS) - Tanzania</option>
                  <option value="฿">฿ - Thai Baht (THB) - Thailand</option>
                  <option value="$">$ - US Dollar (USD) - Timor-Leste</option>
                  <option value="CFA">CFA - West African CFA Franc (XOF) - Togo</option>
                  <option value="T">T - Tongan Paʻanga (TOP) - Tonga</option>
                  <option value="TT$">TT$ - Trinidad & Tobago Dollar (TTD) - Trinidad and Tobago</option>
                  <option value="DT">DT - Tunisian Dinar (TND) - Tunisia</option>
                  <option value="₺">₺ - Turkish Lira (TRY) - Turkey</option>
                  <option value="m">m - Turkmenistani Manat (TMT) - Turkmenistan</option>
                  <option value="A$">A$ - Australian Dollar (AUD) - Tuvalu</option>
                  <option value="USh">USh - Ugandan Shilling (UGX) - Uganda</option>
                  <option value="₴">₴ - Ukrainian Hryvnia (UAH) - Ukraine</option>
                  <option value="د.إ">AED - UAE Dirham (AED) - United Arab Emirates</option>
                  <option value="£">£ - British Pound (GBP) - United Kingdom</option>
                  <option value="$">$ - US Dollar (USD) - United States</option>
                  <option value="$U">$U - Uruguayan Peso (UYU) - Uruguay</option>
                  <option value="so'm">so'm - Uzbekistani Som (UZS) - Uzbekistan</option>
                  <option value="VT">VT - Vanuatu Vatu (VUV) - Vanuatu</option>
                  <option value="€">€ - Euro (EUR) - Vatican City</option>
                  <option value="Bs">Bs - Venezuelan Bolívar (VES) - Venezuela</option>
                  <option value="₫">₫ - Vietnamese Dong (VND) - Vietnam</option>
                  <option value="﷼">﷼ - Yemeni Rial (YER) - Yemen</option>
                  <option value="ZK">ZK - Zambian Kwacha (ZMW) - Zambia</option>
                  <option value="Z$">Z$ - Zimbabwean Dollar (ZWL) - Zimbabwe</option>
                  
                  <!-- REGIONAL CURRENCIES -->
                  <optgroup label="🌐 REGIONAL & SPECIAL">
                    <option value="EC$">EC$ - East Caribbean Dollar (XCD) - 8 Caribbean Nations</option>
                    <option value="CFP">CFP - CFP Franc (XPF) - French Pacific Territories</option>
                    <option value="£">£ - Falkland Islands Pound (FKP) - Falkland Islands</option>
                  </optgroup>
                  
                  <!-- CRYPTOCURRENCIES -->
                  <optgroup label="💰 CRYPTOCURRENCIES">
                    <option value="₳">₳ - Cardano (ADA)</option>
                    <option value="₿">₿ - Bitcoin (BTC)</option>
                    <option value="Ð">Ð - Dogecoin (DOGE)</option>
                    <option value="Ξ">Ξ - Ethereum (ETH)</option>
                    <option value="Ł">Ł - Litecoin (LTC)</option>
                    <option value="DOT">DOT - Polkadot (DOT)</option>
                    <option value="XRP">XRP - Ripple (XRP)</option>
                    <option value="SOL">SOL - Solana (SOL)</option>
                    <option value="USDC">USDC - USD Coin (USDC)</option>
                    <option value="USDT">USDT - Tether (USDT)</option>
                  </optgroup>
                </select>
              </div>
            </div>
            
            <!-- Duration -->
            <div>
              <label class="block text-sm font-semibold mb-2">Duration (Optional)</label>
              <input
                v-model="serviceForm.duration"
                type="text"
                placeholder="e.g., 8 hours, Full day, 2-3 hours"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-premium-gold focus:border-transparent"
              />
            </div>
            
            <!-- Features -->
            <div>
              <label class="block text-sm font-semibold mb-2">Features (One per line)</label>
              <textarea
                v-model="serviceFormFeaturesText"
                rows="5"
                placeholder="Professional photographer&#10;200+ edited photos&#10;Online gallery&#10;Print rights included"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-premium-gold focus:border-transparent"
              ></textarea>
              <p class="text-xs text-gray-500 mt-1">Enter each feature on a new line</p>
            </div>
            
            <!-- Active Status -->
            <div class="flex items-center">
              <label class="flex items-center cursor-pointer">
                <input
                  v-model="serviceForm.isActive"
                  type="checkbox"
                  class="w-5 h-5 text-premium-gold rounded focus:ring-premium-gold"
                />
                <span class="ml-2 text-sm font-semibold">Active (Visible to customers)</span>
              </label>
            </div>
            
            <!-- Form Actions -->
            <div class="flex gap-4 pt-4 border-t">
              <button
                type="submit"
                :disabled="savingService"
                class="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {{ savingService ? 'Saving...' : (editingService ? 'Update Service' : 'Add Service') }}
              </button>
              <button
                type="button"
                @click="closeServiceForm"
                class="flex-1 btn-secondary"
              >
                Cancel
              </button>
            </div>
            
            <!-- Error/Success Messages -->
            <div v-if="serviceFormMessage" :class="[
              'p-4 rounded-lg text-center',
              serviceFormError ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'
            ]">
              {{ serviceFormMessage }}
            </div>
          </form>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
// Protect admin page with admin middleware
definePageMeta({
  middleware: 'admin'
})

const { user, logout } = useFirebaseAuth()
const { saveImageMetadata } = useFirestore()
const { uploadImage } = useCloudinary()
const { getBookings, updateBooking } = useFirestore()

const activeTab = ref('stats')
const uploading = ref(false)
const uploadMessage = ref('')
const uploadError = ref(false)
const selectedFile = ref<File | null>(null)

const uploadForm = reactive({
  title: '',
  category: '',
  description: '',
  tags: '',
  isPublic: true,
  downloadAllowed: false
})

const bookings = ref<any[]>([])
const loadingBookings = ref(false)

const tabs = [
  { label: '📊 Statistics', value: 'stats' },
  { label: '📤 Upload Images', value: 'upload' },
  { label: '📅 Manage Bookings', value: 'bookings' },
  { label: '🖼️ Gallery Management', value: 'gallery' },
  { label: '⚙️ Manage Services', value: 'services' }
]

// Gallery Management
const galleryImages = ref<any[]>([])
const loadingGallery = ref(false)
const galleryFilter = ref('')

// Services Management
const services = ref<any[]>([])
const loadingServices = ref(false)
const showServiceForm = ref(false)
const editingService = ref<any>(null)
const savingService = ref(false)
const serviceFormMessage = ref('')
const serviceFormError = ref(false)
const serviceFormFeaturesText = ref('')

const serviceForm = reactive({
  name: '',
  description: '',
  price: 0,
  currency: '$',
  duration: '',
  features: [] as string[],
  isActive: true
})

// Statistics
const stats = reactive({
  totalImages: 0,
  totalBookings: 0,
  pendingBookings: 0,
  confirmedToday: 0
})

const recentActivity = ref<any[]>([])
const categoryStats = ref<any[]>([
  { name: 'Wedding', count: 0 },
  { name: 'Portrait', count: 0 },
  { name: 'Commercial', count: 0 },
  { name: 'Event', count: 0 }
])

const handleFileChange = (event: any) => {
  const files = event.target.files
  if (files && files.length > 0) {
    selectedFile.value = files[0]
  }
}

const handleImageUpload = async () => {
  if (!selectedFile.value) return
  
  uploading.value = true
  uploadMessage.value = ''
  uploadError.value = false
  
  try {
    // Upload to Cloudinary
    const cloudinaryResult = await uploadImage(selectedFile.value, {
      folder: 'gallery',
      tags: uploadForm.tags
    })
    
    // Save metadata to Firestore
    const tags = uploadForm.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
    await saveImageMetadata(cloudinaryResult, {
      ...uploadForm,
      tags
    })
    
    uploadMessage.value = 'Image uploaded successfully!'
    uploadError.value = false
    
    // Reset form
    uploadForm.title = ''
    uploadForm.category = ''
    uploadForm.description = ''
    uploadForm.tags = ''
    uploadForm.isPublic = true
    uploadForm.downloadAllowed = false
    selectedFile.value = null
  } catch (error) {
    console.error('Upload error:', error)
    uploadMessage.value = 'Error uploading image. Please try again.'
    uploadError.value = true
  } finally {
    uploading.value = false
  }
}

const loadBookings = async () => {
  loadingBookings.value = true
  try {
    bookings.value = await getBookings()
  } catch (error) {
    console.error('Error loading bookings:', error)
  } finally {
    loadingBookings.value = false
  }
}

const updateBookingStatus = async (bookingId: string, event: any) => {
  const newStatus = event.target.value
  if (!newStatus) return
  
  try {
    await updateBooking(bookingId, { status: newStatus })
    await loadBookings() // Reload bookings
  } catch (error) {
    console.error('Error updating booking:', error)
  }
}

const formatDate = (date: any) => {
  if (!date) return 'N/A'
  const d = date.toDate ? date.toDate() : new Date(date)
  return d.toLocaleDateString()
}

const handleLogout = async () => {
  try {
    await logout()
    navigateTo('/')
  } catch (error) {
    console.error('Logout error:', error)
  }
}

// Gallery Management Functions
const loadGalleryImages = async () => {
  loadingGallery.value = true
  try {
    const { getGalleryImages } = useFirestore()
    const filters = galleryFilter.value ? { category: galleryFilter.value } : {}
    galleryImages.value = await getGalleryImages(filters)
    
    // Update category stats
    const categories = ['Wedding', 'Portrait', 'Commercial', 'Event']
    categoryStats.value = categories.map(cat => ({
      name: cat,
      count: galleryImages.value.filter(img => 
        img.category?.toLowerCase() === cat.toLowerCase()
      ).length
    }))
    
    stats.totalImages = galleryImages.value.length
  } catch (error) {
    console.error('Error loading gallery:', error)
  } finally {
    loadingGallery.value = false
  }
}

const editImage = (image: any) => {
  // For now, just show an alert - can be enhanced with a modal
  const newTitle = prompt('Edit image title:', image.title)
  if (newTitle && newTitle !== image.title) {
    updateImageMetadata(image.id, { title: newTitle })
  }
}

const deleteImage = async (imageId: string) => {
  if (!confirm('Are you sure you want to delete this image?')) return
  
  try {
    const { deleteImage: deleteFromFirestore } = useFirestore()
    await deleteFromFirestore(imageId)
    await loadGalleryImages() // Reload gallery
    
    // Add to recent activity
    recentActivity.value.unshift({
      icon: '🗑️',
      title: 'Image Deleted',
      description: 'An image was removed from the gallery',
      timestamp: new Date()
    })
  } catch (error) {
    console.error('Error deleting image:', error)
    alert('Error deleting image')
  }
}

const updateImageMetadata = async (imageId: string, updates: any) => {
  try {
    const { updateImage } = useFirestore()
    await updateImage(imageId, updates)
    await loadGalleryImages()
    
    recentActivity.value.unshift({
      icon: '✏️',
      title: 'Image Updated',
      description: `Image metadata was updated`,
      timestamp: new Date()
    })
  } catch (error) {
    console.error('Error updating image:', error)
  }
}

// Services Management Functions
const loadServices = async () => {
  loadingServices.value = true
  try {
    const { $firestore } = useNuxtApp()
    const { collection, getDocs, query, orderBy } = await import('firebase/firestore')
    
    const servicesQuery = query(
      collection($firestore, 'services'),
      orderBy('createdAt', 'desc')
    )
    const snapshot = await getDocs(servicesQuery)
    services.value = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
  } catch (error) {
    console.error('Error loading services:', error)
  } finally {
    loadingServices.value = false
  }
}

const openServiceForm = (service: any = null) => {
  if (service) {
    // Edit existing service
    editingService.value = service
    serviceForm.name = service.name
    serviceForm.description = service.description
    serviceForm.price = service.price
    serviceForm.currency = service.currency
    serviceForm.duration = service.duration || ''
    serviceForm.features = service.features || []
    serviceForm.isActive = service.isActive !== false
    serviceFormFeaturesText.value = (service.features || []).join('\n')
  } else {
    // Add new service
    editingService.value = null
    serviceForm.name = ''
    serviceForm.description = ''
    serviceForm.price = 0
    serviceForm.currency = '$'
    serviceForm.duration = ''
    serviceForm.features = []
    serviceForm.isActive = true
    serviceFormFeaturesText.value = ''
  }
  
  serviceFormMessage.value = ''
  serviceFormError.value = false
  showServiceForm.value = true
}

const closeServiceForm = () => {
  showServiceForm.value = false
  editingService.value = null
  serviceFormMessage.value = ''
  serviceFormError.value = false
}

const saveService = async () => {
  savingService.value = true
  serviceFormMessage.value = ''
  serviceFormError.value = false
  
  try {
    const { $firestore } = useNuxtApp()
    const { collection, addDoc, updateDoc, doc, Timestamp } = await import('firebase/firestore')
    
    // Parse features from textarea
    const features = serviceFormFeaturesText.value
      .split('\n')
      .map(f => f.trim())
      .filter(f => f.length > 0)
    
    const serviceData = {
      name: serviceForm.name,
      description: serviceForm.description,
      price: serviceForm.price,
      currency: serviceForm.currency,
      duration: serviceForm.duration,
      features,
      isActive: serviceForm.isActive,
      updatedAt: Timestamp.now()
    }
    
    if (editingService.value) {
      // Update existing service
      const serviceRef = doc($firestore, 'services', editingService.value.id)
      await updateDoc(serviceRef, serviceData)
      serviceFormMessage.value = 'Service updated successfully!'
    } else {
      // Add new service
      await addDoc(collection($firestore, 'services'), {
        ...serviceData,
        createdAt: Timestamp.now()
      })
      serviceFormMessage.value = 'Service added successfully!'
    }
    
    serviceFormError.value = false
    
    // Reload services
    await loadServices()
    
    // Close form after short delay
    setTimeout(() => {
      closeServiceForm()
    }, 1500)
  } catch (error: any) {
    console.error('Error saving service:', error)
    serviceFormMessage.value = error.message || 'Error saving service. Please try again.'
    serviceFormError.value = true
  } finally {
    savingService.value = false
  }
}

const deleteService = async (serviceId: string) => {
  if (!confirm('Are you sure you want to delete this service?')) return
  
  try {
    const { $firestore } = useNuxtApp()
    const { doc, deleteDoc } = await import('firebase/firestore')
    
    const serviceRef = doc($firestore, 'services', serviceId)
    await deleteDoc(serviceRef)
    
    // Reload services
    await loadServices()
  } catch (error) {
    console.error('Error deleting service:', error)
    alert('Error deleting service. Please try again.')
  }
}

// Statistics Functions
const loadStatistics = async () => {
  try {
    // Load bookings for stats
    const allBookings: any[] = await getBookings()
    stats.totalBookings = allBookings.length
    stats.pendingBookings = allBookings.filter((b: any) => b.status === 'pending').length
    
    // Count confirmed bookings today
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    stats.confirmedToday = allBookings.filter((b: any) => {
      if (b.status !== 'confirmed') return false
      const bookingDate = b.bookingDate?.toDate ? b.bookingDate.toDate() : new Date(b.bookingDate)
      bookingDate.setHours(0, 0, 0, 0)
      return bookingDate.getTime() === today.getTime()
    }).length
    
    // Load gallery count
    const { getGalleryImages } = useFirestore()
    const images = await getGalleryImages()
    stats.totalImages = images.length
    
    // Generate recent activity
    recentActivity.value = [
      {
        icon: '📸',
        title: 'New Image Uploaded',
        description: 'A new image was added to the wedding gallery',
        timestamp: new Date(Date.now() - 1000 * 60 * 30) // 30 mins ago
      },
      {
        icon: '📅',
        title: 'Booking Confirmed',
        description: 'John Doe\'s wedding session was confirmed',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2) // 2 hours ago
      },
      {
        icon: '✅',
        title: 'Booking Completed',
        description: 'Portrait session with Jane Smith marked as completed',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5) // 5 hours ago
      }
    ]
  } catch (error) {
    console.error('Error loading statistics:', error)
  }
}

const formatRelativeTime = (date: Date) => {
  const now = new Date()
  const diffInMs = now.getTime() - date.getTime()
  const diffInMins = Math.floor(diffInMs / (1000 * 60))
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60))
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))
  
  if (diffInMins < 60) return `${diffInMins}m ago`
  if (diffInHours < 24) return `${diffInHours}h ago`
  return `${diffInDays}d ago`
}

// Watch for tab changes
watch(activeTab, (newTab) => {
  if (newTab === 'bookings') {
    loadBookings()
  } else if (newTab === 'gallery') {
    loadGalleryImages()
  } else if (newTab === 'stats') {
    loadStatistics()
  } else if (newTab === 'services') {
    loadServices()
  }
})

// Load initial data
onMounted(() => {
  loadStatistics() // Load stats by default
})

// Page metadata
useHead({
  title: 'Admin Dashboard',
  meta: [
    { name: 'robots', content: 'noindex, nofollow' }
  ]
})
</script>
