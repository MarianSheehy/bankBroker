import Mongoose from "mongoose";

const { Schema } = Mongoose;

const placeSchema = new Schema({
  title: String,
  img: String,
  userid: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export const Place = Mongoose.model("Place", placeSchema);