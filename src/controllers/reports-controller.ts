import type { Request, ResponseToolkit } from "@hapi/hapi";
import Boom from "@hapi/boom";
import { PlaidItem } from "../models/mongo/plaid-item-store.js";
import { PlaidTransaction } from "../models/mongo/plaid-transaction-store.js";
import { loadPlaidCategories } from "../config/plaid-categories.js";

const PLAID_CATEGORIES = loadPlaidCategories();

export const reportsController = {
  index: {
    handler: async (request: Request, h: ResponseToolkit) => {
      try {
        const user = request.auth.credentials as any;
        const userId = user._id.toString();
        const {
          itemId,
          startDate,
          endDate,
          minAmount,
          maxAmount,
          category,
        } = request.query as {
          itemId?: string;
          startDate?: string;
          endDate?: string;
          minAmount?: string;
          maxAmount?: string;
          category?: string;
        };

        const items = await PlaidItem.find({ userId })
          .sort({ institutionName: 1 })
          .lean()
          .exec();

        const filter: any = { userId };

        if (itemId && itemId !== "all") {
          filter.itemId = itemId;
        }

        if (startDate || endDate) {
          filter.date = {};
          if (startDate) filter.date.$gte = startDate;
          if (endDate) filter.date.$lte = endDate;
        }

        if (minAmount || maxAmount) {
          filter.amount = {};
          if (minAmount) filter.amount.$gte = Number(minAmount);
          if (maxAmount) filter.amount.$lte = Number(maxAmount);
        }

        if (category && category !== "all") {
          filter.userCategory = category;
        }

        const transactions = await PlaidTransaction.find(filter)
          .sort({ date: -1 })
          .lean()
          .exec();

        const total = transactions.reduce(
          (sum, t: any) => sum + (t.amount || 0),
          0
        );

        console.log("PLAID_CATEGORIES length:", PLAID_CATEGORIES.length); // optional debug

        return h.view("reports-view", {
          title: "Reports",
          active: "reports",
          items,
          transactions,
          total,
          categories: PLAID_CATEGORIES, 
          filters: {
            itemId: itemId || "all",
            startDate: startDate || "",
            endDate: endDate || "",
            minAmount: minAmount || "",
            maxAmount: maxAmount || "",
            category: category || "all",
          },
        });
      } catch (err: any) {
        console.error("Render reports error:", err);
        return Boom.serverUnavailable("Failed to load reports");
      }
    },
  },
};