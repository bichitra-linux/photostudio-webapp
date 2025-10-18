export const useCloudinary = () => {
  const config = useRuntimeConfig()
  const cloudinaryCloudName = config.public.cloudinaryCloudName
  const uploadPreset = config.public.cloudinaryUploadPreset
  
  // Upload images to Cloudinary
  const uploadImage = async (file: File, options: any = {}) => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', options.uploadPreset || uploadPreset)
    formData.append('tags', options.tags || 'gallery')
    
    if (options.folder) {
      formData.append('folder', options.folder)
    }
    
    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudinaryCloudName}/image/upload`,
        {
          method: 'POST',
          body: formData
        }
      )
      return await response.json()
    } catch (error) {
      console.error('Error uploading to Cloudinary:', error)
      throw error
    }
  }
  
  // Generate optimized image URLs
  const getOptimizedImage = (publicId: string, transformations: any = {}) => {
    const baseUrl = `https://res.cloudinary.com/${cloudinaryCloudName}/image/upload`
    
    // Default transformations
    const defaultTransforms = {
      quality: 'auto',
      fetch_format: 'auto',
      ...transformations
    }
    
    const transformString = Object.entries(defaultTransforms)
      .map(([key, value]) => `${key}_${value}`)
      .join(',')
    
    return `${baseUrl}/${transformString}/${publicId}`
  }
  
  // Apply watermarks dynamically
  const applyWatermark = (publicId: string) => {
    return `https://res.cloudinary.com/${cloudinaryCloudName}/image/upload/l_watermark,fl_relative,w_0.5,o_50/${publicId}`
  }
  
  // Get thumbnail
  const getThumbnail = (publicId: string, width: number = 300, height: number = 300) => {
    return `https://res.cloudinary.com/${cloudinaryCloudName}/image/upload/c_fill,w_${width},h_${height},q_auto,f_auto/${publicId}`
  }
  
  // Get responsive images
  const getResponsiveImage = (publicId: string, width: number) => {
    return `https://res.cloudinary.com/${cloudinaryCloudName}/image/upload/w_${width},q_auto,f_auto/${publicId}`
  }
  
  return {
    uploadImage,
    getOptimizedImage,
    applyWatermark,
    getThumbnail,
    getResponsiveImage
  }
}
