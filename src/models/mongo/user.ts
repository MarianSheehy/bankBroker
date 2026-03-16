import { Schema, model } from "mongoose";
import type { User } from "../../types/report-types.js";

const userSchema = new Schema<User>({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
});

export const UserMongoose = model("User", userSchema);
