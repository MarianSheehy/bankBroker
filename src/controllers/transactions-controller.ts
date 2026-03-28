import type { Request, ResponseToolkit } from "@hapi/hapi";
import Boom from "@hapi/boom";
import { PlaidTransaction } from "../models/mongo/plaid-transaction-store.js";
import { PlaidItem } from "../models/mongo/plaid-item-store.js";

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

        // Build institutionName per itemId
        const itemIds = [...new Set(txns.map((t) => t.itemId))];
        const items = await PlaidItem.find({
          userId,
          itemId: { $in: itemIds },
        })
          .lean()
          .exec();

        const itemNameById: Record<string, string> = {};
        for (const item of items) {
          if (item.itemId) {
            itemNameById[item.itemId] =
              item.institutionName || "Unknown bank";
          }
        }

        const viewTxns = txns.map((t) => ({
          ...t,
          institutionName: itemNameById[t.itemId] || "Unknown bank",
        }));

        return h.view("transactions-view", {
          title: "Transactions",
          active: "transactions",
          transactions: viewTxns,
          itemId: itemId || "",
        });
      } catch (err: any) {
        console.error("Render transactions error:", err);
        return Boom.serverUnavailable("Failed to load transactions page");
      }
    },
  },
};