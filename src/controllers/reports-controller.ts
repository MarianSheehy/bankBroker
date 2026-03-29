import type { Request, ResponseToolkit } from "@hapi/hapi";
import Boom from "@hapi/boom";
import { PlaidItem } from "../models/mongo/plaid-item-store.js";
import { PlaidTransaction } from "../models/mongo/plaid-transaction-store.js";

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
          filter["personalFinanceCategory.detailed"] = category;
        }

        const transactions = await PlaidTransaction.find(filter)
          .sort({ date: -1 })
          .lean()
          .exec();

        const total = transactions.reduce(
          (sum, t: any) => sum + (t.amount || 0),
          0
        );

        const categories = await PlaidTransaction.aggregate([
          { $match: { userId } },
          {
            $group: {
              _id: {
                primary: "$personalFinanceCategory.primary",
                detailed: "$personalFinanceCategory.detailed",
              },
            },
          },
          {
            $project: {
              _id: 0,
              primary: "$_id.primary",
              detailed: "$_id.detailed",
            },
          },
          { $sort: { primary: 1, detailed: 1 } },
        ]);

        return h.view("reports-view", {
          title: "Reports",
          active: "reports",
          items,
          transactions,
          total,
          categories,
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

export async function exportReportsCsv(request: Request, h: ResponseToolkit) {
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
      filter["personalFinanceCategory.detailed"] = category;
    }

    const transactions = await PlaidTransaction.find(filter)
      .sort({ date: -1 })
      .lean()
      .exec();

    const headers = ["Date", "Name", "Category", "Amount"];
    let csv = headers.join(",") + "\r\n";

    for (const tx of transactions as any[]) {
      const name = tx.merchant_name || tx.name || "";
      const cat =
        tx.personalFinanceCategory?.detailed || "Uncategorised";

      csv += [
        tx.date,
        `"${String(name).replace(/"/g, '""')}"`,
        `"${String(cat).replace(/"/g, '""')}"`,
        tx.amount,
      ].join(",") + "\r\n";
    }

    return h
      .response(csv)
      .type("text/csv")
      .header(
        "Content-Disposition",
        `attachment; filename="reports-${Date.now()}.csv"`
      );
  } catch (err) {
    console.error("Export reports CSV error:", err);
    throw Boom.serverUnavailable("Failed to export reports");
  }
};