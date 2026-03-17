import { accountsController } from "./controllers/accounts-controller.js";
import { dashboardController } from "./controllers/dashboard-controller.js";
import { aboutController } from "./controllers/about-controller.js";
import { bankController } from "./controllers/bank-controller.js";
import { reportsController } from "./controllers/reports-controller.js";
import { plaidController } from "./controllers/plaid-controller.js";

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
  // { method: "POST", path: "/bank/{id}/updatebank/{bankid}", config: bankController.update },

  { method: "GET", path: "/plaid", config: plaidController.index },
  
  { method: "GET", path: "/selection", config: reportsController.index },
  { method: "POST", path: "/reports", config: reportsController.selection },
  { method: "GET", path: "/reports", config: reportsController.report },

  {
    method: "GET",
    path: "/{param*}",
    config: {
      auth: false,
      handler: {
        directory: {
          path: "./public",
          redirectToSlash: true,
          index: true,
        },
      },
    },
  },
];
