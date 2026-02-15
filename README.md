# CORENEX INNOVATIONS - IT Company Website

A modern, full-stack IT company website built with Next.js 14, featuring a public-facing portfolio site and a secure admin panel for content management.

## 🚀 Features

### Public Website
- **Modern Design**: Purple-themed design with dark mode support
- **Responsive**: Fully responsive across all devices
- **SEO Optimized**: Proper meta tags and semantic HTML
- **Dynamic Content**: Projects and services fetched from database
- **Contact Form**: Working contact form with email notifications

### Admin Panel
- **Secure Authentication**: JWT-based authentication with bcrypt password hashing
- **Dashboard**: Overview with statistics and quick actions
- **Project Management**: View, add, edit, and delete portfolio projects
- **Message Management**: View and manage contact form submissions
- **Protected Routes**: Middleware-protected admin routes

### Technical Features
- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Prisma ORM** with PostgreSQL
- **Server Actions** and API Routes
- **Form Validation** with Zod
- **Email Integration** with Nodemailer

## 📋 Prerequisites

- Node.js 18+ installed
- PostgreSQL database (local or cloud - Supabase recommended)
- Gmail account for email notifications (with App Password)

## 🛠️ Installation

### 1. Clone and Install Dependencies

```bash
cd "z:/CoreNex innovation/website"
npm install
```

### 2. Set Up Environment Variables

Copy `.env.example` to `.env.local` and update the values:

```bash
# Database - Get from Supabase or your PostgreSQL provider
DATABASE_URL="postgresql://user:password@host:5432/database?schema=public"

# JWT Secret - Generate a random string
JWT_SECRET="your-super-secret-jwt-key-change-this"

# Admin Credentials (default)
ADMIN_EMAIL="admin@corenexinnovations.com"
ADMIN_PASSWORD="Admin@123456"

# Email Configuration (Gmail SMTP)
EMAIL_HOST="smtp.gmail.com"
EMAIL_PORT=587
EMAIL_USER="your-email@gmail.com"
EMAIL_PASSWORD="your-gmail-app-password"
EMAIL_FROM="your-email@gmail.com"
EMAIL_TO="recipient@gmail.com"

# App URL
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 3. Set Up Gmail App Password

1. Go to your Google Account settings
2. Enable 2-Factor Authentication
3. Go to Security → 2-Step Verification → App Passwords
4. Generate a new app password for "Mail"
5. Use this password in `EMAIL_PASSWORD`

### 4. Set Up Database

```bash
# Generate Prisma Client
npm run db:generate

# Push schema to database
npm run db:push

# Seed database with initial data
npm run db:seed
```

### 5. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to see the website.

## 🔐 Admin Access

- **URL**: `http://localhost:3000/admin/login`
- **Email**: `admin@corenexinnovations.com`
- **Password**: `Admin@123456`

**⚠️ IMPORTANT**: Change the admin password after first login!

## 📁 Project Structure

```
website/
├── app/
│   ├── (public pages)
│   │   ├── page.tsx              # Home page
│   │   ├── about/                # About Us
│   │   ├── services/             # Services
│   │   ├── portfolio/            # Portfolio
│   │   └── contact/              # Contact
│   ├── admin/                    # Admin panel
│   │   ├── login/                # Admin login
│   │   ├── dashboard/            # Dashboard
│   │   ├── projects/             # Project management
│   │   ├── messages/             # Contact messages
│   │   └── services/             # Services management
│   ├── api/                      # API routes
│   │   ├── auth/                 # Authentication
│   │   ├── projects/             # Projects CRUD
│   │   ├── services/             # Services CRUD
│   │   ├── contact/              # Contact form
│   │   └── admin/                # Admin endpoints
│   ├── layout.tsx                # Root layout
│   └── globals.css               # Global styles
├── components/
│   ├── Header.tsx                # Navigation header
│   ├── Footer.tsx                # Footer
│   └── theme-provider.tsx        # Dark mode provider
├── lib/
│   ├── auth.ts                   # Authentication utilities
│   ├── db.ts                     # Prisma client
│   ├── email.ts                  # Email service
│   ├── validation.ts             # Zod schemas
│   └── utils.ts                  # Utility functions
├── prisma/
│   ├── schema.prisma             # Database schema
│   └── seed.ts                   # Seed data
├── middleware.ts                 # Route protection
└── tailwind.config.ts            # Tailwind configuration
```

## 🎨 Customization

### Change Company Branding

1. Replace logo in `public/logo.png`
2. Update company name in:
   - `components/Header.tsx`
   - `components/Footer.tsx`
   - `app/layout.tsx` (metadata)

### Update Colors

Edit `tailwind.config.ts` to change the purple theme colors.

### Modify Content

- **About Us**: Edit `app/about/page.tsx`
- **Services**: Update `prisma/seed.ts` and re-run seed
- **Contact Info**: Edit `components/Footer.tsx` and `app/contact/page.tsx`

## 🚀 Deployment to Vercel

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin your-repo-url
git push -u origin main
```

### 2. Deploy on Vercel

1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Add environment variables from `.env.local`
4. Deploy!

### 3. Set Up Production Database

1. Create a PostgreSQL database on Supabase or Vercel Postgres
2. Update `DATABASE_URL` in Vercel environment variables
3. Run migrations:
   ```bash
   npx prisma db push
   npx prisma db seed
   ```

## 📧 Email Configuration

The contact form sends emails using Gmail SMTP. Make sure to:

1. Enable 2FA on your Gmail account
2. Generate an App Password
3. Use the App Password (not your regular password) in `EMAIL_PASSWORD`

## 🔒 Security Features

- ✅ JWT-based authentication
- ✅ Bcrypt password hashing
- ✅ Protected admin routes with middleware
- ✅ Input validation with Zod
- ✅ XSS protection with input sanitization
- ✅ HTTP-only cookies
- ✅ Environment variable security

## 🐛 Troubleshooting

### Database Connection Issues
- Check your `DATABASE_URL` is correct
- Ensure PostgreSQL is running
- Verify firewall allows connections

### Email Not Sending
- Verify Gmail App Password is correct
- Check `EMAIL_USER` and `EMAIL_PASSWORD`
- Ensure 2FA is enabled on Gmail

### Admin Login Not Working
- Run `npm run db:seed` to create admin user
- Check console for error messages
- Verify `JWT_SECRET` is set

## 📝 License

This project is private and proprietary to CORENEX INNOVATIONS.

## 🤝 Support

For support, email info@corenexinnovations.com

---

Built with ❤️ by CORENEX INNOVATIONS
