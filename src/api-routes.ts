import { userApi } from "./api/user-api.js";
import { bankApi } from "./api/bank-api.js";

export const apiRoutes = [
  { method: "GET", path: "/api/users", config: userApi.find },
  { method: "POST", path: "/api/users", config: userApi.create },
  { method: "DELETE", path: "/api/users", config: userApi.deleteAll },
  { method: "GET", path: "/api/users/{id}", config: userApi.findOne },
  { method: "POST", path: "/api/users/authenticate", config: userApi.authenticate },

  { method: "GET", path: "/api/banks", config: bankApi.find },
  { method: "GET", path: "/api/banks/{id}", config: bankApi.findOne },
  { method: "DELETE", path: "/api/banks", config: bankApi.deleteAll },
  { method: "DELETE", path: "/api/banks/{id}", config: bankApi.deleteOne },
];
