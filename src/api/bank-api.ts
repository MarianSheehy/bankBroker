import Boom from "@hapi/boom";
import type { Request, ResponseToolkit } from "@hapi/hapi";
import { db } from "../models/db.js";
import { IdSpec, BankSpec, BankSpecPlus, BankArraySpec } from "../models/joi-schemas.js";
import { validationError } from "./logger.js";

export const bankApi = {
  find: {
    auth: { strategy: "jwt" },
    handler: async function (_request: Request, _h: ResponseToolkit) {
      try {
        const banks = await db.bankStore.find();
        return banks;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Get all banks",
    notes: "Returns all banks",
    response: {
      schema: BankArraySpec,
      failAction: validationError, // OK for response
    },
  },

  findOne: {
    auth: { strategy: "jwt" },
    handler: async function (request: Request, _h: ResponseToolkit) {
      try {
        const bank = await db.bankStore.findOne(request.params.id);
        if (!bank) {
          return Boom.notFound("No bank with this id");
        }
        return bank;
      } catch (err) {
        return Boom.serverUnavailable("No bank with this id");
      }
    },
    tags: ["api"],
    description: "Find a bank",
    notes: "Returns a bank",
    validate: {
      params: IdSpec,          // use Joi schema, not { id: IdSpec }
      failAction: validationError,
    },
    response: {
      schema: BankSpecPlus,
      failAction: validationError,
    },
  },

  create: {
    auth: { strategy: "jwt" },
    handler: async function (request: Request, h: ResponseToolkit) {
      try {
        const bank = await db.bankStore.findOne(request.params.id);
        if (bank) {
          return h.response(bank).code(201);
        }
        return Boom.badImplementation("Error creating bank");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Create a bank",
    notes: "Returns the newly created bank",
    validate: {
      payload: BankSpec,
      failAction: validationError,
    },
    response: {
      schema: BankSpecPlus,
      failAction: validationError,
    },
  },

  deleteAll: {
    auth: { strategy: "jwt" },
    handler: async function (_request: Request, h: ResponseToolkit) {
      try {
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Delete all banks",
  },

  deleteOne: {
    auth: { strategy: "jwt" },
    handler: async function (request: Request, h: ResponseToolkit) {
      try {
        const bank = await db.bankStore.findOne(request.params.id);
        if (!bank) {
          return Boom.notFound("No bank with this id");
        }
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No bank with this id");
      }
    },
    tags: ["api"],
    description: "Delete a bank",
    validate: {
      params: IdSpec,
      failAction: validationError,
    },
  },
};
