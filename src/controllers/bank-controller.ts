import type { Request, ResponseToolkit } from "@hapi/hapi";
import { BankSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";

export const bankController = {
  index: {
    handler: async function (request: Request, h: ResponseToolkit) {
      const bank = await db.bankStore.findOne(request.params.bankid);
      return h.view("bank-view", {
        title: "Edit Bank",
        bank,
      });
    },
  },

  update: {
    validate: {
      payload: BankSpec,
      options: { abortEarly: false },
      failAction: function (_request: Request, h: ResponseToolkit, error: Error) {
        return h
          .view("bank-view", { title: "Edit bank error", errors: (error as any).details })
          .takeover()
          .code(400);
      },
    },
    handler: async function (request: Request, h: ResponseToolkit) {
      const bank = await db.bankStore.findOne(request.params.bankid);
      if (!bank) {
        return h.redirect("/dashboard");
      }
      const payload = request.payload as { title: string; date: string; other: string };
      const updatedFields = {
        title: payload.title,
        date: payload.date,
        other: payload.other,
      };
      console.log("Bank update requested:", bank._id, updatedFields);
      return h.redirect(`/dashboard`);
    },
  },
};
