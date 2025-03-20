import { userApi } from "./api/user-api.js";
import { placeApi } from "./api/place-api.js";
import { birdApi } from "./api/bird-api.js";

export const apiRoutes = [
  { method: "GET", path: "/api/users", config: userApi.find },
  { method: "POST", path: "/api/users", config: userApi.create },
  { method: "DELETE", path: "/api/users", config: userApi.deleteAll },
  { method: "GET", path: "/api/users/{id}", config: userApi.findOne },

  { method: "POST", path: "/api/places", config: placeApi.create },
  { method: "DELETE", path: "/api/places", config: placeApi.deleteAll },
  { method: "GET", path: "/api/places", config: placeApi.find },
  { method: "GET", path: "/api/places/{id}", config: placeApi.findOne },
  { method: "DELETE", path: "/api/places/{id}", config: placeApi.deleteOne },

  { method: "GET", path: "/api/birds", config: birdApi.find },
  { method: "GET", path: "/api/birds/{id}", config: birdApi.findOne },
  { method: "POST", path: "/api/places/{id}/birds", config: birdApi.create },
  { method: "DELETE", path: "/api/birds", config: birdApi.deleteAll },
  { method: "DELETE", path: "/api/birds/{id}", config: birdApi.deleteOne },
];