# Firebase Setup for Image Uploads

## Current Issue
The admin homepage image upload is not working because Firebase Admin SDK is not properly configured.

## Quick Fix (Local Uploads)
The updated ImageUpload component now supports local file uploads as a fallback. Images will work during your session but won't persist to cloud storage.

## Proper Firebase Setup (Recommended)

### 1. Create Firebase Service Account
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `electroflow-74bzj`
3. Go to Project Settings → Service Accounts
4. Click "Generate New Private Key"
5. Download the JSON file

### 2. Set Environment Variables
Create a `.env.local` file in the project root with:

```bash
# Firebase Admin SDK
FIREBASE_PROJECT_ID=electroflow-74bzj
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@electroflow-74bzj.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----\n"

# Public Firebase Config (already configured)
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyCIYCXssMUNYJdlOr_NN7F-aZ43CUVxPw0
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=electroflow-74bzj.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=electroflow-74bzj
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=electroflow-74bzj.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=581265386004
NEXT_PUBLIC_FIREBASE_APP_ID=1:581265386004:web:75a5e025b338820aae1501
```

### 3. Update Firebase Storage Rules
In Firebase Console → Storage → Rules, ensure you have:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /uploads/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

### 4. Restart Development Server
After setting environment variables:
```bash
npm run dev
```

## Current Status
✅ Local image uploads work (temporary)
❌ Cloud storage uploads need Firebase Admin setup
⚠️ Images stored locally will be lost on page refresh

## Testing
1. Go to `/admin/homepage/categories/new`
2. Try uploading an image
3. You should see a yellow "Local" indicator
4. Image will work in the form but won't persist to cloud
