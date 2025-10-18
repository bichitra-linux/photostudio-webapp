<template>
  <MainLayout>
    <!-- Gallery Header -->
    <section class="pt-32 pb-12 bg-gradient-to-br from-premium-light-gray to-white">
      <div class="section-container">
        <h1 class="text-5xl font-serif font-bold text-premium-black mb-4">Our Gallery</h1>
        <p class="text-xl text-premium-gray">Explore our collection of stunning photography</p>
      </div>
    </section>
    
    <!-- Filters -->
    <section class="section-container py-12">
      <div class="flex flex-wrap gap-4 mb-8">
        <button
          v-for="category in categories"
          :key="category.value"
          @click="selectedCategory = category.value"
          :class="[
            'px-6 py-2 rounded-full font-semibold transition',
            selectedCategory === category.value
              ? 'bg-premium-gold text-white'
              : 'bg-white text-premium-gray hover:bg-premium-light-gray shadow-sm'
          ]"
        >
          {{ category.label }}
        </button>
      </div>
      
      <!-- Gallery Grid -->
      <div v-if="loading" class="text-center py-12">
        <div class="inline-block animate-spin rounded-full h-12 w-12 border-4 border-premium-gold border-t-transparent mb-4"></div>
        <p class="text-premium-gray text-lg">Loading gallery...</p>
      </div>
      
      <div v-else-if="errorMessage" class="text-center py-12 bg-red-50 rounded-lg p-8">
        <p class="text-red-600 mb-4 text-lg">{{ errorMessage }}</p>
        <button 
          @click="reloadGallery"
          class="px-6 py-3 bg-premium-gold text-white rounded-lg hover:bg-premium-gold/90 transition shadow-sm"
        >
          Retry Loading
        </button>
      </div>
      
      <div v-else-if="filteredImages.length === 0" class="text-center py-12 bg-gray-100 rounded-lg p-8">
        <p class="text-premium-gray text-lg mb-2">
          {{ selectedCategory === 'all' ? 'No images uploaded yet.' : 'No images found in this category.' }}
        </p>
        <p class="text-gray-500 text-sm">
          {{ selectedCategory === 'all' ? 'Upload some images from the admin panel to get started!' : 'Try selecting a different category.' }}
        </p>
      </div>
      
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div
          v-for="(image, index) in filteredImages"
          :key="image.id"
          @click="openLightbox(index)"
          class="aspect-square bg-gray-200 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition shadow-lg"
        >
          <img
            v-if="image.url"
            :src="getThumbnail(image.publicId || image.url)"
            :alt="image.title"
            class="w-full h-full object-cover"
            loading="lazy"
          />
          <div v-else class="w-full h-full flex items-center justify-center text-gray-500">
            {{ image.title || 'Photo' }}
          </div>
        </div>
      </div>
    </section>
    
    <!-- Lightbox -->
    <Teleport to="body">
      <div
        v-if="lightboxOpen"
        class="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
        @click="closeLightbox"
      >
        <button
          @click.stop="previousImage"
          class="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-4 rounded-full transition"
        >
          ←
        </button>
        
        <div class="max-w-5xl max-h-full flex flex-col" @click.stop>
          <img
            v-if="currentImage"
            :src="currentImage.url"
            :alt="currentImage.title"
            class="max-w-full max-h-[80vh] object-contain"
          />
          <div v-if="currentImage" class="text-white mt-4 text-center">
            <h3 class="text-2xl font-bold">{{ currentImage.title }}</h3>
            <p class="text-gray-300">{{ currentImage.description }}</p>
          </div>
        </div>
        
        <button
          @click.stop="nextImage"
          class="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-4 rounded-full transition"
        >
          →
        </button>
        
        <button
          @click="closeLightbox"
          class="absolute top-4 right-4 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-4 rounded-full transition"
        >
          ✕
        </button>
      </div>
    </Teleport>
  </MainLayout>
</template>

<script setup lang="ts">
const { getGalleryImages } = useFirestore()
const { getThumbnail: getCloudinaryThumbnail } = useCloudinary()

const selectedCategory = ref('all')
const images = ref<any[]>([])
const loading = ref(true)
const errorMessage = ref('')
const lightboxOpen = ref(false)
const currentImageIndex = ref(0)

const categories = [
  { label: 'All', value: 'all' },
  { label: 'Weddings', value: 'wedding' },
  { label: 'Portraits', value: 'portrait' },
  { label: 'Commercial', value: 'commercial' },
  { label: 'Events', value: 'event' }
]

const filteredImages = computed(() => {
  if (selectedCategory.value === 'all') {
    return images.value
  }
  return images.value.filter(img => img.category === selectedCategory.value)
})

const currentImage = computed(() => {
  return filteredImages.value[currentImageIndex.value]
})

const getThumbnail = (publicId: string) => {
  // Handle full URLs (for backward compatibility)
  if (publicId.startsWith('http')) {
    return publicId
  }
  // Use Cloudinary transformation for public_id
  return getCloudinaryThumbnail(publicId, 400, 400)
}

// Load gallery images from Firestore
const reloadGallery = async () => {
  loading.value = true
  errorMessage.value = ''
  
  try {
    console.log('🔄 Loading gallery images from Firestore...')
    // Fetch all images without isPublic filter to avoid Firestore index requirement
    const allImages = await getGalleryImages({})
    
    // Filter for public images client-side
    const publicImages = allImages.filter((img: any) => img.isPublic === true)
    
    // Sort by uploadedAt descending (newest first) client-side
    publicImages.sort((a: any, b: any) => {
      const aTime = a.uploadedAt?.toMillis?.() || 0
      const bTime = b.uploadedAt?.toMillis?.() || 0
      return bTime - aTime
    })
    
    console.log(`✅ Loaded ${publicImages.length} public images out of ${allImages.length} total:`, publicImages)
    images.value = publicImages
    
    if (publicImages.length === 0) {
      console.log('ℹ️ No public images found in gallery collection')
    }
  } catch (error: any) {
    console.error('❌ Error loading gallery:', error)
    errorMessage.value = error.message || 'Failed to load gallery images. Please try again.'
  } finally {
    loading.value = false
  }
}

const openLightbox = (index: number) => {
  currentImageIndex.value = index
  lightboxOpen.value = true
}

const closeLightbox = () => {
  lightboxOpen.value = false
}

const nextImage = () => {
  if (currentImageIndex.value < filteredImages.value.length - 1) {
    currentImageIndex.value++
  } else {
    currentImageIndex.value = 0
  }
}

const previousImage = () => {
  if (currentImageIndex.value > 0) {
    currentImageIndex.value--
  } else {
    currentImageIndex.value = filteredImages.value.length - 1
  }
}

// Keyboard navigation
const handleKeydown = (event: KeyboardEvent) => {
  if (!lightboxOpen.value) return
  
  if (event.key === 'ArrowRight') {
    nextImage()
  } else if (event.key === 'ArrowLeft') {
    previousImage()
  } else if (event.key === 'Escape') {
    closeLightbox()
  }
}

onMounted(async () => {
  // Load gallery images on mount
  await reloadGallery()
  
  // Setup keyboard navigation
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})

useHead({
  title: 'Gallery',
  meta: [
    { name: 'description', content: 'Browse our collection of professional photography' }
  ]
})
</script>
