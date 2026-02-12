# 🚀 Deploy Commands - Quick Reference

Copy-paste tayyor komandalar.

## 1. Git Setup

```bash
# Task5/task5 papkasida
cd C:\Users\Asus\OneDrive\Desktop\Itransition\TASK5\task5

# Initialize
git init

# Add all files
git add .

# First commit
git commit -m "Initial commit: Music Store Showcase"

# Add remote (GitHub da repo yaratganingizdan keyin)
git remote add origin https://github.com/YOUR_USERNAME/music-store-task5.git

# Push
git branch -M main
git push -u origin main
```

---

## 2. Environment Variables

### Backend `.env` (local development)
```bash
# backend/.env
PORT=3001
NODE_ENV=development
```

### Frontend `.env.development` (local)
```bash
# frontend/.env.development
VITE_API_URL=http://localhost:3001
```

### Frontend `.env.production` (after backend deploy)
```bash
# frontend/.env.production
VITE_API_URL=https://your-backend.onrender.com
```

---

## 3. Update CORS (Backend)

Backend deploy qilgandan va Netlify URL olganingizdan keyin:

**File:** `backend/src/index.ts`

```typescript
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  'https://your-site-name.netlify.app'  // ← Add this
];
```

Keyin commit:
```bash
git add backend/src/index.ts
git commit -m "Add production CORS origin"
git push
```

---

## 4. Render.com Settings

**Web Service yaratishda:**

| Field | Value |
|-------|-------|
| Name | `music-store-backend` |
| Root Directory | `backend` |
| Environment | `Node` |
| Build Command | `npm install && npm run build` |
| Start Command | `npm start` |
| Branch | `main` |

**Environment Variables:**
- `NODE_ENV` = `production`

---

## 5. Netlify Settings

**Site yaratishda:**

| Field | Value |
|-------|-------|
| Base directory | `frontend` |
| Build command | `npm run build` |
| Publish directory | `frontend/dist` |
| Branch | `main` |

**Environment Variables:**
- `VITE_API_URL` = `https://your-backend.onrender.com` (Render URLni qo'ying)

---

## 6. Test Commands

### Backend Health Check
```bash
# Browser yoki curl
curl https://your-backend.onrender.com/health
# Expected: {"status":"ok"}
```

### Frontend Test
```
https://your-site.netlify.app
```

---

## 7. Update Commands

Code o'zgartirgandan keyin:

```bash
# All changes
git add .

# Commit
git commit -m "Description of changes"

# Push
git push origin main
```

Render va Netlify avtomatik deploy qiladi!

---

## 8. Logs Checking

### Render.com
1. Dashboard → Service
2. **Logs** tab
3. Live logs ko'ring

### Netlify
1. Dashboard → Site
2. **Deploys** → Latest deploy
3. **Deploy log** ko'ring

---

## 9. Troubleshooting Commands

### Clear Git cache
```bash
git rm -r --cached .
git add .
git commit -m "Fix gitignore"
```

### Rebuild Frontend
```bash
cd frontend
npm run build
```

### Rebuild Backend
```bash
cd backend
npm run build
```

### Check Node version
```bash
node --version  # Should be 18+
npm --version   # Should be 9+
```

---

## 10. Quick Deploy Checklist

```bash
# ✅ 1. GitHub
git init && git add . && git commit -m "Initial"
git remote add origin YOUR_URL
git push -u origin main

# ✅ 2. Render.com
# - New Web Service
# - Connect repo
# - Settings yuqoridagi jadvaldan
# - Deploy
# - URL nusxalash

# ✅ 3. Update .env.production
echo "VITE_API_URL=https://YOUR_RENDER_URL" > frontend/.env.production

# ✅ 4. Commit
git add .
git commit -m "Add production config"
git push

# ✅ 5. Netlify
# - Import project
# - Settings yuqoridagi jadvaldan
# - Environment variables
# - Deploy

# ✅ 6. Update CORS
# backend/src/index.ts ga Netlify URL qo'shing
git add . && git commit -m "Update CORS" && git push

# ✅ 7. Test
# Both URLs ishlaganini tekshiring
```

---

## 11. URLs Template

**Copy this and fill in:**

```
Project Name: Music Store Showcase
GitHub: https://github.com/YOUR_USERNAME/music-store-task5
Backend: https://YOUR_BACKEND.onrender.com
Frontend: https://YOUR_SITE.netlify.app
Started: [DATE]
```

---

## 12. Emergency Rollback

Agar yangi deploy buzilgan bo'lsa:

### Netlify
1. Deploys → Previous deploy
2. **Publish deploy** bosing

### Render
1. Service → Deploys
2. Previous deploy → **Redeploy**

### Git
```bash
git revert HEAD
git push
```

---

## 📝 Notes

- Render free tier 15min inactivity dan keyin sleep
- Netlify 100GB/month bandwidth
- Git push = auto deploy (Render + Netlify)
- CORS errors? Backend CORS settings tekshiring
- Build fails? Logs tekshiring

---

## 🎉 Done!

Barcha komandalar copy-paste ready. Omad! 🚀
