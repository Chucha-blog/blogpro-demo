# BlogPro

Professional blogging platform with real-time analytics, visual footer editor, and enterprise-grade features.

## 🚀 Features

- **Real-time Analytics** - WebSocket-powered analytics with 95%+ reliability
- **Visual Footer Editor** - Drag & drop footer builder with live preview
- **Professional Text Editor** - Google Docs-compliant editor with 60fps performance
- **Media Management** - Categorized file storage with bulk operations
- **JWT Authentication** - Secure role-based access control
- **BEM CSS Architecture** - W3C compliant, no utility frameworks
- **Multi-language Support** - English/Russian i18n
- **Redis Caching** - Multi-level caching for optimal performance

## 🛠️ Tech Stack

**Frontend:** React 18, TypeScript, Vite, BEM CSS  
**Backend:** Express.js, PostgreSQL, Redis, WebSocket  
**Tools:** Drizzle ORM, Zod validation, PM2

## 📦 Quick Start

```bash
# Install dependencies
npm install
cd client && npm install && cd ..

# Setup environment
cp .env.example .env
cp client/.env.example client/.env

# Run development
npm run dev
```

**Access:**
- Frontend: http://localhost:3000
- Admin: http://localhost:3000/admin
- API: http://localhost:5000/api

## 🔐 Default Admin

- Username: `admin`
- Password: `admin123`

## 📚 Documentation

- [Deployment Guide](./QUICK_DEPLOY.md)
- [Full Documentation](./docs/README.md)

## 📄 License

MIT License
