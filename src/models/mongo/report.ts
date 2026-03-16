import { Schema, model } from "mongoose";
import type { Report } from "../../types/report-types.js";

const reportSchema = new Schema<Report>({
  amount: Number,
  method: String,
  donor: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  bank: {
    type: Schema.Types.ObjectId,
    ref: "Bank",
  },
  lat: String,
  lng: String,
});

export const ReportMongoose = model("Report", reportSchema);
