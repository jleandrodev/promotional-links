# NutraHub - Natural Health & Wellness Hub

A modern, SEO-optimized blog and product hub for natural health and wellness content, built with Next.js 16, Prisma, and Supabase.

## Features

- 🏠 **Modern Homepage** with carousel, categories, latest posts, products, and newsletter
- 📝 **Blog System** with categories, pillar/cluster structure, and SEO optimization
- 🛍️ **Product Pages** with detailed information and SEO
- 🎨 **Admin Panel** for content management (blog posts, categories, products, home content)
- 🔐 **Authentication** via Supabase
- 📸 **Image Management** with Supabase Storage (2MB limit for blog post images)
- 🔍 **SEO Optimized** with structured data, sitemap, and metadata
- 📱 **Responsive Design** with Tailwind CSS
- 🗄️ **Prisma ORM** for type-safe database access

## Tech Stack

- **Next.js 16** - React framework
- **TypeScript** - Type safety
- **Prisma** - ORM for database management
- **Supabase** - Backend (PostgreSQL, Auth, Storage)
- **Tailwind CSS** - Styling
- **Swiper** - Carousel component
- **Framer Motion** - Animations

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables:**
   Create a `.env.local` file with:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://suiqgdobvvdycovmvqjr.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN1aXFnZG9idnZkeWNvdm12cWpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM0MjE1MDAsImV4cCI6MjA3ODk5NzUwMH0.6qQIr80l9xNqHOULrmajzUjuOnAZjxo_PQB12AQH--M
   DATABASE_URL=postgresql://postgres:[YOUR_PASSWORD]@db.suiqgdobvvdycovmvqjr.supabase.co:5432/postgres
   NEXT_PUBLIC_SITE_URL=https://nutrahub.com
   ```

3. **Set up Prisma:**
   ```bash
   npx prisma generate
   npx prisma db push
   ```
   
   Or if you prefer migrations:
   ```bash
   npx prisma migrate dev --name init
   ```

4. **Set up Supabase Storage:**
   - Create a storage bucket named `blogpost_images` with public access
   - Set up RLS (Row Level Security) policies as needed

5. **Run the development server:**
   ```bash
   npm run dev
   ```

6. **Access the admin panel:**
   - Navigate to `/adminpanel`
   - Create a user account via Supabase Auth or use existing credentials

## Project Structure

```
app/
  ├── components/          # Reusable components
  ├── adminpanel/         # Admin area
  ├── api/                # API routes (using Prisma)
  ├── blog/               # Blog pages
  ├── categories/         # Category pages
  ├── products/           # Product pages
  ├── guia-do-sono-do-bebe/  # Existing LP (preserved)
  └── page.tsx            # Homepage

lib/
  ├── prisma.ts           # Prisma client instance
  └── supabase/           # Supabase client (for auth & storage)

prisma/
  └── schema.prisma       # Prisma schema

types/
  └── database.ts         # TypeScript types (re-exports from Prisma)
```

## Database Management with Prisma

This project uses Prisma as the ORM for all database operations. The schema is defined in `prisma/schema.prisma`.

### Common Prisma Commands

- **Generate Prisma Client:**
  ```bash
  npx prisma generate
  ```

- **Push schema changes to database:**
  ```bash
  npx prisma db push
  ```

- **Create a migration:**
  ```bash
  npx prisma migrate dev --name migration_name
  ```

- **View database in Prisma Studio:**
  ```bash
  npx prisma studio
  ```

## Color Palette

- Primary: `#086972`
- Secondary: `#0b95a2`
- Accent: `#0fc1d1`
- Dark: `#053d42`
- Light: `#e6e6e6`
- White: `#ffffff`

## SEO Features

- ✅ Structured data (JSON-LD)
- ✅ Open Graph tags
- ✅ Twitter Card tags
- ✅ Sitemap generation
- ✅ Robots.txt
- ✅ Meta descriptions and keywords
- ✅ Canonical URLs

## Admin Features

- Blog post management (CRUD) via Prisma
- Category management
- Product management
- Home content management
- Image upload to Supabase Storage

## Notes

- The existing landing pages (guia-do-sono-do-bebe, femipro, prodentim) are preserved
- Blog post images are limited to 2MB
- All content is managed through the admin panel
- Database operations use Prisma for type safety and better developer experience
