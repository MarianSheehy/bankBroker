import type { Request, ResponseToolkit } from "@hapi/hapi";
import Boom from "@hapi/boom";
import { PlaidTransaction } from "../models/mongo/plaid-transaction-store.js";

export const reportsCategoryController = {
  updateCategory: {
    handler: async (request: Request, h: ResponseToolkit) => {
      try {
        const user = request.auth.credentials as any;
        const userId = user._id.toString();
        const { transactionId, category } = request.payload as {
          transactionId: string;
          category: string;
        };

        await PlaidTransaction.updateOne(
          { _id: transactionId, userId },
          { $set: { userCategory: category || null } }
        ).exec();

        // Optionally preserve query string:
        const referer = request.info.referrer || "/reports";
        return h.redirect(referer);
      } catch (err: any) {
        console.error("Update category error:", err);
        return Boom.serverUnavailable("Failed to update category");
      }
    },
  },
};