# 🆓 Free Setup Guide - No Premium Shell Needed!

Since Render Shell requires premium, use this HTTP endpoint to setup your app instead.

## ✅ Step-by-Step Setup

### Step 1: Deploy Your Backend

Make sure your backend is deployed and running on Render.

### Step 2: Check Status (Optional)

Visit this URL in your browser to check if setup is needed:

```
https://your-backend-url.onrender.com/api/setup/status
```

You should see:
```json
{
  "success": true,
  "data": {
    "isInitialized": false,
    "admins": 0,
    "products": 0,
    "users": 0
  }
}
```

### Step 3: Run Setup

**Option A: Using Browser/Postman**

1. Open Postman, Thunder Client, or any API testing tool
2. Make a **POST** request to:
   ```
   https://your-backend-url.onrender.com/api/setup/initialize
   ```
3. Body (JSON):
   ```json
   {
     "setupKey": "setup-2024-eco-friendly"
   }
   ```
4. Send the request

**Option B: Using cURL (Terminal)**

```bash
curl -X POST https://your-backend-url.onrender.com/api/setup/initialize \
  -H "Content-Type: application/json" \
  -d '{"setupKey": "setup-2024-eco-friendly"}'
```

**Option C: Using PowerShell**

```powershell
$body = @{
    setupKey = "setup-2024-eco-friendly"
} | ConvertTo-Json

Invoke-RestMethod -Uri "https://your-backend-url.onrender.com/api/setup/initialize" `
  -Method Post `
  -Body $body `
  -ContentType "application/json"
```

### Step 4: Success Response

You should get:

```json
{
  "success": true,
  "message": "Setup completed successfully!",
  "data": {
    "admin": {
      "email": "admin@be-ecofriendly.com",
      "password": "Admin@123456",
      "note": "Please change password after first login"
    },
    "productsAdded": 8
  }
}
```

### Step 5: Login as Admin

1. Go to your Netlify frontend: `https://your-app.netlify.app`
2. Click Login
3. Use these credentials:
   - **Email**: `admin@be-ecofriendly.com`
   - **Password**: `Admin@123456`

4. **IMPORTANT**: Change your password after first login!

---

## 🔒 Security Notes

1. The setup endpoint can only be run once
2. After admin user exists, it will reject further setup attempts
3. The setup key (`setup-2024-eco-friendly`) is a basic security measure
4. For production, you can change the setup key by adding `SETUP_KEY` environment variable in Render

### To Change Setup Key (Optional):

1. Render Dashboard → Your Service → Environment
2. Add:
   ```
   SETUP_KEY=your-custom-secret-key-here
   ```
3. Use this key when calling the setup endpoint

---

## 🧪 Testing Locally

Before deploying, test locally:

```bash
# Make sure backend is running on localhost:5000
curl -X POST http://localhost:5000/api/setup/initialize \
  -H "Content-Type: application/json" \
  -d '{"setupKey": "setup-2024-eco-friendly"}'
```

---

## ❌ Troubleshooting

**Error: "Invalid setup key"**
- Check you're using the correct setup key
- If you set custom `SETUP_KEY` in Render, use that value

**Error: "Setup already completed"**
- Admin user already exists
- You can login with existing credentials
- Or manually update user role in MongoDB Atlas

**Error: "Cannot POST /api/setup/initialize"**
- Check your backend URL is correct
- Ensure backend is deployed and running
- Check Render logs for errors

**Connection timeout**
- Render free tier spins down after inactivity
- First request might take 30-60 seconds to wake up
- Try again if it times out

---

## 🔄 Alternative: MongoDB Atlas Direct

If the endpoint doesn't work, you can manually create an admin in MongoDB Atlas:

1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Browse Collections → Your Database → `users` collection
3. Find your registered user
4. Edit the document
5. Change `"role": "user"` to `"role": "admin"`
6. Save

Then run seed products locally and it will update the remote DB:

```bash
cd backend/scripts
node seedProducts.js
```

---

## ✅ Verification

After setup, verify everything works:

1. ✅ Check status endpoint shows initialized:
   ```
   https://your-backend-url.onrender.com/api/setup/status
   ```

2. ✅ Login as admin works

3. ✅ Products appear in shop

4. ✅ Admin dashboard is accessible

---

## 📝 Quick Reference

**Status Check:**
```
GET https://your-backend.onrender.com/api/setup/status
```

**Run Setup:**
```
POST https://your-backend.onrender.com/api/setup/initialize
Body: {"setupKey": "setup-2024-eco-friendly"}
```

**Admin Credentials:**
```
Email: admin@be-ecofriendly.com
Password: Admin@123456
```

---

That's it! No premium shell needed. 🎉
