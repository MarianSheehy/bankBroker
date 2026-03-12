<<<<<<< HEAD
import Boom from "@hapi/boom";
import { IdSpec, PlaceArraySpec, PlaceSpec, PlaceSpecPlus } from "../models/joi-schemas.js";
import { db } from "../models/db.js";
import { validationError } from "./logger.js";

export const placeApi = {
  find: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const places = await db.placeStore.getAllPlaces();
        return places;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    response: { schema: PlaceArraySpec, failAction: validationError },
    description: "Get all places",
    notes: "Returns all places",
  },

  findOne: {
    auth: {
      strategy: "jwt",
    },
    async handler(request) {
      try {
        const place = await db.placeStore.getPlaceById(request.params.id);
        if (!place) {
          return Boom.notFound("No Place with this id");
        }
        return place;
      } catch (err) {
        return Boom.serverUnavailable("No Place with this id");
      }
    },
    tags: ["api"],
    description: "Find a Place",
    notes: "Returns a place",
    validate: { params: { id: IdSpec }, failAction: validationError },
    response: { schema: PlaceSpecPlus, failAction: validationError },
  },

  create: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const place = request.payload;
        const newPlace = await db.placeStore.addPlace(place);
        if (newPlace) {
          return h.response(newPlace).code(201);
        }
        return Boom.badImplementation("error creating place");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Create a Place",
    notes: "Returns the newly created place",
    validate: { payload: PlaceSpec, failAction: validationError },
    response: { schema: PlaceSpecPlus, failAction: validationError },
  },

  deleteOne: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const place = await db.placeStore.getPlaceById(request.params.id);
        if (!place) {
          return Boom.notFound("No Place with this id");
        }
        await db.placeStore.deletePlaceById(place._id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No Place with this id");
      }
    },
    tags: ["api"],
    description: "Delete a place",
    validate: { params: { id: IdSpec }, failAction: validationError },
  },

  deleteAll: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        await db.placeStore.deleteAllPlaces();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Delete all PlaceApi",
  },
};
=======
import Boom from "@hapi/boom";
import { IdSpec, PlaceArraySpec, PlaceSpec, PlaceSpecPlus } from "../models/joi-schemas.js";
import { db } from "../models/db.js";
import { validationError } from "./logger.js";

export const placeApi = {
  find: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const places = await db.placeStore.getAllPlaces();
        return places;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    response: { schema: PlaceArraySpec, failAction: validationError },
    description: "Get all places",
    notes: "Returns all places",
  },

  findOne: {
    auth: {
      strategy: "jwt",
    },
    async handler(request) {
      try {
        const place = await db.placeStore.getPlaceById(request.params.id);
        if (!place) {
          return Boom.notFound("No Place with this id");
        }
        return place;
      } catch (err) {
        return Boom.serverUnavailable("No Place with this id");
      }
    },
    tags: ["api"],
    description: "Find a Place",
    notes: "Returns a place",
    validate: { params: { id: IdSpec }, failAction: validationError },
    response: { schema: PlaceSpecPlus, failAction: validationError },
  },

  create: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const place = request.payload;
        const newPlace = await db.placeStore.addPlace(place);
        if (newPlace) {
          return h.response(newPlace).code(201);
        }
        return Boom.badImplementation("error creating place");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Create a Place",
    notes: "Returns the newly created place",
    validate: { payload: PlaceSpec, failAction: validationError },
    response: { schema: PlaceSpecPlus, failAction: validationError },
  },

  deleteOne: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const place = await db.placeStore.getPlaceById(request.params.id);
        if (!place) {
          return Boom.notFound("No Place with this id");
        }
        await db.placeStore.deletePlaceById(place._id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No Place with this id");
      }
    },
    tags: ["api"],
    description: "Delete a place",
    validate: { params: { id: IdSpec }, failAction: validationError },
  },

  deleteAll: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        await db.placeStore.deleteAllPlaces();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Delete all PlaceApi",
  },
};
>>>>>>> 9eb855dcce3925702cc09dcdc94d360e637093b8
