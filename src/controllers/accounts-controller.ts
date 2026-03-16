import type { Request, ResponseToolkit } from "@hapi/hapi";
import { db } from "../models/db.js";

export const accountsController = {
  index: {
    auth: false,
    handler: async function (_request: Request, h: ResponseToolkit) {
      return h.view("main", { title: "Welcome to BankBroker" });
    },
  },
  showSignup: {
    auth: false,
    handler: async function (_request: Request, h: ResponseToolkit) {
      return h.view("signup", { title: "Sign up for BankBroker" });
    },
  },
  signup: {
    auth: false,
    handler: async function (request: Request, h: ResponseToolkit) {
      const user = request.payload as {
        firstName: string;
        lastName: string;
        email: string;
        password: string;
      };
      await db.userStore.add(user);
      return h.redirect("/");
    },
  },
  showLogin: {
    auth: false,
    handler: async function (_request: Request, h: ResponseToolkit) {
      return h.view("login", { title: "Login to BankBroker" });
    },
  },
  login: {
    auth: false,
    handler: async function (request: Request, h: ResponseToolkit) {
      const { email, password } = request.payload as { email: string; password: string };
      const user = await db.userStore.findBy(email);
      if (!user || user.password !== password) {
        return h.redirect("/");
      }
      (request as any).cookieAuth.set({ id: user._id });
      return h.redirect("/selection");
    },
  },
  logout: {
    handler: async function (request: Request, h: ResponseToolkit) {
      (request as any).cookieAuth.clear();
      return h.redirect("/");
    },
  },
  async validate(_request: Request, session: { id: string }) {
    const user = await db.userStore.findOne(session.id);
    if (!user) {
      return { isValid: false };
    }
    return { isValid: true, credentials: user };
  },
};
