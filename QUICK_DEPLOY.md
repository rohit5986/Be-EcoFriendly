# Quick Deployment Steps

## 🚀 Quick Start - Deploy to Production

### Step 1: Push to GitHub

```bash
# Initialize git (if not already done)
git init
git add .
git commit -m "Initial commit - Be-EcoFriendly app"

# Create a new repository on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/be-ecofriendly.git
git branch -M main
git push -u origin main
```

### Step 2: Setup MongoDB Atlas (5 minutes)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up → Create FREE cluster
3. Create database user: `becouser` with a strong password
4. Network Access → Add IP: `0.0.0.0/0` (allows all - for production, restrict this)
5. Copy connection string:
   ```
   mongodb+srv://Admin-BeEco:Wastec-Group@cluster0.mysgkbs.mongodb.net/?appName=Cluster0
   ```

### Step 3: Deploy Backend to Render (5 minutes)

1. Go to [Render.com](https://render.com) → Sign up with GitHub
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Configure:
   - **Name**: `be-ecofriendly-backend`
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Add Environment Variables (⚠️ **IMPORTANT - Only set these 4 required ones**):
   ```
   MONGODB_URI=mongodb+srv://Admin-BeEco:Wastec-Group@cluster0.mysgkbs.mongodb.net/?appName=Cluster0
   JWT_SECRET=<generate-random-32-char-string>
   FRONTEND_URL=https://YOUR-APP.netlify.app
   NODE_ENV=production
   ```
   
   **Note**: Leave SUPABASE variables empty/unset for now. You can add them later if you want image uploads.
   
6. Click **"Create Web Service"**
7. Wait 2-3 minutes, copy your backend URL: `https://be-ecofriendly-backend.onrender.com`

### Step 4: Deploy Frontend to Netlify (3 minutes)

1. Go to [Netlify.com](https://netlify.com) → Sign up with GitHub
2. Click **"Add new site"** → **"Import an existing project"**
3. Choose GitHub → Select your repository
4. Configure:
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/dist`
5. Add Environment Variable:
   ```
   VITE_API_URL=https://be-ecofriendly-backend.onrender.com
   ```
6. Click **"Deploy site"**
7. Your app will be live at: `https://random-name.netlify.app`

### Step 5: Update Backend CORS

1. Go back to Render → Your backend service
2. Environment → Update `FRONTEND_URL` to your actual Netlify URL
3. Save changes (will auto-redeploy)

### Step 6: Setup Admin & Products

You can run these via Render Shell:

1. In Render Dashboard → Your service → **Shell** tab
2. Run:
   ```bash
   cd scripts
   node createTestUser.js
   node makeAdmin.js test@example.com
   node seedProducts.js
   ```

**Or** manually via MongoDB Atlas:
1. Go to Collections → users
2. Find your user, edit, set `role: "admin"`

---

## ✅ Done! Your app is live

Visit your Netlify URL and start using your eco-friendly shop! 🌱

---

## 🔧 Generate JWT Secret

```bash
# On your computer, run:
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copy the output and use it as your `JWT_SECRET`.

---

## 📝 Important Notes

- **First load might be slow**: Render free tier spins down after 15 min of inactivity
- **CORS**: Make sure backend FRONTEND_URL exactly matches your Netlify domain
- **Environment variables**: Double-check all are set correctly on both platforms

---

## 🆘 Troubleshooting

**Can't login?**
- Check browser console for errors
- Verify `VITE_API_URL` is set in Netlify
- Test backend directly: `https://your-backend.onrender.com/api/health`

**CORS errors?**
- Update `FRONTEND_URL` in Render to match Netlify URL exactly
- No trailing slash!

**Backend errors?**
- Check Render logs in dashboard
- Verify MongoDB connection string
- Ensure all environment variables are set

---

Need detailed instructions? See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)
