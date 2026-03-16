import type { Bank, BankStore } from "../../types/report-types.js";
import { BankMongoose } from "./bank.js";

export const bankStore: BankStore = {
  async find(): Promise<Bank[]> {
    const banks = await BankMongoose.find().lean();
    return banks as Bank[];
  },

  async findOne(id: string): Promise<Bank | null> {
    const bank = await BankMongoose.findOne({ _id: id }).lean();
    return bank as Bank | null;
  },

  async findBy(lastName: string, firstName: string): Promise<Bank | null> {
    const bank = await BankMongoose.findOne({ lastName, firstName });
    return bank as Bank | null;
  },
};
