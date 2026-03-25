import type { Request, ResponseToolkit } from "@hapi/hapi";
import Boom from "@hapi/boom";
import { PlaidItem } from "../models/mongo/plaid-item-store.js";

export const plaidItemsController = {
  index: {
    handler: async (request: Request, h: ResponseToolkit) => {
      try {
        const user = request.auth.credentials as any;
        const userId = user._id.toString();

        const items = await PlaidItem.find({ userId })
          .sort({ createdAt: -1 })
          .lean()
          .exec();

        return h.view("plaid-items-view", {
          title: "Bank connections",
          active: "banks",
          items,
        });
      } catch (err: any) {
        console.error("Render items error:", err);
        return Boom.serverUnavailable("Failed to load bank connections");
      }
    },
  },
};
