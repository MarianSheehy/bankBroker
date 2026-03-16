import { v4 } from "uuid";

let banks: any[] = [];

export const bankMemStore = {
  async getAllBanks() {
    return banks;
  },

  async addBank(bank: any) {
    bank._id = v4();
    banks.push(bank);
    return bank;
  },

  async getBankById(id: string) {
    const found = banks.find((bank) => bank._id === id);
    return found ?? null;
  },

  async deleteBank(id: string) {
    const index = banks.findIndex((bank) => bank._id === id);
    if (index !== -1) banks.splice(index, 1);
  },

  async deleteAllBanks() {
    banks = [];
  },

  async updateBank(bank: any, updatedBank: any) {
    bank.title = updatedBank.title;
    bank.date = updatedBank.date;
    bank.other = updatedBank.other;
  },
};
