import type { Request, ResponseToolkit } from "@hapi/hapi";
import { db } from "../models/db.js";

export const reportsController = {
  index: {
    handler: async function (request: Request, h: ResponseToolkit) {
      const loggedInUser = request.auth.credentials;
      const banks = await db.bankStore.find();
      return h.view("selection", {
        title: "Make a Selection",
        user: loggedInUser,
        banks,
      });
    },
  },

  selection: {
    handler: async function (request: Request, h: ResponseToolkit) {
      try {
        const loggedInUser = request.auth.credentials;
        const payload = request.payload as {
          amount: number;
          method: string;
          bank: string;
          lat: string;
          lng: string;
        };
        const report = {
          amount: payload.amount,
          method: payload.method,
          donor: (loggedInUser as any)._id as string,
          bank: payload.bank,
          lat: payload.lat,
          lng: payload.lng,
        };
        await db.reportStore.add(report);
        return h.redirect("/selection");
      } catch (err) {
        return h.view("main", { errors: [{ message: (err as Error).message }] });
      }
    },
  },

  report: {
    handler: async function (request: Request, h: ResponseToolkit) {
      const loggedInUser = request.auth.credentials;
      const reports = await db.reportStore.find();
      return h.view("report", {
        title: "Report",
        user: loggedInUser,
        reports,
      });
    },
  },
};
