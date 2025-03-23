import Boom from "@hapi/boom";
import { db } from "../models/db.js";
import { IdSpec, BirdSpec, BirdSpecPlus, BirdArraySpec } from "../models/joi-schemas.js";
import { validationError } from "./logger.js";

export const birdApi = {
  find: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const birds = await db.birdStore.getAllBirds();
        return birds;
      } catch (err) {
        return Boom.serverUnavailable("Database Error:", err);
      }
    },
    tags: ["api"],
    response: { schema: BirdArraySpec, failAction: validationError },
    description: "Get all birdApi",
    notes: "Returns all birdApi",
  },

  findOne: {
    auth: {
      strategy: "jwt",
    },
    async handler(request) {
      try {
        const bird = await db.birdStore.getBirdById(request.params.id);
        if (!bird) {
          return Boom.notFound("No bird with this id");
        }
        return bird;
      } catch (err) {
        return Boom.serverUnavailable("No bird with this id:", err);
      }
    },
    tags: ["api"],
    description: "Find a Bird",
    notes: "Returns a bird",
    validate: { params: { id: IdSpec }, failAction: validationError },
    response: { schema: BirdSpecPlus, failAction: validationError },
  },

  create: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const bird = await db.birdStore.addBird(request.params.id, request.payload);
        if (bird) {
          return h.response(bird).code(201);
        }
        return Boom.badImplementation("error creating bird");
      } catch (err) {
        return Boom.serverUnavailable("Database Error:", err);
      }
    },
    tags: ["api"],
    description: "Create a bird",
    notes: "Returns the newly created bird",
    validate: { payload: BirdSpec },
    response: { schema: BirdSpecPlus, failAction: validationError },
  },

  deleteAll: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        await db.birdStore.deleteAllBirds();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error:", err);
      }
    },
    tags: ["api"],
    description: "Delete all birdApi",
  },

  deleteOne: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const bird = await db.birdStore.getBirdById(request.params.id);
        if (!bird) {
          return Boom.notFound("No Bird with this id");
        }
        await db.birdStore.deleteBird(bird._id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No Bird with this id:", err);
      }
    },
    tags: ["api"],
    description: "Delete a bird",
    validate: { params: { id: IdSpec }, failAction: validationError },
  },
};