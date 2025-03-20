import { aboutController } from "./controllers/about-controller.js";
import { accountsController } from "./controllers/accounts-controller.js";
import { dashboardController } from "./controllers/dashboard-controller.js";
import { placeController } from "./controllers/place-controller.js";
import { birdController } from "./controllers/bird-controller.js";

export const webRoutes = [
  { method: "GET", path: "/", config: accountsController.index },
  { method: "GET", path: "/signup", config: accountsController.showSignup },
  { method: "GET", path: "/login", config: accountsController.showLogin },
  { method: "GET", path: "/logout", config: accountsController.logout },
  { method: "POST", path: "/register", config: accountsController.signup },
  { method: "POST", path: "/authenticate", config: accountsController.login },

  { method: "GET", path: "/about", config: aboutController.index },

  { method: "GET", path: "/dashboard", config: dashboardController.index },
  { method: "POST", path: "/dashboard/addplace", config: dashboardController.addPlace },
  { method: "GET", path: "/dashboard/deleteplace/{id}", config: dashboardController.deletePlace },

  { method: "GET", path: "/place/{id}", config: placeController.index },
  { method: "POST", path: "/place/{id}/addbird", config: placeController.addBird },
  { method: "GET", path: "/place/{id}/deletebird/{birdid}", config: placeController.deleteBird },

  { method: "GET", path: "/bird/{id}/editbird/{birdid}", config: birdController.index },
  { method: "POST", path: "/bird/{id}/updatebird/{birdid}", config: birdController.update },
];