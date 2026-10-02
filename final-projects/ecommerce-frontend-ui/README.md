# Ecommerce Frontend UI

Storefront and admin dashboard for the ecommerce platform built with React + Vite.

## Tech Stack

- **React 19 + TypeScript + Vite**
- **React Router 7** for routing
- **TanStack Query** for server state and data fetching
- **Zustand** for client state (auth, theme)
- **Axios** with JWT interceptors
- **React Hook Form + Zod** for forms and validation
- **Tailwind CSS 4 + shadcn/ui** components
- **Recharts** for dashboard charts

## Features

- Customer storefront: product catalog, category filter, product details, cart, checkout
- Authentication: register, login, JWT refresh, protected routes
- Admin dashboard: KPI cards, order/status management, payments, user & product management
- Notifications bell with read/unread state

## Setup

Create a `.env` file:

```
VITE_API_URL=http://localhost:3000
```

Then run:

```bash
npm install
npm run dev
```

Make sure the backend API is running on the URL set in `VITE_API_URL`.

## Scripts

- `npm run dev` - start the dev server
- `npm run build` - type-check and build for production
- `npm run lint` - run ESLint
- `npm run preview` - preview the production build
