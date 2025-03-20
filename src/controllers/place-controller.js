import { BirdSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";

export const placeController = {
  index: {
    handler: async function (request, h) {
      const place = await db.placeStore.getPlaceById(request.params.id);
      const viewData = {
        title: "Place",
        place: place,
      };
      return h.view("place-view", viewData);
    },
  },

  addBird: {
    validate: {
      payload: BirdSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("place-view", { title: "Add bird error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const place = await db.placeStore.getPlaceById(request.params.id);
      const newBird = {
        title: request.payload.title,
        artist: request.payload.artist,
        duration: Number(request.payload.duration),
      };
      await db.birdStore.addBird(place._id, newBird);
      return h.redirect(`/place/${place._id}`);
    },
  },

  deleteBird: {
    handler: async function (request, h) {
      const place = await db.placeStore.getPlaceById(request.params.id);
      await db.birdStore.deleteBird(request.params.birdid);
      return h.redirect(`/place/${place._id}`);
    },
  },
};
