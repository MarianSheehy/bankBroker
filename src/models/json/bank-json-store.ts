import { v4 } from "uuid";
import { db } from "./store-utils.js";

export const bankJsonStore = {
  async getAllBanks() {
    await db.read();
    return db.data.banks;
  },

  async addBank(bank: any) {
    await db.read();
    bank._id = v4();
    db.data.banks.push(bank);
    await db.write();
    return bank;
  },

  async getBankById(id: string) {
    await db.read();
    const found = db.data.banks.find((bank: any) => bank._id === id);
    return found ?? null;
  },

  async deleteBank(id: string) {
    await db.read();
    const index = db.data.banks.findIndex((bank: any) => bank._id === id);
    if (index !== -1) db.data.banks.splice(index, 1);
    await db.write();
  },

  async deleteAllBanks() {
    db.data.banks = [];
    await db.write();
  },

  async updateBank(bank: any, updatedBank: any) {
    bank.title = updatedBank.title;
    bank.date = updatedBank.date;
    bank.other = updatedBank.other;
    await db.write();
  },
};
