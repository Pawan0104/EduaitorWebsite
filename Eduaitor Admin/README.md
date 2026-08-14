# EduAitor Admin

## Basic settings (same host as backend)

When the API is hosted on the **same domain as the admin dashboard**:

### 1) Admin — `Eduaitor Admin/.env`

```env
VITE_API_URL=https://YOUR-ADMIN-DOMAIN/api
```

Examples:
- `VITE_API_URL=https://admin.eduaitor.com/api`
- or same-origin relative: `VITE_API_URL=/api`

Rebuild/redeploy admin after changing this.

### 2) Website — `Eduaitor/.env`

```env
VITE_API_URL=https://YOUR-ADMIN-DOMAIN/api
```

(Use the same API URL the admin uses.)

### 3) Backend — `Eduaitor Backend/.env`

```env
PORT=5000

MONGO_URI=mongodb+srv://...
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...

CLIENT_URL_1=https://www.eduaitor.com
CLIENT_URL_2=https://YOUR-ADMIN-DOMAIN
CLIENT_URL_3=http://localhost:5173

ADMIN_EMAIL=your-admin-email@example.com
ADMIN_PASSWORD_HASH=your-bcrypt-password-hash
JWT_SECRET=at-least-32-random-bytes
```

`CLIENT_URL_*` must match the exact browser origins (no trailing slash).

### 4) Generate admin password hash

From `Eduaitor Backend`:

```bash
node -e "import('bcryptjs').then(async ({default:b}) => console.log(await b.hash(process.argv[1], 12)))" "YOUR-STRONG-PASSWORD"
```

### 5) Generate JWT secret

```bash
node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
```

Login at `/admin/login` with `ADMIN_EMAIL` + the plain password you hashed.

## Local setup

1. Copy `.env.example` → `.env` in Admin, Backend, and Website.
2. Set values above.
3. `npm install` + `npm run dev` in each app.
