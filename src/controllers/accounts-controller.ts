import type { Request, ResponseToolkit } from "@hapi/hapi";
import { db } from "../models/db.js";
import bcrypt from "bcryptjs";
import { validatePasswordRules } from "../utils/password-rules.js";
import { userStore } from "../models/mongo/user-store";

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
      return h.view("signup", { title: "Signup for Bank Broker" });
    },
  },
  signup: {
    auth: false,
    handler: async function (request: Request, h: ResponseToolkit) {
      const { firstName, lastName, email, password } = request.payload as {
        firstName: string;
        lastName: string;
        email: string;
        password: string;
      };

      const ruleError = validatePasswordRules(password);
      if (ruleError) {
        return h.view("signup", {
          title: "Signup for Bank Broker",
          error: ruleError,
          firstName,
          lastName,
          email,
        });
      }

      const saltRounds = 12;
      const hash = await bcrypt.hash(password, saltRounds);

      await userStore.add({
        firstName,
        lastName,
        email,
        password: hash,
      });
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
      if (!user || !user.password) {
        return h.redirect("/");
      }

      const ok = await bcrypt.compare(password, user.password);
      if (!ok) {
        return h.redirect("/");
      }

      (request as any).cookieAuth.set({ id: user._id });
      return h.redirect("/dashboard");
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
