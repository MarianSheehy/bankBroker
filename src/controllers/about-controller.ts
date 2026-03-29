import type { Request, ResponseToolkit } from "@hapi/hapi";

export const aboutController = {
  index: {
    handler: function (_request: Request, h: ResponseToolkit) {
      return h.view("about-view", {
        title: "About BankBroker",
      });
    },
  },
};
