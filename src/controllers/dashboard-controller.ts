import type { Request, ResponseToolkit } from "@hapi/hapi";
import { BankSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";

export const dashboardController = {
  index: {
    handler: async function (request: Request, h: ResponseToolkit) {
      const loggedInUser = request.auth.credentials;
      return h.view("dashboard-view", {
        title: "BankBroker Dashboard",
        user: loggedInUser,
      });
    },
  },

  addBank: {
    validate: {
      payload: BankSpec,
      options: { abortEarly: false },
      failAction: function (_request: Request, h: ResponseToolkit, error: Error) {
        return h
          .view("dashboard-view", { title: "Add Bank error", errors: (error as any).details })
          .takeover()
          .code(400);
      },
    },
    handler: async function (request: Request, h: ResponseToolkit) {
      const loggedInUser = request.auth.credentials;
      const payload = request.payload as { title: string };
      const newBank = {
        userid: (loggedInUser as any)._id,
        title: payload.title,
      };
      console.log("New bank created:", newBank);
      return h.redirect("/dashboard");
    },
  },

  deleteBank: {
    handler: async function (request: Request, h: ResponseToolkit) {
      const bank = await db.bankStore.findOne(request.params.id);
      if (bank) {
        console.log("Bank deleted:", bank._id);
      }
      return h.redirect("/dashboard");
    },
  },
};
