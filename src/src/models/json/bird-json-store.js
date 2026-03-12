import { v4 } from "uuid";
import { db } from "./store-utils.js";

export const bankJsonStore = {
  async getAllBanks() {
    await db.read();
    return db.data.banks;
  },

  async addBank(placeId, bank) {
    await db.read();
    bank._id = v4();
    bank.placeid = placeId;
    db.data.banks.push(bank);
    await db.write();
    return bank;
  },

  async getBanksByPlaceId(id) {
    await db.read();
    let t = db.data.banks.filter((bank) => bank.placeid === id);
    if (t === undefined) t = null;
    return t;
  },

  async getBankById(id) {
    await db.read();
    let t = db.data.banks.find((bank) => bank._id === id);
    if (t === undefined) t = null;
    return t;
  },

  async deleteBank(id) {
    await db.read();
    const index = db.data.banks.findIndex((bank) => bank._id === id);
    if (index !== -1) db.data.banks.splice(index, 1);
    await db.write();
  },

  async deleteAllBanks() {
    db.data.banks = [];
    await db.write();
  },

  async updateBank(bank, updatedBank) {
    bank.title = updatedBank.title;
    bank.date = updatedBank.date;
    bank.other = updatedBank.other;
    await db.write();
  },
};
