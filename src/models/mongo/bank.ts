import { Schema, model } from "mongoose";
import type { Bank } from "../../types/report-types.js";

const bankSchema = new Schema<Bank>({
  firstName: String,
  lastName: String,
  office: String,
});

export const BankMongoose = model("Bank", bankSchema);
