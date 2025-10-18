import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  updateProfile,
  type User
} from 'firebase/auth'
import { doc, setDoc, getDoc } from 'firebase/firestore'

export const useFirebaseAuth = () => {
  const { $auth, $firestore } = useNuxtApp()
  const user = useState<User | null>('user', () => null)
  const loading = useState<boolean>('auth-loading', () => true)
  const initialized = useState<boolean>('auth-initialized', () => false)
  
  // Initialize auth state listener (only once)
  const initAuth = () => {
    // Only initialize on client side
    if (process.server) return
    
    // Prevent multiple initializations
    if (initialized.value) return
    
    // Check if Firebase Auth is initialized
    if (!$auth) {
      console.error('❌ Firebase Auth not initialized yet!')
      return
    }
    
    initialized.value = true
    
    onAuthStateChanged($auth, (firebaseUser) => {
      user.value = firebaseUser
      loading.value = false
    })
  }
  
  // Sign in with email and password
  const signIn = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword($auth, email, password)
      user.value = userCredential.user
      return userCredential.user
    } catch (error: any) {
      console.error('Error signing in:', error)
      throw error
    }
  }
  
  // Sign up with email and password
  const signUp = async (email: string, password: string, displayName: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword($auth, email, password)
      
      // Update profile
      await updateProfile(userCredential.user, {
        displayName: displayName
      })
      
      // Create user document in Firestore
      await setDoc(doc($firestore, 'users', userCredential.user.uid), {
        email: email,
        displayName: displayName,
        role: 'client',
        createdAt: new Date(),
        photoURL: null
      })
      
      user.value = userCredential.user
      return userCredential.user
    } catch (error: any) {
      console.error('Error signing up:', error)
      throw error
    }
  }
  
  // Sign out
  const logout = async () => {
    try {
      await signOut($auth)
      user.value = null
    } catch (error: any) {
      console.error('Error signing out:', error)
      throw error
    }
  }
  
  // Reset password
  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail($auth, email)
    } catch (error: any) {
      console.error('Error resetting password:', error)
      throw error
    }
  }
  
  // Get user profile from Firestore
  const getUserProfile = async (uid: string) => {
    try {
      const docRef = doc($firestore, 'users', uid)
      const docSnap = await getDoc(docRef)
      
      if (docSnap.exists()) {
        return docSnap.data()
      }
      return null
    } catch (error: any) {
      console.error('Error getting user profile:', error)
      throw error
    }
  }
  
  // Check if user is admin
  const isAdmin = async () => {
    if (!user.value) return false
    const profile = await getUserProfile(user.value.uid)
    return profile?.role === 'admin'
  }
  
  // Check if user is photographer
  const isPhotographer = async () => {
    if (!user.value) return false
    const profile = await getUserProfile(user.value.uid)
    return profile?.role === 'photographer' || profile?.role === 'admin'
  }
  
  return {
    user,
    loading,
    initAuth,
    signIn,
    signUp,
    logout,
    resetPassword,
    getUserProfile,
    isAdmin,
    isPhotographer
  }
}
