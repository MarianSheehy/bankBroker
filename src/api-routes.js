import { userApi } from "./api/user-api.js";
import { placeApi } from "./api/place-api.js";
import { bankApi } from "./api/bank-api.js";

export const apiRoutes = [
  { method: "GET", path: "/api/users", config: userApi.find },
  { method: "POST", path: "/api/users", config: userApi.create },
  { method: "DELETE", path: "/api/users", config: userApi.deleteAll },
  { method: "GET", path: "/api/users/{id}", config: userApi.findOne },
  { method: "POST", path: "/api/users/authenticate", config: userApi.authenticate },

  { method: "POST", path: "/api/places", config: placeApi.create },
  { method: "DELETE", path: "/api/places", config: placeApi.deleteAll },
  { method: "GET", path: "/api/places", config: placeApi.find },
  { method: "GET", path: "/api/places/{id}", config: placeApi.findOne },
  { method: "DELETE", path: "/api/places/{id}", config: placeApi.deleteOne },

  { method: "GET", path: "/api/banks", config: bankApi.find },
  { method: "GET", path: "/api/banks/{id}", config: bankApi.findOne },
  { method: "POST", path: "/api/places/{id}/banks", config: bankApi.create },
  { method: "DELETE", path: "/api/banks", config: bankApi.deleteAll },
  { method: "DELETE", path: "/api/banks/{id}", config: bankApi.deleteOne },
];