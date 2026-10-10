# Ideatex Website - cPanel Node.js Deployment Guide

A fresh production build incorporating all latest GitHub updates has been compiled and packaged into:
📁 **`ideatex-cpanel-build.zip`** (15.63 MB, located in the root of your project)

---

## 📦 What's Inside `ideatex-cpanel-build.zip`

1. **`server.js`** - Production server configured for CloudLinux Phusion Passenger with built-in static asset serving for `/_next/static/*` and `public/*`.
2. **`app.js`** - Startup file wrapper for Passenger.
3. **`.next/`** - Complete compiled Next.js standalone application including `.next/static/` chunks and SSG/prerendered pages.
4. **`public/`** - All latest static assets, logos, brand graphics, and CMS `uploads/` folder.
5. **`data/`** - CMS SQLite/JSON database (`cms-db.json` & `cms-seed.json`).
6. **`package.json`** - Production dependencies list for server-side `npm install`.
7. **`.env` & `.env.production`** - Clean production environment variables (Passenger port handling + optional Zoho Mail SMTP placeholders).
8. **Note:** `node_modules` is intentionally **excluded** from this ZIP to avoid corrupting CloudLinux's virtual environment symlink.

---

## 🚀 Step-by-Step Deployment Guide

### Step 1: Upload and Extract in cPanel File Manager

1. Open cPanel **File Manager** and navigate to your application root directory:
   `/home/tifbvkis/ideatex.co.in`
2. Click **Upload** in the top toolbar.
3. Select and upload [ideatex-cpanel-build.zip](file:///c:/Amal/Ideatex-Website/ideatex-cpanel-build.zip).
4. Once the progress bar turns green (100%), return to the file manager.
5. Select `ideatex-cpanel-build.zip` and click **Extract** (extract directly into `/home/tifbvkis/ideatex.co.in`).
6. *(Optional)* Delete the zip file from the server after extraction to save space.

---

### Step 2: Set File Permissions & Install Dependencies

In your cPanel Terminal (or SSH as `tifbvkis`):

```bash
cd /home/tifbvkis/ideatex.co.in

# 1. Fix permissions for unzipped files and directories
chmod -R 755 .next public data
chmod 644 .env .env.production server.js app.js package.json

# 2. Install production dependencies into the CloudLinux environment
npm install --omit=dev
```

> **Note:** If `npm install` says `Cloudlinux NodeJS Selector demands to store node modules for application in separate folder (virtual environment) pointed by symlink called "node_modules"`, that means an old real `node_modules` folder was left behind. If needed, enter the node virtual environment command shown at the top of your cPanel Node.js app page (e.g. `source /home/tifbvkis/nodeenv/ideatex.co.in/20/bin/activate`).

---

### Step 3: Restart Node.js Application in cPanel

1. In cPanel, navigate to **Setup Node.js App**.
2. Find the application for `ideatex.co.in`.
3. Verify settings:
   - **Node.js version:** `20.x`
   - **Application mode:** `Production`
   - **Application root:** `ideatex.co.in`
   - **Application startup file:** `server.js` (or `app.js`)
4. Click **Restart Application**.

---

### Step 4: Verification

- **Website:** [https://ideatex.co.in](https://ideatex.co.in)
- **Services:** [https://ideatex.co.in/services](https://ideatex.co.in/services)
- **Admin Panel:** [https://ideatex.co.in/admin](https://ideatex.co.in/admin)
