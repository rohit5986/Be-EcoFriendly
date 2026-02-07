# Deployment Guide - Be-EcoFriendly

This guide will help you deploy your full-stack application to production.

## Overview

- **Frontend**: Netlify (Static hosting)
- **Backend**: Render/Railway (Node.js server hosting)
- **Database**: MongoDB Atlas (Cloud database)

---

## Part 1: Deploy Backend to Render

### Step 1: Prepare MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account and cluster
3. Create a database user with password
4. Add `0.0.0.0/0` to IP whitelist (for production, restrict this)
5. Copy your connection string: `mongodb+srv://<username>:<password>@cluster.mongodb.net/be-ecofriendly`

### Step 2: Deploy Backend to Render

1. **Create Render Account**
   - Go to [Render.com](https://render.com)
   - Sign up with GitHub (recommended)

2. **Connect Your Repository**
   - Push your code to GitHub
   - Click "New +" → "Web Service"
   - Connect your GitHub repository

3. **Configure Web Service**
   ```
   Name: be-ecofriendly-backend
   Region: Choose closest to you
   Branch: main (or your default branch)
   Root Directory: backend
   Runtime: Node
   Build Command: npm install
   Start Command: npm start
   ```

4. **Add Environment Variables** in Render Dashboard:
   ```
   NODE_ENV=production
   PORT=5000
   MONGODB_URI=<your-mongodb-atlas-connection-string>
   JWT_SECRET=<generate-a-strong-random-secret>
   JWT_EXPIRE=7d
   SUPABASE_URL=<your-supabase-url>
   SUPABASE_ANON_KEY=<your-supabase-anon-key>
   SUPABASE_SERVICE_ROLE_KEY=<your-supabase-service-key>
   FRONTEND_URL=https://your-frontend-app.netlify.app
   ```

5. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment (takes 2-5 minutes)
   - Copy your backend URL: `https://be-ecofriendly-backend.onrender.com`

### Alternative: Railway

1. Go to [Railway.app](https://railway.app)
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Add the same environment variables
6. Railway will auto-deploy

---

## Part 2: Deploy Frontend to Netlify

### Step 1: Update Frontend API URL

1. **Check your API configuration file**:
   ```bash
   # In frontend/src/utils/api.js or similar
   # Update the baseURL to use environment variable
   ```

2. **Ensure the API URL uses environment variable**:
   The code should use `import.meta.env.VITE_API_URL` for the backend URL

### Step 2: Deploy to Netlify

#### Option A: Deploy via Netlify UI (Recommended)

1. **Create Netlify Account**
   - Go to [Netlify.com](https://netlify.com)
   - Sign up with GitHub

2. **Import Project**
   - Click "Add new site" → "Import an existing project"
   - Choose GitHub and select your repository
   - Configure build settings:
     ```
     Base directory: frontend
     Build command: npm run build
     Publish directory: frontend/dist
     ```

3. **Add Environment Variables**
   - Go to Site Settings → Environment Variables
   - Add:
     ```
     VITE_API_URL=https://be-ecofriendly-backend.onrender.com
     VITE_SUPABASE_URL=<your-supabase-url>
     VITE_SUPABASE_ANON_KEY=<your-supabase-anon-key>
     ```

4. **Deploy**
   - Click "Deploy site"
   - Your site will be live at: `https://random-name.netlify.app`
   - You can customize the domain in Site Settings

#### Option B: Deploy via Netlify CLI

1. **Install Netlify CLI**:
   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify**:
   ```bash
   netlify login
   ```

3. **Initialize and Deploy**:
   ```bash
   cd frontend
   netlify init
   # Follow the prompts
   
   # Build and deploy
   npm run build
   netlify deploy --prod
   ```

---

## Part 3: Update Backend CORS

After deploying frontend, update backend environment variable:

1. Go to Render Dashboard → Your Backend Service → Environment
2. Update `FRONTEND_URL` to your Netlify URL:
   ```
   FRONTEND_URL=https://your-app.netlify.app
   ```
3. Restart the service

---

## Part 4: Post-Deployment Setup

### 1. Create Admin User

SSH into your backend or use a script:
```bash
# You can run scripts through Render's shell
node scripts/createTestUser.js
node scripts/makeAdmin.js admin@youremail.com
```

### 2. Seed Products

```bash
node scripts/seedProducts.js
```

### 3. Test Your Deployment

1. Visit your Netlify URL
2. Register a new user
3. Login and test features
4. Place a test order
5. Login as admin and verify admin panel

---

## Troubleshooting

### Backend Issues

**Problem**: "Application Error" or 503
- Check Render logs in dashboard
- Verify all environment variables are set
- Ensure MongoDB connection string is correct

**Problem**: CORS errors
- Verify `FRONTEND_URL` in backend matches your Netlify URL
- Check backend server.js CORS configuration

### Frontend Issues

**Problem**: "Failed to fetch" or API errors
- Verify `VITE_API_URL` is set correctly in Netlify
- Check browser console for actual error
- Verify backend is running

**Problem**: Blank page after deployment
- Check browser console for errors
- Verify build completed successfully
- Check netlify.toml redirects are configured

### Database Issues

**Problem**: Cannot connect to MongoDB
- Verify IP whitelist includes `0.0.0.0/0`
- Check username/password in connection string
- Ensure database user has correct permissions

---

## Continuous Deployment

Both Netlify and Render support auto-deployment:

1. **Push to GitHub** → Automatically deploys
2. **No manual deployment needed**
3. **View deployment logs** in respective dashboards

---

## Custom Domain (Optional)

### For Frontend (Netlify):
1. Site Settings → Domain Management
2. Add custom domain
3. Update DNS records as instructed

### For Backend (Render):
1. Settings → Custom Domain
2. Add your domain
3. Update DNS records

---

## Environment Variables Summary

### Frontend (.env)
```env
VITE_API_URL=https://your-backend.onrender.com
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### Backend (.env)
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/be-ecofriendly
JWT_SECRET=your-super-secret-key-min-32-characters
JWT_EXPIRE=7d
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
FRONTEND_URL=https://your-app.netlify.app
```

---

## Quick Checklist

- [ ] MongoDB Atlas database created
- [ ] Backend deployed to Render/Railway
- [ ] Backend environment variables configured
- [ ] Backend is running (check URL)
- [ ] Frontend API URL updated
- [ ] Frontend deployed to Netlify
- [ ] Frontend environment variables configured
- [ ] CORS updated with frontend URL
- [ ] Admin user created
- [ ] Products seeded
- [ ] Test complete user flow

---

## Costs

- **MongoDB Atlas**: Free (512MB)
- **Render**: Free tier available (spins down after inactivity)
- **Railway**: $5 free credit monthly
- **Netlify**: Free (100GB bandwidth)

**Total**: $0 to start! 🎉

---

## Support

If you encounter issues:
1. Check logs in Render/Netlify dashboard
2. Review environment variables
3. Test backend API directly (use Postman/Thunder Client)
4. Check browser console for frontend errors

Good luck with your deployment! 🚀
