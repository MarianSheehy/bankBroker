import Mongoose from "mongoose";

const { Schema } = Mongoose;

const birdSchema = new Schema({
  title: String,
  date: String,
  other: String,
  placeid: {
    type: Schema.Types.ObjectId,
    ref: "Place",
  },
});

export const Bird = Mongoose.model("Bird", birdSchema);