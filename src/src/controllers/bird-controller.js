<<<<<<< HEAD
import { BankSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";

export const bankController = {
  index: {
    handler: async function (request, h) {
      const place = await db.placeStore.getPlaceById(request.params.id);
      const bank = await db.bankStore.getBankById(request.params.bankid);
      const viewData = {
        title: "Edit Bank",
        place: place,
        bank: bank,
      };
      return h.view("bank-view", viewData);
    },
  },

  update: {
    validate: {
      payload: BankSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("bank-view", { title: "Edit bank error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const bank = await db.bankStore.getBankById(request.params.bankid);
      const newBank = {
        title: request.payload.title,
        date: request.payload.date,
        other: request.payload.other,
      };
      await db.bankStore.updateBank(bank, newBank);
      return h.redirect(`/place/${request.params.id}`);
    },
  },
=======
import { BankSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";

export const bankController = {
  index: {
    handler: async function (request, h) {
      const place = await db.placeStore.getPlaceById(request.params.id);
      const bank = await db.bankStore.getBankById(request.params.bankid);
      const viewData = {
        title: "Edit Bank",
        place: place,
        bank: bank,
      };
      return h.view("bank-view", viewData);
    },
  },

  update: {
    validate: {
      payload: BankSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("bank-view", { title: "Edit bank error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const bank = await db.bankStore.getBankById(request.params.bankid);
      const newBank = {
        title: request.payload.title,
        date: request.payload.date,
        other: request.payload.other,
      };
      await db.bankStore.updateBank(bank, newBank);
      return h.redirect(`/place/${request.params.id}`);
    },
  },
>>>>>>> 9eb855dcce3925702cc09dcdc94d360e637093b8
};