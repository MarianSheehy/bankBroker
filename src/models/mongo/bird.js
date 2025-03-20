import Mongoose from "mongoose";

const { Schema } = Mongoose;

const birdSchema = new Schema({
  title: String,
  artist: String,
  duration: Number,
  placeid: {
    type: Schema.Types.ObjectId,
    ref: "Place",
  },
});

export const Bird = Mongoose.model("Bird", birdSchema);