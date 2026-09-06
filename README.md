# 🌟 LUXE THREADS — Premium 3D Fashion E-Commerce

A cinematic, immersive full-stack fashion e-commerce website inspired by award-winning WebGL experiences. Features 3D animations, particle systems, custom GLSL shaders, scroll-driven effects, and a complete shopping experience.

![LUXE THREADS](https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1200&h=400&fit=crop)

## ✨ Features

### 3D & Animation (Edolus-Inspired)
- 🎆 **GPU Particle System** — 8,000+ gold particles swirling in 3D space
- 🌀 **Morphing Geometry** — Floating wireframe icosahedron with bloom glow
- 🧵 **Fabric Simulation** — Custom GLSL shaders for silk-like cloth animation
- 👁️ **360° Product Viewer** — Interactive 3D product viewing with orbit controls
- ✨ **Post-Processing** — Bloom, vignette, chromatic aberration effects
- 🖱️ **Mouse-Reactive** — All 3D elements respond to cursor movement

### UI/UX
- 🎯 **Custom Cursor** — Animated dot + ring that changes on interactive elements
- 📜 **GSAP ScrollTrigger** — Section-by-section reveal animations
- ✍️ **Text Reveal** — Characters animate in one by one
- 🧲 **Magnetic Buttons** — Buttons follow cursor within bounds
- 🖼️ **Image Reveal** — Overlay slides away revealing images on scroll
- 🎠 **Parallax Collections** — Horizontal scrolling showcase
- 📊 **Counter Animation** — Numbers count up when scrolled into view
- 🌙 **Cinematic Loader** — Letter-by-letter brand reveal with progress bar

### E-Commerce
- 🛍️ **Full Shopping Flow** — Browse → Product → Cart → Checkout
- 🔐 **JWT Authentication** — Register, login, protected routes
- 📦 **Order Management** — Create orders, track status
- 🏷️ **Advanced Filtering** — Category, price, size, color, search
- 🛒 **Persistent Cart** — Zustand + localStorage
- 👑 **Admin Features** — Product & order management

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14 (App Router), TypeScript |
| 3D Engine | Three.js, React Three Fiber, Drei |
| Animation | GSAP (ScrollTrigger, Timeline) |
| Shaders | Custom GLSL (vertex + fragment) |
| Styling | Tailwind CSS |
| State | Zustand (persisted) |
| Backend | Node.js, Express.js, TypeScript |
| Database | MongoDB, Mongoose |
| Auth | JWT, bcrypt |
| Post-Processing | Three.js EffectComposer (Bloom, Vignette) |

## 📋 Prerequisites

- **Node.js 18+** — [Download here](https://nodejs.org/)
- **MongoDB** — [Download here](https://www.mongodb.com/try/download/community) or use [MongoDB Atlas](https://www.mongodb.com/atlas) (free cloud)
- **npm** (comes with Node.js)

## 🚀 Installation

### 1. Clone/Navigate to project
```bash
cd luxe-threads
```

### 2. Environment Setup
```bash
# Copy environment file
cp .env.example .env

# Edit .env with your settings:
# - MONGODB_URI (your MongoDB connection string)
# - JWT_SECRET (change to a secure random string)
```

### 3. Backend Setup
```bash
cd backend
npm install
npm run seed    # Seeds database with 20 products, 6 categories, admin user
npm run dev     # Starts backend on http://localhost:5000
```

### 4. Frontend Setup (new terminal)
```bash
cd frontend
npm install
npm run dev     # Starts frontend on http://localhost:3000
```

### 5. Open Browser
Navigate to [http://localhost:3000](http://localhost:3000) and enjoy the cinematic experience! 🎬

## 👤 Default Admin Account
- **Email:** admin@luxethreads.com
- **Password:** admin123

## 📁 Project Structure

```
luxe-threads/
├── frontend/                          # Next.js 14 App
│   ├── src/
│   │   ├── app/                       # Pages (App Router)
│   │   │   ├── page.tsx               # Home (cinematic 3D landing)
│   │   │   ├── shop/                  # Shop with filters
│   │   │   ├── product/[id]/          # Product detail + 3D viewer
│   │   │   ├── cart/                  # Shopping cart
│   │   │   ├── checkout/              # Checkout flow
│   │   │   ├── auth/                  # Login & Register
│   │   │   ├── about/                 # Brand story
│   │   │   └── contact/              # Contact form
│   │   ├── components/
│   │   │   ├── three/                 # 3D & WebGL components
│   │   │   │   ├── HeroCanvas.tsx     # Cinematic 3D hero
│   │   │   │   ├── ParticleField.tsx  # GPU particle system
│   │   │   │   ├── ProductViewer3D.tsx# 360° product viewer
│   │   │   │   ├── FloatingCloth.tsx  # Fabric simulation
│   │   │   │   ├── BackgroundMesh.tsx # Morphing wireframe
│   │   │   │   └── shaders/          # GLSL shaders
│   │   │   ├── sections/             # Home page sections
│   │   │   ├── layout/               # Navbar, Footer, Loader
│   │   │   ├── ui/                   # Reusable UI components
│   │   │   └── cart/                 # Cart components
│   │   ├── hooks/                     # Custom React hooks
│   │   ├── store/                     # Zustand stores
│   │   ├── lib/                       # API client & utilities
│   │   └── styles/                    # Global CSS
│   ├── tailwind.config.ts
│   └── package.json
│
├── backend/                           # Express.js API
│   ├── src/
│   │   ├── server.ts                  # Entry point
│   │   ├── config/db.ts              # MongoDB connection
│   │   ├── models/                    # Mongoose models
│   │   ├── routes/                    # API routes
│   │   ├── controllers/              # Business logic
│   │   ├── middleware/               # Auth, validation, errors
│   │   └── seed.ts                   # Database seeder
│   └── package.json
│
├── .env.example
└── README.md
```

## 🎨 Design System

| Element | Value |
|---------|-------|
| Primary BG | `#0a0a0a` (near black) |
| Accent/Gold | `#d4a853` |
| Text Primary | `#ffffff` |
| Text Muted | `#a0a0a0` |
| Heading Font | Playfair Display (serif) |
| Body Font | Inter (sans-serif) |

## 📡 API Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/auth/register` | Register user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/profile` | Get user profile |
| GET | `/api/products` | List products (filter, sort, paginate) |
| GET | `/api/products/featured` | Featured products |
| GET | `/api/products/:id` | Single product |
| GET | `/api/products/:id/related` | Related products |
| POST | `/api/orders` | Create order |
| GET | `/api/orders/my` | User's orders |
| GET | `/api/categories` | List categories |

## 📄 License

MIT License — feel free to use for personal and commercial projects.

---

Built with ❤️ using Next.js, Three.js, GSAP & Express.js
