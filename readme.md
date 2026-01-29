# 🚀 NexusStock Enterprise
**Supply Chain Command Center** - Real-time inventory, AI forecasting, multi-warehouse management for modern enterprises.

## ✨ **What is NexusStock?**

A production-ready **Supply Chain Platform** built with Angular 18 + NestJS microservices. Track 100k+ SKUs across 50+ warehouses with AI demand forecasting, automated procurement, and executive dashboards.

**Supports:** Multi-tenancy, RBAC, mobile PWA, barcode scanning, PDF reporting.

## 🛠 **Tech Stack**
```
Frontend: Angular 18 + AG-Grid + Tailwind + PWA
Backend: NestJS + GraphQL Federation + Prisma + PostgreSQL
Infra: Docker Compose + Redis + MinIO + BullMQ
AI: Prophet.js demand forecasting
```

## ⚡ **Quick Start**

```bash
# Clone & Install
git clone https://github.com/yourusername/nexusstock-enterprise.git
cd nexusstock-enterprise

# Backend (API Gateway + Services)
cd backend && npm install && npm run dev

# Frontend (Dashboard)
cd ../frontend && npm install && ng serve

# Docker (Production)
docker-compose up -d
```

**Live Demo:** [nexusstock-demo.vercel.app](https://nexusstock-demo.vercel.app)

## 📊 **Key Features**

- **Multi-Warehouse** inventory with shelf locations
- **AI Demand Forecasting** + auto-reordering
- **Procurement** with supplier bidding
- **Real-time** dashboards + mobile PWA
- **PDF Reports** (EJS + html-pdf-node)
- **500+ seeded products** for instant testing

## 🧪 **API Playground**
```
GraphQL: http://localhost:4000/graphql
Postman: ./postman/nexusstock-complete.postman_collection.json
```

## 🚀 **Production Deploy**
```bash
# Vercel (Frontend) + Railway/DigitalOcean (Backend)
npm run deploy:prod
```

## 📈 **SaaS Ready**
Starter ($49/mo) → Pro ($199/mo) → Enterprise (Custom)

## 🤝 **Contributing**
```
Issues: GitHub Issues
PRs: Develop → Main
Tests: npm test (95% coverage)
```

## 📄 **License**
MIT - Free for commercial use.

***

**Made with ❤️ for warehouse warriors worldwide**

[Deploy to Vercel](https://vercel.com/new/git/external) | [Star on GitHub](https://github.com/stars)

