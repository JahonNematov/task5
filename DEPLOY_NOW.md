# 🚀 HOZIR DEPLOY QILING - SCREENSHOT BILAN

## ✅ TAYYOR

Sizning loyihangiz deploy qilishga tayyor:
- ✅ Git: Barcha o'zgarishlar commit qilindi
- ✅ Branch: `dev` branchda
- ✅ Konfiguratsiya: Barcha deployment fayllar yaratildi
- ✅ Kod: Backend va Frontend tayyor

---

## 📋 BOSQICH 1: RENDER.COM (Backend)

### 1. Render.com ga Kiring

**URL:** https://render.com

**Screenshot 1: Sign Up**
```
┌─────────────────────────────────────────┐
│         RENDER.COM                      │
│                                         │
│   [Get Started]  [Sign In]             │
│                                         │
│   >>> "Get Started" yoki "Sign Up"     │
│       tugmasini bosing                  │
│                                         │
│   >>> "Sign up with GitHub" tanlang    │
└─────────────────────────────────────────┘
```

1. Browser: https://render.com
2. **"Get Started"** bosing
3. **"Sign up with GitHub"** tugmasini tanlang
4. GitHub login qiling
5. Ruxsat bering ("Authorize Render")
6. Email tasdiqlang

---

### 2. Web Service Yaratish

**Screenshot 2: Dashboard**
```
┌─────────────────────────────────────────┐
│  Dashboard                              │
│                                         │
│  [New +]  ← Bu yerda, o'ng yuqorida    │
│      ↓                                  │
│  Web Service ← Buni tanlang            │
│  Static Site                            │
│  Cron Job                               │
└─────────────────────────────────────────┘
```

1. **"New +"** tugmasini bosing (yuqori o'ng burchak)
2. **"Web Service"** ni tanlang

---

### 3. Repository ni Ulash

**Screenshot 3: Connect Repository**
```
┌─────────────────────────────────────────┐
│  Connect a repository                   │
│                                         │
│  GitHub                                 │
│                                         │
│  🔍 Search repositories...              │
│                                         │
│  📁 music-store-task5  [Connect]       │
│      └─ dev branch                      │
│                                         │
│  Agar ko'rinmasa:                       │
│  [Configure account] ← Bosing          │
└─────────────────────────────────────────┘
```

1. Repository ro'yxatida **"music-store-task5"** ni toping
2. **"Connect"** tugmasini bosing
3. Agar ko'rinmasa: **"Configure account"** → ruxsat bering

---

### 4. Build Settings - MUHIM!

**Screenshot 4: Service Settings**
```
┌─────────────────────────────────────────────────┐
│  Create a new Web Service                      │
│                                                 │
│  Name: music-store-backend                     │
│                                                 │
│  Region: Frankfurt (EU Central)  [dropdown]    │
│                                                 │
│  Branch: dev  ← MUHIM!                         │
│                                                 │
│  Root Directory: backend  ← ANIQ YOZING!       │
│                                                 │
│  Environment: Node  [dropdown]                 │
│                                                 │
│  Build Command:                                │
│  npm install && npm run build                  │
│                                                 │
│  Start Command:                                │
│  npm start                                     │
│                                                 │
│  Instance Type: Free                           │
└─────────────────────────────────────────────────┘
```

**ANIQ YOZING:**
```
Name:               music-store-backend
Region:             Frankfurt (EU Central)
Branch:             dev
Root Directory:     backend
Environment:        Node
Build Command:      npm install && npm run build
Start Command:      npm start
Instance Type:      Free
```

---

### 5. Environment Variables

**Screenshot 5: Advanced Settings**
```
┌─────────────────────────────────────────┐
│  Advanced                               │
│                                         │
│  Environment Variables                  │
│  [Add Environment Variable]            │
│                                         │
│  Key: NODE_ENV                         │
│  Value: production                     │
│                                         │
│  [Add Environment Variable]  ← Yana   │
│                                         │
│  Key: PORT                             │
│  Value: 3001                           │
└─────────────────────────────────────────┘
```

1. Pastga scroll → **"Advanced"** bo'limini oching
2. **"Add Environment Variable"** bosing:
   - **Key**: `NODE_ENV`
   - **Value**: `production`
3. Yana bosing:
   - **Key**: `PORT`
   - **Value**: `3001`

---

### 6. Deploy!

**Screenshot 6: Create Service**
```
┌─────────────────────────────────────────┐
│                                         │
│  [Create Web Service]  ← BOSING!       │
│                                         │
└─────────────────────────────────────────┘
```

1. **"Create Web Service"** tugmasini bosing
2. Deploy boshlanadi!

---

### 7. Deploy Jarayoni

**Screenshot 7: Deploying**
```
┌─────────────────────────────────────────┐
│  music-store-backend                    │
│                                         │
│  ⏳ Building... (5-10 min)              │
│                                         │
│  Logs:                                  │
│  ───────────────────────────────────    │
│  > npm install                          │
│  > npm run build                        │
│  > Compiling TypeScript...              │
│  ✓ Build successful!                    │
│  > Starting server...                   │
│  ✓ Server is running on port 3001      │
│                                         │
│  Status: Live ✅                        │
└─────────────────────────────────────────┘
```

**Kutish:** 5-10 daqiqa

---

### 8. Backend URL ni Olish

**Screenshot 8: Service Live**
```
┌─────────────────────────────────────────────────┐
│  music-store-backend                            │
│  https://music-store-backend-xxxx.onrender.com │
│  ↑ BU URL NI NUSXALANG! ✍️                     │
│                                                 │
│  Status: Live ✅                                │
└─────────────────────────────────────────────────┘
```

**URL ni NUSXALANG va SAQLANG!**

Masalan: `https://music-store-backend-a1b2.onrender.com`

---

### 9. Test Qilish

Browser da:
```
https://music-store-backend-xxxx.onrender.com/health
```

**Natija:**
```json
{"status":"ok"}
```

✅ **Agar shu ko'rinsa - Backend tayyor!**

---

## 📋 BOSQICH 2: FRONTEND (.env yangilash)

### 1. .env.production ni Yangilash

**VS Code da ochish:**
```
task5/frontend/.env.production
```

**O'zgartiring:**
```env
VITE_API_URL=https://music-store-backend-xxxx.onrender.com
```

⚠️ `xxxx` ni o'z backend URL ingiz bilan almashtiring!

---

### 2. Git Commit

**Terminal:**
```bash
cd C:\Users\Asus\OneDrive\Desktop\Itransition\TASK5\task5

git add frontend/.env.production
git commit -m "Add backend URL to production"
git push origin dev
```

---

## 📋 BOSQICH 3: NETLIFY.COM (Frontend)

### 1. Netlify ga Kiring

**URL:** https://netlify.com

**Screenshot 9: Netlify Sign Up**
```
┌─────────────────────────────────────────┐
│         NETLIFY                         │
│                                         │
│   [Sign up]  [Log in]                  │
│                                         │
│   >>> "Sign up" bosing                 │
│   >>> "Sign up with GitHub" tanlang    │
└─────────────────────────────────────────┘
```

1. https://netlify.com
2. **"Sign up"** bosing
3. **"Sign up with GitHub"** tanlang
4. Ruxsat bering

---

### 2. Yangi Site

**Screenshot 10: Add New Site**
```
┌─────────────────────────────────────────┐
│  Team overview                          │
│                                         │
│  [Add new site]  ← BOSING              │
│        ↓                                │
│  Import an existing project ← Tanlang  │
└─────────────────────────────────────────┘
```

1. **"Add new site"** → **"Import an existing project"**

---

### 3. GitHub Ulash

**Screenshot 11: Deploy with GitHub**
```
┌─────────────────────────────────────────┐
│  Import an existing project             │
│                                         │
│  [GitHub]  ← BOSING                    │
│   GitLab                                │
│   Bitbucket                             │
└─────────────────────────────────────────┘
```

1. **"Deploy with GitHub"** bosing
2. Ruxsat bering (birinchi marta)

---

### 4. Repository Tanlash

**Screenshot 12: Select Repository**
```
┌─────────────────────────────────────────┐
│  Select your repository                 │
│                                         │
│  🔍 Search...                           │
│                                         │
│  📁 music-store-task5                  │
│      └─ Last updated: just now         │
│                                         │
│      ← Buni bosing                     │
└─────────────────────────────────────────┘
```

**"music-store-task5"** ni tanlang

---

### 5. Build Settings - MUHIM!

**Screenshot 13: Site Settings**
```
┌─────────────────────────────────────────────────┐
│  Site settings for music-store-task5           │
│                                                 │
│  Branch to deploy: dev  ← MUHIM!               │
│                                                 │
│  Base directory: frontend  ← ANIQ YOZING!      │
│                                                 │
│  Build command: npm run build                  │
│                                                 │
│  Publish directory: frontend/dist  ← ANIQ!     │
│                                                 │
│  [Show advanced]  ← BOSING                     │
└─────────────────────────────────────────────────┘
```

**ANIQ YOZING:**
```
Branch to deploy:    dev
Base directory:      frontend
Build command:       npm run build
Publish directory:   frontend/dist
```

---

### 6. Environment Variables

**Screenshot 14: Environment Variables**
```
┌─────────────────────────────────────────┐
│  Advanced build settings                │
│                                         │
│  Environment variables                  │
│  [New variable]  ← BOSING              │
│                                         │
│  Key: VITE_API_URL                     │
│                                         │
│  Value:                                 │
│  https://music-store-backend-xxxx...   │
│  ↑ Backend URL ni qo'ying!             │
└─────────────────────────────────────────┘
```

1. **"Show advanced"** bosing
2. **"New variable"** bosing:
   - **Key**: `VITE_API_URL`
   - **Value**: `https://music-store-backend-xxxx.onrender.com`

   ⚠️ O'z backend URL ingizni qo'ying!

---

### 7. Deploy!

**Screenshot 15: Deploy Site**
```
┌─────────────────────────────────────────┐
│                                         │
│  [Deploy site]  ← BOSING!              │
│                                         │
└─────────────────────────────────────────┘
```

**"Deploy site"** tugmasini bosing

---

### 8. Deploy Jarayoni

**Screenshot 16: Site Deploying**
```
┌─────────────────────────────────────────┐
│  music-store-task5                      │
│                                         │
│  ⏳ Site deploy in progress...          │
│                                         │
│  Build log:                             │
│  ───────────────────────────────────    │
│  > npm run build                        │
│  > vite build                           │
│  > Building for production...           │
│  ✓ Build complete!                      │
│                                         │
│  Status: Published ✅                   │
└─────────────────────────────────────────┘
```

**Kutish:** 2-5 daqiqa

---

### 9. Frontend URL

**Screenshot 17: Site Published**
```
┌─────────────────────────────────────────────────┐
│  Site published!                                │
│                                                 │
│  https://random-name-12345.netlify.app         │
│  ↑ BU URL NI NUSXALANG! ✍️                     │
│                                                 │
│  [Visit site]  [Site settings]                 │
└─────────────────────────────────────────────────┘
```

**URL ni NUSXALANG!**

---

### 10. Site Name O'zgartirish (Optional)

**Screenshot 18: Change Site Name**
```
┌─────────────────────────────────────────┐
│  Site settings                          │
│  General → Site details                 │
│                                         │
│  Site name:                             │
│  random-name-12345                      │
│  [Change site name]  ← Bosing          │
│                                         │
│  New name: music-store-dev             │
│  [Save]                                 │
│                                         │
│  URL: music-store-dev.netlify.app      │
└─────────────────────────────────────────┘
```

1. **Site settings** → **General** → **Site details**
2. **"Change site name"**
3. Yangi nom: `music-store-dev`
4. **Save**

---

## 📋 BOSQICH 4: CORS SOZLASH

### 1. Backend Kodini Yangilash

**VS Code:**
```
task5/backend/src/index.ts
```

**12-13 qatorni o'zgartiring:**

```typescript
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  'https://music-store-dev.netlify.app'  // ← O'z URL ingiz!
];
```

### 2. Git Commit

```bash
git add backend/src/index.ts
git commit -m "Add Netlify URL to CORS"
git push origin dev
```

### 3. Render Redeploy

- Render.com ga o'ting
- `music-store-backend` ni oching
- Yangi deploy avtomatik boshlanadi
- 2-3 daqiqa kuting

---

## ✅ YAKUNIY TEST

### Frontend

```
https://music-store-dev.netlify.app
```

Test:
- [ ] Site ochiladi
- [ ] F12 → Console → errors yo'q
- [ ] Language selection ishlaydi
- [ ] Seed input ishlaydi
- [ ] Table view ishlaydi
- [ ] Gallery view ishlaydi
- [ ] Song details ochiladi
- [ ] Music player ishlaydi

### Backend

```
https://music-store-backend-xxxx.onrender.com/health
```

Natija: `{"status":"ok"}`

---

## 🎉 TAYYOR!

Agar hamma narsa ishlasa:

```
✅ Backend:  https://music-store-backend-xxxx.onrender.com
✅ Frontend: https://music-store-dev.netlify.app
✅ GitHub:   https://github.com/YOUR_USERNAME/music-store-task5
```

---

## ❌ MUAMMOLAR

### 1. Backend Build Failed

**Logs:**
```
Error: Cannot find module 'typescript'
```

**Yechim:**
- Build command to'g'ri: `npm install && npm run build`
- Root directory to'g'ri: `backend`

### 2. Frontend Build Failed

**Logs:**
```
Error: VITE_API_URL is not defined
```

**Yechim:**
- Environment variable qo'shilganini tekshiring
- Key to'g'ri: `VITE_API_URL` (katta harflar!)

### 3. CORS Error

**Console:**
```
Access to fetch blocked by CORS policy
```

**Yechim:**
- Backend `src/index.ts` da Netlify URL qo'shilganini tekshiring
- Git push qildingizmi?
- Render yangi deploy qildimi?

### 4. 503 Service Unavailable

**Natija:**
```
Service temporarily unavailable
```

**Yechim:**
- Render free tier "sleep" holatida
- 30-60 soniya kuting (cold start)
- Sahifani yangilang

---

## 📞 YORDAM

Qayerda tiqilib qolsangiz:

1. Screenshot oling
2. Error message ni nusxalang
3. Logs ni tekshiring:
   - Render: Service → Logs tab
   - Netlify: Deploys → Deploy log

Omad! 🚀
