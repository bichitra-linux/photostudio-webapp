import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  setDoc, 
  query, 
  where, 
  orderBy,
  Timestamp,
  deleteDoc,
  updateDoc,
  getDoc
} from 'firebase/firestore'

export const useFirestore = () => {
  const { $firestore, $auth } = useNuxtApp()
  
  // Save image metadata to Firestore after Cloudinary upload
  const saveImageMetadata = async (cloudinaryData: any, metadata: any) => {
    try {
      const user = $auth.currentUser
      const imageDoc = {
        publicId: cloudinaryData.public_id,
        url: cloudinaryData.secure_url,
        format: cloudinaryData.format,
        width: cloudinaryData.width,
        height: cloudinaryData.height,
        tags: metadata.tags || [],
        category: metadata.category || 'general',
        title: metadata.title || '',
        description: metadata.description || '',
        uploadedBy: user?.uid || 'anonymous',
        uploadedAt: Timestamp.now(),
        isPublic: metadata.isPublic !== false,
        downloadAllowed: metadata.downloadAllowed || false,
        ...metadata
      }
      
      return await addDoc(collection($firestore, 'gallery'), imageDoc)
    } catch (error) {
      console.error('Error saving image metadata:', error)
      throw error
    }
  }
  
  // Get gallery images with filtering
  const getGalleryImages = async (filters: any = {}) => {
    try {
      let queryRef: any = collection($firestore, 'gallery')
      const constraints = []
      
      // Apply filters
      if (filters.category) {
        constraints.push(where('category', '==', filters.category))
      }
      if (filters.tags && filters.tags.length > 0) {
        constraints.push(where('tags', 'array-contains-any', filters.tags))
      }
      if (filters.isPublic !== undefined) {
        constraints.push(where('isPublic', '==', filters.isPublic))
      }
      
      // Add ordering
      constraints.push(orderBy('uploadedAt', 'desc'))
      
      if (constraints.length > 0) {
        queryRef = query(queryRef, ...constraints)
      }
      
      const snapshot = await getDocs(queryRef)
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as Record<string, any>)
      }))
    } catch (error) {
      console.error('Error getting gallery images:', error)
      throw error
    }
  }
  
  // Get single image
  const getImage = async (imageId: string) => {
    try {
      const docRef = doc($firestore, 'gallery', imageId)
      const docSnap = await getDoc(docRef)
      
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() }
      }
      return null
    } catch (error) {
      console.error('Error getting image:', error)
      throw error
    }
  }
  
  // Update image metadata
  const updateImage = async (imageId: string, data: any) => {
    try {
      const docRef = doc($firestore, 'gallery', imageId)
      await updateDoc(docRef, {
        ...data,
        updatedAt: Timestamp.now()
      })
    } catch (error) {
      console.error('Error updating image:', error)
      throw error
    }
  }
  
  // Delete image
  const deleteImage = async (imageId: string) => {
    try {
      const docRef = doc($firestore, 'gallery', imageId)
      await deleteDoc(docRef)
    } catch (error) {
      console.error('Error deleting image:', error)
      throw error
    }
  }
  
  // Save booking to Firestore
  const saveBooking = async (bookingData: any) => {
    try {
      const bookingDoc = {
        ...bookingData,
        createdAt: Timestamp.now(),
        status: 'pending',
        bookingId: generateBookingId()
      }
      
      return await addDoc(collection($firestore, 'bookings'), bookingDoc)
    } catch (error) {
      console.error('Error saving booking:', error)
      throw error
    }
  }
  
  // Get bookings
  const getBookings = async (filters: any = {}) => {
    try {
      let queryRef: any = collection($firestore, 'bookings')
      const constraints = []
      
      if (filters.status) {
        constraints.push(where('status', '==', filters.status))
      }
      if (filters.clientEmail) {
        constraints.push(where('clientEmail', '==', filters.clientEmail))
      }
      
      constraints.push(orderBy('createdAt', 'desc'))
      
      if (constraints.length > 0) {
        queryRef = query(queryRef, ...constraints)
      }
      
      const snapshot = await getDocs(queryRef)
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as Record<string, any>)
      }))
    } catch (error) {
      console.error('Error getting bookings:', error)
      throw error
    }
  }
  
  // Update booking status
  const updateBooking = async (bookingId: string, data: any) => {
    try {
      const docRef = doc($firestore, 'bookings', bookingId)
      await updateDoc(docRef, {
        ...data,
        updatedAt: Timestamp.now()
      })
    } catch (error) {
      console.error('Error updating booking:', error)
      throw error
    }
  }
  
  // CMS content management
  const updateContent = async (contentType: string, content: any) => {
    try {
      const user = $auth.currentUser
      const docRef = doc($firestore, 'cms', contentType)
      await setDoc(docRef, {
        ...content,
        updatedAt: Timestamp.now(),
        updatedBy: user?.uid || 'anonymous'
      }, { merge: true })
    } catch (error) {
      console.error('Error updating content:', error)
      throw error
    }
  }
  
  // Get CMS content
  const getContent = async (contentType: string) => {
    try {
      const docRef = doc($firestore, 'cms', contentType)
      const docSnap = await getDoc(docRef)
      
      if (docSnap.exists()) {
        return docSnap.data()
      }
      return null
    } catch (error) {
      console.error('Error getting content:', error)
      throw error
    }
  }
  
  // Generate unique booking ID
  const generateBookingId = () => {
    return `BK${Date.now()}${Math.random().toString(36).substr(2, 9).toUpperCase()}`
  }
  
  return {
    saveImageMetadata,
    getGalleryImages,
    getImage,
    updateImage,
    deleteImage,
    saveBooking,
    getBookings,
    updateBooking,
    updateContent,
    getContent
  }
}
