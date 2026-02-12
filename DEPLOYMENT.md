# 🚀 Deployment Guide - Music Store Showcase

Bu loyihani internetga chiqarish uchun bosqichma-bosqich qo'llanma.

## 📋 Deployment Strategiyasi

- **Frontend**: Netlify (Static hosting)
- **Backend**: Render.com (Free tier)
- **Database**: Kerak emas (in-memory generation)

---

## 1️⃣ Tayyorgarlik - Git Repository Yaratish

### GitHub Repository Yaratish

1. **GitHub.com ga kiring**: https://github.com
2. **New Repository** tugmasini bosing
3. Repository nomi: `music-store-task5`
4. **Public** yoki **Private** tanlang
5. **Create repository** bosing

### Loyihani Git ga qo'shish

```bash
# Task5 papkasida
cd C:\Users\Asus\OneDrive\Desktop\Itransition\TASK5\task5

# Git initialize
git init

# .gitignore yaratish (agar yo'q bo'lsa)
echo "node_modules/
dist/
.env
*.log
.DS_Store" > .gitignore

# Barcha fayllarni qo'shish
git add .

# Birinchi commit
git commit -m "Initial commit: Music Store Showcase"

# GitHub repository bilan bog'lash (YOUR_USERNAME ni o'zingizniki bilan almashtiring)
git remote add origin https://github.com/YOUR_USERNAME/music-store-task5.git

# Push qilish
git branch -M main
git push -u origin main
```

---

## 2️⃣ Backend - Render.com ga Deploy

### Backend uchun konfiguratsiya fayllarini yangilash

#### 1. Environment Variables uchun fayl yaratish

Backend papkasida `.env.example` yaratamiz:

```bash
cd backend
```

`.env.example` fayl yarating:
```
PORT=3001
NODE_ENV=production
```

#### 2. package.json scriptlarini yangilash

`backend/package.json` da scripts bo'limini tekshiring:
```json
{
  "scripts": {
    "dev": "nodemon --exec ts-node src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  }
}
```

#### 3. CORS sozlamalarini yangilash

`backend/src/index.ts` faylini yangilash kerak bo'lishi mumkin - frontend URL ni qo'shish uchun.

### Render.com ga deploy qilish

1. **Render.com ga kiring**: https://render.com
2. **Sign Up** yoki **Log In** (GitHub akkaunti bilan kiring)
3. **Dashboard** ga o'ting

#### Backend Web Service yaratish:

1. **New +** tugmasini bosing → **Web Service** tanlang
2. **Connect Repository**: GitHub repository ni tanlang (`music-store-task5`)
3. Quyidagi sozlamalarni kiriting:

   - **Name**: `music-store-backend`
   - **Region**: `Frankfurt (EU Central)` yoki yaqin region
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Instance Type**: `Free`

4. **Advanced** bo'limida **Environment Variables** qo'shish:
   ```
   NODE_ENV=production
   ```

5. **Create Web Service** tugmasini bosing

6. Deploy jarayonini kuzating (5-10 daqiqa)

7. Deploy tugagach, backend URL ni nusxalang:
   ```
   https://music-store-backend.onrender.com
   ```

⚠️ **Muhim**: Render.com free tier 15 daqiqadan keyin sleep mode ga o'tadi. Birinchi request sekin bo'lishi mumkin.

---

## 3️⃣ Frontend - Netlify ga Deploy

### Frontend konfiguratsiyasini yangilash

#### 1. API URL ni environment variable qilish

`frontend/.env.production` fayl yarating:

```
VITE_API_URL=https://music-store-backend.onrender.com
```

`frontend/.env.development` fayl yarating:
```
VITE_API_URL=http://localhost:3001
```

#### 2. API servisini yangilash

`frontend/src/services/api.ts` faylini yangilang:

```typescript
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export const api = {
  async getSongs(...) {
    const response = await fetch(`${API_BASE_URL}/api/songs?${params}`);
    // ...
  },
  // ...
}
```

#### 3. Netlify konfiguratsiya fayli yaratish

Frontend papkasida `netlify.toml` yarating:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

#### 4. Git ga commit qiling

```bash
cd ..  # task5 papkasiga qaytish
git add .
git commit -m "Add production environment configuration"
git push origin main
```

### Netlify ga deploy qilish

#### Variant 1: Netlify Dashboard orqali

1. **Netlify.com ga kiring**: https://netlify.com
2. **Sign Up** yoki **Log In** (GitHub bilan)
3. **Add new site** → **Import an existing project** bosing
4. **GitHub** ni tanlang va repository ruxsat bering
5. Repository ni tanlang: `music-store-task5`

6. **Build settings**:
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/dist`

7. **Environment variables** qo'shish:
   - **Key**: `VITE_API_URL`
   - **Value**: `https://music-store-backend.onrender.com` (Render.com dan olgan URL)

8. **Deploy site** tugmasini bosing

9. Deploy tugagach (2-3 daqiqa), site URL ni oling:
   ```
   https://your-site-name.netlify.app
   ```

#### Variant 2: Netlify CLI orqali

```bash
# Netlify CLI o'rnatish
npm install -g netlify-cli

# Login
netlify login

# Frontend papkasiga o'tish
cd frontend

# Deploy
netlify deploy --prod

# Prompts:
# - Create & configure a new site: Yes
# - Site name: music-store-frontend (yoki o'zingiz xohlagan nom)
# - Publish directory: dist
```

---

## 4️⃣ Backend CORS ni Yangilash

Backend ishga tushgandan keyin, frontend URL ni CORS ga qo'shish kerak:

`backend/src/index.ts`:

```typescript
import cors from 'cors';

const app = express();

// CORS sozlamalari
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://your-site-name.netlify.app',  // O'z Netlify URL ingizni qo'ying
  ],
  credentials: true
}));
```

Commit va push qiling:

```bash
git add backend/src/index.ts
git commit -m "Update CORS for production"
git push origin main
```

Render.com avtomatik ravishda qayta deploy qiladi.

---

## 5️⃣ Custom Domain (Ixtiyoriy)

### Netlify uchun:
1. Netlify Dashboard → Site settings → Domain management
2. **Add custom domain** bosing
3. DNS sozlamalarini yangilang

### Render.com uchun:
1. Render Dashboard → Service → Settings
2. **Custom Domain** qo'shing
3. DNS sozlamalarini yangilang

---

## 6️⃣ Deployment Checklist

Deploy qilishdan oldin tekshiring:

- [ ] Git repository yaratildi va push qilindi
- [ ] Backend Render.com ga deploy qilindi
- [ ] Backend URL olingan va saqlangan
- [ ] Frontend `.env.production` da backend URL to'g'ri
- [ ] Frontend Netlify ga deploy qilindi
- [ ] Backend CORS sozlamalarida frontend URL mavjud
- [ ] Ikkala servis ham ishlayotganini test qilindi

---

## 7️⃣ Testing

### Backend test:
```bash
# Browser yoki Postman da:
https://music-store-backend.onrender.com/health

# Natija: {"status":"ok"}
```

### Frontend test:
```
https://your-site-name.netlify.app
```

Browser consoleda error yo'qligini tekshiring.

---

## 8️⃣ Troubleshooting

### Backend ishlamayapti:
- Render.com logs ni tekshiring: Service → Logs
- Build command to'g'ri bajarilganini tekshiring
- Environment variables to'g'ri sozlanganini tekshiring

### Frontend backend bilan bog'lanmayapti:
- Browser Developer Tools → Network → API requests tekshiring
- CORS error bo'lsa: Backend CORS sozlamalarini tekshiring
- API URL to'g'ri ekanligini tekshiring

### Free tier limitleri:
- **Render.com**: 15 daqiqa aktivlik yo'q bo'lsa sleep mode
- **Netlify**: 100GB bandwidth/oy, 300 build minutes/oy

---

## 9️⃣ Continuous Deployment

Git ga har push qilganingizda:
- Render.com backend ni avtomatik deploy qiladi
- Netlify frontend ni avtomatik deploy qiladi

```bash
# O'zgartirish qilgandan keyin:
git add .
git commit -m "Your message"
git push origin main
```

---

## 🎉 Tayyor!

Loyihangiz endi internetda:
- **Frontend**: https://your-site-name.netlify.app
- **Backend**: https://music-store-backend.onrender.com

---

## 📝 Qo'shimcha Ma'lumotlar

### Environment Variables Summary

**Backend (Render.com)**:
```
NODE_ENV=production
```

**Frontend (Netlify)**:
```
VITE_API_URL=https://music-store-backend.onrender.com
```

### Monitoring

- **Render.com**: Metrics → Response time, CPU, Memory
- **Netlify**: Analytics → Bandwidth, Build time

### Costs

- Render.com Free tier: $0/mo
- Netlify Free tier: $0/mo
- Custom domain: ~$10-15/yil (Ixtiyoriy)

---

## 🔗 Foydali Havolalar

- [Render.com Documentation](https://render.com/docs)
- [Netlify Documentation](https://docs.netlify.com)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)
