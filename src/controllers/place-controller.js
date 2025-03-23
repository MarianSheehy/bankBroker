import { BirdSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";
import { imageStore } from "../models/image-store.js";

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
        date: request.payload.title,
        other: request.payload.other,
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

  uploadImage: {
    handler: async function (request, h) {
      try {
        const place = await db.placeStore.getPlaceById(request.params.id);
        const file = request.payload.imagefile;
        if (Object.keys(file).length > 0) {
          const url = await imageStore.uploadImage(request.payload.imagefile);
          place.img = url;
          await db.placeStore.updatePlace(place);
        }
        return h.redirect(`/place/${place._id}`);
      } catch (err) {
        console.log(err);
        return h.redirect(`/place/${place._id}`);
      }
    },
    payload: {
      multipart: true,
      output: "data",
      maxBytes: 209715200,
      parse: true,
    },
  },
};
