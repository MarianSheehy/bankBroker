import { aboutController } from "./controllers/about-controller.js";
import { accountsController } from "./controllers/accounts-controller.js";
import { dashboardController } from "./controllers/dashboard-controller.js";
import { placeController } from "./controllers/place-controller.js";
import { bankController } from "./controllers/bank-controller.js";
import { reportsController } from "./controllers/reports-controller.js";

export const webRoutes = [
  { method: "GET", path: "/", config: accountsController.index },
  { method: "GET", path: "/signup", config: accountsController.showSignup },
  { method: "GET", path: "/login", config: accountsController.showLogin },
  { method: "GET", path: "/logout", config: accountsController.logout },
  { method: "POST", path: "/register", config: accountsController.signup },
  { method: "POST", path: "/authenticate", config: accountsController.login },

  { method: "GET", path: "/about", config: aboutController.index },

  { method: "GET", path: "/reports", config: reportsController.index },

  { method: "GET", path: "/dashboard", config: dashboardController.index },
  { method: "POST", path: "/dashboard/addplace", config: dashboardController.addPlace },
  { method: "GET", path: "/dashboard/deleteplace/{id}", config: dashboardController.deletePlace },

  { method: "GET", path: "/place/{id}", config: placeController.index },
  { method: "POST", path: "/place/{id}/addbank", config: placeController.addBank },
  { method: "GET", path: "/place/{id}/deletebank/{bankid}", config: placeController.deleteBank },
  { method: "POST", path: "/place/{id}/uploadimage", config: placeController.uploadImage },


  { method: "GET", path: "/bank/{id}/editbank/{bankid}", config: bankController.index },
  { method: "POST", path: "/bank/{id}/updatebank/{bankid}", config: bankController.update },

  { method: "GET", path: "/{param*}", handler: { directory: { path: "./public" } }, options: { auth: false } },
];