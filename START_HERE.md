# 🎵 Music Store Showcase - START HERE

## 📚 Qayerdan boshlash kerak?

### 1. Local Development

Loyihani local da ishga tushirish uchun:

👉 **[README.md](./README.md)** - O'qing

**Qisqacha:**
```bash
# Backend
cd backend
npm install
npm run dev

# Frontend (yangi terminal)
cd frontend
npm install
npm run dev
```

Keyin: http://localhost:3000

---

### 2. Deployment (Internetga chiqarish)

Loyihani deploy qilish uchun 3 ta variant:

#### 🚀 Variant A: Tezkor (5 daqiqa)
👉 **[QUICK_DEPLOY.md](./QUICK_DEPLOY.md)** - Eng tez variant

#### 📖 Variant B: To'liq qo'llanma
👉 **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Batafsil tushuntirish

#### ✅ Variant C: Checklist bilan
👉 **[DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)** - Qadamma-qadam

**Tavsiya:** Birinchi marta deploy qilayotgan bo'lsangiz → **Variant B** ni tanlang

---

## 📁 Loyiha Strukturasi

```
task5/
├── START_HERE.md              ← Siz shu yerdamisiz
├── README.md                  ← Asosiy hujjat
├── QUICK_DEPLOY.md           ← Tez deploy
├── DEPLOYMENT.md              ← To'liq deploy guide
├── DEPLOYMENT_CHECKLIST.md   ← Deploy checklist
│
├── backend/                   ← Node.js API
│   ├── src/
│   │   ├── locales/          ← Til ma'lumotlari
│   │   ├── routes/           ← API routes
│   │   ├── services/         ← Business logic
│   │   └── index.ts          ← Entry point
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/                  ← React SPA
│   ├── src/
│   │   ├── components/       ← React komponentlar
│   │   ├── services/         ← API client
│   │   ├── hooks/            ← Custom hooks
│   │   └── App.tsx           ← Main app
│   ├── package.json
│   └── vite.config.ts
│
└── migrations/                ← DB migrations (bo'sh)
```

---

## 🎯 Loyiha Haqida

**Nima?** Musiqa do'koni ilovasi - tasodifiy qo'shiqlar generatsiya qiladi

**Xususiyatlari:**
- 3 til: English, Deutsch, Українська
- Seeded random generation (bir xil seed = bir xil natija)
- 2 ta view: Table (pagination) va Gallery (infinite scroll)
- Musiqa ijro (Tone.js)
- Album cover generatsiya
- Dinamik yangilanish

---

## 🛠️ Texnologiyalar

**Backend:**
- Node.js + Express + TypeScript
- @faker-js/faker
- seedrandom

**Frontend:**
- React 18 + TypeScript
- Vite + Tailwind CSS
- Tone.js

**Hosting (Tavsiya):**
- Backend: Render.com (Free)
- Frontend: Netlify (Free)

---

## ❓ Ko'p So'raladigan Savollar

### Local da ishlatish
**Q: Backend ishlamayapti?**
A: Port 3001 band bo'lishi mumkin. `package.json` da portni o'zgartiring.

**Q: Frontend backend bilan bog'lanmayapti?**
A: `.env.development` faylini tekshiring - `VITE_API_URL=http://localhost:3001`

### Deployment
**Q: Qaysi platformaga deploy qilish kerak?**
A:
- Backend → Render.com (Free tier)
- Frontend → Netlify (Free tier)
- Database kerak emas!

**Q: Deploy qancha vaqt oladi?**
A:
- GitHub setup: 2 daqiqa
- Backend deploy: 2-5 daqiqa
- Frontend deploy: 1-3 daqiqa
- **Jami:** ~10 daqiqa

**Q: Pul kerakmi?**
A: Yo'q! Hamma narsa bepul (Render + Netlify free tier)

**Q: Custom domain kerakmi?**
A: Yo'q, Netlify va Render o'z subdomain beradi:
- `your-app.netlify.app`
- `your-app.onrender.com`

---

## 🚦 Keyingi Qadamlar

1. **Local test**: [README.md](./README.md) o'qing
2. **Deploy**: [QUICK_DEPLOY.md](./QUICK_DEPLOY.md) yoki [DEPLOYMENT.md](./DEPLOYMENT.md)
3. **Check**: [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)
4. **Share**: URL ni do'stlar bilan bo'lishing! 🎉

---

## 📞 Yordam Kerakmi?

1. Barcha hujjatlarni o'qing (yuqoridagi havolalar)
2. GitHub Issues yarating
3. Logs tekshiring (Render/Netlify dashboard)

---

## ⚡ Tezkor Boshlash

**Eng tez variant:**

```bash
# 1. Install
cd backend && npm install
cd ../frontend && npm install

# 2. Run (2 terminal)
# Terminal 1:
cd backend && npm run dev

# Terminal 2:
cd frontend && npm run dev

# 3. Open
# http://localhost:3000
```

**Deploy qilish:**
```bash
# 1. GitHub
git init && git add . && git commit -m "Initial"
git remote add origin YOUR_REPO_URL
git push -u origin main

# 2. Render.com - Backend deploy
# 3. Netlify - Frontend deploy
```

Batafsil: [QUICK_DEPLOY.md](./QUICK_DEPLOY.md)

---

## 🎉 Omad!

Agar qiynalayotgan bo'lsangiz - bu normal! Hujjatlarni diqqat bilan o'qing va qadamma-qadam qiling.

**Muhim:** Deployment jarayonida har bir qadam uchun screenshot oling - keyinroq yordam beradi.

Omad! 🚀
