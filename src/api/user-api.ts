import Boom from "@hapi/boom";
import type { Request, ResponseToolkit } from "@hapi/hapi";
import { db } from "../models/db.js";
import {
  UserCredentialsSpec,
  UserSpec,
  UserSpecPlus,
  IdSpec,
  UserArray,
  JwtAuth,
} from "../models/joi-schemas.js";
import { validationError } from "./logger.js";
import { createToken } from "./jwt-utils.js";

export const userApi = {
  find: {
    auth: { strategy: "jwt" },
    handler: async function (_request: Request, _h: ResponseToolkit) {
      try {
        const users = await db.userStore.find();
        return users;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Get all users",
    notes: "Returns details of all users",
    response: { schema: UserArray, failAction: validationError },
  },

  findOne: {
    auth: { strategy: "jwt" },
    handler: async function (request: Request, _h: ResponseToolkit) {
      try {
        const user = await db.userStore.findOne(request.params.id);
        if (!user) {
          return Boom.notFound("No user with this id");
        }
        return user;
      } catch (err) {
        return Boom.serverUnavailable("No user with this id");
      }
    },
    tags: ["api"],
    description: "Get a specific user",
    notes: "Returns user details",
    validate: { params: { id: IdSpec }, failAction: validationError },
    response: { schema: UserSpecPlus, failAction: validationError },
  },

  create: {
    auth: false,
    handler: async function (request: Request, h: ResponseToolkit) {
      try {
        const user = await db.userStore.add(request.payload as any);
        if (user) {
          return h.response(user).code(201);
        }
        return Boom.badImplementation("Error creating user");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Create a user",
    notes: "Returns the newly created user",
    validate: { payload: UserSpec, failAction: validationError },
    response: { schema: UserSpecPlus, failAction: validationError },
  },

  authenticate: {
    auth: false,
    handler: async function (request: Request, h: ResponseToolkit) {
      try {
        const { email, password } = request.payload as { email: string; password: string };
        const user = await db.userStore.findBy(email);
        if (!user) {
          return Boom.unauthorized("User not found");
        }
        if (user.password !== password) {
          return Boom.unauthorized("Invalid password");
        }
        const token = createToken(user);
        return h.response({ success: true, token }).code(201);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Authenticate a user",
    notes: "If user has valid email/password, create and return a JWT token",
    validate: { payload: UserCredentialsSpec, failAction: validationError },
    response: { schema: JwtAuth, failAction: validationError },
  },

  deleteAll: {
    auth: { strategy: "jwt" },
    handler: async function (_request: Request, h: ResponseToolkit) {
      try {
        await db.userStore.delete();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Delete all users",
    notes: "All users removed from BankBroker",
  },
};
