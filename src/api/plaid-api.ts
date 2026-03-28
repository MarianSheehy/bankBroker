import Boom from "@hapi/boom";
import type { Request, ResponseToolkit } from "@hapi/hapi";
import { plaidClient } from "./plaid-client.js";
import { CountryCode, Products } from "plaid";
import {
  upsertPlaidItem,
  findPlaidItemByUserAndItem,
  updatePlaidItemCursor,
} from "../models/mongo/plaid-item-store.js";
import {
  upsertPlaidTransactions,
  markPlaidTransactionsRemoved,
} from "../models/mongo/plaid-transaction-store.js";

// Demo-only in-memory storage used by getAccounts/getTransactions.
// Real reads should come from Mongo using the item for this user.
let ACCESS_TOKEN: string | null = null;
let ITEM_ID: string | null = null;

export const plaidApi = {
  /** Step 1 — generate a link_token for Plaid Link. */
  createLinkToken: {
    handler: async function (request: Request, h: ResponseToolkit) {
      try {
        const user = request.auth.credentials as any;
        const response = await plaidClient.linkTokenCreate({
          user: { client_user_id: user._id?.toString() || "demo-user" },
          client_name: "BankBroker",
          products: [Products.Auth, Products.Transactions],
          language: "en",
          country_codes: [CountryCode.Gb, CountryCode.Ie],
        });
        return h.response({ link_token: response.data.link_token }).code(200);
      } catch (err: any) {
        console.log(
          "Plaid linkTokenCreate error:",
          err?.response?.data || err.message
        );
        return Boom.serverUnavailable("Failed to create Plaid link token");
      }
    },
    tags: ["api"],
    description: "Create a Plaid Link token",
  },

  /** Step 2 — exchange the public_token from Link for a permanent access_token. */
  exchangeToken: {
    handler: async function (request: Request, h: ResponseToolkit) {
      try {
        const { public_token } = request.payload as { public_token: string };
        const user = request.auth.credentials as any;

        const response = await plaidClient.itemPublicTokenExchange({
          public_token,
        });
        const accessToken = response.data.access_token;
        const itemId = response.data.item_id;

        // ---- NEW: fetch institution/bank name ----
        const accountsRes = await plaidClient.accountsGet({ access_token: accessToken });
        const itemInfo = accountsRes.data.item;
        const institutionName = itemInfo.institution_name || "Unknown bank";
        // -----------------------------------------

        // Demo: still keep latest token in memory for /accounts + /transactions.
        ACCESS_TOKEN = accessToken;
        ITEM_ID = itemId;

        await upsertPlaidItem({
          userId: user._id.toString(),
          itemId,
          accessToken,
          cursor: null,
          institutionName,   // <-- pass it through
        });

        console.log("Plaid item linked and stored:", itemId, institutionName);

        return h.response({ success: true, item_id: itemId }).code(200);
      } catch (err: any) {
        console.log(
          "Plaid exchange error:",
          err?.response?.data || err.message
        );
        return Boom.serverUnavailable("Failed to exchange Plaid token");
      }
    },
    tags: ["api"],
    description: "Exchange Plaid public token for access token",
  },

  /** Step 3 — retrieve accounts for the linked Item. */
  getAccounts: {
    handler: async function (_request: Request, h: ResponseToolkit) {
      try {
        if (!ACCESS_TOKEN) {
          return Boom.badRequest("No bank account linked yet");
        }
        const response = await plaidClient.accountsGet({
          access_token: ACCESS_TOKEN,
        });
        return h.response({ accounts: response.data.accounts }).code(200);
      } catch (err: any) {
        console.log(
          "Plaid accounts error:",
          err?.response?.data || err.message
        );
        return Boom.serverUnavailable("Failed to fetch accounts");
      }
    },
    tags: ["api"],
    description: "Get linked bank accounts from Plaid",
  },

  /** Step 4 — retrieve transactions for a date range. */
  getTransactions: {
    handler: async function (request: Request, h: ResponseToolkit) {
      try {
        if (!ACCESS_TOKEN) {
          return Boom.badRequest("No bank account linked yet");
        }
        const { start_date, end_date } = request.payload as {
          start_date: string;
          end_date: string;
        };
        const response = await plaidClient.transactionsGet({
          access_token: ACCESS_TOKEN,
          start_date: start_date || "2025-01-01",
          end_date:
            end_date || new Date().toISOString().split("T")[0],
        });
        return h
          .response({
            accounts: response.data.accounts,
            transactions: response.data.transactions,
            total: response.data.total_transactions,
          })
          .code(200);
      } catch (err: any) {
        console.log(
          "Plaid transactions error:",
          err?.response?.data || err.message
        );
        return Boom.serverUnavailable("Failed to fetch transactions");
      }
    },
    tags: ["api"],
    description: "Get transactions from Plaid",
  },

  /** Step 5 — sync transactions using /transactions/sync. */
  syncTransactions: {
    // auth: false, 
    handler: async function (request: Request, h: ResponseToolkit) {
      try {
        // const userId = "69c3258942fda2e8447a39b8"; 
        const user = request.auth.credentials as any;
        const userId = user._id.toString();
        const { itemId } = request.payload as { itemId: string };

        const item = await findPlaidItemByUserAndItem(userId, itemId);
        if (!item) {
          return Boom.badRequest("Plaid item not found for this user");
        }

        const accessToken = item.accessToken;
        let cursor = item.cursor;

        let added: any[] = [];
        let modified: any[] = [];
        let removed: any[] = [];
        let hasMore = true;

        while (hasMore) {
          const response = await plaidClient.transactionsSync({
            access_token: accessToken,
            cursor: cursor || undefined,
          });

          const data = response.data;
          added = added.concat(data.added);
          modified = modified.concat(data.modified);
          removed = removed.concat(data.removed);
          hasMore = data.has_more;
          cursor = data.next_cursor;
        }

        await upsertPlaidTransactions(userId, itemId, added.concat(modified));

        if (cursor) {
          await updatePlaidItemCursor(userId, itemId, cursor);
        }

        return h
          .response({
            success: true,
            item_id: itemId,
            addedCount: added.length,
            modifiedCount: modified.length,
            removedCount: removed.length,
          })
          .code(200);
      } catch (err: any) {
        console.log(
          "Plaid transactionsSync error full:",
          err?.response?.data || err
        );
        return Boom.serverUnavailable("Failed to sync transactions");
      }
    },
    tags: ["api"],
    description: "Sync transactions via Plaid /transactions/sync",
  },

  getLocalTransactions: {
    handler: async function (request: Request, h: ResponseToolkit) {
      try {
        const user = request.auth.credentials as any;
        const { itemId } = request.query as { itemId: string };

        if (!itemId) {
          return Boom.badRequest("itemId query parameter is required");
        }

        const txns = await findLocalTransactionsForItem(
          user._id.toString(),
          itemId
        );

        return h
          .response({
            item_id: itemId,
            count: txns.length,
            transactions: txns,
          })
          .code(200);
      } catch (err: any) {
        console.log("Local transactions error:", err?.message || err);
        return Boom.serverUnavailable("Failed to load local transactions");
      }
    },
    tags: ["api"],
    description: "Get cached Plaid transactions from Mongo",
  },
};
