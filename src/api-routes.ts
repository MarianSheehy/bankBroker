import { userApi } from "./api/user-api.js";
import { bankApi } from "./api/bank-api.js";
import { plaidApi } from "./api/plaid-api.js";

export const apiRoutes = [
  { method: "GET", path: "/api/users", config: userApi.find },
  { method: "POST", path: "/api/users", config: userApi.create },
  { method: "DELETE", path: "/api/users", config: userApi.deleteAll },
  { method: "GET", path: "/api/users/{id}", config: userApi.findOne },
  { method: "POST", path: "/api/users/authenticate", config: userApi.authenticate },

  { method: "GET", path: "/api/banks", config: bankApi.find },
  { method: "DELETE", path: "/api/banks", config: bankApi.deleteAll },
  { method: "DELETE", path: "/api/banks/{id}", config: bankApi.deleteOne },

  { method: "POST", path: "/api/plaid/create-link-token", config: plaidApi.createLinkToken },
  { method: "POST", path: "/api/plaid/exchange-token", config: plaidApi.exchangeToken },
  { method: "POST", path: "/api/plaid/accounts", config: plaidApi.getAccounts },
  { method: "POST", path: "/api/plaid/transactions", config: plaidApi.getTransactions },
  { method: "POST", path: "/api/plaid/transactions/sync", config: plaidApi.syncTransactions },
  { method: "GET", path: "/api/plaid/transactions/local", config: plaidApi.getLocalTransactions },
];
