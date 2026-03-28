import { accountsController } from "./controllers/accounts-controller.js";
import { dashboardController } from "./controllers/dashboard-controller.js";
import { aboutController } from "./controllers/about-controller.js";
import { bankController } from "./controllers/bank-controller.js";
import { reportsController } from "./controllers/reports-controller.js";
import { reportsCategoryController } from "./controllers/reports-category-controller.js";
import { plaidItemsController } from "./controllers/plaid-items-controller.js";
import { transactionsController } from "./controllers/transactions-controller.js";

export const webRoutes = [
  { method: "GET", path: "/", config: accountsController.index },
  { method: "GET", path: "/signup", config: accountsController.showSignup },
  { method: "GET", path: "/login", config: accountsController.showLogin },
  { method: "POST", path: "/register", config: accountsController.signup },
  { method: "POST", path: "/authenticate", config: accountsController.login },
  { method: "GET", path: "/logout", config: accountsController.logout },

  { method: "GET", path: "/about", config: aboutController.index },
  { method: "GET", path: "/dashboard", config: dashboardController.index },
  { method: "POST", path: "/dashboard/addbank", config: dashboardController.addBank },
  { method: "GET", path: "/dashboard/deletebank/{id}", config: dashboardController.deleteBank },

  { method: "GET", path: "/bank/{id}/editbank/{bankid}", config: bankController.index },
  
  { method: "GET", path: "/selection", config: reportsController.index },
  { method: "GET", path: "/reports", config: reportsController.index },
  { method: "POST", path: "/reports/category", config: reportsCategoryController.updateCategory },
  { method: "GET", path: "/banks", config: plaidItemsController.index },
  { method: "GET", path: "/transactions", config: transactionsController.index },

  {
    method: "GET",
    path: "/{param*}",
    config: {
      auth: false,
      handler: {
        directory: {
          path: "public",
          redirectToSlash: true,
          index: true,
        },
      },
    },
  },
];
