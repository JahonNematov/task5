# ⚡ Tezkor Deploy Qo'llanmasi

## 🎯 5 Daqiqada Deploy Qilish

### 1. GitHub Repository (2 daqiqa)

```bash
cd C:\Users\Asus\OneDrive\Desktop\Itransition\TASK5\task5

# Git initialize
git init
git add .
git commit -m "Initial commit: Music Store"

# GitHub da yangi repo yarating: music-store-task5
# Keyin:
git remote add origin https://github.com/YOUR_USERNAME/music-store-task5.git
git branch -M main
git push -u origin main
```

### 2. Backend - Render.com (2 daqiqa)

1. **Render.com**: https://render.com → Sign up (GitHub bilan)
2. **New** → **Web Service**
3. Repository tanlang: `music-store-task5`
4. Sozlamalar:
   ```
   Name: music-store-backend
   Root Directory: backend
   Environment: Node
   Build Command: npm install && npm run build
   Start Command: npm start
   ```
5. **Create Web Service** → URL nusxalang

### 3. Frontend - Netlify (1 daqiqa)

**AVVAL**: `frontend/.env.production` ni yangilang:
```
VITE_API_URL=https://your-backend-url.onrender.com
```

Git commit:
```bash
git add .
git commit -m "Update production API URL"
git push
```

1. **Netlify.com**: https://netlify.com → Sign up (GitHub bilan)
2. **Add new site** → **Import**
3. Repository: `music-store-task5`
4. Sozlamalar:
   ```
   Base directory: frontend
   Build command: npm run build
   Publish directory: frontend/dist
   ```
5. **Environment variables**:
   - Key: `VITE_API_URL`
   - Value: `https://your-backend-url.onrender.com`

6. **Deploy** → Tayyor! ✅

---

## 🔗 Kerakli Havolalar

| Servis | URL |
|--------|-----|
| GitHub | https://github.com |
| Render.com | https://render.com |
| Netlify | https://netlify.com |

---

## ✅ Tekshirish

- Backend: `https://your-backend.onrender.com/health`
- Frontend: `https://your-site.netlify.app`

---

## 🆘 Muammolar?

1. **CORS error**: Backend `src/index.ts` da Netlify URL qo'shing
2. **Backend uymayapti**: 15 soniya kuting (cold start)
3. **Build failed**: Logs tekshiring

Batafsil: `DEPLOYMENT.md` ni o'qing
