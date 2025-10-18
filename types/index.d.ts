import type { Auth } from 'firebase/auth'
import type { Firestore } from 'firebase/firestore'
import type { FirebaseApp } from 'firebase/app'

declare module '#app' {
  interface NuxtApp {
    $auth: Auth
    $firestore: Firestore
    $firebase: FirebaseApp
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $auth: Auth
    $firestore: Firestore
    $firebase: FirebaseApp
  }
}

export {}
