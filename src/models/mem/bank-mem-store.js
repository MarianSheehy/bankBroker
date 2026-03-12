import { v4 } from "uuid";

let banks = [];

export const bankMemStore = {
  async getAllBanks() {
    return banks;
  },

  async addBank(placeId, bank) {
    bank._id = v4();
    bank.placeid = placeId;
    banks.push(bank);
    return bank;
  },

  async getBanksByPlaceId(id) {
    return banks.filter((bank) => bank.placeid === id);
  },

  async getBankById(id) {
    let foundBank = banks.find((bank) => bank._id === id);
    if (!foundBank) {
      foundBank = null;
    }
    return foundBank;
  },

  async getPlaceBanks(placeId) {
    let foundBanks = banks.filter((bank) => bank.placeid === placeId);
    if (!foundBanks) {
      foundBanks = null;
    }
    return foundBanks;
  },

  async deleteBank(id) {
    const index = banks.findIndex((bank) => bank._id === id);
    if (index !== -1) banks.splice(index, 1);
  },

  async deleteAllBanks() {
    banks = [];
  },

  async updateBank(bank, updatedBank) {
    bank.title = updatedBank.title;
    bank.date = updatedBank.date;
    bank.other = updatedBank.other;
  },
};
