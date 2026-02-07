# 🌱 Be-EcoFriendly - Netlify Deployment Checklist

## Before You Deploy

✅ All configuration files created:
- [x] `frontend/netlify.toml` - Netlify configuration
- [x] `frontend/.env` - Local environment variables  
- [x] `frontend/public/_redirects` - Client-side routing
- [x] `render.yaml` - Backend deployment config
- [x] `.gitignore` - Protect sensitive files

## Deployment Steps

### 1️⃣ Prepare Your Code

```bash
# Make sure you're in the project root
cd Be-Eco-Friendly

# Add all files
git init
git add .
git commit -m "Ready for deployment"
```

### 2️⃣ Push to GitHub

```bash
# Create a new repo on GitHub.com, then:
git remote add origin https://github.com/YOUR_USERNAME/be-ecofriendly.git
git branch -M main
git push -u origin main
```

### 3️⃣ Deploy Backend (Render)

1. **Create MongoDB Atlas database** (free)
   - [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
   - Get connection string

2. **Deploy to Render** (free)
   - [render.com](https://render.com) → New Web Service
   - Connect GitHub repo
   - Root Directory: `backend`
   - Build: `npm install`
   - Start: `npm start`
   
3. **Set environment variables** in Render:
   ```
   MONGODB_URI=mongodb+srv://...
   JWT_SECRET=<generate-random-string>
   FRONTEND_URL=<will-add-after-netlify>
   SUPABASE_URL=<your-supabase-url>
   SUPABASE_ANON_KEY=<your-key>
   SUPABASE_SERVICE_ROLE_KEY=<your-key>
   NODE_ENV=production
   ```

4. **Copy backend URL**: `https://your-app.onrender.com`

### 4️⃣ Deploy Frontend (Netlify)

1. **Go to Netlify**: [netlify.com](https://netlify.com)
2. **Import project** from GitHub
3. **Build settings**:
   - Base: `frontend`
   - Build: `npm run build`
   - Publish: `frontend/dist`
4. **Environment variable**:
   ```
   VITE_API_URL=https://your-backend.onrender.com
   ```
5. **Deploy!** Copy your URL: `https://your-app.netlify.app`

### 5️⃣ Final Configuration

1. **Update backend CORS**:
   - Render → Environment → Update `FRONTEND_URL`
   - Set to your Netlify URL
   - Save (auto-redeploys)

2. **Setup admin & products** (Render Shell):
   ```bash
   cd scripts
   node createTestUser.js
   node makeAdmin.js test@example.com  
   node seedProducts.js
   ```

## ✅ You're Live!

- **Frontend**: https://your-app.netlify.app
- **Backend**: https://your-backend.onrender.com
- **Admin login**: test@example.com / password123

---

**Need help?** See [QUICK_DEPLOY.md](./QUICK_DEPLOY.md) or [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

**Generate JWT Secret**:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```
