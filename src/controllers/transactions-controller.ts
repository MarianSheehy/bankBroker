import type { Request, ResponseToolkit } from "@hapi/hapi";
import Boom from "@hapi/boom";
import { PlaidTransaction } from "../models/mongo/plaid-transaction-store.js";

export const transactionsController = {
  index: {
    handler: async (request: Request, h: ResponseToolkit) => {
      try {
        const user = request.auth.credentials as any;
        const userId = user._id.toString();
        const { itemId } = request.query as { itemId?: string };

        const filter: any = { userId };
        if (itemId) filter.itemId = itemId;

        const txns = await PlaidTransaction.find(filter)
          .sort({ date: -1, createdAt: -1 })
          .lean()
          .exec();

        return h.view("transactions-view", {
          title: "Transactions",
          active: "transactions",
          transactions: txns,
          itemId: itemId || "",
        });
      } catch (err: any) {
        console.error("Render transactions error:", err);
        return Boom.serverUnavailable("Failed to load transactions page");
      }
    },
  },
};
