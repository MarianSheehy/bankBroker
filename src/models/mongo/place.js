<<<<<<< HEAD
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

=======
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

>>>>>>> 9eb855dcce3925702cc09dcdc94d360e637093b8
export const Place = Mongoose.model("Place", placeSchema);