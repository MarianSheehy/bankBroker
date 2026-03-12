<<<<<<< HEAD
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

=======
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

>>>>>>> 9eb855dcce3925702cc09dcdc94d360e637093b8
export const Bank = Mongoose.model("Bank", bankSchema);