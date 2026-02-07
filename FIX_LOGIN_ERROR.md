# 🔧 Fix "Route Not Found" Login Error

## The Problem

Your frontend is trying to call `/auth/login` but doesn't know where your backend is deployed.

---

## ✅ Solution - Set Environment Variable in Netlify

### Step 1: Get Your Backend URL

Your Render backend URL should be something like:
```
https://be-ecofriendly-backend.onrender.com
```

You can find it in:
- Render Dashboard → Your Service → Top of the page

### Step 2: Add to Netlify

1. **Go to Netlify Dashboard**
2. **Click on your site**
3. **Site settings** → **Environment variables**
4. **Click "Add a variable"**
5. **Add**:
   - Key: `VITE_API_URL`
   - Value: `https://your-backend.onrender.com` (NO trailing slash!)
   
6. **Click "Save"**

### Step 3: Redeploy Frontend

After adding the environment variable:

1. Go to **Deploys** tab
2. Click **"Trigger deploy"** → **"Clear cache and deploy site"**
3. Wait 1-2 minutes

---

## 🧪 Test Locally First

Before deploying, test that everything works:

```bash
# In your terminal
cd frontend

# Make sure .env has the right backend URL
echo "VITE_API_URL=http://localhost:5000" > .env

# Or if backend is on Render, use:
# echo "VITE_API_URL=https://your-backend.onrender.com" > .env

# Start frontend
npm run dev
```

Try logging in - it should work!

---

## 🔍 How to Debug

### Check What URL Frontend is Using

Open browser console (F12) → Console tab, add this to your `api.js`:

```javascript
// Add after creating axios instance
console.log('API Base URL:', api.defaults.baseURL);
```

This will show you what URL the frontend is trying to reach.

### Test Backend Directly

Open this in your browser or Postman:
```
https://your-backend.onrender.com/api/health
```

Should return:
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "..."
}
```

If this doesn't work, your backend isn't running properly.

### Test Login Endpoint

**POST** to:
```
https://your-backend.onrender.com/api/auth/login
```

**Body (JSON)**:
```json
{
  "email": "admin@be-ecofriendly.com",
  "password": "Admin@123456"
}
```

Should return a token and user data.

---

## 🚨 Common Issues

### Issue 1: "Cannot POST /api/auth/login"
**Problem**: Frontend using relative URL `/api` instead of backend URL
**Solution**: Set `VITE_API_URL` in Netlify environment variables

### Issue 2: CORS Error
**Problem**: Backend FRONTEND_URL doesn't match Netlify URL
**Solution**: 
1. Render Dashboard → Your backend → Environment
2. Update `FRONTEND_URL` to exact Netlify URL: `https://your-app.netlify.app`
3. Save (will redeploy)

### Issue 3: "Network Error" or timeout
**Problem**: Render free tier spun down
**Solution**: First request takes 30-60s to wake up. Wait and try again.

### Issue 4: Backend not running
**Problem**: Deployment failed
**Solution**: 
1. Render Dashboard → Your service → Logs
2. Check for errors
3. Common issues:
   - Missing `MONGODB_URI`
   - Invalid Supabase credentials (delete them if not using)
   - Wrong Node version

---

## 📝 Quick Checklist

Before login works, ensure:

- [ ] Backend deployed on Render and showing "live" status
- [ ] Backend health check works: `https://backend.onrender.com/api/health`
- [ ] `VITE_API_URL` set in Netlify environment variables
- [ ] Frontend redeployed after adding environment variable
- [ ] `FRONTEND_URL` in Render matches Netlify URL exactly
- [ ] Admin user created via setup endpoint
- [ ] Both URLs use HTTPS (not HTTP)

---

## ⚡ Quick Fix Commands

**Add VITE_API_URL to Netlify via CLI** (if you have Netlify CLI):

```bash
netlify env:set VITE_API_URL "https://your-backend.onrender.com"
netlify deploy --prod
```

**Check current environment**:
```bash
netlify env:list
```

---

## 🎯 Expected Flow

1. User enters login credentials
2. Frontend makes POST request to: `{VITE_API_URL}/auth/login`
3. Backend receives request, validates credentials
4. Backend returns JWT token
5. Frontend stores token and redirects

**If step 2 fails**, you'll see "route not found" - this means VITE_API_URL is not set correctly.

---

## 🔗 URLs Reference

**Local Development:**
- Frontend: `http://localhost:5174`
- Backend: `http://localhost:5000`
- API Base: `http://localhost:5000`

**Production:**
- Frontend: `https://your-app.netlify.app`
- Backend: `https://your-backend.onrender.com`
- API Base: `https://your-backend.onrender.com` (set as VITE_API_URL)

---

Need more help? Check the browser console for the actual error message!
