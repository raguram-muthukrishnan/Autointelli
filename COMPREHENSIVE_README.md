# 🚀 Autointelli - Comprehensive Documentation

**Autointelli** is a full-stack web application built with **React** (frontend), **Strapi CMS** (backend), and **PostgreSQL** (production database). This document provides complete documentation for developers, administrators, and operations teams.

---

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Pages Available](#pages-available)
3. [Admin Panel & Blog Management](#admin-panel--blog-management)
4. [Admin Credentials & Authentication](#admin-credentials--authentication)
5. [API Endpoints](#api-endpoints)
6. [Environment Variables](#environment-variables)
7. [Database Configuration](#database-configuration)
8. [Workflow & Process](#workflow--process)
9. [Development Setup](#development-setup)
10. [Deployment & Docker](#deployment--docker)
11. [Troubleshooting](#troubleshooting)
12. [File Structure](#file-structure)

---

## 🎯 Project Overview

**Autointelli** is a complete content management and e-commerce platform featuring:

- **Frontend**: React + Vite (fast development environment)
- **Backend**: Strapi 5.31.2 (headless CMS)
- **Database**: PostgreSQL (production) / SQLite (development)
- **Authentication**: JWT-based admin authentication via Strapi
- **Deployment**: Docker containerization for easy scaling
- **Content Types**: Blogs, Webinars, Events, Resources, Jobs, Knowledge Base, Tutorials, and more
- **Admin Panel**: Fully functional Strapi admin dashboard for content management

---

## 📄 Pages Available

### 🌐 Public-Facing Pages

All public pages are located in `src/pages/`:

| Page | Route | Purpose |
|------|-------|---------|
| **Home** | `/` | Landing page with hero section and featured content |
| **Products** | `/products` | Product catalog listing |
| **Product Detail** | `/product/:slug` | Individual product information page |
| **Blogs** | `/blogs` | Blog post listing with search and filtering |
| **Blog Detail** | `/blog/:slug` | Individual blog post view with full content |
| **Webinars** | `/webinars` | Webinar listings and registration info |
| **Webinar Detail** | `/webinar/:slug` | Full webinar details |
| **Events** | `/events` | Upcoming events calendar and listings |
| **Event Detail** | `/event/:slug` | Event information and registration |
| **About Us** | `/about` | Company information and mission |
| **Partners** | `/partners` | Partner companies and partnerships |
| **Careers** | `/careers` | Job listings and career opportunities |
| **Knowledge Base** | `/knowledge-base` | FAQ and knowledge base articles |
| **Tutorials** | `/tutorials` | Video and text tutorials |
| **Resources** | `/resources` | Downloadable resources and tools |
| **Resource Detail** | `/resource/:slug` | Individual resource with download link |
| **Contact** | `/contact` | Contact form for inquiries |
| **Terms of Service** | `/terms` | Legal terms and conditions |
| **Privacy Policy** | `/privacy` | Privacy and data handling policy |
| **Legal** | `/legal` | Additional legal information |
| **Newletter subscribe** | `subscribe` | Newsletter subscribe page |

### 🔐 Admin Dashboard Pages

All admin pages are located in `src/admin/` but are **disabled in production** (using Strapi admin instead).

| Page | Access URL (Strapi) | Purpose |
|------|-------|---------|
| **Admin Login** | `/admin/login` (custom) | Authentication for admin users |
| **Dashboard** | `/admin/dashboard` | Main dashboard with stats and overview |
| **Blogs** | `/admin` → Content Manager → Blogs | Create, edit, delete, publish blog posts |
| **Webinars & Events** | `/admin` → Content Manager → Webinars/Events | Manage webinars and events |
| **Resources** | `/admin` → Content Manager → Resources | Upload and manage downloadable resources |
| **Careers/Jobs** | `/admin` → Content Manager → Jobs | Post and manage job openings |
| **Job Applications** | `/admin` → Content Manager → Job Applications | View and track job applications |
| **Contact Inquiries** | `/admin` → Content Manager → CTA Inquiries | View contact form submissions |
| **Chatbot Logs** | `/admin` → Content Manager → Chatbot Interactions | View chatbot conversation history |
| **Partner Requests** | `/admin` → Content Manager → Partner Requests | Manage partnership inquiries |
| **Newsletter Subscribers** | `/admin` → Content Manager → Newsletter Subscriptions | Subscriber list and management |
| **Analytics** | `/admin` → Content Manager → Visitors/Resource Downloads | View website analytics and download data |
| **Admin Users** | `/admin` → Settings → Roles & Users | Manage admin accounts and permissions |

---

## 🛠️ Admin Panel & Blog Management

### Accessing the Admin Panel

**Production**: `https://autointelli.com/admin`  
**Development**: `http://localhost:1337/admin`

### How to Upload and Manage Blogs

#### Step 1: Login to Admin Panel
1. Navigate to the admin URL (see above)
2. Enter your admin email and password
3. You'll be redirected to the Strapi admin dashboard

#### Step 2: Navigate to Blogs
1. In the sidebar, click **"Content Manager"**
2. Select **"Blogs"** from the content types list

#### Step 3: Create a New Blog Post

**Option A: In Strapi Admin (Recommended)**
1. Click **"+ Create new entry"** button
2. Fill in the following fields:

| Field | Type | Description | Required |
|-------|------|-------------|----------|
| **Title** | Text | Blog post title | ✅ Yes |
| **Slug** | Text (auto) | URL-friendly slug (auto-generated) | ✅ Auto |
| **Category** | Enumeration | Blog category (Tech, Business, AI, etc.) | ✅ Yes |
| **Date** | Date | Publication date | ✅ Yes |
| **Read Time** | Text | Estimated read time (e.g., "5 min read") | ✅ Yes |
| **Excerpt** | Text | Short summary (appears in listings) | ✅ Yes |
| **Description** | Rich Text | Full blog content (HTML formatting) | ✅ Yes |
| **Image** | Media (Single) | Featured image for blog post | ✅ Yes |
| **Featured** | Boolean | Check to feature on homepage | ❌ No |
| **Published** | Boolean | Check to publish (uncheck = draft) | ✅ Yes |

3. Click **"Save"** then **"Publish"** to make it live

#### Step 4: Upload Blog Image
1. In the **"Image"** field, click **"+ Add an asset"**
2. Choose upload method:
   - **Upload files**: Select from your computer
   - **From URL**: Paste an image URL
   - **From media library**: Select previously uploaded image
3. The image will appear in blog listings and on the blog detail page

#### Step 5: Edit or Delete Blog Post
- **Edit**: Click on any existing blog → Make changes → Click **"Save"** → **"Publish"**
- **Delete**: Click on blog → Click **"Delete"** button → Confirm deletion

### Using the Custom React Admin (Disabled)

If you need to enable the custom React admin dashboard:

1. Open `src/App.jsx`
2. Uncomment lines 33-50 (the admin route block)
3. The admin interface will be available at `/admin`

**Note**: Production uses Strapi admin, but the custom React dashboard is available for development.

### Blog Upload API Reference

If using the API directly (for custom integrations):

```javascript
// Fetch all blogs
GET /api/blogs?populate=*

// Create a new blog
POST /api/blogs
Content-Type: multipart/form-data
{
  data: {
    title: "Blog Title",
    slug: "blog-slug",
    category: "Tech",
    date: "2026-04-10",
    readTime: "5 min read",
    excerpt: "Short summary",
    description: "<p>Full content</p>",
    featured: true,
    published: true
  },
  files: {
    image: <File object>
  }
}

// Update existing blog
PUT /api/blogs/:id
{ ... same fields ... }

// Delete blog
DELETE /api/blogs/:id
```

---

## 🔐 Admin Credentials & Authentication

### Admin Account Details

| Field | Value |
|-------|-------|
| **Admin Email** | `admin@autointelli.dev` |
| **Admin Password** | Contact your system administrator (stored securely in .env) |
| **JWT Secret** | `naF17wDx9WT1OcEG8i2ZFQ==` (production) |
| **Admin URL** | `https://autointelli.com/admin` |

### Authentication Flow

```
1. User enters email + password on login page
                  ↓
2. POST request to: {STRAPI_URL}/api/auth/local
   Body: { identifier: "email", password: "***" }
                  ↓
3. Strapi validates credentials
                  ↓
4. Response contains: { jwt, user: { id, email, username, role, ... } }
                  ↓
5. JWT stored in: localStorage.jwt
   User data stored in: localStorage.user
                  ↓
6. Subsequent API requests include: Authorization: Bearer {jwt}
                  ↓
7. On logout: JWT + user data cleared from localStorage
   User redirected to login page
```

### JWT Token Structure

- **Type**: JSON Web Token (JWT)
- **Expiration**: 7 days (default Strapi setting)
- **Header**: `Authorization: Bearer <token>`
- **Usage**: Include in all authenticated API requests

### Changing Admin Password

1. Login to Strapi Admin at `/admin`
2. Click your **profile icon** (top right)
3. Select **"View profile"**
4. Click **"Edit password"**
5. Enter old password + new password
6. Save changes

### Creating New Admin Users

1. Login to Strapi Admin
2. Go to **Settings** → **Users and permissions** (or **Administration** → **Users**)
3. Click **"+ Invite new user"**
4. Enter email address
5. Select role:
   - **Super Admin**: Full access to all content and settings
   - **Editor**: Can manage content but not system settings
   - **Author**: Can create and edit own content only
6. Click **"Send invite"**
7. New user receives email with activation link

### Admin Roles & Permissions

**Super Admin**
- Full system access
- Manage all content types
- Manage users and roles
- Configure settings and plugins
- Access export and analytics

**Editor**
- Manage all content types (create, read, update, delete)
- Cannot modify system settings
- Cannot manage users

**Author**
- Can only create/edit own content
- Cannot delete content
- Cannot access analytics or settings

### API Authentication

All API endpoints require JWT authentication (except public endpoints):

```bash
# With authentication
curl -H "Authorization: Bearer YOUR_JWT_TOKEN" \
     https://autointelli.com/api/blogs

# Public endpoints (no auth needed)
curl https://autointelli.com/api/blogs
```

---

## 🔌 API Endpoints

### Base URL

- **Production**: `https://autointelli.com/api`
- **Development**: `http://localhost:1337/api`

### Content Management Endpoints

#### 📝 Blogs

```
GET    /api/blogs                        # List all blogs
GET    /api/blogs/:id                    # Get single blog
GET    /api/blogs?filters[category][$eq]=Tech  # Filter by category
POST   /api/blogs                        # Create blog (authenticated)
PUT    /api/blogs/:id                    # Update blog (authenticated)
DELETE /api/blogs/:id                    # Delete blog (authenticated)
```

**Blog Fields**:
- `id` (number)
- `title` (string)
- `slug` (string)
- `category` (string)
- `date` (date)
- `readTime` (string)
- `excerpt` (string)
- `description` (richtext/HTML)
- `featured` (boolean)
- `published` (boolean)
- `image` (media object)
- `createdAt` (timestamp)
- `updatedAt` (timestamp)

#### 🎥 Webinars

```
GET    /api/webinars                     # List all webinars
GET    /api/webinars/:id                 # Get single webinar
POST   /api/webinars                     # Create (authenticated)
PUT    /api/webinars/:id                 # Update (authenticated)
DELETE /api/webinars/:id                 # Delete (authenticated)
```

#### 📅 Events

```
GET    /api/events                       # List all events
GET    /api/events/:id                   # Get single event
POST   /api/events                       # Create (authenticated)
PUT    /api/events/:id                   # Update (authenticated)
DELETE /api/events/:id                   # Delete (authenticated)
```

#### 📦 Resources

```
GET    /api/resources                    # List all resources
GET    /api/resources/:id                # Get single resource
POST   /api/resources                    # Create (authenticated)
PUT    /api/resources/:id                # Update (authenticated)
DELETE /api/resources/:id                # Delete (authenticated)
```

#### 💼 Jobs/Careers

```
GET    /api/jobs                         # List all job postings
GET    /api/jobs/:id                     # Get single job
POST   /api/jobs                         # Create (authenticated)
PUT    /api/jobs/:id                     # Update (authenticated)
DELETE /api/jobs/:id                     # Delete (authenticated)
```

#### 📋 Job Applications

```
GET    /api/job-applications             # List applications (authenticated)
GET    /api/job-applications/:id         # Get single application
POST   /api/job-applications             # Submit application
```

#### 💬 Contact Inquiries / CTA

```
GET    /api/cta-inquiries                # List inquiries (authenticated)
POST   /api/cta-inquiries                # Submit inquiry (public)
```

#### 📧 Newsletter Subscriptions

```
GET    /api/newsletter-subscriptions     # List (authenticated)
POST   /api/newsletter-subscriptions     # Subscribe (public)
DELETE /api/newsletter-subscriptions/:id # Unsubscribe
```

#### 🤝 Partner Requests

```
GET    /api/partner-requests             # List (authenticated)
POST   /api/partner-requests             # Submit request (public)
```

#### 💬 Chatbot Interactions

```
GET    /api/chatbot-interactions         # List interactions (authenticated)
POST   /api/chatbot-interactions         # Log interaction (public)
```

#### 👥 Visitors Analytics

```
GET    /api/visitors                     # List visitor data (authenticated)
POST   /api/visitors                     # Track visitor (public)
```

#### ⬇️ Resource Downloads Tracking

```
GET    /api/resource-downloads           # List downloads (authenticated)
POST   /api/resource-downloads           # Log download (public)
```

### Authentication Endpoints

```
POST   /api/auth/local                   # Login
       Body: { identifier: "email@example.com", password: "****" }
       Response: { jwt, user: { id, email, username, role, confirmed, blocked } }

POST   /api/auth/logout                  # Logout (clears session)
```

### Export/Analytics Endpoints

```
GET    /api/export/all-visitor-data      # Export visitor data as CSV (authenticated)
GET    /api/export/cta-inquiries         # Export contact inquiries as CSV (authenticated)
GET    /api/export/partner-requests      # Export partner requests as CSV (authenticated)
GET    /api/export/newsletter-subscriptions # Export subscribers as CSV (authenticated)
GET    /api/export/chatbot-interactions  # Export chatbot logs as CSV (authenticated)
```

### Query Parameters

All `GET` endpoints support:

```
?populate=*                              # Include relationships
?filters[field][$eq]=value               # Filter by field
?filters[field][$like]=*value*           # Partial match
?sort=field:ASC                          # Sort ascending
?sort=field:DESC                         # Sort descending
?pagination[page]=1                      # Pagination
?pagination[pageSize]=25                 # Items per page
```

**Example**:
```
GET /api/blogs?filters[category][$eq]=Tech&sort=date:DESC&pagination[pageSize]=10
```

---

## 🔧 Environment Variables

Create a `.env` file in the project root with the following variables:

### Frontend Variables

```bash
# Frontend API Configuration
VITE_STRAPI_URL=https://autointelli.com
VITE_WEBSOCKET_URL=wss://autointelli.com/ws
VITE_WEBSOCKET_USER_ID=xxxx  # Personalized websocket user ID
VITE_TURNSTILE_SITE_KEY=0x4AAAAAACNa3gqWH2EOSgDO  # Cloudflare captcha key
VITE_OPENROUTER_API_KEY=sk-or-v1-xxxx  # OpenRouter API key for Chatbot
```

### Backend/Strapi Variables

```bash
# Server Configuration
NODE_ENV=production
HOST=0.0.0.0
PORT=1337
PUBLIC_URL=https://autointelli.com
ADMIN_URL=https://autointelli.com/admin
IS_PROXIED=true

# Database Configuration (PostgreSQL)
DATABASE_CLIENT=postgres
DATABASE_HOST=database
DATABASE_PORT=5432
DATABASE_NAME=strapi
DATABASE_USERNAME=strapi
DATABASE_PASSWORD=AutoIntelli@Secure2025!
DATABASE_SSL=false

# Security Keys
APP_KEYS=6SH8HARNGd21wqIuX31cIw==,wqIuX31c6SH8HARNGd21Iw==  # Multiple keys
JWT_SECRET=SzGBzPGktdUML3d64Wh2uA==
ADMIN_JWT_SECRET=naF17wDx9WT1OcEG8i2ZFQ==

# Admin Configuration
ADMIN_EMAIL=admin@autointelli.dev
ADMIN_JWT_SECRET=naF17wDx9WT1OcEG8i2ZFQ==

# Email / SMTP Configuration
SMTP_HOST=mail.autointelli.com
SMTP_PORT=587
SMTP_USER=admin@autointelli.dev
SMTP_PASS=Wigtra@autointelli1
SMTP_FROM=corp@autointelli.com
SMTP_SECURE=false

# Encryption (if applicable)
ENCRYPTION_KEY=RSrmNDdmb3j+zOFlMx6LTw==

# API Keys for Third-Party Services
CLOUDFLARE_TURNSTILE_SECRET=0x4AAAAAACNa3gqWH2EOSgDO
SENDGRID_API_KEY=SG.xxxxx  # If using SendGrid instead of SMTP
```

### Environment-Specific Configurations

**Development (.env.local or .env.development)**:
```bash
NODE_ENV=development
DATABASE_CLIENT=sqlite
VITE_STRAPI_URL=http://localhost:1337
```

**Production (.env)**:
```bash
NODE_ENV=production
DATABASE_CLIENT=postgres
VITE_STRAPI_URL=https://autointelli.com
```

---

## 💾 Database Configuration

### PostgreSQL (Production)

**Connection Details**:
```
Host: database
Port: 5432
Database: strapi
Username: strapi
Password: AutoIntelli@Secure2025!
SSL: Disabled (managed internally in Docker)
```

**Backup**:
```bash
# Dump database
pg_dump -U strapi -h database strapi > backup.sql

# Restore database
psql -U strapi -h database strapi < backup.sql
```

### SQLite (Development)

**Location**: `.tmp/data.db`

**Backup**: Simply copy the `.tmp/data.db` file

**Reset Database**:
```bash
rm -rf .tmp/data.db  # Remove file
npm run dev          # Recreate on next startup
```

### Database Schema

#### Blogs Table
```sql
CREATE TABLE blogs (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE,
  category VARCHAR(100),
  date DATE,
  readTime VARCHAR(50),
  excerpt TEXT,
  description TEXT,
  featured BOOLEAN DEFAULT false,
  published BOOLEAN DEFAULT false,
  image_id INTEGER REFERENCES files(id),
  createdAt TIMESTAMP DEFAULT NOW(),
  updatedAt TIMESTAMP DEFAULT NOW()
);
```

Similar tables exist for: webinars, events, resources, jobs, job_applications, cta_inquiries, etc.

---

## 🔄 Workflow & Process

### Content Publishing Workflow

```
┌─────────────────────────────────────────────────────────────┐
│                    CONTENT LIFECYCLE                        │
└─────────────────────────────────────────────────────────────┘

1. CREATION
   ├─ Admin logs into Strapi Admin Panel
   ├─ Creates new Blog/Webinar/Event/etc
   └─ Fills in all required fields and uploads media

         ↓

2. DRAFT STAGE
   ├─ Content saved but NOT PUBLISHED
   ├─ Only admin can see in dashboard
   └─ Can continue editing

         ↓

3. REVIEW (Optional)
   ├─ Other admins can review unpublished content
   ├─ Request for approval from super admin
   └─ Make final edits

         ↓

4. PUBLISH
   ├─ Admin clicks "PUBLISH" button
   ├─ Content marked as published: true
   └─ Content becomes visible in API responses

         ↓

5. LIVE ON FRONTEND
   ├─ Frontend requests /api/blogs?filters[published][$eq]=true
   ├─ Published content displays on:
   │  ├─ /blogs (listings page)
   │  ├─ / (homepage featured section)
   │  └─ /blog/slug (detail page)
   └─ Live for all website visitors

         ↓

6. MAINTENANCE
   ├─ Edit: Update content → Save → Republish
   ├─ Archive: Unpublish (toggle published: false)
   └─ Delete: Permanently remove content
```

### User Journey (Visitor Flow)

```
┌─────────────────────────────────────────────────────────────┐
│                    VISITOR JOURNEY                          │
└─────────────────────────────────────────────────────────────┘

1. DISCOVERY
   Visitor lands on: https://autointelli.com
          ↓
   Frontend loads React app (index.html → App.jsx)
          ↓
   App makes API request: GET /api/blogs?populate=*&filters[published][$eq]=true

2. BROWSING
   ├─ Views homepage with featured blogs
   ├─ Clicks on category filter (Tech, Business, AI, etc.)
   ├─ Frontend filters blogs by category
   └─ Displays filtered results

3. SELECTION
   Visitor clicks on blog post
          ↓
   Frontend navigates to: /blog/{slug}
          ↓
   BlogDetailPage component fetches: GET /api/blogs?filters[slug][$eq]={slug}

4. ENGAGEMENT
   Visitor reads blog content
          ↓
   Optional: Fills contact form → POST /api/cta-inquiries
          ↓
   Admin receives inquiry notification → Views in Dashboard

5. ANALYTICS TRACKING
   Website tracks visitor:
   └─ POST /api/visitors (page views, session duration, etc.)
```

### Admin Content Management Workflow

```
┌─────────────────────────────────────────────────────────────┐
│             ADMIN DAILY WORKFLOW                            │
└─────────────────────────────────────────────────────────────┘

MORNING TASKS
├─ Login to /admin
├─ Check Dashboard for:
│  ├─ Contact inquiries (cta-inquiries)
│  ├─ Job applications (job-applications)
│  ├─ Chatbot interactions (recent conversations)
│  └─ Newsletter subscribers (new subscriptions)
└─ Quick analytics check (visitor count, resource downloads)

CONTENT UPDATES
├─ Navigate to: Content Manager → Blogs (or other content type)
├─ Create new content:
│  ├─ Click "+ Create new entry"
│  ├─ Fill form (title, category, date, content, image)
│  ├─ Save as draft
│  └─ Review and publish when ready
├─ Edit existing content:
│  ├─ Click on entry
│  ├─ Make changes
│  ├─ Save
│  └─ Republish if necessary
└─ Delete obsolete content:
   ├─ Select content
   ├─ Click delete
   └─ Confirm deletion

BULK OPERATIONS
├─ Export analytics data: /api/export/* endpoints
├─ View subscriber list: Content Manager → Newsletter Subscriptions
├─ Check job applications: Content Manager → Job Applications
└─ Manage admin users: Settings → Users and Permissions

MONITORING
├─ Check for errors in Strapi logs
├─ Monitor database disk usage
└─ Verify email notifications are sending (SMTP)
```

### Deployment & Release Workflow

```
┌─────────────────────────────────────────────────────────────┐
│            DEPLOYMENT WORKFLOW                              │
└─────────────────────────────────────────────────────────────┘

DEVELOPMENT
├─ Frontend: npm run dev (Vite)
├─ Backend: cd backend && npm run dev (Strapi)
└─ Database: SQLite (.tmp/data.db)

STAGING
├─ Commit code to git
├─ Docker build images
├─ Push to staging environment
└─ Test with PostgreSQL database

PRODUCTION
├─ Build Docker images
├─ docker-compose up --build -d
├─ Database migrated (if schema changed)
├─ Restart Strapi service
├─ Verify all pages accessible
├─ Check API endpoints
└─ Monitor logs for errors
```

---

## 💻 Development Setup

### Prerequisites

- **Node.js**: v18 or higher
- **npm**: v9 or higher
- **Git**: For version control
- **Docker** (optional): For containerized development
- **PostgreSQL** (optional): For production-like testing

### Frontend Setup

```bash
# Clone the repository
git clone <repo-url>
cd Autointelli

# Install dependencies
npm install

# Create .env.local file
cp .env.example .env.local

# Edit .env.local with local values
VITE_STRAPI_URL=http://localhost:1337
VITE_TURNSTILE_SITE_KEY=test_key_if_needed

# Start development server
npm run dev

# Open browser
# Frontend runs at: http://localhost:5173
# Backend runs at: http://localhost:1337
# Admin panel: http://localhost:1337/admin
```

### Backend Setup

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create .env file (use values from root .env or create new)
cp ../.env .env

# Create database (SQLite for dev)
npm run build

# Start Strapi in develop mode
npm run develop

# Strapi Admin: http://localhost:1337/admin
# API: http://localhost:1337/api
```

### Docker Development Setup

```bash
# Using docker-compose for full stack

# Development with SQLite
docker-compose -f docker-compose.dev.yml up --build -d

# Production with PostgreSQL
docker-compose up --build -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Access
# Frontend: http://localhost/
# API: http://localhost:1337/api
# Admin: http://localhost:1337/admin (or /admin if proxied)
```

### npm Scripts

**Frontend**:
```json
{
  "dev": "vite",                    // Start dev server
  "build": "vite build",            // Build for production
  "preview": "vite preview",        // Preview built app
  "lint": "eslint .",               // Run ESLint
}
```

**Backend**:
```json
{
  "develop": "strapi develop",      // Start in dev mode
  "build": "strapi build",          // Build for production
  "start": "strapi start",          // Start production
  "strapi": "strapi"                // Strapi CLI
}
```

---

## 🐳 Deployment & Docker

### Docker Architecture

```
┌──────────────────────────────────────────────────────────────┐
│              DOCKER DEPLOYMENT STACK                         │
├──────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌─────────────────┐     ┌─────────────────┐                │
│  │  NGINX (Port 80,443) │ ──→ │ Frontend (React)  │                │
│  │  (Reverse Proxy)     │     │ (Staticfiles)     │                │
│  └─────────────────┘     └─────────────────┘                │
│         ↑                                                     │
│         │ Port 1337                                          │
│  ┌─────────────────┐                                         │
│  │  Strapi Backend │                                         │
│  │  (Node.js)      │                                         │
│  └────────┬────────┘                                         │
│           │                                                   │
│  ┌────────▼────────┐                                         │
│  │  PostgreSQL DB  │                                         │
│  │  (Port 5432)    │                                         │
│  └─────────────────┘                                         │
│                                                               │
└──────────────────────────────────────────────────────────────┘
```

### Building Docker Images

```bash
# Frontend image
docker build -f Dockerfile.frontend -t autointelli-frontend .

# Backend image
docker build -f Dockerfile.backend -t autointelli-backend .

# Run with docker-compose
docker-compose up --build -d
```

### Docker Compose Configuration

**Production** (`docker-compose.yml`):
- PostgreSQL 8.8.0
- Strapi backend (Node.js)
- Nginx reverse proxy
- Network: Internal communication

**Development** (`docker-compose.dev.yml`):
- SQLite database
- Strapi backend
- No database service needed

### Deployment Steps

```bash
# 1. Build images
docker-compose build

# 2. Start services
docker-compose up -d

# 3. Verify services running
docker-compose ps

# 4. Check logs
docker-compose logs -f

# 5. Access services
# Frontend: http://localhost
# Admin: http://localhost:1337/admin OR http://localhost/admin

# 6. Stop services
docker-compose down

# 7. Rebuild (to apply code changes)
docker-compose up --build -d
```

### Environment for Docker

**Within Docker (container networking)**:
```bash
DATABASE_HOST=database        # Service name (not localhost)
STRAPI_URL=http://strapi:1337 # Service name
```

**From outside Docker (local development)**:
```bash
DATABASE_HOST=localhost       # Your machine
STRAPI_URL=http://localhost:1337
```

### Production Deployment Checklist

- [ ] All environment variables set in `.env`
- [ ] Database credentials configured
- [ ] SSL certificates configured (if HTTPS)
- [ ] Nginx configuration reviewed
- [ ] Upload directory permissions set (`755`)
- [ ] Database backups scheduled
- [ ] Logging enabled and monitored
- [ ] Email/SMTP tested
- [ ] Admin credentials strong and secure
- [ ] Build cache cleared: `docker system prune -a`
- [ ] Services verified: `docker-compose ps`
- [ ] Logs monitored: `docker-compose logs -f`

---

## 🛠️ Troubleshooting

### Common Issues & Solutions

#### 1. Admin Panel Not Loading

**Problem**: `/admin` returns 404 or blank page

**Solutions**:
```bash
# Check if Strapi is running
curl http://localhost:1337/

# Rebuild Strapi
cd backend && npm run build

# Restart service
docker-compose restart strapi

# Or locally:
npm run develop (from backend directory)
```

**File Reference**: [FIX_ADMIN_CRASH.md](FIX_ADMIN_CRASH.md)

#### 2. Blog Post Not Showing on Frontend

**Problem**: Published blog not visible on `/blogs` page

**Check**:
- Blog has `published: true` in Strapi
- API endpoint returns the blog: `GET /api/blogs?filters[published][$eq]=true`
- Frontend component filters by `published` field

**Solution**:
```javascript
// In your component, ensure filtering:
const response = await fetch('http://localhost:1337/api/blogs?filters[published][$eq]=true');
const data = await response.json();
```

#### 3. Image Upload Failing

**Problem**: Cannot upload image to blog post

**Check**:
- Upload directory writable: `backend/public/uploads/`
- Permissions: `chmod -R 755 backend/public/uploads/`
- File size limit: Default 100MB
- Supported formats: JPEG, PNG, GIF, WebP

**Solution**:
```bash
# Create directory if missing
mkdir -p backend/public/uploads

# Set permissions
chmod -R 755 backend/public/uploads

# Check permissions
ls -la backend/public/uploads
```

#### 4. Database Connection Error

**Problem**: "Cannot connect to database" error

**For PostgreSQL**:
```bash
# Check container running
docker-compose ps

# Check database logs
docker-compose logs postgres  # or 'database' depending on service name

# Verify credentials in .env
echo $DATABASE_PASSWORD
echo $DATABASE_USERNAME

# Test connection
psql -h localhost -U strapi -d strapi
```

**For SQLite**:
```bash
# Check file exists
ls -la .tmp/data.db

# Reset if corrupted
rm .tmp/data.db
npm run dev  # Recreates database
```

#### 5. API Returns 401 Unauthorized

**Problem**: "Unauthorized" error when accessing admin endpoints

**Check**:
- JWT token is valid: `localStorage.getItem('jwt')`
- Token not expired (7-day expiration)
- Header format: `Authorization: Bearer {token}`

**Solution**:
```javascript
// Login again to get new token
const response = await fetch('http://localhost:1337/api/auth/local', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    identifier: 'admin@autointelli.dev',
    password: '****'
  })
});
const { jwt } = await response.json();
localStorage.setItem('jwt', jwt);
```

#### 6. Port Already in Use

**Problem**: "Port 3000 already in use" or "Port 1337 in use"

**Solution**:
```bash
# Find process using port (macOS/Linux)
lsof -i :1337

# Kill process
kill -9 <PID>

# Or change port in .env
PORT=3338  # Use different port

# Windows PowerShell
netstat -ano | findstr :1337
taskkill /PID <PID> /F
```

#### 7. CORS Error

**Problem**: Frontend cannot access backend API (CORS error)

**File**: [backend/config/middlewares.js](backend/config/middlewares.js)

**Check Configuration**:
```javascript
// Should include your frontend URL
{
  name: 'strapi::cors',
  config: {
    origin: ['http://localhost:5173', 'https://autointelli.com'],
    credentials: true,
  },
},
```

**Solution**:
```bash
# Restart backend after CORS config change
npm run develop (from backend)
# Or
docker-compose restart strapi
```

#### 8. Email Not Sending

**Problem**: Inquiry emails not received

**Check**:
```bash
# Verify SMTP credentials in .env
echo $SMTP_HOST
echo $SMTP_USER
echo $SMTP_PASS

# Test email configuration
# File: backend/config/plugins.js
```

**Solution**:
```bash
# Restart backend
npm run develop

# Check logs for email errors
docker-compose logs strapi | grep -i email
```

### Debug Mode

Enable debug logging:

```bash
# Frontend
VITE_DEBUG=true npm run dev

# Backend
DEBUG=strapi* npm run develop

# Docker
docker-compose logs -f app
docker-compose logs -f strapi
```

---

## 📁 File Structure

```
Autointelli/
├── 📄 COMPREHENSIVE_README.md          ← You are here
├── 📄 README.md                        (Basic setup guide)
├── 📄 DOCKER_GUIDE.md                  (Docker instructions)
├── 📄 DOCKER_README.md                 (Docker overview)
├── 📄 FIX_ADMIN_CRASH.md               (Admin troubleshooting)
├── 📄 package.json                     (Frontend & Root dependencies)
├── 📄 vite.config.js                   (Frontend build config)
├── 📄 nginx.conf                       (Reverse proxy config)
├── 📄 vercel.json                      (Deployment config)
├── 📄 optimize-media.js                (Media optimization script)
│
├── 🐳 Dockerfile.frontend              (React image)
├── 🐳 Dockerfile.backend               (Strapi image)
├── 📦 docker-compose.yml               (Production stack)
├── 📦 docker-compose.dev.yml           (Development stack)
├── 📦 docker-compose.windows.yml       (Windows-specific)
│
├── src/                                Main React app
│   ├── main.jsx                        App entry point
│   ├── App.jsx                         Main component + routing
│   ├── App.css                         Global styles
│   ├── api.js                          ⭐ API client functions
│   │
│   ├── pages/                          Public pages
│   │   ├── Home.jsx
│   │   ├── BlogPage.jsx & BlogDetailPage.jsx
│   │   ├── ProductsPage.jsx
│   │   ├── ContactPage.jsx
│   │   ├── WebinarsPage.jsx
│   │   ├── EventsPage.jsx
│   │   ├── CareersPage.jsx
│   │   ├── KnowledgeBasePage.jsx
│   │   ├── TutorialsPage.jsx
│   │   ├── ResourcesPage.jsx
│   │   ├── AboutPage.jsx
│   │   ├── PartnersPage.jsx
│   │   ├── TermsPage.jsx
│   │   ├── PrivacyPage.jsx
│   │   └── ...
│   │
│   ├── admin/                          ⭐ Admin Dashboard (disabled in prod)
│   │   ├── Login.jsx                   (Authentication)
│   │   ├── AdminLayout.jsx             (Shell + sidebar navigation)
│   │   ├── Dashboard.jsx               (Overview)
│   │   ├── DashboardBlogs.jsx          ⭐ Blog management
│   │   ├── ...
│   │   └── DashboardChatbotInteractions.jsx
│   │
│   ├── components/                     Reusable components
│   ├── services/                       Business logic
│   ├── utils/                          Helper functions
│   ├── hooks/                          Custom React hooks
│   ├── lib/                            Libraries & utilities
│   ├── assets/                         Images, fonts, etc.
│   ├── config/                         App configuration
│   └── data/                           Static data
│
├── data/                               Static data files
│   ├── data.js
│   ├── knowledgeBaseData.jsx
│   ├── productsData.js
│   ├── tutorialsData.jsx
│   └── webinarsEventsData.js
│
├── public/                             Static assets
├── backend/                            Strapi CMS backend
│   ├── package.json                    (Backend dependencies)
│   ├── jsconfig.json                   (JavaScript config)
│   ├── config/                         ⭐ Server configuration
│   ├── src/                            Source code
│   ├── public/                         Uploaded files
│   └── build/                          Production build output
│
├── 📄 .env                             ⚠️ Environment variables (production)
├── 📄 .env.example                     Example .env template
├── 📄 .env.local                       Local development overrides
├── 📄 .gitignore                       Git ignore rules
├── 📄 eslint.config.js                 ESLint configuration
└── 📄 components.json                  UI components config
```

---

## 📚 Quick Reference

### Essential Commands

```bash
# Frontend
npm install              # Install dependencies
npm run dev              # Start dev server (localhost:5173)
npm run build            # Production build
npm run lint             # ESLint check

# Backend
cd backend
npm install              # Install dependencies
npm run develop          # Start dev server (localhost:1337)
npm run build            # Build for production
npm start                # Start production build

# Docker
docker-compose up -d --build         # Start all services
docker-compose down                  # Stop all services
docker-compose logs -f               # View logs
docker-compose ps                    # Show running services
docker-compose exec strapi bash      # Execute command in container

# Database (PostgreSQL)
pg_dump -U strapi -h database strapi > backup.sql
psql -U strapi -h database strapi < backup.sql
```

### Important URLs

| Service | URL (Local) | URL (Production) |
|---------|------------|-----------------|
| Frontend | http://localhost:5173 | https://autointelli.com |
| API | http://localhost:1337/api | https://autointelli.com/api |
| Admin Panel | http://localhost:1337/admin | https://autointelli.com/admin |
| Blog Management | http://localhost:1337/admin/content-manager/collection-types/api::blog.blog | See Admin Panel |

### Key Contacts & Credentials

📧 **Admin Email**: `admin@autointelli.dev`  
🔐 **JWT Secret**: `naF17wDx9WT1OcEG8i2ZFQ==`  
🗄️ **DB Username**: `strapi`  
🗄️ **DB Name**: `strapi`  

**For passwords and sensitive data**, refer to your organization's credentials manager.

---

## 📞 Support & Contribution

For issues, questions, or feature requests:
1. Check this README first
2. See [FIX_ADMIN_CRASH.md](FIX_ADMIN_CRASH.md) for troubleshooting
3. Review [DOCKER_GUIDE.md](DOCKER_GUIDE.md) for deployment
4. Contact the development team

---


## 🔒 Security Notes

- **Never commit `.env` file to Git** (contains passwords)
- **Rotate admin passwords regularly**
- **Use strong, unique passwords** for all admin accounts
- **Keep JWT secrets confidential** – do not share
- **Enable HTTPS in production** (included in docker-compose)
- **Regularly update dependencies**: `npm audit fix`
- **Monitor logs** for suspicious activity
- **Backup database** daily in production
- **Review admin user access** periodically

---

**Last Updated**: April 10, 2026  
**Version**: 1.0  
**Maintainer**: Kairo Digital

---

