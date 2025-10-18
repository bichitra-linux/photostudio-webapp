# 🚀 Setup Guide - PhotoStudio# 🚀 PhotoStudio Setup Guide# Photo Studio Application - Complete Setup Guide



Complete installation and configuration guide for PhotoStudio platform.



---Complete step-by-step guide to set up and run the PhotoStudio application.## Project Overview



## 📋 PrerequisitesThis is a premium photo studio web application built with:



Install these before starting:---- **Nuxt 3** - Vue.js framework for building web applications



- **Node.js** v18+ → [Download](https://nodejs.org/)- **Firebase** - Authentication and Firestore database

- **Firebase Account** → [Sign up](https://firebase.google.com/)

- **Cloudinary Account** → [Sign up](https://cloudinary.com/)## 📋 Prerequisites- **Cloudinary** - Image hosting and management

- **Code Editor** (VS Code recommended)

- **Tailwind CSS** - Utility-first CSS framework

---

Before starting, ensure you have:- **PWA** - Progressive Web App capabilities

## 🔥 Firebase Configuration



### 1. Create Project

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)## Step-by-Step Setup Instructions

1. Visit [Firebase Console](https://console.firebase.google.com/)

2. Click **"Add project"**- **npm** or **yarn** package manager

3. Name: `photostudio` (or your choice)

4. Disable Google Analytics (optional)- **Git** (optional, for version control)### 1. Install Dependencies

5. Click **"Create project"**

- **Firebase Account** - [Sign up here](https://firebase.google.com/)

### 2. Enable Authentication

- **Cloudinary Account** - [Sign up here](https://cloudinary.com/)Navigate to the project directory and run:

1. **Build** → **Authentication** → **Get started**

2. **Sign-in method** tab

3. Enable **Email/Password**

4. Save---```bash



### 3. Create Firestore Databasecd photostudio-app



1. **Build** → **Firestore Database** → **Create database**## 🛠️ Step 1: Firebase Setupnpm install

2. Select **"Test mode"** (for development)

3. Choose your region```

4. Click **Enable**

### 1.1 Create Firebase Project

Collections will auto-create:

- `gallery` - Image metadataIf you encounter any issues, try:

- `bookings` - Booking submissions  

- `services` - Photography services1. Go to [Firebase Console](https://console.firebase.google.com/)```bash



### 4. Get Firebase Config2. Click **"Add project"**npm install --legacy-peer-deps



1. **Project Settings** (⚙️ icon)3. Enter project name (e.g., "photostudio")```

2. Scroll to **"Your apps"**

3. Click web icon **</>**4. Disable Google Analytics (optional)

4. Register app: `PhotoStudio Web`

5. Copy the config object:5. Click **"Create project"**### 2. Firebase Setup



```javascript

{

  apiKey: "AIza...",### 1.2 Enable Authentication#### A. Create Firebase Project

  authDomain: "photostudio-xxx.firebaseapp.com",

  projectId: "photostudio-xxx",1. Go to [Firebase Console](https://console.firebase.google.com/)

  storageBucket: "photostudio-xxx.appspot.com",

  messagingSenderId: "123456789",1. In Firebase Console, go to **Build > Authentication**2. Click "Add project"

  appId: "1:123456789:web:..."

}2. Click **"Get started"**3. Enter project name: "PhotoStudio" (or your preferred name)

```

3. Go to **"Sign-in method"** tab4. Enable Google Analytics (optional)

---

4. Enable **"Email/Password"**5. Click "Create project"

## ☁️ Cloudinary Configuration

5. Click **"Save"**

### 1. Create Account

#### B. Enable Authentication

1. Visit [Cloudinary](https://cloudinary.com/)

2. Sign up (free tier is sufficient)### 1.3 Create Firestore Database1. In Firebase Console, go to "Authentication"

3. Verify email

2. Click "Get started"

### 2. Get Credentials

1. In Firebase Console, go to **Build > Firestore Database**3. Enable "Email/Password" sign-in method

1. Go to **Dashboard**

2. Copy **Cloud Name** (e.g., `dxxxxx`)2. Click **"Create database"**4. (Optional) Enable Google, Facebook, etc.



### 3. Create Upload Preset3. Select **"Start in test mode"** (for development)



1. **Settings** → **Upload**4. Choose a location closest to you#### C. Create Firestore Database

2. **Upload presets** section

3. Click **"Add upload preset"**5. Click **"Enable"**1. Go to "Firestore Database"

4. Configure:

   - **Preset name**: `photostudio_unsigned`2. Click "Create database"

   - **Signing mode**: **Unsigned** ⚠️ Important!

   - **Folder**: `photostudio` (optional)### 1.4 Set Up Firestore Collections3. Start in "Production mode"

5. Click **Save**

4. Choose a location close to your users

---

Your database will auto-create collections when data is added, but here's the structure:5. Click "Enable"

## 💻 Project Installation



### 1. Get Project Files

**Collections:**#### D. Set Up Security Rules

```bash

# Clone repository- `gallery` - Stores image metadataIn Firestore, go to "Rules" tab and paste:

git clone <your-repo-url>

cd photostudio-app- `bookings` - Stores booking submissions



# OR extract ZIP- `services` - Stores photography services```javascript

# Navigate to extracted folder

```rules_version = '2';



### 2. Install Dependencies### 1.5 Get Firebase Configurationservice cloud.firestore {



```bash  match /databases/{database}/documents {

npm install

```1. Go to **Project Settings** (gear icon)    // Gallery access



This installs:2. Scroll down to **"Your apps"**    match /gallery/{document} {

- Nuxt 3

- Firebase SDK3. Click **web icon** (</>) to add a web app      allow read: if request.auth != null;

- TypeScript

- Tailwind CSS4. Register your app with a nickname      allow write: if request.auth != null 

- All dependencies

5. Copy the configuration object:        && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role in ['admin', 'photographer'];

**Expected time**: 2-5 minutes

    }

---

```javascript    

## 🔐 Environment Variables

const firebaseConfig = {    // Bookings

### 1. Create `.env` File

  apiKey: "AIza...",    match /bookings/{document} {

In project root (`photostudio-app/`):

  authDomain: "yourproject.firebaseapp.com",      allow read, create: if request.auth != null;

**Windows (PowerShell)**

```powershell  projectId: "yourproject",      allow update: if request.auth != null 

New-Item .env

```  storageBucket: "yourproject.appspot.com",        && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role in ['admin', 'photographer'];



**Mac/Linux**  messagingSenderId: "123456789",    }

```bash

touch .env  appId: "1:123456789:web:..."    

```

};    // CMS - admin only

### 2. Add Configuration

```    match /cms/{document} {

Open `.env` and paste (replace with YOUR values):

      allow read: if request.auth != null;

```env

# Firebase Configuration (from Firebase Console)---      allow write: if request.auth != null 

NUXT_PUBLIC_FIREBASE_API_KEY=AIza_YOUR_API_KEY_HERE

NUXT_PUBLIC_FIREBASE_AUTH_DOMAIN=photostudio-xxx.firebaseapp.com        && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';

NUXT_PUBLIC_FIREBASE_PROJECT_ID=photostudio-xxx

NUXT_PUBLIC_FIREBASE_STORAGE_BUCKET=photostudio-xxx.appspot.com## ☁️ Step 2: Cloudinary Setup    }

NUXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789

NUXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123def456    



# Cloudinary Configuration (from Cloudinary Dashboard)### 2.1 Create Cloudinary Account    // User profiles

NUXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dxxxxx

NUXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=photostudio_unsigned    match /users/{userId} {

```

1. Go to [Cloudinary](https://cloudinary.com/)      allow read, write: if request.auth != null && request.auth.uid == userId;

**⚠️ Critical:**

- Replace ALL values with your actual credentials2. Sign up for a free account    }

- Keep this file secret (never commit to Git)

- File must be named exactly `.env` (with the dot)3. Verify your email  }



---}



## 🎬 Launch Application### 2.2 Get Cloudinary Credentials```



### Start Development Server



```bash1. Go to **Dashboard**#### E. Get Firebase Config

npm run dev

```2. Copy your **Cloud Name** (e.g., "dxxxxxx")1. Go to Project Settings (gear icon)



**Output:**3. Go to **Settings > Upload**2. Scroll to "Your apps" section

```

✔ Vite warmed up in 1234ms4. Scroll to **Upload presets**3. Click the web icon (</>)

✔ Nuxt devtools is running at ...

5. Click **"Add upload preset"**4. Register app with nickname "PhotoStudio Web"

  > Local:    http://localhost:3000/

  > Network:  use --host to expose6. Set:5. Copy the config values

```

   - **Preset name**: `photostudio_preset` (or any name)

Visit: **http://localhost:3000**

   - **Signing mode**: `Unsigned`### 3. Cloudinary Setup

### Verify Installation

   - **Folder**: `photostudio` (optional)

Check these pages load:

- ✅ Homepage (`/`)7. Click **"Save"**#### A. Create Account

- ✅ Gallery (`/gallery`)

- ✅ Services (`/services`)8. Copy the **preset name**1. Sign up at [Cloudinary](https://cloudinary.com/)

- ✅ Booking (`/booking`)

- ✅ About (`/about`)2. Verify your email

- ✅ Contact (`/contact`)

---

**Press F12** to check for console errors (should be none)

#### B. Create Upload Preset

---

## 💻 Step 3: Project Installation1. Go to Settings → Upload

## 👤 Admin Setup

2. Scroll to "Upload presets"

### 1. Register Admin Account

### 3.1 Download/Clone Project3. Click "Add upload preset"

1. Go to: http://localhost:3000/auth/register

2. Fill form:4. Set preset name: `photostudio_uploads`

   ```

   Email: admin@yourstudio.com```bash5. Signing Mode: "Unsigned"

   Password: YourSecurePassword123!

   ```# If using Git6. Folder: `gallery`

3. Click **Register**

4. Redirects to homepage after successgit clone <repository-url>7. Click "Save"



### 2. Access Admin Dashboardcd photostudio-app



1. Navigate to: http://localhost:3000/admin#### C. Get Credentials

2. Login if prompted

3. You should see admin dashboard with 5 tabs# Or extract from ZIP and navigate to folder1. Go to Dashboard



### 3. Test Each Featurecd path/to/photostudio-app2. Copy your:



#### 📊 Statistics Tab```   - Cloud name

- View dashboard overview

- Check metrics display   - API Key



#### 📤 Upload Images Tab### 3.2 Install Dependencies   - API Secret

1. Click **"Choose File"** → Select image

2. Fill in:

   - **Title**: "Test Photo"

   - **Category**: "Wedding"```bash### 4. Environment Variables

   - **Description**: "Test description"

   - **Tags**: "test, photo"npm install

3. ✅ Check **"Make Public"**

4. ✅ Check **"Allow Download"** (optional)```1. Copy the example environment file:

5. Click **"Upload Image"**

6. Wait for success message   ```bash



#### 🖼️ Gallery Management TabThis will install all required packages including:   cp .env.example .env

1. See your uploaded image

2. Try filtering by category- Nuxt 3   ```

3. Test edit/delete buttons

- Firebase SDK

#### 📅 Manage Bookings Tab

1. Submit test booking from `/booking` page- Tailwind CSS2. Edit `.env` with your credentials:

2. Return to admin

3. See booking appear in list- TypeScript



#### ⚙️ Manage Services Tab- And all other dependencies```env

1. Click **"+ Add New Service"**

2. Fill form:# Firebase Configuration (from step 2.E)

   ```

   Service Name: Wedding Photography---FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

   Description: Full-day wedding coverage with...

   Price: 2500FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com

   Currency: रु - Nepalese Rupee (NPR) - Nepal

   Duration: 8 hours## 🔐 Step 4: Environment ConfigurationFIREBASE_PROJECT_ID=your-project-id

   Features: (one per line)

   Professional photographerFIREBASE_STORAGE_BUCKET=your-project.appspot.com

   300+ edited photos

   Online gallery### 4.1 Create Environment FileFIREBASE_MESSAGING_SENDER_ID=123456789012

   Print rights

   ```FIREBASE_APP_ID=1:123456789012:web:abcdef123456

3. ✅ Check **"Active"**

4. Click **"Add Service"**In the project root (`photostudio-app/`), create a file named `.env`:



---# Cloudinary Configuration (from step 3.C)



## ✅ Verification Checklist```bashCLOUDINARY_CLOUD_NAME=your_cloud_name



Test these workflows:# Windows (PowerShell)CLOUDINARY_API_KEY=123456789012345



### Image Upload → Gallery DisplayNew-Item .envCLOUDINARY_API_SECRET=abcdefghijklmnopqrstuvwxyz

1. **Admin** → Upload image (Public: ✅)

2. **Gallery** → Image appearsCLOUDINARY_UPLOAD_PRESET=photostudio_uploads

3. Click image → Lightbox opens

4. Test category filters# Mac/Linux```



### Booking Submission → Admin Reviewtouch .env

1. **Booking** → Fill and submit form

2. **Admin** → See booking in "Manage Bookings"```### 5. Create Admin User

3. Update status to "Confirmed"



### Service Creation → Public Display

1. **Admin** → Create service (Active: ✅)### 4.2 Add Environment VariablesAfter starting the app:

2. **Services** → Service appears with price

3. Test "Book Now" button1. Go to `/auth/login`



---Open `.env` and add your credentials:2. Create a new account



## 🏗️ Production Deployment3. In Firebase Console:



### 1. Build Application```env   - Go to Firestore Database



```bash# Firebase Configuration (from Step 1.5)   - Find the `users` collection

npm run build

```NUXT_PUBLIC_FIREBASE_API_KEY=AIza...your_api_key   - Find your user document



Generates optimized production files.NUXT_PUBLIC_FIREBASE_AUTH_DOMAIN=yourproject.firebaseapp.com   - Edit it and add/change field: `role: "admin"`



### 2. Preview Build LocallyNUXT_PUBLIC_FIREBASE_PROJECT_ID=yourproject



```bashNUXT_PUBLIC_FIREBASE_STORAGE_BUCKET=yourproject.appspot.com### 6. Run Development Server

npm run preview

```NUXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789



Test at: http://localhost:3000NUXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:...```bash



### 3. Deploy to Hostingnpm run dev



#### Option A: Vercel (Recommended)# Cloudinary Configuration (from Step 2.2)```



```bashNUXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name

# Install Vercel CLI

npm i -g vercelNUXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=photostudio_presetThe app will run at `http://localhost:3000`



# Deploy```

vercel

```### 7. Test the Application



Add environment variables in Vercel dashboard.**⚠️ Important:**



#### Option B: Netlify- Replace ALL placeholder values with your actual credentials1. **Home Page**: `http://localhost:3000/`



1. Connect Git repository- DO NOT commit `.env` to version control2. **Gallery**: `http://localhost:3000/gallery`

2. Build command: `npm run build`

3. Publish directory: `.output/public`- Keep your credentials secure3. **Booking**: `http://localhost:3000/booking`

4. Add environment variables

4. **Login**: `http://localhost:3000/auth/login`

#### Option C: Firebase Hosting

---5. **Admin Panel**: `http://localhost:3000/admin` (after login)

```bash

# Install Firebase CLI

npm i -g firebase-tools

## 🚀 Step 5: Run the Application## Building for Production

# Login and init

firebase login

firebase init hosting

### 5.1 Start Development Server### Static Generation (for Vercel, Netlify)

# Deploy

firebase deploy --only hosting```bash

```

```bashnpm run generate

---

npm run dev```

## 🔒 Production Security

```

### Update Firestore Rules

### SSR Build

**Firebase Console** → **Firestore** → **Rules**

The application will start at: **http://localhost:3000**```bash

```javascript

rules_version = '2';npm run build

service cloud.firestore {

  match /databases/{database}/documents {### 5.2 Verify Installationnpm run preview

    // Gallery: Public read, authenticated write

    match /gallery/{document=**} {```

      allow read: if true;

      allow write: if request.auth != null;Open your browser and check:

    }

    ## Deployment Options

    // Bookings: Public create, authenticated manage

    match /bookings/{document=**} {- ✅ Homepage loads without errors

      allow create: if true;

      allow read, update, delete: if request.auth != null;- ✅ Navigation works (Gallery, Services, Booking, etc.)### Option 1: Vercel (Recommended)

    }

    - ✅ No console errors in browser DevTools (F12)1. Push code to GitHub

    // Services: Public read, authenticated write

    match /services/{document=**} {2. Go to [Vercel](https://vercel.com/)

      allow read: if true;

      allow write: if request.auth != null;---3. Import repository

    }

  }4. Add environment variables

}

```## 👤 Step 6: Create Admin Account5. Deploy!



Click **Publish**



### Add Authorized Domains### 6.1 Register First User### Option 2: Netlify



**Firebase Console** → **Authentication** → **Settings** → **Authorized domains**1. Push code to GitHub



Add your production domain:1. Go to **http://localhost:3000/auth/register**2. Go to [Netlify](https://netlify.com/)

- `yourstudio.com`

- `www.yourstudio.com`2. Fill in the registration form:3. New site from Git



---   - Email: your_email@example.com4. Build command: `npm run generate`



## 🎨 Customization Guide   - Password: (strong password)5. Publish directory: `.output/public`



### Update Branding3. Click **"Register"**6. Add environment variables



**File**: `tailwind.config.ts`4. You'll be redirected to homepage7. Deploy!

```typescript

theme: {

  extend: {

    colors: {### 6.2 Access Admin Dashboard## Troubleshooting

      'premium-black': '#1a1a1a',  // Your brand color

      'premium-gold': '#d4af37',   // Your accent color

      'premium-gray': '#666666',

      'premium-light-gray': '#f5f5f5'1. Go to **http://localhost:3000/admin**### Issue: npm install fails

    }

  }2. You should see the admin dashboard**Solution**: Try `npm install --legacy-peer-deps`

}

```3. If redirected to login, log in with your credentials



### Update Site Info### Issue: Firebase connection error



**File**: `nuxt.config.ts`### 6.3 Test Admin Features**Solution**: Check your `.env` file has correct Firebase credentials

```typescript

app: {

  head: {

    title: 'Your Studio Name - Professional Photography',Try each tab:### Issue: Images not uploading

    meta: [

      { name: 'description', content: 'Your studio tagline...' }- **📊 Statistics**: View dashboard overview**Solution**: 

    ]

  }- **📤 Upload Images**: Upload a test image- Verify Cloudinary credentials in `.env`

}

```- **📅 Manage Bookings**: View submitted bookings- Check upload preset is set to "Unsigned"



### Update Content- **🖼️ Gallery Management**: Manage uploaded images- Ensure CORS is configured in Cloudinary settings



Edit these files:- **⚙️ Manage Services**: Add a photography service

- `pages/index.vue` - Homepage hero and content

- `pages/about/index.vue` - Studio story### Issue: "Cannot find module" errors

- `pages/contact/index.vue` - Contact info and location

- `pages/services/index.vue` - Services intro text---**Solution**: Run `npm install` again and restart dev server



### Add Logo



1. Add logo file: `public/logo.png`## ✅ Step 7: Verify Everything Works### Issue: Admin panel shows "Please login"

2. Update in: `components/MainLayout.vue`

**Solution**: 

---

### 7.1 Test Image Upload- Make sure you're logged in

## 🐛 Troubleshooting

- Check your user has `role: "admin"` in Firestore

### "npm install" fails

1. Go to **Admin > Upload Images**

```bash

# Clear cache2. Select an image file## Project Structure

npm cache clean --force

3. Fill in title, description, category

# Delete and reinstall

rm -rf node_modules package-lock.json4. Check **"Make Public"**```

npm install

```5. Click **"Upload Image"**photostudio-app/



### Firebase connection errors6. Wait for success message├── assets/css/              # Global styles



- ✅ Check `.env` file exists in project root├── components/              # Reusable Vue components

- ✅ Verify all `NUXT_PUBLIC_FIREBASE_*` variables are set

- ✅ No quotes around values in `.env`### 7.2 Test Gallery Display├── composables/             # Composition API functions

- ✅ Restart dev server: `Ctrl+C` then `npm run dev`

│   ├── useCloudinary.ts    # Cloudinary integration

### Cloudinary upload fails

1. Go to **Gallery** page (http://localhost:3000/gallery)│   ├── useFirebaseAuth.ts  # Firebase authentication

- ✅ Verify cloud name is correct (no spaces)

- ✅ Check upload preset is "Unsigned"2. Your uploaded image should appear│   └── useFirestore.ts     # Firestore database operations

- ✅ Preset name matches exactly in `.env`

- ✅ Check browser console for specific error3. Try category filters├── middleware/              # Route middleware



### Images don't show in gallery4. Click image to open lightbox│   └── auth.ts             # Authentication guard



- ✅ "Make Public" checkbox was checked during upload├── pages/                   # Application pages

- ✅ Image uploaded successfully to Cloudinary

- ✅ Check Firestore database has image entry### 7.3 Test Booking Form│   ├── index.vue           # Home page

- ✅ Verify `isPublic: true` in Firestore document

│   ├── auth/

### Admin page redirects to login

1. Go to **Booking** page│   │   └── login.vue       # Login/signup page

- ✅ User is logged in (check top-right)

- ✅ Firebase Authentication is enabled2. Fill in the form│   ├── gallery/

- ✅ No console errors in browser (F12)

3. Submit booking│   │   └── index.vue       # Gallery page

### Port 3000 already in use

4. Check **Admin > Manage Bookings** to see submission│   ├── booking/

```bash

# Use different port│   │   └── index.vue       # Booking form

npm run dev -- --port 3001

```### 7.4 Test Services│   └── admin/



---│       └── index.vue       # Admin dashboard



## 📚 Learn More1. Go to **Admin > Manage Services**├── plugins/



### Documentation2. Click **"Add New Service"**│   └── firebase.client.ts  # Firebase initialization

- [Nuxt 3 Guide](https://nuxt.com/docs/getting-started/introduction)

- [Firebase Web Setup](https://firebase.google.com/docs/web/setup)3. Fill in service details:├── public/                  # Static files

- [Cloudinary Upload](https://cloudinary.com/documentation/upload_images)

- [Tailwind CSS](https://tailwindcss.com/docs)   - Name: "Wedding Photography"├── .env                     # Environment variables (DO NOT COMMIT)

- [TypeScript](https://www.typescriptlang.org/docs/)

   - Description: "Full-day coverage..."├── .env.example            # Environment template

### Useful Commands

```bash   - Price: 2500├── nuxt.config.ts          # Nuxt configuration

npm install          # Install dependencies

npm run dev          # Start dev server   - Currency: Select your currency├── package.json            # Dependencies

npm run build        # Build for production

npm run preview      # Preview production build4. Add features (one per line)├── tailwind.config.js      # Tailwind CSS config

npm run typecheck    # Check TypeScript

```5. Click **"Add Service"**└── README.md               # Documentation



---6. Go to **Services** page to see it displayed```



## 🆘 Getting Help



1. Check this guide's **Troubleshooting** section---## Key Features Implemented

2. Review browser console (F12) for errors

3. Check Firebase Console for database issues

4. Verify `.env` values are correct

5. Test with clean browser cache (Ctrl+Shift+R)## 🏗️ Step 8: Production Build (Optional)✅ Firebase Authentication (Email/Password)



---✅ Firestore Database Integration



## ✅ Final Checklist### 8.1 Build for Production✅ Cloudinary Image Upload & Management



Before going live:✅ Responsive Gallery with Lightbox



- [ ] All pages load without errors```bash✅ Booking System with Form Validation

- [ ] Image upload works (Cloudinary + Firestore)

- [ ] Gallery displays public images correctlynpm run build✅ Admin Dashboard with Upload Interface

- [ ] Booking form submits successfully

- [ ] Services display with correct pricing```✅ PWA Support (Offline, Installable)

- [ ] Admin dashboard fully functional

- [ ] Mobile responsive (test on phone)✅ Tailwind CSS Styling

- [ ] Firestore security rules updated

- [ ] Environment variables set on hostingThis creates an optimized production build.✅ SEO Optimization

- [ ] Custom domain configured (if applicable)

- [ ] Firebase authorized domains updated✅ Mobile Responsive Design

- [ ] Site content customized (branding, text, images)

### 8.2 Preview Production Build

---

## Next Steps

## 🎉 Success!

```bash

Your PhotoStudio platform is now live!

npm run preview1. **Customize Design**: Update colors, fonts, and branding in `tailwind.config.js`

**Next Steps:**

1. Add your professional photos```2. **Add Content**: Upload images through admin panel

2. Create your service packages

3. Share booking link with clients3. **Configure Services**: Add your photography services and pricing

4. Monitor bookings in admin dashboard

5. Promote on social mediaView at: **http://localhost:3000**4. **Set Up Payment**: Integrate Stripe or PayPal for bookings



---5. **Email Notifications**: Set up email service for booking confirmations



**Need help?** Review [README.md](./README.md) for features and troubleshooting.### 8.3 Deploy to Hosting6. **Analytics**: Add Google Analytics for tracking



**Last Updated**: October 18, 20257. **Social Media**: Add social media links and sharing features



---You can deploy to:



**Happy Shooting! 📸**- **Vercel** (Recommended for Nuxt 3)## Support & Resources


- **Netlify**

- **Firebase Hosting**- [Nuxt 3 Documentation](https://nuxt.com/docs)

- **Your own server**- [Firebase Documentation](https://firebase.google.com/docs)

- [Cloudinary Documentation](https://cloudinary.com/documentation)

---- [Tailwind CSS Documentation](https://tailwindcss.com/docs)



## 🔒 Step 9: Security (Production Only)## License



### 9.1 Update Firestore RulesMIT License - feel free to use this project for your own photo studio!



In Firebase Console > Firestore Database > Rules:---



```javascript**Need Help?** 

rules_version = '2';- Check the troubleshooting section

service cloud.firestore {- Review the documentation

  match /databases/{database}/documents {- Open an issue on GitHub

    // Gallery - Public read, authenticated write
    match /gallery/{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Bookings - Public write, authenticated read
    match /bookings/{document=**} {
      allow create: if true;
      allow read, update, delete: if request.auth != null;
    }
    
    // Services - Public read, authenticated write
    match /services/{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

### 9.2 Update Authentication Settings

1. Go to **Authentication > Settings**
2. Add authorized domains for production
3. Enable email verification (optional)

### 9.3 Secure Environment Variables

For production deployment:
- Use platform-specific environment variable settings
- Never commit `.env` to Git
- Use different Firebase projects for dev/prod

---

## 📱 Step 10: Customization

### 10.1 Update Branding

Edit these files:
- `pages/index.vue` - Homepage content
- `pages/about/index.vue` - About page
- `pages/contact/index.vue` - Contact info
- `public/` - Add your logo and images

### 10.2 Customize Colors

Edit `tailwind.config.ts`:

```typescript
theme: {
  extend: {
    colors: {
      'premium-black': '#1a1a1a',  // Change to your brand color
      'premium-gold': '#d4af37',   // Change to your brand color
      'premium-gray': '#666666',
      'premium-light-gray': '#f5f5f5'
    }
  }
}
```

### 10.3 Update Site Metadata

Edit `nuxt.config.ts`:

```typescript
app: {
  head: {
    title: 'Your Studio Name',
    meta: [
      { name: 'description', content: 'Your studio description' }
    ]
  }
}
```

---

## 🐛 Troubleshooting

### Issue: "npm install" fails

**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### Issue: Firebase error "No Firebase App"

**Solution:**
- Check `.env` file exists in project root
- Verify all Firebase config variables are set
- Restart dev server after changing `.env`

### Issue: Cloudinary upload fails

**Solution:**
- Verify Cloud Name is correct
- Check upload preset exists and is "Unsigned"
- Ensure preset name matches exactly in `.env`

### Issue: Images not showing in gallery

**Solution:**
- Ensure "Make Public" checkbox was checked during upload
- Check browser console for errors
- Verify image URL in Firestore database

### Issue: Admin page redirects to login

**Solution:**
- Ensure you're logged in
- Check browser console for errors
- Verify Firebase Authentication is enabled

### Issue: Port 3000 already in use

**Solution:**
```bash
# Use a different port
npm run dev -- --port 3001
```

---

## 📚 Additional Resources

### Documentation
- [Nuxt 3 Docs](https://nuxt.com/docs)
- [Firebase Docs](https://firebase.google.com/docs)
- [Cloudinary Docs](https://cloudinary.com/documentation)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

### Useful Commands

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Generate static site
npm run generate

# Type checking
npm run typecheck

# Lint code
npm run lint
```

---

## 🎓 Learning Path

If you're new to these technologies:

1. **Learn Vue.js basics** → [Vue.js Guide](https://vuejs.org/guide/)
2. **Understand Nuxt 3** → [Nuxt Tutorial](https://nuxt.com/docs/getting-started/introduction)
3. **Explore Firebase** → [Firebase Web Get Started](https://firebase.google.com/docs/web/setup)
4. **Master Tailwind** → [Tailwind Screencasts](https://tailwindcss.com/screencasts)

---

## 🆘 Getting Help

If you encounter issues:

1. Check the **Troubleshooting** section above
2. Review browser console errors (F12)
3. Check Firebase Console for database issues
4. Verify environment variables are correct
5. Search existing GitHub issues
6. Ask in community forums

---

## ✅ Setup Checklist

- [ ] Node.js installed (v18+)
- [ ] Firebase project created
- [ ] Firebase Authentication enabled
- [ ] Firestore database created
- [ ] Cloudinary account created
- [ ] Upload preset configured
- [ ] Project dependencies installed
- [ ] `.env` file created with all credentials
- [ ] Dev server running successfully
- [ ] Admin account created
- [ ] Test image uploaded
- [ ] Gallery displaying images
- [ ] Booking form works
- [ ] Services management works

---

## 🎉 You're All Set!

Congratulations! Your PhotoStudio application is now running.

**Next Steps:**
1. Customize branding and content
2. Add your own images
3. Create your services
4. Test all features thoroughly
5. Deploy to production when ready

For detailed feature documentation, see **[README.md](./README.md)**

---

**Last Updated**: October 18, 2025

**Happy Building! 📸**
