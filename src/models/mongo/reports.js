import Mongoose from "mongoose";

const { Schema } = Mongoose;

const reportsSchema = new Schema({
  amount: Number,
  method: String,
  donor: String,
  candidate: {
    type: Schema.Types.ObjectId,
    ref: "Candidate",
  },
  lat: String,
  lng: String,
});

export const ReportsMongoose = Mongoose.model("Reports", reportsSchema);
