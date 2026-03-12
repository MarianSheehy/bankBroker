import Mongoose from "mongoose";
import { Bank } from "./bank.js";

export const bankMongoStore = {
  async getAllBanks() {
    const banks = await Bank.find().lean();
    return banks;
  },

  async addBank(placeId, bank) {
    bank.placeid = placeId;
    const newBank = new Bank(bank);
    const bankObj = await newBank.save();
    return this.getBankById(bankObj._id);
  },

  async getBanksByPlaceId(id) {
    const banks = await Bank.find({ placeid: id }).lean();
    return banks;
  },

  async getBankById(id) {
    if (Mongoose.isValidObjectId(id)) {
      const bank = await Bank.findOne({ _id: id }).lean();
      return bank;
    }
    return null;
  },

  async deleteBank(id) {
    try {
      await Bank.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllBanks() {
    await Bank.deleteMany({});
  },

  async updateBank(bank, updatedBank) {
    const bankDoc = await Bank.findOne({ _id: bank._id });
    bankDoc.title = updatedBank.title;
    bankDoc.date = updatedBank.date;
    bankDoc.other = updatedBank.other;
    await bankDoc.save();
  },
};