# 📸 PhotoStudio# 📸 PhotoStudio - Professional Photography Portfolio & Booking Platform# Premium Photo Studio - Web & Mobile Application



A modern, full-stack photography studio platform with gallery management, online booking, and service administration.



![Nuxt 3](https://img.shields.io/badge/Nuxt-3.x-00DC82?style=flat&logo=nuxt.js)A modern, full-stack photography studio website built with **Nuxt 3**, **Firebase**, and **Cloudinary**. Features include a stunning gallery, online booking system, comprehensive admin dashboard, and service management.A high-end photo studio web application built with Nuxt 3, featuring Firebase Authentication & Firestore for data management, Cloudinary for image hosting, and PWA capabilities for mobile app functionality.

![Firebase](https://img.shields.io/badge/Firebase-10.x-FFCA28?style=flat&logo=firebase)

![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat&logo=typescript)

![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-38B2AC?style=flat&logo=tailwind-css)

---## 🚀 Features

---



## ✨ Features

## ✨ Features### Core Features

### Client Features

- 🖼️ **Gallery** - Filterable portfolio with lightbox, category sorting, and client-side filtering- **Advanced Gallery System**: High-performance image gallery with Cloudinary integration

- 📋 **Services** - Display photography packages with pricing in 180+ world currencies

- 📅 **Booking** - Online appointment system with form validation### 🎨 Client-Facing Features- **Firebase Authentication**: Social login (Google, Facebook, Apple) and email/password

- 📞 **Contact** - Contact form with location integration

- ℹ️ **About** - Studio introduction and team showcase- **Modern Design**: Premium black & gold theme with smooth animations- **Booking System**: Real-time booking calendar with availability tracking



### Admin Dashboard- **Gallery**: Filterable image gallery with lightbox view and category sorting- **Content Management System**: Centralized CMS for web and mobile content

- 📊 **Statistics** - Real-time metrics, activity feed, and analytics

- 📤 **Image Upload** - Direct Cloudinary upload with metadata management- **Services**: Showcase photography services with pricing in 180+ world currencies- **PWA Support**: Installable mobile app with offline functionality

- 🖼️ **Gallery Manager** - Edit, delete, and control image visibility

- 📅 **Booking Manager** - View and update appointment statuses- **Booking System**: Online appointment booking with form validation- **Admin Panel**: Complete management dashboard for images, bookings, and content

- ⚙️ **Service Manager** - CRUD operations for photography services

- **About Page**: Professional studio introduction and team showcase

### Technical Features

- 🔐 Firebase Authentication with admin middleware- **Contact Page**: Contact form with location map integration### Technical Stack

- 📱 Fully responsive mobile-first design

- 🎨 Premium black & gold theme- **Responsive**: Mobile-first design, works on all devices- **Framework**: Nuxt 3 (SSR/SSG capable)

- ⚡ SSR-ready with Nuxt 3

- 🔒 Secure Firestore rules- **Styling**: Tailwind CSS

- ☁️ Cloudinary image optimization

### 🛠️ Admin Dashboard- **Authentication**: Firebase Auth

---

- **Statistics**: Real-time overview of images, bookings, and activity- **Database**: Firebase Firestore

## 🚀 Tech Stack

- **Image Upload**: Direct upload to Cloudinary with metadata management- **Image Storage**: Cloudinary

- **Framework**: Nuxt 3 (Vue.js with SSR)

- **Language**: TypeScript  - Title, description, category, tags- **State Management**: Pinia

- **Authentication**: Firebase Auth

- **Database**: Firestore  - Public/private visibility toggle- **PWA**: @vite-pwa/nuxt

- **Storage**: Cloudinary

- **Styling**: Tailwind CSS  - Download permissions control

- **State**: Pinia

- **Gallery Management**: View, edit, and delete uploaded images## 📋 Prerequisites

---

- **Booking Management**: View and update booking statuses

## 📁 Project Structure

- **Service Management**: Full CRUD operations for services- Node.js (v20.14.0 or higher recommended)

```

photostudio-app/  - Add/edit/delete services- npm or yarn

├── pages/                    # Route pages

│   ├── index.vue            # Homepage  - Set prices in any of 180+ currencies- Firebase account

│   ├── gallery/             # Image gallery

│   ├── services/            # Services showcase  - Manage descriptions, features, and availability- Cloudinary account

│   ├── booking/             # Booking form

│   ├── about/               # About page

│   ├── contact/             # Contact page

│   ├── admin/               # Admin dashboard### 🔐 Authentication & Security## 🛠️ Installation

│   └── auth/                # Login/Register

├── components/- Firebase Authentication (Email/Password)

│   └── MainLayout.vue       # Header/Footer wrapper

├── composables/- Admin-only routes with middleware protection1. **Clone the repository**

│   ├── useFirebaseAuth.ts   # Authentication

│   ├── useFirestore.ts      # Database operations- Secure Firestore rules for data access   ```bash

│   └── useCloudinary.ts     # Image uploads

├── middleware/   cd photostudio-app

│   └── admin.ts             # Admin route protection

├── plugins/---   ```

│   ├── 01.firebase.client.ts

│   └── 02.auth-init.client.ts

└── .env                     # Environment variables (not tracked)

```## 🚀 Tech Stack2. **Install dependencies**



---   ```bash



## ⚙️ Environment Setup| Technology | Purpose |   npm install



Create `.env` in the project root:|------------|---------|   ```



```env| **Nuxt 3** | Vue.js framework with SSR |

# Firebase Configuration

NUXT_PUBLIC_FIREBASE_API_KEY=your_api_key| **TypeScript** | Type-safe development |3. **Set up environment variables**

NUXT_PUBLIC_FIREBASE_AUTH_DOMAIN=yourproject.firebaseapp.com

NUXT_PUBLIC_FIREBASE_PROJECT_ID=yourproject| **Firebase** | Authentication & Firestore database |   

NUXT_PUBLIC_FIREBASE_STORAGE_BUCKET=yourproject.appspot.com

NUXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789| **Cloudinary** | Image hosting & transformation |   Copy `.env.example` to `.env` and fill in your credentials:

NUXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123

| **Tailwind CSS** | Utility-first styling |   ```bash

# Cloudinary Configuration

NUXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name| **Pinia** | State management |   cp .env.example .env

NUXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_upload_preset

```   ```



------



## 📦 Quick Start   Required environment variables:



```bash## 📁 Project Structure   ```env

# Install dependencies

npm install   # Firebase Configuration



# Start development server (http://localhost:3000)```   FIREBASE_API_KEY=your_firebase_api_key

npm run dev

photostudio-app/   FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com

# Build for production

npm run build├── pages/   FIREBASE_PROJECT_ID=your_project_id



# Preview production build│   ├── index.vue              # Homepage   FIREBASE_STORAGE_BUCKET=your_project.appspot.com

npm run preview

```│   ├── gallery/   FIREBASE_MESSAGING_SENDER_ID=your_sender_id



---│   │   └── index.vue          # Image gallery with filters   FIREBASE_APP_ID=your_app_id



## 🔐 Firestore Collections│   ├── services/



### `gallery` Collection│   │   └── index.vue          # Services showcase   # Cloudinary Configuration

```javascript

{│   ├── booking/   CLOUDINARY_CLOUD_NAME=your_cloud_name

  publicId: string,          // Cloudinary ID

  url: string,               // Image URL│   │   └── index.vue          # Booking form   CLOUDINARY_API_KEY=your_api_key

  title: string,

  description: string,│   ├── about/   CLOUDINARY_API_SECRET=your_api_secret

  category: string,          // wedding, portrait, commercial, event

  tags: string[],│   │   └── index.vue          # About page   CLOUDINARY_UPLOAD_PRESET=photostudio_uploads

  isPublic: boolean,         // Controls gallery visibility

  downloadAllowed: boolean,│   ├── contact/   ```

  uploadedBy: string,        // User UID

  uploadedAt: Timestamp,│   │   └── index.vue          # Contact page

  format: string,

  width: number,│   ├── admin/## 🔥 Firebase Setup

  height: number

}│   │   └── index.vue          # Admin dashboard

```

│   └── auth/1. Go to [Firebase Console](https://console.firebase.google.com/)

### `bookings` Collection

```javascript│       ├── login.vue          # Login page2. Create a new project

{

  bookingId: string,         // Auto-generated unique ID│       └── register.vue       # Registration page3. Enable Authentication (Email/Password, Google, etc.)

  name: string,

  email: string,│4. Create a Firestore database

  phone: string,

  service: string,├── components/5. Copy your Firebase configuration to `.env`

  date: string,

  time: string,│   └── MainLayout.vue         # Reusable header/footer

  message: string,

  status: string,            // pending/confirmed/cancelled/completed│### Firestore Collections Structure

  createdAt: Timestamp

}├── composables/

```

│   ├── useFirebaseAuth.ts     # Authentication logic```

### `services` Collection

```javascript│   ├── useFirestore.ts        # Firestore operations- users: User profiles and roles

{

  name: string,│   └── useCloudinary.ts       # Image upload logic- gallery: Image metadata and organization

  description: string,

  price: number,│- bookings: Booking and scheduling data

  currency: string,          // 180+ supported currencies (रु for Nepal!)

  duration: string,          // optional├── middleware/- cms: Website content and pages

  features: string[],        // array of service features

  isActive: boolean,│   └── admin.ts               # Admin route protection- services: Photography services and pricing

  createdAt: Timestamp,

  updatedAt: Timestamp│- testimonials: Client reviews

}

```├── plugins/```



---│   ├── 01.firebase.client.ts  # Firebase initialization



## 🎨 Design Tokens│   └── 02.auth-init.client.ts # Auth state persistence### Firestore Security Rules



```css│

/* Color Palette */

--premium-black: #1a1a1a;       /* Primary text/bg */└── public/                    # Static assets```javascript

--premium-gold: #d4af37;         /* Accents/CTA */

--premium-gray: #666666;         /* Secondary text */```rules_version = '2';

--premium-light-gray: #f5f5f5;   /* Backgrounds */

service cloud.firestore {

/* Typography */

--font-heading: Georgia, serif;   /* Elegance */---  match /databases/{database}/documents {

--font-body: Inter, system-ui;    /* Readability */

    // Gallery - read for authenticated, write for admins

/* Breakpoints */

sm: 640px   |  md: 768px   |  lg: 1024px## 🎯 Key Features Breakdown    match /gallery/{document} {

xl: 1280px  |  2xl: 1536px

```      allow read: if request.auth != null;



---### 1. Gallery System      allow write: if request.auth != null 



## 🛡️ Security Notes- **Public/Private Images**: Admin controls which images appear in gallery        && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role in ['admin', 'photographer'];



### SSR Configuration- **Category Filtering**: Wedding, Portrait, Commercial, Event    }

- Firebase plugins are **client-only** (`.client.ts` suffix)

- Auth checks run client-side to prevent hydration errors- **Lightbox View**: Full-screen image viewing with keyboard navigation    

- No server-side Firebase operations

- **Cloudinary Integration**: Automatic image optimization and transformation    // Bookings - users can create, admins can manage

### Firestore Rules (Production)

```javascript- **Responsive Grid**: Adapts to any screen size    match /bookings/{document} {

rules_version = '2';

service cloud.firestore {      allow read, create: if request.auth != null;

  match /databases/{database}/documents {

    match /gallery/{document=**} {### 2. Admin Dashboard Tabs      allow update: if request.auth != null 

      allow read: if true;

      allow write: if request.auth != null;        && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role in ['admin', 'photographer'];

    }

    match /bookings/{document=**} {#### 📊 Statistics    }

      allow create: if true;

      allow read, update, delete: if request.auth != null;- Total images and bookings count    

    }

    match /services/{document=**} {- Pending bookings alert    // CMS - admin only

      allow read: if true;

      allow write: if request.auth != null;- Recent activity feed    match /cms/{document} {

    }

  }- Category breakdown with visual charts      allow read: if request.auth != null;

}

```      allow write: if request.auth != null 



---#### 📤 Upload Images        && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';



## 🐛 Common Issues- Direct Cloudinary upload    }



| Issue | Solution |- Metadata fields: title, description, category, tags  }

|-------|----------|

| Gallery images not showing | Check `isPublic` checkbox was enabled during upload |- Public visibility toggle}

| Firestore index error | Gallery fetches all images and filters client-side |

| Firebase "No app" error | Verify `.env` exists and restart dev server |- Download permissions control```

| Cloudinary upload fails | Confirm upload preset is "Unsigned" in Cloudinary settings |

| Admin redirect loop | Ensure Firebase Auth is enabled and user is logged in |- Real-time upload progress



---## ☁️ Cloudinary Setup



## 📚 Key Features Explained#### 📅 Manage Bookings



### Image Upload Flow- View all booking submissions1. Sign up at [Cloudinary](https://cloudinary.com/)

1. Admin selects image in dashboard

2. Image uploads to Cloudinary (cloud storage)- Update booking status (Pending/Confirmed/Cancelled/Completed)2. Go to Settings → Upload → Add upload preset

3. Metadata saved to Firestore

4. Public images appear in client gallery automatically- Sort by date and status3. Create an unsigned upload preset named `photostudio_uploads`



### Gallery Filtering- Client contact information4. Copy your Cloud Name, API Key, and API Secret to `.env`

- Fetches all images from Firestore (no index required)

- Filters for `isPublic: true` client-side

- Sorts by upload date (newest first)

- Category filtering in real-time#### 🖼️ Gallery Management## 🚀 Development



### Service Management- View all uploaded images

- Supports 180+ world currencies (alphabetically sorted)

- Nepalese Rupee uses correct symbol: **रु**- Filter by categoryStart the development server:

- Features input: one feature per line

- Active/inactive toggle controls visibility- Edit image metadata



### Booking System- Delete images```bash

- Client submits booking form

- Saved to Firestore with "pending" status- Public/Private status badgesnpm run dev

- Admin views in dashboard

- Status updates: pending → confirmed → completed```



---#### ⚙️ Manage Services



## 🚀 Deployment- Add new photography servicesThe app will be available at `http://localhost:3000`



### Recommended Platforms- Edit existing services

- **Vercel** - Best for Nuxt 3 (zero config)

- **Netlify** - Easy deployment with Git- Delete services## 📦 Building for Production

- **Firebase Hosting** - Integrated with backend

- Set pricing in 180+ world currencies

### Environment Variables

Set these in your hosting platform:- Add detailed descriptions and features### Static Generation (Recommended for hosting on Vercel/Netlify)

- All `NUXT_PUBLIC_FIREBASE_*` variables

- All `NUXT_PUBLIC_CLOUDINARY_*` variables- Toggle active/inactive status



### Build Command```bash

```bash

npm run build### 3. Service Management Featuresnpm run generate

```

- **180+ Currencies**: Support for every major world currency```

---

- **Alphabetically Sorted**: Easy to find any currency

## 📖 Documentation

- **Rich Features**: Multi-line features input### Server-Side Rendering

- **Setup Guide**: See [SETUP_GUIDE.md](./SETUP_GUIDE.md) for detailed installation

- **Nuxt 3**: https://nuxt.com/docs- **Active Status**: Control service visibility

- **Firebase**: https://firebase.google.com/docs

- **Cloudinary**: https://cloudinary.com/documentation- **Duration Field**: Specify service duration```bash

- **Tailwind CSS**: https://tailwindcss.com/docs

- **Price Display**: Formatted with currency symbols and separatorsnpm run build

---

npm run preview

## 🎯 Future Roadmap

---```

- [ ] Email notifications for bookings

- [ ] Client portal for photo viewing

- [ ] Image watermarking options

- [ ] Multi-language support## 🔧 Environment Variables## 🌐 Deployment

- [ ] Blog/portfolio articles

- [ ] Service-booking integration

- [ ] Advanced analytics

- [ ] Invoice generationCreate a `.env` file in the root directory:### Vercel (Recommended)



---1. Push your code to GitHub



## 📄 License```env2. Import your repository in Vercel



Private and Proprietary# Firebase Configuration3. Add environment variables in Vercel dashboard



---NUXT_PUBLIC_FIREBASE_API_KEY=your_api_key4. Deploy!



## 🤝 ContributingNUXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com



This is a private project. For issues or suggestions, contact the project maintainer.NUXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id### Netlify



---NUXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com1. Connect your repository



**Built with ❤️ using Nuxt 3, Firebase, and Cloudinary**NUXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id2. Set build command: `npm run generate`



*Last Updated: October 18, 2025*NUXT_PUBLIC_FIREBASE_APP_ID=your_app_id3. Set publish directory: `.output/public`


4. Add environment variables

# Cloudinary Configuration5. Deploy!

NUXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name

NUXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_upload_preset## 📱 PWA Features

```

The application includes:

---- Offline gallery browsing

- Add to home screen functionality

## 📦 Installation & Setup- Push notifications (when configured)

- Background sync

See **[SETUP_GUIDE.md](./SETUP_GUIDE.md)** for detailed instructions.- Service worker for caching



Quick start:## 👨‍💼 Admin Panel

```bash

# Install dependenciesAccess the admin panel at `/admin` (requires authentication)

npm install

Features:

# Start development server- Upload and manage images

npm run dev- View and manage bookings

- Update website content

# Build for production- User management (coming soon)

npm run build

## 📁 Project Structure

# Preview production build

npm run preview```

```photostudio-app/

├── assets/

---│   └── css/

│       └── main.css           # Global styles

## 🎨 Design System├── components/                # Vue components

├── composables/

### Color Palette│   ├── useCloudinary.ts      # Cloudinary integration

- **Premium Black**: `#1a1a1a` - Primary text and backgrounds│   ├── useFirebaseAuth.ts    # Firebase Auth

- **Premium Gold**: `#d4af37` - Accents and CTAs│   └── useFirestore.ts       # Firestore operations

- **Premium Gray**: `#666666` - Secondary text├── pages/

- **Premium Light Gray**: `#f5f5f5` - Backgrounds│   ├── index.vue             # Home page

│   ├── gallery/

### Typography│   │   └── index.vue         # Gallery page

- **Headings**: Serif font (Georgia) for elegance│   ├── booking/

- **Body**: Sans-serif (Inter/System) for readability│   │   └── index.vue         # Booking page

│   └── admin/

### Components│       └── index.vue         # Admin dashboard

- Consistent button styles (primary/secondary)├── plugins/

- Form inputs with focus states│   └── firebase.client.ts    # Firebase initialization

- Loading states and animations├── public/                   # Static assets

- Error/success message patterns├── .env                      # Environment variables (not in git)

├── nuxt.config.ts           # Nuxt configuration

---├── package.json             # Dependencies

└── tailwind.config.js       # Tailwind configuration

## 🔐 Firebase Security```



### Firestore Collections## 🔒 Security



#### `gallery` Collection- All API keys are stored in environment variables

```javascript- Firebase security rules protect data access

{- Cloudinary uploads use signed requests

  publicId: string,        // Cloudinary public ID- Admin routes are protected with middleware

  url: string,             // Image URL- XSS and CSRF protection enabled

  title: string,

  description: string,## 🤝 Contributing

  category: string,

  tags: string[],1. Fork the repository

  isPublic: boolean,       // Controls gallery visibility2. Create a feature branch

  downloadAllowed: boolean,3. Commit your changes

  uploadedBy: string,      // User UID4. Push to the branch

  uploadedAt: Timestamp,5. Open a pull request

  format: string,

  width: number,## 📝 License

  height: number

}This project is licensed under the MIT License.

```

## 🆘 Support

#### `bookings` Collection

```javascriptFor issues and questions:

{- Check the [documentation](https://nuxt.com/docs)

  bookingId: string,       // Unique booking ID- Open an issue on GitHub

  name: string,- Contact support at info@photostudio.com

  email: string,

  phone: string,## 🎯 Roadmap

  service: string,

  date: string,- [ ] Social media integration

  time: string,- [ ] Advanced image editing features

  message: string,- [ ] Payment integration

  status: string,          // pending/confirmed/cancelled/completed- [ ] Client portal with private galleries

  createdAt: Timestamp- [ ] AI-powered image tagging

}- [ ] Virtual tours (360° views)

```- [ ] Mobile app (iOS/Android)



#### `services` Collection---

```javascript

{Built with ❤️ using Nuxt 3, Firebase, and Cloudinary

  name: string,
  description: string,
  price: number,
  currency: string,        // 180+ supported currencies
  duration: string,
  features: string[],
  isActive: boolean,
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

---

## 🚨 Important Notes

### SSR Configuration
- Firebase plugins are **client-only** (`.client.ts`)
- Auth middleware checks run client-side only
- No server-side Firebase operations to prevent hydration errors

### Image Handling
- All images uploaded to Cloudinary
- Firestore stores only metadata and URLs
- Automatic image optimization via Cloudinary transformations

### Admin Access
- Only authenticated users can access `/admin`
- Register first user, then manually set as admin in Firebase Console
- Admin middleware protects all admin routes

---

## 📱 Responsive Breakpoints

```css
sm: 640px   /* Mobile landscape */
md: 768px   /* Tablet portrait */
lg: 1024px  /* Tablet landscape */
xl: 1280px  /* Desktop */
2xl: 1536px /* Large desktop */
```

---

## 🐛 Troubleshooting

### Common Issues

**Issue**: Firestore index error in gallery
**Solution**: Gallery fetches all images and filters client-side to avoid requiring composite index

**Issue**: Images not showing in gallery
**Solution**: Ensure `isPublic` checkbox is checked when uploading in admin panel

**Issue**: "Cannot redefine property: $auth" error
**Solution**: Ensure only one Firebase client plugin exists (delete duplicates)

**Issue**: Admin page redirects to login
**Solution**: Check Firebase Authentication is enabled and user is logged in

---

## 🎯 Future Enhancements

Potential features to add:
- [ ] Image editing (crop, filters) before upload
- [ ] Bulk image operations
- [ ] Service booking integration (link services to bookings)
- [ ] Email notifications for bookings
- [ ] Customer testimonials section
- [ ] Blog/Portfolio articles
- [ ] Multi-language support
- [ ] Dark/light theme toggle
- [ ] Advanced analytics dashboard
- [ ] Client portal for viewing their photos
- [ ] Watermark options for images
- [ ] Invoice generation for services

---

## 📄 License

This project is private and proprietary.

---

## 👨‍💻 Developer

Built with ❤️ using modern web technologies.

For setup instructions, see **[SETUP_GUIDE.md](./SETUP_GUIDE.md)**

---

**Last Updated**: October 18, 2025
