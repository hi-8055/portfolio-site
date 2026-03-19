# 🚀 Portfolio — Full-Stack Web Application

A production-ready dynamic portfolio built with **Next.js 14**, **Express.js**, **PostgreSQL**, and **Docker**.  
Features server-side rendering, a REST API, database persistence, animations, and a contact form.

---

## 🗂️ Project Structure

```
portfolio/
├── docker-compose.yml        # PostgreSQL container
├── package.json              # Root — run both services together
│
├── server/                   # Express.js backend
│   ├── app.js                # Middleware setup
│   ├── server.js             # Entry point
│   ├── schema.sql            # DB schema + seed data
│   ├── .env.example          # Environment variable template
│   ├── routes/               # Express route definitions
│   │   ├── projects.js
│   │   ├── contact.js
│   │   └── admin.js
│   ├── controllers/          # Request handlers
│   │   ├── projectsController.js
│   │   ├── contactController.js
│   │   └── adminController.js
│   ├── models/               # Database layer
│   │   ├── db.js             # pg Pool connection
│   │   ├── Project.js
│   │   └── Message.js
│   └── middleware/
│       ├── auth.js           # Basic auth for /api/admin
│       └── logger.js         # Coloured request logger
│
└── frontend/                 # Next.js 14 App Router
    ├── app/
    │   ├── layout.tsx         # Root layout, fonts, metadata
    │   ├── globals.css        # Tailwind + custom CSS
    │   ├── page.tsx           # Homepage (Hero→Skills→Projects→Contact)
    │   ├── projects/page.tsx  # Full projects listing
    │   └── api/contact/       # Optional Next.js proxy route
    ├── components/
    │   ├── Navbar.tsx
    │   ├── Footer.tsx
    │   ├── sections/
    │   │   ├── Hero.tsx
    │   │   ├── Skills.tsx
    │   │   ├── Projects.tsx
    │   │   └── Contact.tsx
    │   └── ui/
    │       └── ProjectCard.tsx
    └── lib/
        ├── api.ts             # Typed fetch helpers
        ├── skills.ts          # Skills data
        └── useScrollReveal.ts # Intersection Observer hook
```

---

## ⚡ Quick Start (Local Development)

### Prerequisites

| Tool | Version |
|------|---------|
| Node.js | ≥ 18.x |
| npm | ≥ 9.x |
| Docker Desktop | latest |

---

### Step 1 — Clone & Install

```bash
git clone https://github.com/yourusername/portfolio.git
cd portfolio

# Install all dependencies (root + server + frontend)
npm run install:all
```

---

### Step 2 — Configure Environment

**Backend** (`server/.env`):
```bash
cp server/.env.example server/.env
```

The defaults work out of the box with Docker. Only change if you use a custom DB:

```env
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=portfolio_db
DB_USER=portfolio_user
DB_PASSWORD=portfolio_pass
ADMIN_USERNAME=admin
ADMIN_PASSWORD=changeme_in_production
FRONTEND_URL=http://localhost:3000
```

**Frontend** (`frontend/.env.local`):
```bash
cp frontend/.env.local.example frontend/.env.local
```

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

---

### Step 3 — Start the Database

```bash
# Spin up PostgreSQL in Docker (runs schema.sql automatically on first start)
npm run db:up
```

Wait ~5 seconds for Postgres to initialise, then verify:
```bash
docker compose logs postgres
# Should show: "database system is ready to accept connections"
```

---

### Step 4 — Run the Application

```bash
# Start both the API server and Next.js frontend simultaneously
npm run dev
```

| Service | URL |
|---------|-----|
| Frontend | http://localhost:3000 |
| Backend API | http://localhost:5000 |
| API Health | http://localhost:5000/api/health |

---

## 🔌 API Endpoints

### Public

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Server health check |
| GET | `/api/projects` | All projects |
| GET | `/api/projects/featured` | Featured projects (homepage) |
| GET | `/api/projects/:id` | Single project |
| POST | `/api/contact` | Submit contact form |

#### POST `/api/contact` — Request body:
```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "message": "Hello! I have a project for you."
}
```

### Protected (Basic Auth)

All `/api/admin` routes require HTTP Basic Auth.  
Set `ADMIN_USERNAME` / `ADMIN_PASSWORD` in `server/.env`.

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/admin` | Admin overview |
| GET | `/api/admin/messages` | All contact messages |
| POST | `/api/admin/projects` | Create a new project |

Example with curl:
```bash
curl -u admin:changeme http://localhost:5000/api/admin/messages
```

#### POST `/api/admin/projects` — Request body:
```json
{
  "title": "My New Project",
  "description": "What it does and why it matters.",
  "tech_stack": ["React", "Node.js", "PostgreSQL"],
  "github_url": "https://github.com/you/project",
  "live_url": "https://project.vercel.app",
  "featured": true
}
```

---

## 🗄️ Database

Schema is in `server/schema.sql` and is **auto-applied** when Docker starts for the first time.

### Manual setup (without Docker):
```bash
psql -U postgres -c "CREATE DATABASE portfolio_db;"
psql -U postgres -c "CREATE USER portfolio_user WITH PASSWORD 'portfolio_pass';"
psql -U postgres -c "GRANT ALL PRIVILEGES ON DATABASE portfolio_db TO portfolio_user;"
psql -U portfolio_user -d portfolio_db -f server/schema.sql
```

### Tables

**`projects`**
| Column | Type | Notes |
|--------|------|-------|
| id | SERIAL PK | Auto-increment |
| title | VARCHAR(200) | Required |
| description | TEXT | Required |
| tech_stack | TEXT[] | Array of strings |
| github_url | VARCHAR(500) | Optional |
| live_url | VARCHAR(500) | Optional |
| featured | BOOLEAN | Homepage display |
| created_at | TIMESTAMP | Auto |

**`messages`**
| Column | Type | Notes |
|--------|------|-------|
| id | SERIAL PK | Auto-increment |
| name | VARCHAR(100) | Required |
| email | VARCHAR(200) | Required |
| message | TEXT | Required |
| created_at | TIMESTAMP | Auto |

---

## 🚢 Deployment

### Frontend → Vercel

```bash
cd frontend
npx vercel --prod
```

Set environment variable in Vercel dashboard:
```
NEXT_PUBLIC_API_URL = https://your-api-domain.com
```

### Backend → Railway / Render / Fly.io

1. Push the `server/` directory to a new repo (or use a monorepo root)
2. Set all environment variables from `server/.env.example` in the platform's dashboard
3. Set the start command: `node server.js`

### Database → Supabase / Neon / Railway Postgres

1. Create a hosted PostgreSQL instance
2. Run `schema.sql` against it
3. Update `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD` in your backend service

---

## 🎨 Customisation Guide

### Personal Info
| File | What to change |
|------|---------------|
| `frontend/app/layout.tsx` | Name, title, description, meta tags |
| `frontend/components/sections/Hero.tsx` | Name, title, bio, social links, profile image |
| `frontend/components/Footer.tsx` | Social links |
| `frontend/components/sections/Contact.tsx` | Email, location |

### Profile Photo
In `Hero.tsx`, replace the gradient placeholder `<div>` with:
```tsx
import Image from "next/image";

<Image
  src="/profile.jpg"     // place your photo in frontend/public/
  alt="Alex Rivera"
  fill
  className="object-cover"
  priority
/>
```

### Adding Projects (via API)
```bash
curl -X POST http://localhost:5000/api/admin/projects \
  -u admin:yourpassword \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My Project",
    "description": "What it does.",
    "tech_stack": ["Next.js", "PostgreSQL"],
    "github_url": "https://github.com/you/project",
    "featured": true
  }'
```

### Colours
All palette tokens are in `frontend/tailwind.config.js`.  
Key custom colours:
- `acid` — #b8f53d (lime green accent)
- `cobalt` — #3d8ef5 (blue accent)  
- `ink` — #0d0d0f (near-black)
- `paper` — #f5f3ee (warm white)
- `fog` — #9694a0 (muted grey)

---

## 🔒 Security Features

- **Helmet.js** — sets secure HTTP headers
- **CORS** — restricted to configured `FRONTEND_URL`
- **Rate limiting** — 100 req/15min general, 10 req/hour on contact
- **Input validation** — `express-validator` on all POST routes
- **HTML sanitisation** — strips tags from form inputs
- **Basic auth** — protects all `/api/admin` routes
- **Body size limit** — 10kb max payload

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend framework | Next.js 14 (App Router) |
| UI library | React 18 |
| Styling | Tailwind CSS 3 |
| Animations | Framer Motion + CSS |
| Icons | React Icons |
| Backend | Node.js + Express 4 |
| Database | PostgreSQL 16 |
| DB client | node-postgres (pg) |
| Containerisation | Docker + Docker Compose |
| Validation | express-validator |
| Security | Helmet, CORS, rate-limit |

---

## 📄 License

MIT — use freely for your own portfolio.
