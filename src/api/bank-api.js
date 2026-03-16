import Boom from "@hapi/boom";
import { db } from "../models/db.js";
import { IdSpec, BankSpec, BankSpecPlus, BankArraySpec } from "../models/joi-schemas.js";
import { validationError } from "./logger.js";

export const bankApi = {
  find: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const bank = await db.bankStore.getAllBanks();
        return bank;
      } catch (err) {
        return Boom.serverUnavailable("Database Error:", err);
      }
    },
    tags: ["api"],
    response: { schema: BankArraySpec, failAction: validationError },
    description: "Get all bankApi",
    notes: "Returns all bankApi",
  },

  findOne: {
    auth: {
      strategy: "jwt",
    },
    async handler(request) {
      try {
        const bank = await db.bankStore.getBankById(request.params.id);
        if (!bank) {
          return Boom.notFound("No bank with this id");
        }
        return bank;
      } catch (err) {
        return Boom.serverUnavailable("No bank with this id:", err);
      }
    },
    tags: ["api"],
    description: "Find a Bank",
    notes: "Returns a bank",
    validate: { params: { id: IdSpec }, failAction: validationError },
    response: { schema: BankSpecPlus, failAction: validationError },
  },

  create: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const bank = await db.bankStore.addBank(request.params.id, request.payload);
        if (bank) {
          return h.response(bank).code(201);
        }
        return Boom.badImplementation("error creating bank");
      } catch (err) {
        return Boom.serverUnavailable("Database Error:", err);
      }
    },
    tags: ["api"],
    description: "Create a bank",
    notes: "Returns the newly created bank",
    validate: { payload: BankSpec },
    response: { schema: BankSpecPlus, failAction: validationError },
  },

  deleteAll: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        await db.bankStore.deleteAllBanks();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error:", err);
      }
    },
    tags: ["api"],
    description: "Delete all bankApi",
  },

  deleteOne: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const bank = await db.bankStore.getBankById(request.params.id);
        if (!bank) {
          return Boom.notFound("No Bank with this id");
        }
        await db.bankStore.deleteBank(bank._id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No Bank with this id:", err);
      }
    },
    tags: ["api"],
    description: "Delete a bank",
    validate: { params: { id: IdSpec }, failAction: validationError },
  },
};