import Boom from "@hapi/boom";
import type { Request, ResponseToolkit } from "@hapi/hapi";
import { plaidClient } from "./plaid-client.js";
import { CountryCode, Products } from "plaid";

// In a real app you'd persist this per-user in the database.
// For now we keep it in memory so the demo flow works end-to-end.
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
        console.log("Plaid linkTokenCreate error:", err?.response?.data || err.message);
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
        const response = await plaidClient.itemPublicTokenExchange({ public_token });
        ACCESS_TOKEN = response.data.access_token;
        ITEM_ID = response.data.item_id;

        // TODO: persist access_token + item_id to the user's record in MongoDB
        console.log("Plaid item linked:", ITEM_ID);

        return h.response({ success: true, item_id: ITEM_ID }).code(200);
      } catch (err: any) {
        console.log("Plaid exchange error:", err?.response?.data || err.message);
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
        const response = await plaidClient.accountsGet({ access_token: ACCESS_TOKEN });
        return h.response({ accounts: response.data.accounts }).code(200);
      } catch (err: any) {
        console.log("Plaid accounts error:", err?.response?.data || err.message);
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
          end_date: end_date || new Date().toISOString().split("T")[0],
        });
        return h
          .response({
            accounts: response.data.accounts,
            transactions: response.data.transactions,
            total: response.data.total_transactions,
          })
          .code(200);
      } catch (err: any) {
        console.log("Plaid transactions error:", err?.response?.data || err.message);
        return Boom.serverUnavailable("Failed to fetch transactions");
      }
    },
    tags: ["api"],
    description: "Get transactions from Plaid",
  },
};
