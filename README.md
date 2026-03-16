# BankBroker

A Hapi.js application for managing bank brokering activities with MongoDB storage.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env` and fill in your values:
   ```bash
   cp .env.example .env
   ```

3. Start the server:
   ```bash
   npm start
   ```

4. For development with auto-restart:
   ```bash
   npm run dev
   ```

## Project Structure

```
src/
├── api/                 # REST API handlers (JWT-protected)
│   ├── bank-api.ts
│   ├── user-api.ts
│   ├── jwt-utils.ts
│   └── logger.ts
├── controllers/         # Web route controllers (cookie-session auth)
│   ├── about-controller.ts
│   ├── accounts-controller.ts
│   ├── bank-controller.ts
│   ├── dashboard-controller.ts
│   └── reports-controller.ts
├── models/              # Data layer
│   ├── db.ts            # Database singleton + connection factory
│   ├── joi-schemas.ts   # Validation schemas
│   ├── image-store.ts   # Cloudinary image management
│   ├── json/            # JSON file-based store (lowdb)
│   ├── mem/             # In-memory store (for testing)
│   └── mongo/           # MongoDB store (Mongoose)
├── types/
│   └── report-types.ts  # TypeScript interfaces
├── views/               # Handlebars templates
│   ├── partials/
│   └── *.hbs
├── api-routes.ts        # API route definitions
├── web-routes.ts        # Web route definitions
└── server.ts            # Application entry point
```

## Tech Stack

- **Server:** Hapi.js
- **Database:** MongoDB (via Mongoose)
- **Templates:** Handlebars
- **CSS:** Bulma
- **Auth:** Cookie sessions (web) + JWT (API)
- **Validation:** Joi
