import type { Request, ResponseToolkit } from "@hapi/hapi";

export const plaidController = {
  index: {
    handler: async function (request: Request, h: ResponseToolkit) {
      const loggedInUser = request.auth.credentials;
      return h.view("plaid-view", {
        title: "Link Your Bank Account",
        user: loggedInUser,
      });
    },
  },
};