# EduAitor Admin

## Deploy on Render (Static Site)

1. Push this repo to GitHub.
2. Render → **New** → **Static Site**
3. Connect the repo and use:

| Setting | Value |
|---|---|
| **Name** | `eduaitor-website-admin` (or any name) |
| **Root Directory** | `Eduaitor Admin` |
| **Build Command** | `npm install && npm run build` |
| **Publish Directory** | `dist` |

4. **Environment**

```env
VITE_API_URL=https://eduaitor-website-backend.onrender.com/api
```

5. Deploy. Login URL:

`https://YOUR-ADMIN-SITE.onrender.com/admin/login`

6. On the **backend** Render service, add this admin URL to CORS (no trailing slash):

```env
CLIENT_URL_2=https://YOUR-ADMIN-SITE.onrender.com
```

Then **Manual Deploy** the backend so CORS updates.

## Local setup

```bash
cd "Eduaitor Admin"
cp .env.example .env.development
npm install
npm run dev
```

Login: `/admin/login`

## Backend auth env (on Render backend only)

```env
ADMIN_EMAIL=your-admin-email@example.com
ADMIN_PASSWORD_HASH=your-bcrypt-password-hash
JWT_SECRET=at-least-32-random-bytes
```

Generate password hash from `Eduaitor Backend`:

```bash
node -e "import('bcryptjs').then(async ({default:b}) => console.log(await b.hash(process.argv[1], 12)))" "YOUR-STRONG-PASSWORD"
```
