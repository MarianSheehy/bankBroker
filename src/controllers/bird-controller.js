import { BirdSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";

export const birdController = {
  index: {
    handler: async function (request, h) {
      const place = await db.placeStore.getPlaceById(request.params.id);
      const bird = await db.birdStore.getBirdById(request.params.birdid);
      const viewData = {
        title: "Edit Song",
        place: place,
        bird: bird,
      };
      return h.view("bird-view", viewData);
    },
  },

  update: {
    validate: {
      payload: BirdSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("bird-view", { title: "Edit bird error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const bird = await db.birdStore.getBirdById(request.params.birdid);
      const newBird = {
        title: request.payload.title,
        artist: request.payload.artist,
        duration: Number(request.payload.duration),
      };
      await db.birdStore.updateBird(bird, newBird);
      return h.redirect(`/place/${request.params.id}`);
    },
  },
};