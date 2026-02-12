# ✅ Deployment Checklist

Deploy qilishdan oldin bu ro'yxatni tekshiring:

## Pre-Deployment

- [ ] Barcha o'zgarishlar commit qilindi
- [ ] Backend local da ishlayapti (http://localhost:3001)
- [ ] Frontend local da ishlayapti (http://localhost:3000)
- [ ] Backend tests pass (agar bor bo'lsa)
- [ ] Frontend build muvaffaqiyatli (`npm run build`)

## GitHub

- [ ] GitHub repository yaratildi
- [ ] `.gitignore` to'g'ri sozlangan
- [ ] Code push qilindi (`git push origin main`)
- [ ] Repository public yoki private to'g'ri tanlandi

## Backend (Render.com)

### Pre-Deploy
- [ ] `backend/package.json` da scripts to'g'ri:
  - `build`: `tsc`
  - `start`: `node dist/index.js`
- [ ] `backend/tsconfig.json` mavjud
- [ ] Barcha dependencies `package.json` da

### Deploy
- [ ] Render.com akkaunti yaratildi
- [ ] Web Service yaratildi
- [ ] Build settings to'g'ri:
  - Root Directory: `backend`
  - Build Command: `npm install && npm run build`
  - Start Command: `npm start`
- [ ] Environment variables sozlandi:
  - `NODE_ENV=production`
- [ ] Deploy muvaffaqiyatli
- [ ] Health check ishlayapti: `/health`
- [ ] Backend URL nusxalandi

### Post-Deploy
- [ ] Logs tekshirildi (errors yo'q)
- [ ] API endpoints test qilindi:
  - `GET /health` → `{"status":"ok"}`
  - `GET /api/songs?locale=en-US&seed=123&likesPerSong=5&page=1`

## Frontend (Netlify)

### Pre-Deploy
- [ ] `frontend/.env.production` yaratildi
- [ ] Backend URL to'g'ri kiritildi: `VITE_API_URL=https://...`
- [ ] `frontend/netlify.toml` mavjud
- [ ] Build local da ishlayapti: `npm run build`
- [ ] Changes commit va push qilindi

### Deploy
- [ ] Netlify akkaunti yaratildi
- [ ] Site import qilindi (GitHub repo)
- [ ] Build settings to'g'ri:
  - Base directory: `frontend`
  - Build command: `npm run build`
  - Publish directory: `frontend/dist`
- [ ] Environment variables sozlandi:
  - `VITE_API_URL`: Backend Render URL
- [ ] Deploy muvaffaqiyatli
- [ ] Site URL nusxalandi

### Post-Deploy
- [ ] Site ochiladi (errors yo'q)
- [ ] Browser console errors yo'q
- [ ] Network tab da API calls ishlayapti
- [ ] Barcha funksionallar ishlayapti:
  - [ ] Language selection
  - [ ] Seed input
  - [ ] Likes slider
  - [ ] Table view
  - [ ] Gallery view
  - [ ] Song details
  - [ ] Music playback

## CORS Configuration

- [ ] Backend `src/index.ts` da frontend URL qo'shildi
- [ ] CORS errors yo'q (browser console tekshirildi)
- [ ] Barcha API requests ishlayapti

## Final Testing

### Backend
- [ ] `/health` endpoint ishlayapti
- [ ] `/api/songs` ma'lumot qaytarayapti
- [ ] Different seeds different data beradi
- [ ] Likes calculation to'g'ri ishlayapti
- [ ] All locales ishlayapti (en-US, de-DE, uk-UA)

### Frontend
- [ ] Toolbar controls ishlayapti
- [ ] Table view:
  - [ ] Pagination ishlayapti
  - [ ] Row expansion ishlayapti
  - [ ] Song details ko'rsatiladi
  - [ ] Music player ishlayapti
- [ ] Gallery view:
  - [ ] Infinite scroll ishlayapti
  - [ ] Cards clickable
  - [ ] Modal ochiladi
  - [ ] Music player ishlayapti
- [ ] Seed changes reset view
- [ ] Same seed = same data (reproducibility)

### Integration
- [ ] Frontend ↔ Backend communication ishlayapti
- [ ] No CORS errors
- [ ] No 404/500 errors
- [ ] Loading states ishlayapti
- [ ] Error handling ishlayapti

## Performance

- [ ] Backend cold start acceptable (< 30s)
- [ ] Page load time acceptable
- [ ] API response time acceptable
- [ ] No memory leaks (browser DevTools check)
- [ ] Images load properly (album covers)
- [ ] Music plays without lag

## Documentation

- [ ] README.md yangilandi
- [ ] DEPLOYMENT.md to'liq
- [ ] Environment variables documented
- [ ] API endpoints documented
- [ ] Production URLs qo'shildi

## Optional (Recommended)

- [ ] Custom domain sozlandi
- [ ] Analytics qo'shildi (Google Analytics)
- [ ] Error tracking (Sentry)
- [ ] Monitoring sozlandi
- [ ] SSL/HTTPS enabled (default Netlify/Render)

## Post-Deployment

- [ ] Team members bilan URL shared
- [ ] Production credentials secure saqlandi
- [ ] Backup plan mavjud
- [ ] Update procedure documented
- [ ] Known issues documented

---

## 🎉 Deployment Complete!

Agar barcha checkboxlar belgilangan bo'lsa - tabriklaymiz! Loyihangiz live! 🚀

**URLs:**
- Frontend: `https://your-site.netlify.app`
- Backend: `https://your-backend.onrender.com`

**Next Steps:**
1. Monitor logs for errors
2. Test with real users
3. Collect feedback
4. Iterate and improve

---

## 🆘 Agar muammo bo'lsa:

1. `DEPLOYMENT.md` → Troubleshooting bo'limini o'qing
2. Render/Netlify logs ni tekshiring
3. Browser console errors ni tekshiring
4. GitHub Issues yarating (agar project public bo'lsa)
