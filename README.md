Landing Page - https://mariansheehy.github.io/bankBroker/

# BankBroker

A Hapi.js and TypeScript application that connects to Plaid to aggregate bank accounts and transactions, stores data in MongoDB, and provides web-based reporting and CSV export

## Setup

1. Install dependencies:
   ```bash
   git clone https://github.com/MarianSheehy/bankBroker.git
   cd bankBroker
   npm install
   ```
   
2. Copy `.env.example` to `.env` and fill in your values:
   ```bash
   db - Mongo connection string
   cookie_name
   cookie_password
   PLAID_CLIENT_ID, PLAID_SECRET, PLAID_ENV – Plaid credentials
   ```
   
3. Development:
   ```bash
   npm run dev
   ```

## Project Structure

The main application code lives under `src/`:

```text
src
  api-routes.ts
  server.ts
  web-routes.ts

  api/
    bank-api.ts
    jwt-utils.ts
    logger.ts
    plaid-api.ts
    plaid-client.ts
    user-api.ts

  config/
    plaid-categories.ts

  controllers/
    about-controller.ts
    accounts-controller.ts
    bank-controller.ts
    dashboard-controller.ts
    plaid-items-controller.ts
    reports-category-controller.ts
    reports-controller.ts
    transactions-controller.ts
    user-controller.ts

  data/
    transactions-personal-finance-category-taxonomy.csv

  models/
    db.ts
    image-store.ts
    joi-schemas.ts

    mongo/
      bank-store.ts
      bank.ts
      connect.ts
      plaid-item-store.ts
      plaid-transaction-store.ts
      report-store.ts
      report.ts
      seed-data.ts
      user-store.ts
      user.ts

  types/
    report-types.ts

  utils/
    password-rules.ts

  views/
    about-view.hbs
    bank-view.hbs
    dashboard-view.hbs
    layout.hbs
    login-view.hbs
    login.hbs
    main.hbs
    plaid-items-view.hbs
    plaid-view.hbs
    reports-view.hbs
    signup-view.hbs
    signup.hbs
    transactions-view.hbs
    user-view.hbs

    partials/
      bank-image.hbs
      bankbroker-brand.hbs
      error.hbs
      heading.hbs
      login-form.hbs
      menu.hbs
      report-form.hbs
      report-list.hbs
      signup-form.hbs
      user-credentials.hbs
      user-details.hbs
```
## Tech Stack

- **Backend**: Node.js (TypeScript) with Hapi.js for routing, plugins, and auth

- **Views**: Handlebars templates + partials with custom helpers (ifEquals, toFixed2)

- **Database**: MongoDB with Mongoose models for users, Plaid items, and transactions

- **Auth & Security**: @hapi/cookie session auth for web, hapi-auth-jwt2 for API JWTs, bcryptjs for password hashing, custom password rules on signup/change

- **Plaid Integration**: Plaid Link on the dashboard plus Node.js Plaid API calls for link token creation, token exchange, and transaction sync

- **Frontend UI**: Bulma CSS for layout, navbars, tables, cards, and responsive styling

- **Reporting & Export**: Filterable transaction reports (by bank, category, date, amount) and a CSV export route (/reports/export.csv) returning text/csv downloads
