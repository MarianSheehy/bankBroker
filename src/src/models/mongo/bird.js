import Mongoose from "mongoose";

const { Schema } = Mongoose;

const bankSchema = new Schema({
  title: String,
  date: String,
  other: String,
  placeid: {
    type: Schema.Types.ObjectId,
    ref: "Place",
  },
});

export const Bank = Mongoose.model("Bank", bankSchema);