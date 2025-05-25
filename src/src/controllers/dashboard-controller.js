import { PlaceSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";

export const dashboardController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const places = await db.placeStore.getUserPlaces(loggedInUser._id);
      const viewData = {
        title: "BirdWatch Dashboard",
        user: loggedInUser,
        places: places,
      };
      return h.view("dashboard-view", viewData);
    },
  },

  addPlace: {
    validate: {
      payload: PlaceSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("dashboard-view", { title: "Add Place error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const newPlayList = {
        userid: loggedInUser._id,
        title: request.payload.title,
      };
      await db.placeStore.addPlace(newPlayList);
      return h.redirect("/dashboard");
    },
  },

  deletePlace: {
    handler: async function (request, h) {
      const place = await db.placeStore.getPlaceById(request.params.id);
      await db.placeStore.deletePlaceById(place._id);
      return h.redirect("/dashboard");
    },
  },
};
